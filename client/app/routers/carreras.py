from typing import List
from fastapi import APIRouter, Depends
from app import crud, schemas
from sqlalchemy.orm import Session
from app.dependencies import get_db


router = APIRouter()

@router.post("/", response_model=schemas.Carrera)
def create_carrera(carrera: schemas.CarreraCreate, db: Session = Depends(get_db)):
    return crud.create_carrera(db, carrera)

@router.get("/", response_model=List[schemas.Carrera])
def read_carreras(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud.read_carreras(db, skip, limit)