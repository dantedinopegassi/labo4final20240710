from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Enum as SqlEnum, UniqueConstraint
from sqlalchemy.orm import relationship
from app.database import Base
from enum import Enum

class DiaSemana(str, Enum):
    lunes = "lunes"
    martes = "martes"
    miercoles = "miercoles"
    jueves = "jueves"
    viernes = "viernes"
    sabado = "sabado"
    domingo = "domingo"

class Carrera(Base):
    __tablename__ = "carreras"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True, unique=True)

class Materia(Base):
    __tablename__ = "materias"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    carrera_id = Column(Integer, ForeignKey("carreras.id"))
    carrera = relationship("Carrera")

class Aula(Base):
    __tablename__ = "aulas"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True, unique=True)

class Asignacion(Base):
    __tablename__ = "asignaciones"
    id = Column(Integer, primary_key=True, index=True)
    materia_id = Column(Integer, ForeignKey("materias.id"))
    aula_id = Column(Integer, ForeignKey("aulas.id"))
    dia_semana = Column(SqlEnum(DiaSemana), index=True)
    hora_inicio = Column(DateTime)
    hora_fin = Column(DateTime)
    materia = relationship("Materia")
    aula = relationship("Aula")
    __table_args__ = (
        UniqueConstraint('aula_id', 'dia_semana', 'hora_inicio', 'hora_fin', name='unique_asignacion'),
    )