from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import exc
from sqlalchemy.orm import Session
from app import crud, schemas
from app.deps import get_db

router = APIRouter()

@router.post("/", response_model=schemas.Asignacion)
def create_asignacion(asignacion: schemas.AsignacionCreate, db: Session = Depends(get_db)):
    try:
        new_asignacion = crud.create_asignacion(db, asignacion)
        if new_asignacion is None:
            raise HTTPException(status_code=404, detail="Conflicto de horarios")
        return new_asignacion
    except exc.IntegrityError as e:
        raise HTTPException(status_code=400, detail="Error de ID de aula o materia no valida")


@router.get("/", response_model=List[schemas.Asignacion])
def read_asignaciones(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud.get_asignaciones(db, skip, limit)


@router.get("/{asignacion_id}", response_model=schemas.Asignacion)
def read_asignacion(asignacion_id: int, db: Session = Depends(get_db)):
    db_asignacion = crud.get_asignacion(db, asignacion_id)
    if db_asignacion is None:
        raise HTTPException(status_code=404, detail="Asignacion no encontrada")
    return db_asignacion


@router.put("/{asignacion_id}", response_model=schemas.Asignacion)
def update_asignacion(
    asignacion_id: int, asignacion: schemas.AsignacionCreate, db: Session = Depends(get_db)
):
    try:
        db_asignacion = crud.update_asignacion(db, asignacion_id, asignacion)
        print(db_asignacion)
        if db_asignacion is None:
            raise HTTPException(status_code=404, detail="Asignacion no encontrada")
        return db_asignacion
    except exc.IntegrityError as e:
        raise HTTPException(status_code=400, detail="Error de ID de aula o materia no valida")


@router.delete("/{asignacion_id}")
def delete_asignacion(asignacion_id: int, db: Session = Depends(get_db)):
    db_asignacion = crud.delete_asignacion(db, asignacion_id)
    if db_asignacion is None:
        raise HTTPException(status_code=404, detail="Asignacion no encontrada")
    return db_asignacion


@router.get("/materia/{materia_id}", response_model=List[schemas.Asignacion])
def read_asignaciones_by_materia(materia_id: int, db: Session = Depends(get_db)):
    db_asignacion = crud.get_asignaciones_by_materia(db, materia_id)
    if db_asignacion is None:
        raise HTTPException(status_code=404, detail="Asignacion no encontrada")
    return db_asignacion