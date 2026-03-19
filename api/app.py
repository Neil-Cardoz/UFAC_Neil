# File: api/app.py
import logging
from contextlib import asynccontextmanager
from typing import Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from core.llm_utils import init_gemini
from core.ufac_engine import run_ufac
from core.schema import UFACResponse
from data.rag_pipeline import get_retriever, get_vectorstore_status

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup: Initialize Groq API and RAG pipeline. Shutdown: cleanup."""
    logger.info("="*60)
    logger.info("🚀 Starting UFAC Engine v2.0...")
    logger.info("="*60)
    
    # Initialize Groq API
    try:
        init_gemini()
        logger.info("✅ Groq API initialized")
    except Exception as e:
        logger.error(f"❌ Failed to initialize Groq API: {e}")
        raise
    
    # Initialize RAG pipeline
    rag_status = {"initialized": False, "error": None}
    try:
        logger.info("Initializing RAG pipeline...")
        retriever = get_retriever()
        status = get_vectorstore_status()
        
        if status.get("collection_count", 0) == 0:
            logger.warning("⚠️  RAG initialized but no chunks found")
            logger.info("Please run: python setup_rag.py")
            rag_status["warning"] = "No chunks indexed"
        else:
            logger.info(f"✅ RAG pipeline ready: {status['collection_count']} chunks indexed")
            rag_status["initialized"] = True
            
    except Exception as e:
        logger.error(f"⚠️  RAG pipeline initialization failed: {e}")
        logger.info("Continuing without RAG (using hardcoded rules)")
        rag_status["error"] = str(e)
    
    logger.info("="*60)
    logger.info("✅ UFAC Engine ready for requests")
    logger.info("="*60)
    
    # Store RAG status in app state for health checks
    app.state.rag_status = rag_status
    
    yield
    
    logger.info("🛑 UFAC Engine shutting down...")

app = FastAPI(
    title="UFAC Engine API",
    description="Unknown-Fact-Assumption-Confidence engine for PM-KISAN eligibility",
    version="2.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class EligibilityCheckRequest(BaseModel):
    occupation: Optional[str] = None
    land_ownership: Optional[str] = None
    aadhaar_linked: Optional[bool] = None
    aadhaar_ekyc_done: Optional[bool] = None
    bank_account: Optional[bool] = None
    annual_income: Optional[float] = None
    income_tax_payer: Optional[bool] = None
    govt_employee: Optional[bool] = None
    pension_above_10k: Optional[bool] = None
    practicing_professional: Optional[bool] = None
    constitutional_post_holder: Optional[bool] = None
    state: Optional[str] = None
    district: Optional[str] = None
    additional_info: Optional[dict] = None

@app.get("/health")
async def health_check():
    """Health check with RAG status."""
    rag_status = getattr(app.state, "rag_status", {"initialized": False})
    return {
        "status": "healthy",
        "service": "UFAC Engine v2",
        "rag": rag_status
    }

@app.get("/rag-status")
async def rag_status():
    """Check RAG pipeline status."""
    try:
        status = get_vectorstore_status()
        return {"status": "ok", "rag": status}
    except Exception as e:
        logger.error(f"RAG status check failed: {e}")
        return {"status": "error", "error": str(e)}

@app.post("/check", response_model=UFACResponse)
async def check_eligibility(request: EligibilityCheckRequest):
    """
    Check PM-KISAN eligibility.
    Runs all 5 agents with parallel async execution for low latency.
    """
    try:
        user_data = request.model_dump(exclude_none=True)
        logger.info(f"Processing eligibility check: {user_data}")
        result = await run_ufac(user_data)
        return result
    except Exception as e:
        logger.error(f"Eligibility check failed: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")

@app.get("/")
async def root():
    return {
        "service": "UFAC Engine — PM-KISAN Eligibility Assessment v2",
        "endpoints": {
            "health": "GET /health",
            "check": "POST /check",
            "docs": "GET /docs",
        },
    }

