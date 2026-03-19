# File: data/rag_pipeline.py
# RAG Pipeline with ChromaDB + Singleton Retriever Caching

import os
import logging
from typing import Optional
from langchain_community.document_loaders import PyPDFDirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import SentenceTransformerEmbeddings

logger = logging.getLogger(__name__)

DATA_DIR = os.path.dirname(__file__)
CHROMA_DIR = os.path.join(DATA_DIR, "chroma_db")

# Singleton retriever cache
_retriever_cache: Optional[object] = None
_embeddings_cache: Optional[SentenceTransformerEmbeddings] = None

def _get_embeddings() -> SentenceTransformerEmbeddings:
    """Get or create embeddings model (cached)."""
    global _embeddings_cache
    if _embeddings_cache is None:
        logger.info("Loading SentenceTransformer embeddings...")
        _embeddings_cache = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")
        logger.info("✅ Embeddings model loaded")
    return _embeddings_cache

def build_vectorstore() -> None:
    """Build ChromaDB vectorstore from PDFs in data/ directory."""
    logger.info("🔨 Building vectorstore from PDFs...")
    
    if not os.path.exists(DATA_DIR):
        logger.error(f"Data directory not found: {DATA_DIR}")
        return
    
    # Check if PDFs exist
    pdf_files = [f for f in os.listdir(DATA_DIR) if f.endswith('.pdf')]
    if not pdf_files:
        logger.warning(f"⚠️  No PDF files found in {DATA_DIR}")
        logger.info("Please add PM-KISAN guideline PDFs to the data/ directory")
        return
    
    logger.info(f"Found {len(pdf_files)} PDF files: {pdf_files}")
    
    try:
        # Load PDFs
        loader = PyPDFDirectoryLoader(DATA_DIR)
        docs = loader.load()
        logger.info(f"Loaded {len(docs)} pages from PDFs")
        
        # Split into chunks
        splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
        chunks = splitter.split_documents(docs)
        logger.info(f"Split into {len(chunks)} chunks")
        
        # Create vectorstore
        embeddings = _get_embeddings()
        db = Chroma.from_documents(
            chunks,
            embeddings,
            persist_directory=CHROMA_DIR
        )
        db.persist()
        logger.info(f"✅ Indexed {len(chunks)} chunks into ChromaDB at {CHROMA_DIR}")
        
    except Exception as e:
        logger.error(f"❌ Failed to build vectorstore: {e}")
        raise

def get_retriever(force_rebuild: bool = False):
    """
    Get or create retriever (singleton pattern with caching).
    
    Args:
        force_rebuild: If True, rebuild vectorstore from PDFs
    
    Returns:
        Chroma retriever object
    """
    global _retriever_cache
    
    # Force rebuild if requested
    if force_rebuild:
        logger.info("🔄 Force rebuilding vectorstore...")
        _retriever_cache = None
        build_vectorstore()
    
    # Return cached retriever if available
    if _retriever_cache is not None:
        logger.debug("Using cached retriever")
        return _retriever_cache
    
    # Check if ChromaDB exists
    if not os.path.exists(CHROMA_DIR):
        logger.warning(f"ChromaDB not found at {CHROMA_DIR}")
        logger.info("Building vectorstore for the first time...")
        build_vectorstore()
    
    # Load from disk
    try:
        logger.info("Loading retriever from ChromaDB...")
        embeddings = _get_embeddings()
        db = Chroma(
            persist_directory=CHROMA_DIR,
            embedding_function=embeddings
        )
        _retriever_cache = db.as_retriever(search_kwargs={"k": 4})
        logger.info("✅ Retriever loaded and cached")
        return _retriever_cache
    except Exception as e:
        logger.error(f"❌ Failed to load retriever: {e}")
        raise

def clear_cache() -> None:
    """Clear the retriever cache (useful for testing)."""
    global _retriever_cache, _embeddings_cache
    _retriever_cache = None
    _embeddings_cache = None
    logger.info("Cache cleared")

def get_vectorstore_status() -> dict:
    """Get status of vectorstore (for health checks)."""
    status = {
        "chroma_exists": os.path.exists(CHROMA_DIR),
        "chroma_path": CHROMA_DIR,
        "retriever_cached": _retriever_cache is not None,
        "embeddings_cached": _embeddings_cache is not None,
    }
    
    if status["chroma_exists"]:
        try:
            embeddings = _get_embeddings()
            db = Chroma(persist_directory=CHROMA_DIR, embedding_function=embeddings)
            status["collection_count"] = db._collection.count()
        except Exception as e:
            status["error"] = str(e)
    
    return status
