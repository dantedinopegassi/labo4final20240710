from typing import List
from fastapi import APIRouter, Depends
from app import crud, schemas
from sqlalchemy.orm import Session
from app.dependencies import get_db


router = APIRouter()

@router.post("/", response_model=schemas.Materia)
def create_materia(materia: schemas.MateriaCreate, db: Session = Depends(get_db)):
    return crud.create_materia(db, materia)

@router.get("/", response_model=List[schemas.Materia])
def read_materias(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud.read_materias(db, skip, limit)