from functools import partial

from fastapi import Depends

from app.controllers import CharacterController , EpisodeController, LocationController
from app.models import Character, Episode, Location
from app.repositories import  CharacterRepository, EpisodeRepository, LocationRepository
from core.database import get_session


class Factory:
    """
    This is the factory container that will instantiate all the controllers and
    repositories which can be accessed by the rest of the application.
    """

    # Repositories 
    character_repository = partial(CharacterRepository, Character)
    episode_repository = partial(EpisodeRepository, Episode)
    location_repository = partial(LocationRepository, Location)

    def get_character_controller(self, db_session=Depends(get_session)):
        return CharacterController(
            character_repository=self.character_repository(db_session=db_session)
        ) 
        
    def get_episode_controller(self, db_session=Depends(get_session)):
        return EpisodeController(
            episode_repository=self.episode_repository(db_session=db_session)
        )
        
    def get_location_controller(self, db_session=Depends(get_session)):
        return LocationController(
            location_repository=self.location_repository(db_session=db_session)
        )