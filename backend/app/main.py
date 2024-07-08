from fastapi import FastAPI
from app.routers import carreras, materias, aulas, asignaciones
from app.database import engine
from app import models

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(carreras.router, prefix="/carreras", tags=["carreras"])
app.include_router(materias.router, prefix="/materias", tags=["materias"])
app.include_router(aulas.router, prefix="/aulas", tags=["aulas"])
app.include_router(asignaciones.router, prefix="/asignaciones", tags=["asignaciones"])