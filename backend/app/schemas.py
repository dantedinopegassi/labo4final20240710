from pydantic import BaseModel
from datetime import datetime
from app.models import DiaSemana

class CarreraBase(BaseModel):
    nombre: str

class CarreraCreate(CarreraBase):
    pass

class Carrera(CarreraBase):
    id: int

    class Config:
        orm_mode = True

class MateriaBase(BaseModel):
    nombre: str
    carrera_id: int

class MateriaCreate(MateriaBase):
    pass

class Materia(MateriaBase):
    id: int
    carrera: Carrera

    class Config:
        orm_mode = True

class AulaBase(BaseModel):
    nombre: str

class AulaCreate(AulaBase):
    pass

class Aula(AulaBase):
    id: int

    class Config:
        orm_mode = True

class AsignacionBase(BaseModel):
    materia_id: int
    aula_id: int
    dia_semana: DiaSemana
    hora_inicio: datetime
    hora_fin: datetime


class AsignacionCreate(AsignacionBase):
    pass

class Asignacion(AsignacionBase):
    id: int
    materia: Materia
    aula: Aula

    class Config:
        orm_mode = True