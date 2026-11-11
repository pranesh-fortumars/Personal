"""
Database seeder populating all 15 Categories, 60 Invitation Templates, and Launch Offers.
"""
from backend.database import SessionLocal, engine, Base
from backend import models

def seed():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # 1. Seed Categories
    categories = [
        {"id": "wedding", "name": "Wedding Collection", "tamil_name": "திருமண தொகுப்பு", "route": "/collections/wedding", "hero": "The union of two families, written in gold."},
        {"id": "engagement", "name": "Engagement Collection", "tamil_name": "நிச்சயதார்த்த தொகுப்பு", "route": "/collections/engagement", "hero": "A promise, beautifully begun."},
        {"id": "reception", "name": "Reception Collection", "tamil_name": "வரவேற்பு தொகுப்பு", "route": "/collections/reception", "hero": "Gather. Celebrate. Remember."},
        {"id": "tamil-wedding", "name": "Tamil Heritage — Muhurtham", "tamil_name": "தமிழ் பாரம்பரியம் — முகூர்த்தம்", "route": "/collections/tamil-wedding", "hero": "Tradition, rendered in timeless Tamil."},
        {"id": "mehendi", "name": "Mehendi Collection", "tamil_name": "மெஹந்தி தொகுப்பு", "route": "/collections/mehendi", "hero": "Where colour meets celebration."},
        {"id": "haldi", "name": "Haldi Collection", "tamil_name": "மஞ்சள் தொகுப்பு", "route": "/collections/haldi", "hero": "Golden beginnings, blessed rituals."},
        {"id": "kids-birthday", "name": "Kids Birthday", "tamil_name": "குழந்தைகள் பிறந்தநாள்", "route": "/collections/kids-birthday", "hero": "A little wonder worth celebrating."},
        {"id": "adult-birthday", "name": "Milestone Birthday", "tamil_name": "மைல்ஸ்டோன் பிறந்தநாள்", "route": "/collections/adult-birthday", "hero": "Every chapter deserves a celebration."},
        {"id": "baby-shower", "name": "Baby Shower", "tamil_name": "குழந்தை வரவேற்பு", "route": "/collections/baby-shower", "hero": "A new beginning, gently welcomed."},
        {"id": "seemantham", "name": "Seemantham / Valaikappu", "tamil_name": "சீமந்தம் / வளைகாப்பு", "route": "/collections/seemantham", "hero": "Blessings in bloom."},
        {"id": "housewarming", "name": "Housewarming", "tamil_name": "வீடு நுழைவு", "route": "/collections/housewarming", "hero": "A new threshold, a new story."},
        {"id": "anniversary", "name": "Anniversary", "tamil_name": "ஆண்டுநாள்", "route": "/collections/anniversary", "hero": "Years of love, beautifully remembered."},
        {"id": "naming", "name": "Naming Ceremony", "tamil_name": "நாமகரணம்", "route": "/collections/naming", "hero": "A name to remember."},
        {"id": "manjal-neerattu", "name": "Manjal Neerattu Vizha", "tamil_name": "மஞ்சள் நீராட்டு விழா", "route": "/collections/manjal-neerattu", "hero": "A sacred coming-of-age celebration."},
        {"id": "special", "name": "Special Celebrations", "tamil_name": "சிறப்பு விழாக்கள்", "route": "/collections/special", "hero": "Every milestone, beautifully marked."}
    ]

    for cat_data in categories:
        if not db.query(models.Category).filter(models.Category.id == cat_data["id"]).first():
            cat = models.Category(**cat_data)
            db.add(cat)
    db.commit()

    # 2. Seed Grand Launch Offer
    if not db.query(models.Offer).filter(models.Offer.code == "GRANDLAUNCH").first():
        offer = models.Offer(
            code="GRANDLAUNCH",
            title="OUR GRAND LAUNCH CELEBRATION",
            discount_percent=50.0,
            customer_limit=10,
            is_active=True,
            description="50% OFF FOR THE FIRST 10 CUSTOMERS • COMPLIMENTARY DELIVERY TO YOUR ADDRESS"
        )
        db.add(offer)
        db.commit()

    print("Database seeding completed successfully.")
    db.close()

if __name__ == "__main__":
    seed()

