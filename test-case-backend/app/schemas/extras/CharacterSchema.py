from pydantic import BaseModel
from typing import List, Any, Optional
from datetime import datetime

class CharacterBase(BaseModel):
    id: int
    name: str
    status: str
    species: str
    type: str
    gender: str
    origin_id: Optional[int]
    location_id: Optional[int]
    image: str
    url: str
    created: datetime 
    
    origin: Optional['LocationSchema']
    location: Optional['LocationSchema']

    class Config:
        orm_mode = True
        from_attributes=True
        
class EpisodeSchema(BaseModel):
    id: int
    name: str
    air_date: Optional[str] = None
    episode: Optional[str] = None
    url: str
    created: datetime
    character_count: Optional[int] = 0
    image: Optional[str] = None
    description: Optional[str] = None
    rating: Optional[str] = None 
    characters: List[CharacterBase]
    
    class Config:
        orm_mode = True
        from_attributes=True
    

class CharacterSchema(CharacterBase): 
    episodes: List[EpisodeSchema]
    
    class Config:
        orm_mode = True
        from_attributes=True
    

    
class LocationSchema(BaseModel):
    id: int
    name: str
    type: Optional[str] = None
    dimension: Optional[str] = None
    url: str
    created: datetime
    
    class Config:
        orm_mode = True
        from_attributes=True