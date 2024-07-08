from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas
from app.deps import get_db

router = APIRouter()

@router.post("/", response_model=schemas.Aula)
def create_aula(aula: schemas.AulaCreate, db: Session = Depends(get_db)):
    return crud.create_aula(db, aula)

@router.get("/", response_model=List[schemas.Aula])
def read_aulas(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud.get_aulas(db, skip, limit)