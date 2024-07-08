# labo4final20240710

To set up your backend using FastAPI with SQLAlchemy and PostgreSQL, you'll need to install several dependencies. Here’s a list of the required dependencies and the steps to install them:

### Dependencies

1. **FastAPI**: The web framework for building APIs.
2. **Uvicorn**: ASGI server for running FastAPI applications.
3. **SQLAlchemy**: ORM for interacting with the PostgreSQL database.
4. **Psycopg2-binary**: PostgreSQL database adapter for Python.
5. **Pydantic**: Data validation and settings management using Python type annotations.
6. **Python-dotenv**: To load environment variables from a `.env` file.
7. **Alembic**: Database migrations tool for SQLAlchemy.

### Setting Up Your Project

1. **Create and Activate Virtual Environment**:

   ```sh
   python -m venv env
   source env/bin/activate  # On Windows: .\env\Scripts\activate
   ```

2. **Install Dependencies**:

   ```sh
   pip install fastapi uvicorn sqlalchemy psycopg2-binary pydantic python-dotenv alembic
   ```

3. **Create a `requirements.txt`**:

   After installing the dependencies, freeze the installed packages to a `requirements.txt` file:

   ```sh
   pip freeze > requirements.txt
   ```

### Project Structure

Here is a recommended project structure:

```
.
├── app
│   ├── __init__.py
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── crud.py
│   ├── database.py
│   ├── deps.py
│   ├── routers
│   │   ├── __init__.py
│   │   ├── carreras.py
│   │   ├── materias.py
│   │   ├── aulas.py
│   │   └── asignaciones.py
├── .env
├── requirements.txt
└── alembic
    ├── README
    ├── alembic.ini
    ├── env.py
    ├── script.py.mako
    └── versions
        └── (migrations scripts)
```

### Example Code

1. **`.env` File**:

   Create a `.env` file to store your database connection URL:

   ```
   DATABASE_URL=postgresql://username:password@localhost:5432/database_name
   ```

2. **`database.py`**:

   Set up the database connection and session:

   ```python
   # app/database.py

   from sqlalchemy import create_engine
   from sqlalchemy.ext.declarative import declarative_base
   from sqlalchemy.orm import sessionmaker
   from dotenv import load_dotenv
   import os

   load_dotenv()

   DATABASE_URL = os.getenv("DATABASE_URL")

   engine = create_engine(DATABASE_URL)
   SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
   Base = declarative_base()
   ```

3. **`models.py`**:

   Define your database models:

   ```python
   # app/models.py

   from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
   from sqlalchemy.orm import relationship
   from app.database import Base

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
       dia = Column(String, index=True)
       hora_inicio = Column(DateTime)
       hora_fin = Column(DateTime)
       materia = relationship("Materia")
       aula = relationship("Aula")
   ```

4. **`schemas.py`**:

   Define Pydantic models for request and response validation:

   ```python
   # app/schemas.py

   from pydantic import BaseModel
   from typing import List, Optional

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
       dia: str
       hora_inicio: str
       hora_fin: str

   class AsignacionCreate(AsignacionBase):
       pass

   class Asignacion(AsignacionBase):
       id: int

       class Config:
           orm_mode = True
   ```

5. **`crud.py`**:

   Implement CRUD operations:

   ```python
   # app/crud.py

   from sqlalchemy.orm import Session
   from app import models, schemas

   def create_carrera(db: Session, carrera: schemas.CarreraCreate):
       db_carrera = models.Carrera(nombre=carrera.nombre)
       db.add(db_carrera)
       db.commit()
       db.refresh(db_carrera)
       return db_carrera

   def get_carrera(db: Session, carrera_id: int):
       return db.query(models.Carrera).filter(models.Carrera.id == carrera_id).first()

   def get_carreras(db: Session, skip: int = 0, limit: int = 10):
       return db.query(models.Carrera).offset(skip).limit(limit).all()

   # Similar CRUD functions for Materia, Aula, Asignacion...
   ```

6. **`main.py`**:

   Set up FastAPI and include routers:

   ```python
   # app/main.py

   from fastapi import FastAPI
   from app.routers import carreras, materias, aulas, asignaciones

   app = FastAPI()

   app.include_router(carreras.router, prefix="/carreras", tags=["carreras"])
   app.include_router(materias.router, prefix="/materias", tags=["materias"])
   app.include_router(aulas.router, prefix="/aulas", tags=["aulas"])
   app.include_router(asignaciones.router, prefix="/asignaciones", tags=["asignaciones"])
   ```

7. **Routers (`routers` directory)**:

   Create routers for different endpoints, for example, `carreras.py`:

   ```python
   # app/routers/carreras.py

   from fastapi import APIRouter, Depends, HTTPException
   from sqlalchemy.orm import Session
   from app import crud, schemas, models
   from app.database import SessionLocal, engine

   router = APIRouter()

   @router.post("/", response_model=schemas.Carrera)
   def create_carrera(carrera: schemas.CarreraCreate, db: Session = Depends(get_db)):
       return crud.create_carrera(db=db, carrera=carrera)

   @router.get("/{carrera_id}", response_model=schemas.Carrera)
   def read_carrera(carrera_id: int, db: Session = Depends(get_db)):
       db_carrera = crud.get_carrera(db, carrera_id=carrera_id)
       if db_carrera is None:
           raise HTTPException(status_code=404, detail="Carrera not found")
       return db_carrera

   # Add more endpoints as needed
   ```

8. **`__init__.py`**:

   Ensure that the `__init__.py` files are present to treat directories as packages. These files can be empty or contain package-level initializations if needed.

### Running the Application

1. **Initialize the database**:

   Run the following script to create database tables:

   ```python
   # init_db.py

   from app.database import engine
   from app import models

   models.Base.metadata.create_all(bind=engine)
   ```

   Execute the script:

   ```sh
   python init_db.py
   ```

2. **Start the FastAPI server**:

   ```sh
   uvicorn app.main:app --reload
   ```

By following these steps, you should have a fully functional backend with FastAPI, SQLAlchemy, and PostgreSQL.

