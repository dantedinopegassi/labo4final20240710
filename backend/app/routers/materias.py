from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas
from app.deps import get_db

router = APIRouter()


@router.post("/", response_model=schemas.Materia)
def create_materia(materia: schemas.MateriaCreate, db: Session = Depends(get_db)):
    return crud.create_materia(db, materia)


@router.get("/", response_model=List[schemas.Materia])
def read_materias(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud.get_materias(db, skip, limit)


@router.get("/{materia_id}")
def read_materia(materia_id: int, db: Session = Depends(get_db)):
    db_materia = crud.get_materia(db, materia_id)
    if db_materia is None:
        raise HTTPException(status_code=404, detail="Materia no encontrada")
    return db_materia


@router.put("/materias/{materia_id}", response_model=schemas.Materia)
def update_materia(
    materia_id: int, materia: schemas.MateriaCreate, db: Session = Depends(get_db)
):
    db_materia = crud.update_materia(db, materia_id, materia)
    if db_materia is None:
        raise HTTPException(status_code=404, detail="Materia no encontrada")
    return db_materia


@router.delete("/materias/{materia_id}")
def delete_materia(materia_id: int, db: Session = Depends(get_db)):
    db_materia = crud.delete_materia(db, materia_id)
    if db_materia is None:
        raise HTTPException(status_code=404, detail="Materia no encontrada")
    return db_materia