# DATABASE SCHEMA — AURELIA: THE INVITATION WORLD

## 1. Engine & Configuration
- **Database Engine**: PostgreSQL (Production) / SQLite (Local & Development)
- **ORM**: SQLAlchemy 2.0+
- **Dialect Support**: UTF-8 full Unicode support for Tamil scripts and special characters.

---

## 2. Entity Relational Diagram

```mermaid
erDiagram
    CATEGORIES ||--o{ INVITATION_TEMPLATES : contains
    INVITATION_TEMPLATES ||--o{ CUSTOMISATION_DRAFTS : customises
    ORDERS ||--|{ ORDER_ITEMS : contains

    CATEGORIES {
        string id PK "e.g. wedding, tamil-wedding, seemantham"
        string name "Wedding Collection"
        string tamil_name "திருமண தொகுப்பு"
        text blurb
        text hero
        string route
    }

    INVITATION_TEMPLATES {
        int id PK "1 to 60"
        string slug UK
        string name
        string tamil_name
        string category FK
        float price "Approved range: 5 to 2000 INR"
        string ornament_kind
        string composition
        boolean is_active
        string event_title
        string date
        string time
        string venue
        string address
        string rsvp
        text message
        string ta_event_title
        text ta_message
        json pages
        json colorways
    }

    CUSTOMISATION_DRAFTS {
        string id PK "Draft UUID"
        int template_id FK
        string language "en | ta | bi"
        string colorway_key
        json payload "Personalisation fields"
        datetime updated_at
    }

    ORDERS {
        string id PK "e.g. AUR-2026-001"
        string customer_name
        string mobile
        string whatsapp
        string email
        text address
        string city
        string state
        string pincode
        string function_type
        string event_date
        text instructions
        json items "Array of ordered stationery with customisation"
        float total_amount
        float delivery_charge "0.00 (Always complimentary)"
        string status "Pending Contact | Proof Approved | In Production | Dispatched | Delivered"
        datetime created_at
    }

    OFFERS {
        int id PK
        string code UK
        string title "OUR GRAND LAUNCH CELEBRATION"
        float discount_percent "50.0"
        int customer_limit "10"
        boolean is_active
        text description
    }
```

---

## 3. Data Integrity & Constraints
1. **Pricing Rule**: Unit price must strictly reside between ₹5 and ₹2,000 INR.
2. **Delivery Fee Invariance**: `delivery_charge` default is fixed at `0.00` INR (Free Delivery Guarantee).
3. **Multilingual Consistency**: Content records store paired English and Unicode Tamil text fields (`ta_event_title`, `ta_message`, `ta_host`, `ta_couple`).
4. **Privacy Protection**: Client mobile numbers, addresses, and personal details are segregated behind authorized administrator endpoints.

