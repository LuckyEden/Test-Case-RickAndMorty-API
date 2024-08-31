from fastapi import APIRouter

from .ram import ram_router
from .hc import hc_router

v1_router = APIRouter()
v1_router.include_router(ram_router, prefix="/rick-and-morty") 
v1_router.include_router(hc_router)
