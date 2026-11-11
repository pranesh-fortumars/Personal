# AURELIA — THE INVITATION WORLD

> *Every Celebration Begins With An Invitation.*

A luxury stationery and digital invitation atelier platform crafted with React, TypeScript, Tailwind CSS, Framer Motion, and Python FastAPI.

---

## 🌟 Highlights
- **60 Distinct Curated Templates**: Covering 15 celebration categories with individual pricing, bespoke ornaments, and layout compositions.
- **3D Multi-Page Invitation Viewer**: Multi-page physics-inspired booklet page flips with fullscreen mode and mobile swipe gestures.
- **Live Colorway Transformations**: Dynamic switching across 4+ luxury palettes per template updating backgrounds, borders, ornaments, and typography.
- **Trilingual Rendering**: Instant switching between Tamil (`Noto Serif Tamil`), English, and Bilingual layouts without losing client personalisation data.
- **Dynamic Personalisation Studio**: Instant preview updates for Host, Couple, Venue, Date, Time, RSVP, and Blessing with local draft persistence.
- **Direct WhatsApp Ordering**: One-click order dispatch to `+918072854541` with structured, formatted messages.
- **Complimentary Delivery Guarantee**: 100% free delivery nationwide across India on all orders.
- **Protected Atelier Admin Suite**: Secure administrative dashboard (`/admin`) for inventory management, price overrides, order tracking, and promotional campaign controls.

---

## 🚀 Quick Start Guide

### 1. Frontend Setup
The project dependencies are installed locally in `D:\personal-main` without modifying global systems:

```bash
# Start Vite development server
npm run dev
```
The application will be accessible at: `http://localhost:5173/`

### 2. Backend Setup (Optional REST Server)
To run the companion FastAPI server with SQLite/PostgreSQL:

```bash
# Navigate to project root
cd d:\personal-main

# Install python dependencies
pip install -r backend/requirements.txt

# Run the database seeder (seeds all 15 categories, 60 templates, and launch offers)
python -m backend.seed_data

# Start the FastAPI REST service
uvicorn backend.main:app --reload --port 8000
```
Interactive API Swagger Docs: `http://localhost:8000/docs`

---

## 🔐 Admin Dashboard Access
- **URL**: `http://localhost:5173/admin`
- **Passcode**: `aurelia2026`

---

## 📁 Project Structure
```
d:\personal-main\
├── backend/                  # Python FastAPI Backend
│   ├── database.py           # SQLAlchemy database connection & session
│   ├── main.py               # REST API endpoints (Catalogue, Orders, Cart, Offers)
│   ├── models.py             # Database models for templates, categories, orders
│   ├── requirements.txt      # Python dependencies
│   ├── schemas.py            # Pydantic validation schemas
│   └── seed_data.py          # Database seeding script
├── src/                      # React Frontend Application
│   ├── components/           # UI Components (3D InvitationViewer, FloatingNav, Ornaments)
│   ├── context/              # Cart & Personalisation State Management
│   ├── data/                 # 60 Templates & Dynamic Colorway definitions
│   ├── hooks/                # Draft & Local Storage Hooks
│   ├── pages/                # Complete Route Views (Home, Explore, Detail, Cart, Admin)
│   ├── App.tsx               # Route Definitions (24+ dedicated routes)
│   └── types.ts              # TypeScript domain types
├── API_DOCUMENTATION.md      # REST API specification
├── DATABASE_SCHEMA.md        # Database schema & entity diagrams
├── IMPLEMENTATION_PLAN.md    # Multi-phase execution roadmap
├── MASTER_SPEC.md            # Comprehensive project specification
├── TESTING_REPORT.md         # QA & verification test report
└── USER_MANUAL.md            # Complete user and atelier manual
```

