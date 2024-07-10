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


@router.get("/{aula_id}")
def read_aula(aula_id: int, db: Session = Depends(get_db)):
    db_aula = crud.get_aula(db, aula_id)
    if db_aula is None:
        raise HTTPException(status_code=404, detail="Aula no encontrada")
    return db_aula


@router.put("/aulas/{aula_id}", response_model=schemas.Aula)
def update_aula(
    aula_id: int, aula: schemas.AulaCreate, db: Session = Depends(get_db)
):
    db_aula = crud.update_aula(db, aula_id, aula)
    if db_aula is None:
        raise HTTPException(status_code=404, detail="Aula no encontrada")
    return db_aula


@router.delete("/aulas/{aula_id}")
def delete_aula(aula_id: int, db: Session = Depends(get_db)):
    db_aula = crud.delete_aula(db, aula_id)
    if db_aula is None:
        raise HTTPException(status_code=404, detail="Aula no encontrada")
    return db_aula
