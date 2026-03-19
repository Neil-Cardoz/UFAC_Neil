# UFAC Engine - Complete Setup Guide

## 🚀 Quick Start (5 minutes)

### Step 1: Clone & Install
```bash
# Clone repository
git clone <repo-url>
cd UFAC

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### Step 2: Configure Environment
```bash
# Copy example env file
cp .env.example .env

# Edit .env and add your Groq API key
# Get key from: https://console.groq.com/keys
GROQ_API_KEY=your_groq_api_key_here
DEV_MODE=true
```

### Step 3: Add PM-KISAN PDFs
```bash
# Add 8 official PM-KISAN guideline PDFs to data/ directory
# Files should be named: pm_kisan_*.pdf
# Download from: https://pmkisan.gov.in/

ls data/*.pdf  # Verify PDFs are present
```

### Step 4: Build RAG Vectorstore
```bash
# First-time setup - builds ChromaDB from PDFs
python setup_rag.py

# Output:
# ✅ RAG Setup Complete!
# ✅ 1,234 chunks indexed and ready
```

### Step 5: Run Backend
```bash
# Start FastAPI server
uvicorn api.app:app --reload --port 8000

# Output:
# ✅ Groq API initialized
# ✅ RAG pipeline ready
# ✅ UFAC Engine ready for requests
# Uvicorn running on http://127.0.0.1:8000
```

### Step 6: Test API
```bash
# In another terminal, test the API
curl -X POST http://localhost:8000/check \
  -H "Content-Type: application/json" \
  -d '{
    "occupation": "farmer",
    "land_ownership": "yes",
    "aadhaar_linked": true,
    "aadhaar_ekyc_done": true,
    "bank_account": true
  }'

# Should return eligibility assessment
```

---

## 📋 Detailed Setup

### Prerequisites
- Python 3.8+
- Groq API key (free tier available)
- 8 PM-KISAN guideline PDFs
- ~500MB disk space for ChromaDB

### Installation Steps

#### 1. Clone Repository
```bash
git clone <repo-url>
cd UFAC
```

#### 2. Create Virtual Environment
```bash
# Python 3.8+
python -m venv venv

# Activate
# On macOS/Linux:
source venv/bin/activate

# On Windows:
venv\Scripts\activate
```

#### 3. Install Dependencies
```bash
pip install -r requirements.txt

# Verify installation
python -c "import groq; import fastapi; import chromadb; print('✅ All dependencies installed')"
```

#### 4. Get Groq API Key
```bash
# 1. Go to https://console.groq.com/keys
# 2. Create new API key
# 3. Copy the key
```

#### 5. Configure Environment
```bash
# Copy example
cp .env.example .env

# Edit .env
nano .env  # or use your editor

# Add:
GROQ_API_KEY=gsk_your_key_here
DEV_MODE=true  # For development
```

#### 6. Add PM-KISAN PDFs
```bash
# Download 8 official PM-KISAN guideline PDFs from:
# https://pmkisan.gov.in/

# Place in data/ directory:
data/
├── pm_kisan_guidelines_2024.pdf
├── pm_kisan_eligibility.pdf
├── pm_kisan_application.pdf
├── pm_kisan_documents.pdf
├── pm_kisan_faq.pdf
├── pm_kisan_state_rules.pdf
├── pm_kisan_verification.pdf
└── pm_kisan_benefits.pdf

# Verify
ls -la data/*.pdf
```

#### 7. Build RAG Vectorstore
```bash
# First-time setup
python setup_rag.py

# Expected output:
# 🚀 UFAC Engine - RAG Setup
# Found 8 PDF files
# Loaded 256 pages from PDFs
# Split into 1,234 chunks
# ✅ Indexed 1,234 chunks into ChromaDB
# ✅ RAG Setup Complete!
# ✅ 1,234 chunks indexed and ready
```

#### 8. Start Backend
```bash
# Development mode
uvicorn api.app:app --reload --port 8000

# Production mode
gunicorn -w 4 -k uvicorn.workers.UvicornWorker api.app:app --bind 0.0.0.0:8000
```

#### 9. Test API
```bash
# Health check
curl http://localhost:8000/health

# RAG status
curl http://localhost:8000/rag-status

# Full eligibility check
curl -X POST http://localhost:8000/check \
  -H "Content-Type: application/json" \
  -d '{
    "occupation": "farmer",
    "land_ownership": "yes",
    "aadhaar_linked": true,
    "aadhaar_ekyc_done": true,
    "bank_account": true,
    "state": "Punjab"
  }'
```

---

## 🔧 Configuration

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `GROQ_API_KEY` | ✅ Yes | - | Groq API key from console.groq.com |
| `DEV_MODE` | ❌ No | false | Set to true for development (1 LLM run instead of 3) |

### API Configuration

Edit `api/app.py` to customize:
- Port: Change `--port 8000` to desired port
- Workers: Change `-w 4` for production
- CORS: Modify `allow_origins` for security

### RAG Configuration

Edit `data/rag_pipeline.py` to customize:
- Chunk size: `chunk_size=500` (default)
- Chunk overlap: `chunk_overlap=50` (default)
- Retrieval count: `search_kwargs={"k": 4}` (default)
- Embeddings model: `all-MiniLM-L6-v2` (default)

---

## 🧪 Testing

### Test 1: Health Check
```bash
curl http://localhost:8000/health

# Expected:
# {
#   "status": "healthy",
#   "service": "UFAC Engine v2",
#   "rag": {"initialized": true}
# }
```

### Test 2: RAG Status
```bash
curl http://localhost:8000/rag-status

# Expected:
# {
#   "status": "ok",
#   "rag": {
#     "chroma_exists": true,
#     "collection_count": 1234,
#     "retriever_cached": true
#   }
# }
```

### Test 3: Eligibility Check
```bash
curl -X POST http://localhost:8000/check \
  -H "Content-Type: application/json" \
  -d '{
    "occupation": "farmer",
    "land_ownership": "yes",
    "aadhaar_linked": true,
    "aadhaar_ekyc_done": true,
    "bank_account": true
  }'

# Expected: Full eligibility assessment with confidence score
```

### Test 4: CLI Test
```bash
# Run all 4 test cases
python main.py

# Expected: 4 test cases with timing
```

---

## 🐛 Troubleshooting

### Issue: "GROQ_API_KEY not set"
```bash
# Solution: Check .env file
cat .env

# Should contain:
# GROQ_API_KEY=gsk_...

# If missing, add it:
echo "GROQ_API_KEY=your_key_here" >> .env
```

### Issue: "No PDF files found"
```bash
# Solution: Add PDFs to data/ directory
ls data/*.pdf

# If empty, download from:
# https://pmkisan.gov.in/

# Then rebuild:
python setup_rag.py
```

### Issue: "ChromaDB not found"
```bash
# Solution: Rebuild vectorstore
python setup_rag.py

# Or delete and rebuild:
rm -rf data/chroma_db
python setup_rag.py
```

### Issue: "Connection refused" on API
```bash
# Solution: Check if API is running
curl http://localhost:8000/health

# If not running, start it:
uvicorn api.app:app --reload --port 8000

# If port 8000 is in use, use different port:
uvicorn api.app:app --reload --port 8001
```

### Issue: "Slow responses"
```bash
# Solution: Check DEV_MODE
cat .env | grep DEV_MODE

# For faster testing, set:
DEV_MODE=true

# This reduces LLM calls from 3 to 1
```

---

## 📊 Project Structure

```
UFAC/
├── api/
│   └── app.py                  # FastAPI application
├── core/
│   ├── fact_agent.py           # Fact extraction agent
│   ├── assumption_agent.py     # Assumption detection agent
│   ├── unknown_agent.py        # Unknown detection agent
│   ├── confidence_agent.py     # Confidence calculation agent
│   ├── decision_agent.py       # Decision guidance agent
│   ├── ufac_engine.py          # Main orchestration engine
│   ├── llm_utils.py            # Groq LLM utilities
│   └── schema.py               # Pydantic response schema
├── data/
│   ├── pm_kisan_rules.py       # Hardcoded PM-KISAN rules
│   ├── rag_pipeline.py         # RAG pipeline with caching
│   ├── chroma_db/              # ChromaDB vectorstore (auto-created)
│   └── *.pdf                   # PM-KISAN guideline PDFs
├── main.py                     # CLI test runner
├── setup_rag.py                # RAG setup script
├── .env                        # Environment variables (create from .env.example)
├── .env.example                # Environment template
├── requirements.txt            # Python dependencies
├── SETUP_GUIDE.md              # This file
├── PRIORITY_A_SUMMARY.md       # RAG caching fixes
└── PRIORITY_B_SUMMARY.md       # RAG validation fixes
```

---

## 🚀 Deployment

### Local Development
```bash
uvicorn api.app:app --reload --port 8000
```

### Production (Linux/macOS)
```bash
# Using Gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker api.app:app --bind 0.0.0.0:8000

# Using systemd (optional)
# Create /etc/systemd/system/ufac.service
```

### Docker
```bash
# Build image
docker build -t ufac-engine .

# Run container
docker run -e GROQ_API_KEY=your_key -p 8000:8000 ufac-engine
```

### Cloud Deployment
- **Railway**: Connect GitHub repo, set GROQ_API_KEY env var
- **Render**: Similar to Railway
- **AWS Lambda**: Use serverless framework
- **Google Cloud Run**: Use Docker image

---

## 📚 API Documentation

### Endpoints

#### GET /
```bash
curl http://localhost:8000/
# Returns: API info and available endpoints
```

#### GET /health
```bash
curl http://localhost:8000/health
# Returns: Health status with RAG status
```

#### GET /rag-status
```bash
curl http://localhost:8000/rag-status
# Returns: Detailed RAG pipeline status
```

#### POST /check
```bash
curl -X POST http://localhost:8000/check \
  -H "Content-Type: application/json" \
  -d '{
    "occupation": "farmer",
    "land_ownership": "yes",
    "aadhaar_linked": true,
    "aadhaar_ekyc_done": true,
    "bank_account": true,
    "annual_income": 200000,
    "income_tax_payer": false,
    "govt_employee": false,
    "pension_above_10k": false,
    "practicing_professional": false,
    "constitutional_post_holder": false,
    "state": "Punjab",
    "district": "Ludhiana"
  }'

# Returns: UFACResponse with eligibility assessment
```

#### GET /docs
```bash
# Interactive API documentation (Swagger UI)
http://localhost:8000/docs
```

---

## 🎯 Next Steps

1. ✅ Complete setup following this guide
2. ✅ Test API endpoints
3. ✅ Review PRIORITY_A_SUMMARY.md (RAG caching)
4. ✅ Review PRIORITY_B_SUMMARY.md (RAG validation)
5. ⏳ Implement Priority C (UI React Flow)
6. ⏳ Add monitoring and logging
7. ⏳ Deploy to production

---

## 📞 Support

### Common Commands
```bash
# Check Python version
python --version

# Check virtual environment
which python  # Should show venv path

# Check dependencies
pip list

# Check API status
curl http://localhost:8000/health

# Check RAG status
curl http://localhost:8000/rag-status

# View logs
tail -f logs/ufac.log
```

### Useful Links
- Groq Console: https://console.groq.com
- PM-KISAN Official: https://pmkisan.gov.in
- FastAPI Docs: https://fastapi.tiangolo.com
- ChromaDB Docs: https://docs.trychroma.com

---

## ✅ Verification Checklist

- [ ] Python 3.8+ installed
- [ ] Virtual environment created and activated
- [ ] Dependencies installed (`pip install -r requirements.txt`)
- [ ] `.env` file created with GROQ_API_KEY
- [ ] PM-KISAN PDFs added to `data/` directory
- [ ] RAG vectorstore built (`python setup_rag.py`)
- [ ] API starts without errors (`uvicorn api.app:app --reload`)
- [ ] Health check passes (`curl http://localhost:8000/health`)
- [ ] RAG status shows chunks indexed (`curl http://localhost:8000/rag-status`)
- [ ] Eligibility check works (`curl -X POST http://localhost:8000/check ...`)

---

**You're all set! 🎉 UFAC Engine is ready to assess PM-KISAN eligibility.**
