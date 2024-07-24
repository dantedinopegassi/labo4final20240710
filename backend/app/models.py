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
    nombre = Column(String, index=True, unique=True, nullable=False)
    materias = relationship("Materia", back_populates="carrera")

class Materia(Base):
    __tablename__ = "materias"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True, nullable=False)
    carrera_id = Column(Integer, ForeignKey("carreras.id"), nullable=False )
    carrera = relationship("Carrera", back_populates="materias")
    asignaciones_materia = relationship("Asignacion", back_populates="materia")
    __table_args__ = (
        UniqueConstraint('nombre', 'carrera_id', name='unique_materia'),
    )

class Aula(Base):
    __tablename__ = "aulas"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True, unique=True, nullable=False)
    asignaciones_aula = relationship("Asignacion", back_populates="aula", cascade="all, delete")

class Asignacion(Base):
    __tablename__ = "asignaciones"
    id = Column(Integer, primary_key=True, index=True)
    materia_id = Column(Integer, ForeignKey("materias.id"), nullable=False)
    aula_id = Column(Integer, ForeignKey("aulas.id", ondelete="CASCADE"), nullable=False)
    dia_semana = Column(SqlEnum(DiaSemana), index=True, nullable=False)
    hora_inicio = Column(DateTime, nullable=False)
    hora_fin = Column(DateTime, nullable=False)
    materia = relationship("Materia", back_populates="asignaciones_materia")
    aula = relationship("Aula", back_populates="asignaciones_aula")
    __table_args__ = (
        UniqueConstraint('aula_id', 'dia_semana', 'hora_inicio', 'hora_fin', name='unique_asignacion'),
    )