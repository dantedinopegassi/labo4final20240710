from fastapi import APIRouter
from app.routers import carreras, materias, aulas, asignaciones

router = APIRouter()
router.include_router(carreras.router, prefix="/carreras", tags=["carreras"])
router.include_router(materias.router, prefix="/materias", tags=["materias"])
router.include_router(aulas.router, prefix="/aulas", tags=["aulas"])
router.include_router(asignaciones.router, prefix="/asignaciones", tags=["asignaciones"])

#/*********************************************************************|
#| Little fact about Python. Python treats folders as packages, and    |
#| said packages ARE NOT classes, but CAN be treated as some weird     |
#| kind of class. WHAT??                                               |
#| HOW??                                                               |
#|                                                                     |
#| --> ez, use __init__.py and place any variable an method in it      |
#|                                                                     |
#| When you import a package, the __init__.py file is executed, and    |
#| any variables or functions defined in __init__.py become attributes |
#| of the package. This can give the impression that a package behaves |
#| similarly to a module or class.                                     |
#|*********************************************************************/