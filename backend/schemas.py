from pydantic import BaseModel, Field
from typing import List, Optional, Any, Dict
from datetime import datetime

# Category Schemas
class CategoryBase(BaseModel):
    id: str
    name: str
    tamil_name: str
    blurb: Optional[str] = None
    hero: Optional[str] = None
    route: str

class CategoryOut(CategoryBase):
    class Config:
        from_attributes = True

# Template Schemas
class TemplateBase(BaseModel):
    id: int
    slug: str
    name: str
    tamil_name: str
    category: str
    price: float
    ornament_kind: str
    composition: str
    is_active: bool = True
    event_title: str
    date: str
    time: str
    venue: str
    address: str
    rsvp: str
    message: str
    ta_event_title: str
    ta_message: str
    pages: List[str]
    colorways: List[str]

class TemplateOut(TemplateBase):
    host: Optional[str] = None
    couple: Optional[str] = None
    family: Optional[str] = None
    ta_host: Optional[str] = None
    ta_couple: Optional[str] = None
    ta_family: Optional[str] = None

    class Config:
        from_attributes = True

# Customisation Schemas
class CustomisationCreate(BaseModel):
    id: str
    template_id: int
    language: str = "en"
    colorway_key: str
    payload: Dict[str, Any]

class CustomisationOut(CustomisationCreate):
    updated_at: datetime
    class Config:
        from_attributes = True

# Cart Schemas
class CartItemIn(BaseModel):
    template_id: int
    template_name: str
    colorway: str
    language: str
    quantity: int
    unit_price: float
    personalisation: Dict[str, Any]

class CartOut(BaseModel):
    items: List[CartItemIn]
    subtotal: float
    delivery_charge: float = 0.0 # Free
    total: float

# Order Schemas
class OrderCreate(BaseModel):
    customer_name: str
    mobile: str
    whatsapp: str
    email: Optional[str] = None
    address: str
    city: str
    state: str
    pincode: str
    function_type: str
    event_date: str
    instructions: Optional[str] = None
    items: List[Dict[str, Any]]
    total_amount: float

class OrderOut(OrderCreate):
    id: str
    delivery_charge: float
    status: str
    created_at: datetime
    class Config:
        from_attributes = True

# Offer Schemas
class OfferOut(BaseModel):
    id: int
    code: str
    title: str
    discount_percent: float
    customer_limit: int
    is_active: bool
    description: Optional[str] = None

    class Config:
        from_attributes = True

