from typing import Callable

from fastapi import APIRouter, Depends
 
from core.factory import Factory 
from core.database import session, standalone_session
from app.controllers import CharacterController, EpisodeController, LocationController
from app.models import Character, Location, Episode
from app.schemas import SearchResponse
from app.schemas.extras import CharacterSchema, EpisodeSchema, LocationSchema, CharacterBase

hc_router = APIRouter()

@hc_router.get("/health-check", tags=["Base"])
async def health_check(
    episode_controller: EpisodeController = Depends(Factory().get_episode_controller),
    character_controller: CharacterController = Depends(Factory().get_character_controller),
    location_controller: LocationController = Depends(Factory().get_location_controller),
    ) -> dict:
    
    episode_count = await episode_controller.episode_repository.count()
    character_count = await character_controller.character_repository.count()
    location_count = await location_controller.location_repository.count()
    
    return {
        "metaData": {
            "episode_count": episode_count,
            "character_count": character_count,
            "location_Count": location_count,   
        },
        "status": "OK"
    }