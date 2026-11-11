# API DOCUMENTATION — AURELIA: THE INVITATION WORLD

Base URL: `http://localhost:8000` (Local) / `/api` (Production Reverse Proxy)

---

## 1. Catalogue & Collections

### `GET /api/categories`
Retrieves all 15 celebration categories with metadata, English & Tamil titles, and routing.
- **Response `200 OK`**:
```json
[
  {
    "id": "wedding",
    "name": "Wedding Collection",
    "tamil_name": "திருமண தொகுப்பு",
    "blurb": "Bespoke wedding invitations for the sacred union of two souls.",
    "hero": "The union of two families, written in gold.",
    "route": "/collections/wedding"
  }
]
```

### `GET /api/invitations`
Fetches all 60 active invitation templates.
- **Query Parameters**:
  - `category` (optional, string): Filter by category slug (e.g. `wedding`, `tamil-wedding`).
- **Response `200 OK`**:
```json
[
  {
    "id": 1,
    "slug": "1-royal-emerald",
    "name": "Royal Emerald",
    "tamil_name": "ராயல் மரகதம்",
    "category": "wedding",
    "price": 120.0,
    "ornament_kind": "crown",
    "composition": "framed",
    "is_active": true,
    "event_title": "The Wedding Celebration",
    "date": "14 February 2026",
    "time": "7:30 AM",
    "venue": "Leela Palace, Chennai",
    "address": "MRC Nagar, Chennai, Tamil Nadu",
    "rsvp": "+91 80728 54541",
    "message": "Together with their families...",
    "ta_event_title": "திருமண விழா",
    "ta_message": "குடும்பங்களுடன் சேர்ந்து...",
    "pages": ["cover", "invite", "details", "rsvp"],
    "colorways": ["emeraldGold", "sapphireSilver", "burgundyChampagne", "ivoryAntiqueGold"]
  }
]
```

### `GET /api/invitations/{template_id}`
Returns full specification for a single template.
- **Parameters**: `template_id` (integer).

### `GET /api/invitations/{template_id}/variants`
Fetches color palettes and page structure for dynamic multi-page rendering.

---

## 2. Personalisation & Draft Persistence

### `POST /api/customisations`
Saves or updates guest customisation state.
- **Request Body**:
```json
{
  "id": "draft_client_session_102",
  "template_id": 1,
  "language": "bi",
  "colorway_key": "emeraldGold",
  "payload": {
    "host": "Mr. & Mrs. Rajasekar",
    "couple": "Aishwarya & Vikram",
    "venue": "Leela Palace, Chennai"
  }
}
```

### `GET /api/customisations/{draft_id}`
Retrieves draft contents for seamless restoration.

---

## 3. Cart & Commerce

### `POST /api/cart`
Calculates totals, validates quantities, and verifies complimentary delivery.
- **Request Body**:
```json
[
  {
    "template_id": 1,
    "template_name": "Royal Emerald",
    "colorway": "Emerald & Gold",
    "language": "Bilingual",
    "quantity": 100,
    "unit_price": 120.0,
    "personalisation": {}
  }
]
```
- **Response `200 OK`**:
```json
{
  "items": [...],
  "subtotal": 12000.0,
  "delivery_charge": 0.0,
  "total": 12000.0
}
```

---

## 4. Orders & WhatsApp Generation

### `POST /api/orders`
Registers confirmed client orders in the database.
- **Request Body**:
```json
{
  "customer_name": "Aishwarya Menon",
  "mobile": "+91 98401 23456",
  "whatsapp": "+91 98401 23456",
  "email": "aishwarya@example.com",
  "address": "No. 42, Poes Garden",
  "city": "Chennai",
  "state": "Tamil Nadu",
  "pincode": "600086",
  "function_type": "Wedding & Reception",
  "event_date": "14 February 2026",
  "instructions": "Gold foil stamping on cover.",
  "items": [...],
  "total_amount": 12000.0
}
```
- **Response `200 OK`**:
```json
{
  "id": "AUR-B42F9A01",
  "status": "Pending Contact",
  "delivery_charge": 0.0,
  "created_at": "2026-11-11T16:00:00Z"
}
```

### WhatsApp Click-to-Chat Integration
Formatted direct order link:
`https://wa.me/918072854541?text=ENCODED_ORDER_MESSAGE`

---

## 5. Promotional Offers

### `GET /api/offers`
Returns promotional discounts:
```json
[
  {
    "id": 1,
    "code": "GRANDLAUNCH",
    "title": "OUR GRAND LAUNCH CELEBRATION",
    "discount_percent": 50.0,
    "customer_limit": 10,
    "is_active": true,
    "description": "50% OFF FOR THE FIRST 10 CUSTOMERS • COMPLIMENTARY DELIVERY TO YOUR ADDRESS"
  }
]
```

