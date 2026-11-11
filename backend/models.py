from sqlalchemy import Column, Integer, String, Text, Boolean, Float, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class Category(Base):
    __tablename__ = "categories"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    tamil_name = Column(String, nullable=False)
    blurb = Column(Text, nullable=True)
    hero = Column(Text, nullable=True)
    route = Column(String, nullable=False)

    templates = relationship("InvitationTemplate", back_populates="category_rel")

class InvitationTemplate(Base):
    __tablename__ = "invitation_templates"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    tamil_name = Column(String, nullable=False)
    category = Column(String, ForeignKey("categories.id"), nullable=False)
    price = Column(Float, nullable=False) # e.g. 5 to 2000 INR
    ornament_kind = Column(String, nullable=False)
    composition = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)

    # Content defaults
    host = Column(String, nullable=True)
    couple = Column(String, nullable=True)
    family = Column(String, nullable=True)
    event_title = Column(String, nullable=False)
    date = Column(String, nullable=False)
    time = Column(String, nullable=False)
    venue = Column(String, nullable=False)
    address = Column(String, nullable=False)
    rsvp = Column(String, nullable=False)
    message = Column(Text, nullable=False)

    # Tamil defaults (Unicode)
    ta_host = Column(String, nullable=True)
    ta_couple = Column(String, nullable=True)
    ta_family = Column(String, nullable=True)
    ta_event_title = Column(String, nullable=False)
    ta_message = Column(Text, nullable=False)

    pages = Column(JSON, nullable=False) # array of page types e.g. ['cover', 'invite', 'details', 'rsvp']
    colorways = Column(JSON, nullable=False) # list of supported colorway keys

    category_rel = relationship("Category", back_populates="templates")

class CustomisationDraft(Base):
    __tablename__ = "customisation_drafts"

    id = Column(String, primary_key=True, index=True) # UUID or session draft id
    template_id = Column(Integer, ForeignKey("invitation_templates.id"), nullable=False)
    language = Column(String, default="en") # 'ta' | 'en' | 'bi'
    colorway_key = Column(String, nullable=False)
    payload = Column(JSON, nullable=False) # client personalization fields
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Order(Base):
    __tablename__ = "orders"

    id = Column(String, primary_key=True, index=True) # e.g. AUR-2026-001
    customer_name = Column(String, nullable=False)
    mobile = Column(String, nullable=False)
    whatsapp = Column(String, nullable=False)
    email = Column(String, nullable=True)
    address = Column(Text, nullable=False)
    city = Column(String, nullable=False)
    state = Column(String, nullable=False)
    pincode = Column(String, nullable=False)
    function_type = Column(String, nullable=False)
    event_date = Column(String, nullable=False)
    instructions = Column(Text, nullable=True)
    
    items = Column(JSON, nullable=False) # Cart items payload
    total_amount = Column(Float, nullable=False)
    delivery_charge = Column(Float, default=0.0) # Always complimentary
    status = Column(String, default="Pending Contact") # 'Pending Contact', 'Proof Approved', 'In Production', 'Dispatched', 'Delivered'
    created_at = Column(DateTime, default=datetime.utcnow)

class Offer(Base):
    __tablename__ = "offers"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String, unique=True, index=True)
    title = Column(String, nullable=False)
    discount_percent = Column(Float, default=50.0)
    customer_limit = Column(Integer, default=10)
    is_active = Column(Boolean, default=True)
    description = Column(Text, nullable=True)

