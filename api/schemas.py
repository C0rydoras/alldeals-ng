from pydantic import BaseModel


# Availabilities
class AvailabilityBase(BaseModel):
    timestamp: str
    deal_id: int
    percentage: float


class AvailabilityCreate(AvailabilityBase):
    pass


class Availability(AvailabilityBase):
    id: int

    class Config:
        orm_mode = True


# Sites
class SiteBase(BaseModel):
    name: str
    color: str


class SiteCreate(SiteBase):
    pass


class Site(SiteBase):
    class Config:
        orm_mode = True


# Deals
class DealBase(BaseModel):
    site: str
    category: str
    date: str
    title: str
    subtitle: str
    image: str
    new_price: float
    old_price: float | None


class DealCreate(DealBase):
    pass


class Deal(DealBase):
    id: int
    availabilities: list[Availability] = []

    class Config:
        orm_mode = True


# Categories
class CategoryBase(BaseModel):
    name: str
    site: str
    url: str


class CategoryCreate(CategoryBase):
    pass


class Category(CategoryBase):
    class Config:
        orm_mode = True

