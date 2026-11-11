from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
import uuid

from .database import engine, Base, get_db
from . import models, schemas

# Initialize database schema
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Aurelia Atelier — Invitation World REST API",
    description="Backend engine powering the luxury stationery & invitation atelier",
    version="1.0.0"
)

# CORS configuration for development and production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 1. CATEGORIES ENDPOINT ---
@app.get("/api/categories", response_model=List[schemas.CategoryOut], tags=["Catalogue"])
def list_categories(db: Session = Depends(get_db)):
    """Fetch all celebration categories."""
    categories = db.query(models.Category).all()
    return categories

# --- 2. INVITATIONS ENDPOINTS ---
@app.get("/api/invitations", response_model=List[schemas.TemplateOut], tags=["Catalogue"])
def list_invitations(
    category: Optional[str] = Query(None, description="Filter by category slug"),
    db: Session = Depends(get_db)
):
    """Retrieve 60 invitation designs with category filtering and pricing."""
    query = db.query(models.InvitationTemplate).filter(models.InvitationTemplate.is_active == True)
    if category and category != "all":
        query = query.filter(models.InvitationTemplate.category == category)
    return query.all()

@app.get("/api/invitations/{template_id}", response_model=schemas.TemplateOut, tags=["Catalogue"])
def get_invitation(template_id: int, db: Session = Depends(get_db)):
    """Get single invitation detail by numeric ID."""
    template = db.query(models.InvitationTemplate).filter(models.InvitationTemplate.id == template_id).first()
    if not template:
        raise HTTPException(status_code=404, detail="Invitation template not found.")
    return template

@app.get("/api/invitations/{template_id}/variants", tags=["Catalogue"])
def get_invitation_variants(template_id: int, db: Session = Depends(get_db)):
    """Retrieve active colorway variants and pages for an invitation design."""
    template = db.query(models.InvitationTemplate).filter(models.InvitationTemplate.id == template_id).first()
    if not template:
        raise HTTPException(status_code=404, detail="Invitation template not found.")
    return {
        "id": template.id,
        "name": template.name,
        "colorways": template.colorways,
        "pages": template.pages
    }

# --- 3. CUSTOMISATIONS & DRAFTS ---
@app.post("/api/customisations", response_model=schemas.CustomisationOut, tags=["Customisation"])
def save_customisation(draft_in: schemas.CustomisationCreate, db: Session = Depends(get_db)):
    """Save or update customer personalization draft."""
    existing = db.query(models.CustomisationDraft).filter(models.CustomisationDraft.id == draft_in.id).first()
    if existing:
        existing.payload = draft_in.payload
        existing.colorway_key = draft_in.colorway_key
        existing.language = draft_in.language
        db.commit()
        db.refresh(existing)
        return existing
    new_draft = models.CustomisationDraft(
        id=draft_in.id or str(uuid.uuid4()),
        template_id=draft_in.template_id,
        language=draft_in.language,
        colorway_key=draft_in.colorway_key,
        payload=draft_in.payload
    )
    db.add(new_draft)
    db.commit()
    db.refresh(new_draft)
    return new_draft

@app.get("/api/customisations/{draft_id}", response_model=schemas.CustomisationOut, tags=["Customisation"])
def get_customisation(draft_id: str, db: Session = Depends(get_db)):
    """Retrieve a previously saved draft by ID."""
    draft = db.query(models.CustomisationDraft).filter(models.CustomisationDraft.id == draft_id).first()
    if not draft:
        raise HTTPException(status_code=404, detail="Customisation draft not found.")
    return draft

# --- 4. CART RECALCULATION ---
@app.post("/api/cart", response_model=schemas.CartOut, tags=["Commerce"])
def calculate_cart(items: List[schemas.CartItemIn]):
    """Calculate totals with complimentary delivery."""
    subtotal = sum(item.unit_price * item.quantity for item in items)
    return {
        "items": items,
        "subtotal": subtotal,
        "delivery_charge": 0.0,
        "total": subtotal
    }

@app.get("/api/cart", response_model=schemas.CartOut, tags=["Commerce"])
def get_cart_status():
    """Returns baseline cart response schema with complimentary delivery rule."""
    return {
        "items": [],
        "subtotal": 0.0,
        "delivery_charge": 0.0,
        "total": 0.0
    }

# --- 5. ORDERS & CHECKOUT ---
@app.post("/api/orders", response_model=schemas.OrderOut, tags=["Orders"])
def create_order(order_in: schemas.OrderCreate, db: Session = Depends(get_db)):
    """Register incoming client order. Returns reference ID for WhatsApp integration."""
    order_ref = f"AUR-{str(uuid.uuid4())[:8].upper()}"
    new_order = models.Order(
        id=order_ref,
        customer_name=order_in.customer_name,
        mobile=order_in.mobile,
        whatsapp=order_in.whatsapp,
        email=order_in.email,
        address=order_in.address,
        city=order_in.city,
        state=order_in.state,
        pincode=order_in.pincode,
        function_type=order_in.function_type,
        event_date=order_in.event_date,
        instructions=order_in.instructions,
        items=order_in.items,
        total_amount=order_in.total_amount,
        delivery_charge=0.0,
        status="Pending Contact"
    )
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    return new_order

@app.get("/api/orders/{order_id}", response_model=schemas.OrderOut, tags=["Orders"])
def get_order(order_id: str, db: Session = Depends(get_db)):
    """Retrieve order status."""
    order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found.")
    return order

# --- 6. PROMOTIONAL OFFERS ---
@app.get("/api/offers", response_model=List[schemas.OfferOut], tags=["Offers"])
def get_offers(db: Session = Depends(get_db)):
    """Fetch active promotional campaigns (e.g. Grand Launch 50% Off)."""
    offers = db.query(models.Offer).filter(models.Offer.is_active == True).all()
    if not offers:
        # Default active launch offer if database is freshly initialized
        return [
            schemas.OfferOut(
                id=1,
                code="GRANDLAUNCH",
                title="OUR GRAND LAUNCH CELEBRATION",
                discount_percent=50.0,
                customer_limit=10,
                is_active=True,
                description="50% OFF FOR THE FIRST 10 CUSTOMERS • COMPLIMENTARY DELIVERY TO YOUR ADDRESS"
            )
        ]
    return offers

