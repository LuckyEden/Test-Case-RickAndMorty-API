from app.models import Character, Episode, Location
from app.repositories import CharacterRepository, EpisodeRepository, LocationRepository
from core.controller import BaseController

import app.controllers.ramapi as ramapi

class CharacterController(BaseController[Character]):
    def __init__(self, character_repository: CharacterRepository):
        super().__init__(model=Character, repository=character_repository)
        self.character_repository = character_repository
 
class EpisodeController(BaseController[Episode]):
    def __init__(self, episode_repository: EpisodeRepository):
        super().__init__(model=Episode, repository=episode_repository)
        self.episode_repository = episode_repository
        
class LocationController(BaseController[Location]):
    def __init__(self, location_repository: LocationRepository):
        super().__init__(model=Location, repository=location_repository)
        self.location_repository = location_repository
        
        
__all__ = ["CharacterController", "EpisodeController", "LocationController", "ramapi"]