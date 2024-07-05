from typing import List
from fastapi import APIRouter, Depends, HTTPException
from app import crud, schemas
from sqlalchemy.orm import Session
from app.dependencies import get_db


router = APIRouter()

@router.post("/", response_model=schemas.Asignacion)
def create_asignacion(asignacion: schemas.AsignacionCreate, db: Session = Depends(get_db)):
    return crud.create_asignacion(db, asignacion)

@router.get("/", response_model=List[schemas.Asignacion])
def read_asignaciones(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud.read_asignaciones(db, skip, limit)

@router.get("/consulta/{nombre_materia}", response_model=List[schemas.Asignacion])
def consulta_asignaciones(nombre_materia: str, db: Session = Depends(get_db)):
    asignaciones = crud.read_asignaciones_by_materia(db, nombre_materia)
    if asignaciones is None:
        raise HTTPException(status_code=404, detail="Materia no encontrada")
    return asignaciones