from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas
from app.deps import get_db

router = APIRouter()

@router.post("/", response_model=schemas.Carrera)
def create_carrera(carrera: schemas.CarreraCreate, db: Session = Depends(get_db)):
    return crud.create_carrera(db=db, carrera=carrera)

@router.get("/", response_model=List[schemas.Carrera])
def read_carreras(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud.get_carreras(db, skip, limit)

@router.get("/{carrera_id}", response_model=schemas.Carrera)
def read_carrera(carrera_id: int, db: Session = Depends(get_db)):
    db_carrera = crud.get_carrera(db, carrera_id=carrera_id)
    if db_carrera is None:
        raise HTTPException(status_code=404, detail="Carrera not found")
    return db_carrera