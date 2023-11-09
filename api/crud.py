from sqlalchemy.orm import Session

from . import models, schemas


# Getting all sites
def get_sites(db: Session):
    return db.query(models.Site).all()


# Getting all categories
def get_categories(db: Session, site: str):
    return db.query(models.Category).filter(models.Category.site == site).all()


# Getting deals per date
def get_deals_by_date(db: Session, date: str):
    return db.query(models.Deal).filter(models.Deal.date == date).all()


# Getting a deal by date, site and category
def get_deal(db: Session, date: str, site: str, category: str):
    return (
        db.query(models.Deal)
        .filter(
            models.Deal.date == date,
            models.Deal.site == site,
            models.Deal.category == category,
        )
        .last()
    )


# Getting current availability
def get_availabilities(db: Session, deal: schemas.Deal):
    return (
        db.query(models.Availability)
        .filter(models.Availability.deal_id == deal.id)
        .all()
    )


# Getting current availability
def get_current_availability(db: Session, deal: schemas.Deal):
    return (
        db.query(models.Availability)
        .filter(models.Availability.deal_id == deal.id)
        .last()
    )


# Adding a site
def add_site(db: Session, site: schemas.Site):
    db_site = models.Site(**site.dict())
    db.add(db_site)
    db.commit()
    db.refresh(db_site)
    return db_site


# Adding a category
def add_category(db: Session, category: schemas.Category):
    db_category = models.Category(**category.dict())
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category


# Adding a deal
def add_deal(db: Session, deal: schemas.Deal):
    db_deal = models.Deal(
        **deal.dict(),
    )
    db.add(db_deal)
    db.commit()
    db.refresh(db_deal)
    return db_deal


# Adding an availability (scrape run)
def add_availability(db: Session, availability: schemas.Availability):
    db_availability = models.Availability(
        **availability.dict(),
    )
    db.add(db_availability)
    db.commit()
    db.refresh(db_availability)
    return db_availability
