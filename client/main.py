from typing import List
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models, schemas

# Crear las tablas de la base de datos
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependencia para obtener una sesión de base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Endpoints para carreras
@app.post("/carreras/", response_model=schemas.Carrera)
def create_carrera(carrera: schemas.CarreraCreate, db: Session = Depends(get_db)):
    db_carrera = models.Carrera(**carrera.dict())
    db.add(db_carrera)
    db.commit()
    db.refresh(db_carrera)
    return db_carrera

@app.get("/carreras/", response_model=List[schemas.Carrera])
def read_carreras(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(models.Carrera).offset(skip).limit(limit).all()

# Endpoints para materias
@app.post("/materias/", response_model=schemas.Materia)
def create_materia(materia: schemas.MateriaCreate, db: Session = Depends(get_db)):
    db_materia = models.Materia(**materia.dict())
    db.add(db_materia)
    db.commit()
    db.refresh(db_materia)
    return db_materia

@app.get("/materias/", response_model=List[schemas.Materia])
def read_materias(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(models.Materia).offset(skip).limit(limit).all()

# Endpoints para aulas
@app.post("/aulas/", response_model=schemas.Aula)
def create_aula(aula: schemas.AulaCreate, db: Session = Depends(get_db)):
    db_aula = models.Aula(**aula.dict())
    db.add(db_aula)
    db.commit()
    db.refresh(db_aula)
    return db_aula

@app.get("/aulas/", response_model=List[schemas.Aula])
def read_aulas(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(models.Aula).offset(skip).limit(limit).all()

# Endpoints para asignaciones
@app.post("/asignaciones/", response_model=schemas.Asignacion)
def create_asignacion(asignacion: schemas.AsignacionCreate, db: Session = Depends(get_db)):
    db_asignacion = models.Asignacion(**asignacion.dict())
    db.add(db_asignacion)
    db.commit()
    db.refresh(db_asignacion)
    return db_asignacion

@app.get("/asignaciones/", response_model=List[schemas.Asignacion])
def read_asignaciones(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return db.query(models.Asignacion).offset(skip).limit(limit).all()

# Endpoint para consultar asignaciones por nombre de materia
@app.get("/consulta/materias/{nombre}", response_model=List[schemas.Asignacion])
def consulta_materias(nombre: str, db: Session = Depends(get_db)):
    materia = db.query(models.Materia).filter(models.Materia.nombre == nombre).first()
    if not materia:
        raise HTTPException(status_code=404, detail="Materia no encontrada")
    return db.query(models.Asignacion).filter(models.Asignacion.materia_id == materia.id).all()
