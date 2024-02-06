from dataclasses import dataclass
import requests
import json
from fastapi import FastAPI, APIRouter
from fastapi_utils.tasks import repeat_every
from scraper import scrape

app = FastAPI()

router = APIRouter(prefix="/api/v1")
deals = None

@dataclass
class Deal:
    shop: str
    title: str
    subtitle: str
    price: float
    old_price: float
    remaining: int
    image: str
    link: str
    date: str


@router.get("/deals")
def get_deals():
    return deals

@app.on_event("startup")
@repeat_every(seconds=60*10)
def update_deals():
    global deals
    deals = scrape()
    
app.include_router(router)
