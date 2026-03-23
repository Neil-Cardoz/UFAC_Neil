# UFAC Engine - Complete Setup & Run Guide

## Prerequisites

Before starting, ensure you have:
- Python 3.9+ installed
- pip (Python package manager)
- A Groq API key (get it from https://console.groq.com)
- PM-KISAN PDF guideline files (optional but recommended for RAG)

---

## Step 1: Clone/Setup Project

```bash
# Navigate to project directory
cd /path/to/ufac-engine

# Verify project structure
ls -la
# You should see: api/, core/, data/, tests/, main.py, setup_rag.py, requirements.txt, etc.
```

---

## Step 2: Create Virtual Environment

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

---

## Step 3: Install Dependencies

```bash
# Upgrade pip
pip install --upgrade pip

# Install all required packages
pip install -r requirements.txt
```

Expected packages:
- fastapi, uvicorn (API framework)
- pydantic (data validation)
- groq (LLM API client)
- langchain, langchain-community (RAG framework)
- chromadb (vector database)
- sentence-transformers (embeddings)
- python-dotenv (environment variables)
- pytest (testing)

---

## Step 4: Configure Environment Variables

```bash
# Create .env file from template
cp .env.example .env

# Edit .env and add your Groq API key
# .env should contain:
GROQ_API_KEY=your_groq_api_key_here
```

Get your Groq API key:
1. Visit https://console.groq.com
2. Sign up or log in
3. Create an API key
4. Copy and paste into .env file

---

## Step 5: Setup RAG Pipeline (Optional but Recommended)

### Add PM-KISAN PDF Files

```bash
# Place your PM-KISAN guideline PDFs in the data/ directory
# Example files:
# - data/PM_KISAN_OPERATIONAL_GUIDELINES.pdf
# - data/Guidelines.pdf
# - data/Revised_Operational_Guidelines.pdf

# Verify PDFs are in place
ls -la data/*.pdf
```

### Build Vector Database

```bash
# Run setup script to build ChromaDB
python setup_rag.py

# Expected output:
# ✅ RAG Setup Complete!
# ✅ [N] chunks indexed and ready
```

If you skip this step, the system will work with hardcoded PM-KISAN rules but without RAG context.

---

## Step 6: Run Tests (Optional)

```bash
# Run all tests
pytest tests/ -v

# Run specific test file
pytest tests/test_cache.py -v

# Run with coverage
pytest tests/ --cov=core --cov=api --cov=data
```

Expected: All tests should pass (30+ tests)

---

## Step 7: Start the API Server

```bash
# Start FastAPI server
uvicorn api.app:app --reload --host 0.0.0.0 --port 8000

# Expected output:
# INFO:     Uvicorn running on http://0.0.0.0:8000
# INFO:     Application startup complete
```

The server will be available at: http://localhost:8000

---

## Step 8: Test the API

### Option A: Using curl

```bash
# Health check
curl http://localhost:8000/health

# Check RAG status
curl http://localhost:8000/rag-status

# Run eligibility assessment
curl -X POST http://localhost:8000/check \
  -H "Content-Type: application/json" \
  -d '{
    "occupation": "farmer",
    "land_ownership": "yes",
    "aadhaar_linked": true,
    "aadhaar_ekyc_done": true,
    "bank_account": true
  }'
```

### Option B: Using Python

```python
import requests
import json

BASE_URL = "http://localhost:8000"

# Health check
response = requests.get(f"{BASE_URL}/health")
print(json.dumps(response.json(), indent=2))

# Eligibility check
payload = {
    "occupation": "farmer",
    "land_ownership": "yes",
    "aadhaar_linked": True,
    "aadhaar_ekyc_done": True,
    "bank_account": True,
    "annual_income": 50000,
    "income_tax_payer": False,
    "govt_employee": False
}

response = requests.post(f"{BASE_URL}/check", json=payload)
print(json.dumps(response.json(), indent=2))
```

### Option C: Using FastAPI Docs

Open your browser and visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

---

## Step 9: Run Main Test Script

```bash
# Run the main test script with sample data
python main.py

# Expected output:
# ============================================================
# TEST 1: Minimal Input (Farmer)
# ============================================================
# {
#   "answer": "Likely ELIGIBLE for PM-KISAN...",
#   "confidence": 75,
#   ...
# }
# ⏱  Completed in 8.45s
```

---

## API Endpoints Reference

### Health & Status
- `GET /health` - Health check with RAG status
- `GET /rag-status` - RAG pipeline status
- `GET /` - Root endpoint with all available endpoints

### Assessment
- `POST /check` - Run PM-KISAN eligibility assessment

### Monitoring
- `GET /cache-stats` - Cache statistics
- `POST /cache-clear` - Clear all caches
- `GET /metrics` - System metrics
- `POST /metrics-reset` - Reset metrics

### Documentation
- `GET /docs` - Swagger UI
- `GET /redoc` - ReDoc documentation

---

## Troubleshooting

### Issue: "GROQ_API_KEY not set"
**Solution**: 
- Verify .env file exists in project root
- Check GROQ_API_KEY is set correctly
- Restart the server after updating .env

### Issue: "ChromaDB not found"
**Solution**:
- Run `python setup_rag.py` to build vector database
- Ensure PDF files are in data/ directory
- System will work without RAG using hardcoded rules

### Issue: "LLM API call failed"
**Solution**:
- Check internet connection
- Verify Groq API key is valid
- Check Groq API status at https://status.groq.com
- Try again after a few seconds

### Issue: "Port 8000 already in use"
**Solution**:
```bash
# Use a different port
uvicorn api.app:app --reload --host 0.0.0.0 --port 8001
```

### Issue: "Module not found" errors
**Solution**:
- Ensure virtual environment is activated
- Run `pip install -r requirements.txt` again
- Check Python version is 3.9+

---

## Performance Tips

1. **Enable Caching**: System caches assessments for 1 hour by default
   - Check cache stats: `GET /cache-stats`
   - Clear cache if needed: `POST /cache-clear`

2. **Monitor Metrics**: Track system performance
   - View metrics: `GET /metrics`
   - Reset metrics: `POST /metrics-reset`

3. **Use RAG**: With RAG enabled, assessments are more accurate
   - Run `python setup_rag.py` to enable RAG
   - RAG results are cached for 2 hours

4. **Batch Requests**: Send multiple requests to benefit from caching
   - First request: ~8-10 seconds
   - Cached requests: ~0.1 seconds (80-100x faster)

---

## Development Mode

For faster testing without full LLM calls:

```bash
# Set DEV_MODE in .env
DEV_MODE=true

# This reduces LLM calls from 3 to 1 per agent
# Useful for rapid testing and development
```

---

## Project Structure

```
ufac-engine/
├── api/
│   └── app.py                 # FastAPI application
├── core/
│   ├── fact_agent.py          # Fact extraction agent
│   ├── assumption_agent.py    # Assumption detection agent
│   ├── unknown_agent.py       # Unknown detection agent
│   ├── confidence_agent.py    # Confidence calibration agent
│   ├── decision_agent.py      # Decision guidance agent
│   ├── ufac_engine.py         # Main orchestration engine
│   ├── llm_utils.py           # LLM utilities and error handling
│   ├── cache.py               # Caching layer
│   ├── metrics.py             # Metrics collection
│   ├── schema.py              # Data schemas
│   └── __init__.py
├── data/
│   ├── rag_pipeline.py        # RAG pipeline with caching
│   ├── pm_kisan_rules.py      # PM-KISAN rules and requirements
│   ├── chroma_db/             # Vector database (auto-created)
│   └── *.pdf                  # PM-KISAN guideline PDFs
├── tests/
│   ├── test_api.py            # API endpoint tests
│   ├── test_cache.py          # Cache layer tests
│   ├── test_error_handling.py # Error handling tests
│   ├── conftest.py            # Test configuration
│   └── __init__.py
├── main.py                    # Main test script
├── setup_rag.py               # RAG setup script
├── requirements.txt           # Python dependencies
├── .env.example               # Environment template
├── .env                       # Environment variables (create from .env.example)
└── README.md                  # Project documentation
```

---

## Next Steps

1. ✅ Complete setup following steps 1-4
2. ✅ (Optional) Setup RAG with step 5
3. ✅ Run tests with step 6
4. ✅ Start API server with step 7
5. ✅ Test endpoints with step 8
6. ✅ Run main script with step 9

---

## Support & Documentation

- **README.md**: High-level project overview
- **ALL_CODE_FILES.txt**: Complete codebase dump
- **EXECUTIVE_SUMMARY.md**: Executive summary of features
- **API Docs**: Available at http://localhost:8000/docs (when server running)

---

## Quick Start (TL;DR)

```bash
# 1. Setup
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt

# 2. Configure
cp .env.example .env
# Edit .env and add GROQ_API_KEY

# 3. Setup RAG (optional)
python setup_rag.py

# 4. Run tests (optional)
pytest tests/ -v

# 5. Start server
uvicorn api.app:app --reload --host 0.0.0.0 --port 8000

# 6. Test in another terminal
curl http://localhost:8000/health
```

---

**Last Updated**: March 20, 2026
**Version**: 2.0.0