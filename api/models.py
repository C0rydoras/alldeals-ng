from sqlalchemy import Column, ForeignKey, Integer, String, Date, Float, DateTime
from sqlalchemy.orm import relationship

from .database import Base


class Site(Base):
    __tablename__ = "sites"
    name = Column(String, primary_key=True, index=True)
    color = Column(String, index=True)


class Category(Base):
    __tablename__ = "categories"
    name = Column(String, primary_key=True, index=True)
    site = Column(String, ForeignKey("sites.name"), index=True)
    url = Column(String, index=True)


class Deal(Base):
    __tablename__ = "deals"
    # Metadata
    id = Column(Integer, primary_key=True, index=True)
    site = Column(String, ForeignKey("sites.name"), index=True)
    category = Column(String, ForeignKey("categories.name"), index=True)
    date = Column(Date, index=True)
    # Deal information
    title = Column(String, index=True)
    subtitle = Column(String, index=True)
    image = Column(String, index=True)
    new_price = Column(Integer, index=True)
    old_price = Column(Integer, index=True)
    # Attributes
    availabilities = relationship("Availability", back_populates="deal")


class Availability(Base):
    __tablename__ = "availabilities"
    # Metadata
    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, index=True)
    # Deal information
    deal_id = Column(Integer, ForeignKey("deals.id"), index=True)
    percentage = Column(Float, index=True)
    # Attributes
    deal = relationship("Deal", back_populates="availabilities")
