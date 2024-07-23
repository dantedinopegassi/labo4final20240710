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
    materias = relationship("Materia", back_populates="carrera")

class Materia(Base):
    __tablename__ = "materias"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    carrera_id = Column(Integer, ForeignKey("carreras.id"))
    carrera = relationship("Carrera", back_populates="materias")
    asignaciones_materia = relationship("Asignacion", back_populates="materia")
    __table_args__ = (
        UniqueConstraint('nombre', 'carrera_id', name='unique_materia'),
    )

class Aula(Base):
    __tablename__ = "aulas"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True, unique=True)
    asignaciones_aula = relationship("Asignacion", back_populates="aula")

class Asignacion(Base):
    __tablename__ = "asignaciones"
    id = Column(Integer, primary_key=True, index=True)
    materia_id = Column(Integer, ForeignKey("materias.id"))
    aula_id = Column(Integer, ForeignKey("aulas.id"))
    dia_semana = Column(SqlEnum(DiaSemana), index=True)
    hora_inicio = Column(DateTime)
    hora_fin = Column(DateTime)
    materia = relationship("Materia", back_populates="asignaciones_materia")
    aula = relationship("Aula", back_populates="asignaciones_aula")
    __table_args__ = (
        UniqueConstraint('aula_id', 'dia_semana', 'hora_inicio', 'hora_fin', name='unique_asignacion'),
    )