from pydantic import BaseModel
from typing import List, Any
from ..extras import CharacterSchema, EpisodeSchema, LocationSchema

class FoundedRamElements(BaseModel):
    characters: List[CharacterSchema]
    locations:  List[LocationSchema]
    episodes: List[EpisodeSchema]

class SearchResponse(BaseModel):
    search_string: str
    results_count: int
    results: FoundedRamElements
    message: str = "Search results"