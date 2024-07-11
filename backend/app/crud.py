from sqlalchemy.orm import Session
import app.models as models, app.schemas as schemas



#/********************************************************************|
#| 1. CRUD para carreras                                              |
#|********************************************************************/

def create_carrera(db: Session, carrera: schemas.CarreraCreate):
    db_carrera = models.Carrera(**carrera.dict())
    db.add(db_carrera)
    db.commit()
    db.refresh(db_carrera)
    return db_carrera

def get_carreras(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Carrera).offset(skip).limit(limit).all()

def get_carrera(db: Session, carrera_id: int):
    db_carrera = db.query(models.Carrera).filter(models.Carrera.id == carrera_id).first()
    return db_carrera

def update_carrera(db: Session, carrera_id: int, carrera: schemas.CarreraCreate):
    db_carrera = db.query(models.Carrera).filter(models.Carrera.id == carrera_id).first()
    if not db_carrera:
        return None
    for key, value in carrera.dict().items():
        setattr(db_carrera, key, value)
    db.commit()
    db.refresh(db_carrera)
    return db_carrera

def delete_carrera(db: Session, carrera_id: int):
    db_carrera = db.query(models.Carrera).filter(models.Carrera.id == carrera_id).first()
    if not db_carrera:
        return None
    db.delete(db_carrera)
    db.commit()
    return {"detail": "Carrera borrada"}



#/********************************************************************|
#| 2. CRUD para materias                                              |
#|********************************************************************/

def create_materia(db: Session, materia: schemas.MateriaCreate):
    db_materia = models.Materia(**materia.dict())
    db.add(db_materia)
    db.commit()
    db.refresh(db_materia)
    return db_materia

def get_materias(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Materia).offset(skip).limit(limit).all()

def get_materia(db: Session, materia_id: int):
    db_materia = db.query(models.Materia).filter(models.Materia.id == materia_id).first()
    return db_materia

def update_materia(db: Session, materia_id: int, materia: schemas.MateriaCreate):
    db_materia = db.query(models.Materia).filter(models.Materia.id == materia_id).first()
    if not db_materia:
        return None
    for key, value in materia.dict().items():
        setattr(db_materia, key, value)
    db.commit()
    db.refresh(db_materia)
    return db_materia

def delete_materia(db: Session, materia_id: int):
    db_materia = db.query(models.Materia).filter(models.Materia.id == materia_id).first()
    if not db_materia:
        return None
    db.delete(db_materia)
    db.commit()
    return {"detail": "Materia borrada"}



#/********************************************************************|
#| 3. CRUD para aulas                                                 |
#|********************************************************************/

def create_aula(db: Session, aula: schemas.AulaCreate):
    db_aula = models.Aula(**aula.dict())
    db.add(db_aula)
    db.commit()
    db.refresh(db_aula)
    return db_aula

def get_aulas(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Aula).offset(skip).limit(limit).all()

def get_aula(db: Session, aula_id: int):
    db_aula = db.query(models.Aula).filter(models.Aula.id == aula_id).first()
    return db_aula

def update_aula(db: Session, aula_id: int, aula: schemas.AulaCreate):
    db_aula = db.query(models.Aula).filter(models.Aula.id == aula_id).first()
    if not db_aula:
        return None
    for key, value in aula.dict().items():
        setattr(db_aula, key, value)
    db.commit()
    db.refresh(db_aula)
    return db_aula

def delete_aula(db: Session, aula_id: int):
    db_aula = db.query(models.Aula).filter(models.Aula.id == aula_id).first()
    if not db_aula:
        return None
    db.delete(db_aula)
    db.commit()
    return {"detail": "Aula borrada"}



#/********************************************************************|
#| 4. CRUD para asignaciones                                          |
#|********************************************************************/

def create_asignacion(db: Session, asignacion: schemas.AsignacionCreate):
    conflicts = db.query(models.Asignacion).filter(
        models.Asignacion.aula_id == asignacion.aula_id,
        models.Asignacion.dia_semana == asignacion.dia_semana,
        models.Asignacion.hora_inicio < asignacion.hora_fin,
        models.Asignacion.hora_fin > asignacion.hora_inicio
    ).all()

    if conflicts:
        return None

    db_asignacion = models.Asignacion(**asignacion.dict())
    db.add(db_asignacion)
    db.commit()
    db.refresh(db_asignacion)
    return db_asignacion

def get_asignaciones(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Asignacion).offset(skip).limit(limit).all()

def get_asignacion(db: Session, asignacion_id: int):
    db_asignacion = db.query(models.Asignacion).filter(models.Asignacion.id == asignacion_id).first()
    return db_asignacion

def update_asignacion(db: Session, asignacion_id: int, asignacion: schemas.AsignacionCreate):
    db_asignacion = db.query(models.Asignacion).filter(models.Asignacion.id == asignacion_id).first()
    if not db_asignacion:
        return None
    for key, value in asignacion.dict().items():
        setattr(db_asignacion, key, value)
    db.commit()
    db.refresh(db_asignacion)
    return db_asignacion

def delete_asignacion(db: Session, asignacion_id: int):
    db_asignacion = db.query(models.Asignacion).filter(models.Asignacion.id == asignacion_id).first()
    if not db_asignacion:
        return None
    db.delete(db_asignacion)
    db.commit()
    return {"detail": "Asignacion borrada"}

def get_asignaciones_by_materia(db: Session, nombre_materia: str):
    materia = db.query(models.Materia).filter(models.Materia.nombre == nombre_materia).first()
    if not materia:
        return None
    return db.query(models.Asignacion).filter(models.Asignacion.materia_id == materia.id).all()