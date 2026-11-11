# IMPLEMENTATION PLAN — AURELIA: THE INVITATION WORLD

## Phase 1: Architecture & Structural Foundation
- [x] Workspace inspection and dependency installation via isolated `.npm-cache` on `D:\`.
- [x] Master specification document generation.
- [ ] Comprehensive Project Architecture & Database Schema design.
- [ ] Route expansion: add dedicated routes for all celebration collections and protected Admin Dashboard.

## Phase 2: Navigation & Route Completeness
- [ ] Update `App.tsx` and `FloatingNav.tsx` to support dedicated routes:
  - `/wedding`, `/engagement`, `/reception`, `/tamil-heritage`, `/mehendi`, `/haldi`, `/birthday`, `/baby-shower`, `/seemantham`, `/housewarming`, `/anniversary`, `/naming-ceremony`, `/manjal-neerattu`, `/special-celebrations`
  - `/admin` (Protected Admin Dashboard)
- [ ] Integrate protected admin authentication state & catalog manager.

## Phase 3: Interactive 3D Invitation Viewer & Personalisation Studio
- [ ] Verify 3D booklet page flip mechanics and touch swipe responsiveness.
- [ ] Guarantee real-time swatch transformations across all 4+ colorways per template.
- [ ] Test and polish Tamil Unicode script rendering, bilingual column stacking, and draft persistence.

## Phase 4: Commerce & WhatsApp Dispatch Workflow
- [ ] Transparent unit pricing and quantity calculations (₹5 – ₹2,000).
- [ ] Guaranteed complimentary delivery indicator and configurable 50% Grand Launch banner.
- [ ] WhatsApp Click-to-Chat payload generation adhering to target number `+918072854541`.

## Phase 5: Python FastAPI Backend & SQLAlchemy Database
- [ ] Create `backend/` directory with clean modular structure:
  - `main.py`: FastAPI application with CORS and security.
  - `database.py`: SQLAlchemy connection, session management.
  - `models.py`: Database models for templates, categories, variants, customizations, orders, offers.
  - `schemas.py`: Pydantic validation schemas.
  - `seed_data.py`: Populate all 60 templates into database.
  - `requirements.txt`: Python dependencies.
- [ ] Implement all required REST endpoints:
  - `GET /api/invitations`
  - `GET /api/invitations/{id}`
  - `GET /api/categories`
  - `GET /api/invitations/{id}/variants`
  - `POST /api/customisations`
  - `GET /api/customisations/{id}`
  - `POST /api/cart`
  - `GET /api/cart`
  - `POST /api/orders`
  - `GET /api/orders/{id}`
  - `GET /api/offers`

## Phase 6: Admin Dashboard
- [ ] Build `/admin` route with luxury admin UI:
  - Secure authentication modal / session.
  - Catalogue inventory management (all 60 designs).
  - Price and active colorway editor.
  - Live order tracker with status updates.
  - Grand Launch promotion management.

## Phase 7: Verification, QA & Documentation
- [ ] Generate comprehensive documentation: `DATABASE_SCHEMA.md`, `API_DOCUMENTATION.md`, `TESTING_REPORT.md`, `USER_MANUAL.md`.
- [ ] Execute thorough end-to-end checkout and route verification.

