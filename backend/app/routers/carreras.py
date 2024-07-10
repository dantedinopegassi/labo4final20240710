from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas
from app.deps import get_db

router = APIRouter()


@router.post("/", response_model=schemas.Carrera)
def create_carrera(carrera: schemas.CarreraCreate, db: Session = Depends(get_db)):
    return crud.create_carrera(db, carrera)


@router.get("/", response_model=List[schemas.Carrera])
def read_carreras(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud.get_carreras(db, skip, limit)


@router.get("/{carrera_id}")
def read_carrera(carrera_id: int, db: Session = Depends(get_db)):
    db_carrera = crud.get_carrera(db, carrera_id)
    if db_carrera is None:
        raise HTTPException(status_code=404, detail="Carrera no encontrada")
    return db_carrera


@router.put("/carreras/{carrera_id}", response_model=schemas.Carrera)
def update_carrera(
    carrera_id: int, carrera: schemas.CarreraCreate, db: Session = Depends(get_db)
):
    db_carrera = crud.update_carrera(db, carrera_id, carrera)
    if db_carrera is None:
        raise HTTPException(status_code=404, detail="Carrera no encontrada")
    return db_carrera


@router.delete("/carreras/{carrera_id}")
def delete_carrera(carrera_id: int, db: Session = Depends(get_db)):
    db_carrera = crud.delete_carrera(db, carrera_id)
    if db_carrera is None:
        raise HTTPException(status_code=404, detail="Carrera no encontrada")
    return db_carrera
