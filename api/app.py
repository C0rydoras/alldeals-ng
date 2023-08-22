from dataclasses import dataclass
import requests

from fastapi import FastAPI, APIRouter

app = FastAPI()

router = APIRouter(prefix="/api/v1")


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
def hello_world():
    return requests.get("https://deals.gk.wtf/api.php").json()


app.include_router(router)
