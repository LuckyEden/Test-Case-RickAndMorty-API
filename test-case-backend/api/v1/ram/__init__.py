from typing import Callable

from fastapi import APIRouter, Depends
 
from core.factory import Factory 
from core.database import session, standalone_session
from core.cache import Cache
from app.controllers import CharacterController, EpisodeController, LocationController
from app.models import Character, Location, Episode
from app.schemas import SearchResponse
from app.schemas.extras import CharacterSchema, EpisodeSchema, LocationSchema, CharacterBase

ram_router = APIRouter()

@ram_router.get("/random", tags=["characters"])
@Cache.cached(prefix="random_characters", ttl=60)
async def random_character_list(
    count: int = 10,
    character_controller: CharacterController = Depends(Factory().get_character_controller)
) -> list[CharacterSchema]:
    characters = await character_controller.character_repository.get_random(count=count)
    return [CharacterSchema.from_orm(character) for character in characters]
 
@ram_router.get("/characters/options", tags=["characters"])
async def character_options(
    character_controller: CharacterController = Depends(Factory().get_character_controller),
    location_controller: LocationController = Depends(Factory().get_location_controller),
):
     
    return {
            "Status": [ 
                {"name": status, "id": i} for i, status in enumerate(await character_controller.character_repository.get_distinct("status"))
            ] , # get distinct statuses from Characters table as a list of dict
            "Species": [ 
                {"name": species, "id": i} for i, species in enumerate(await character_controller.character_repository.get_distinct("species"))
            ], # get distinct species from Characters table as a list of dict
            "Types": [ 
                {"name": type, "id": i} for i, type in enumerate(await character_controller.character_repository.get_distinct("type"))
            ], # get distinct types from Characters table as a list of dict
            "Locations": [ 
                    {"name": location.name, "id": location.id} for location in await location_controller.location_repository.get_distinct("name")
                ],
            "Gender": await character_controller.character_repository.get_distinct("gender")
            }
 
@ram_router.get("/characters", tags=["characters"])
async def character_list(
    status: str = "All",
    species: str = "All",
    type: str = "All",
    origin: str = "All",
    location: str = "All",
    gender: str = "All",
    skip: int = 0,
    limit: int = 10,
    character_controller: CharacterController = Depends(Factory().get_character_controller)
) -> dict:
    
    
    
    filtered_data, has_more, total_count = await character_controller.character_repository.get_filtered( filters={
            "status": status,
            "species": species,
            "type": type,
            "origin": origin,
            "location": location,
            "gender": gender
        },
        skip=skip,
        limit=limit
    )
    
    return {
        "data": [CharacterSchema.from_orm(character) for character in filtered_data],
        "has_more": has_more,
        "total_count": total_count
    }
    
@ram_router.get("/characters/{character_id}", tags=["characters"])
async def character_detail(
    character_id: int,
    character_controller: CharacterController = Depends(Factory().get_character_controller)
) -> CharacterSchema:
    character = await character_controller.character_repository.get_by("id",character_id,unique=True)
    return CharacterSchema.from_orm(character)
 
@ram_router.get("/episodes", tags=["episodes"])
async def episode_list(
    skip: int = 0,
    limit: int = 10,
    episode_controller: EpisodeController = Depends(Factory().get_episode_controller)
) -> dict:
    episodes, has_more, total_count = await episode_controller.episode_repository.get_filtered(
        filters={},
        skip=skip, limit=limit)
    for episode in episodes:
        episode.character_count = len(episode.characters)
        
    return {
        "data": [EpisodeSchema.from_orm(episode) for episode in episodes],
        "has_more": has_more,
        "total_count": total_count
            }

@ram_router.get("/episodes/{episode_id}", tags=["episodes"])
async def episode_detail(
    episode_id: int,
    episode_controller: EpisodeController = Depends(Factory().get_episode_controller)
) -> dict:
    episode = await episode_controller.episode_repository.get_by_id(episode_id)
     
    ep = EpisodeSchema.from_orm(episode)
    ep.character_count = len(episode.characters)
    ep = ep.model_dump()  
        
    return ep
    

@ram_router.get("/search", tags=["general"] )
async def search(
    query: str, 
    character_controller: CharacterController = Depends(Factory().get_character_controller),
    episode_controller: EpisodeController = Depends(Factory().get_episode_controller),
    location_controller: LocationController = Depends(Factory().get_location_controller) 
) -> SearchResponse: 
    characters = await character_controller.character_repository.search(query)
    
    characters = [CharacterSchema.from_orm(character) for character in characters]
    for character in characters:
        character.episodes = [EpisodeSchema.from_orm(episode) for episode in character.episodes]
        if character.origin:
            character.origin = LocationSchema.from_orm(character.origin)
        if character.location:
            character.location = LocationSchema.from_orm(character.location)
    
    locations = await location_controller.location_repository.search(query)
    locations = [LocationSchema.from_orm(location) for location in locations]
    episodes = await episode_controller.episode_repository.search(query)
    for episode in episodes:
        print(episode.episode)
    episodes = [EpisodeSchema.from_orm(episode) for episode in episodes]
    
    response = SearchResponse(
        search_string=query,
        results_count= len(characters) + len(locations) + len(episodes),
        results={
            "characters": characters,
            "locations": locations,
            "episodes": episodes
        }
    )
     
    return response 