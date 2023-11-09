import requests
from typing import List
from fastapi import Depends, FastAPI, APIRouter
from sqlalchemy.orm import Session

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

router = APIRouter(prefix="/api/v1")


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/sites", response_model=List[schemas.Sites])
def get_sites(db: Session = Depends(get_db)):
    return crud.get_sites(db)


@router.get("/deals")
def hello_world():
    return requests.get("https://deals.gk.wtf/api.php").json()


app.include_router(router)
