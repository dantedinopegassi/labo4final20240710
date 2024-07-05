from sqlalchemy.orm import Session
import app.models as models, app.schemas as schemas


# CRUD carreras
def create_carrera(db: Session, carrera: schemas.CarreraCreate):
    db_carrera = models.Carrera(**carrera.dict())
    db.add(db_carrera)
    db.commit()
    db.refresh(db_carrera)
    return db_carrera

def read_carreras(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Carrera).offset(skip).limit(limit).all()


# CRUD materias
def create_materia(db: Session, materia: schemas.MateriaCreate):
    db_materia = models.Materia(**materia.dict())
    db.add(db_materia)
    db.commit()
    db.refresh(db_materia)
    return db_materia

def read_materias(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Materia).offset(skip).limit(limit).all()


# CRUD aulas
def create_aula(db: Session, aula: schemas.AulaCreate):
    db_aula = models.Aula(**aula.dict())
    db.add(db_aula)
    db.commit()
    db.refresh(db_aula)
    return db_aula

def read_aulas(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Aula).offset(skip).limit(limit).all()


# CRUD asignaciones
def create_asignacion(db: Session, asignacion: schemas.AsignacionCreate):
    db_asignacion = models.Asignacion(**asignacion.dict())
    db.add(db_asignacion)
    db.commit()
    db.refresh(db_asignacion)
    return db_asignacion

def read_asignaciones(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Asignacion).offset(skip).limit(limit).all()


# CRUD asignaciones by materia
def read_asignaciones_by_materia(db: Session, nombre_materia: str):
    materia = db.query(models.Materia).filter(models.Materia.nombre == nombre_materia).first()
    if not materia:
        return None
    return db.query(models.Asignacion).filter(models.Asignacion.materia_id == materia.id).all()