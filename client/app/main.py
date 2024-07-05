from app.database import engine
from app import router as apiRouters
from fastapi import FastAPI
import app.models as models

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(apiRouters)
