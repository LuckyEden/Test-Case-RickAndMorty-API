from sqlalchemy import Select
from sqlalchemy.orm import joinedload

from app.models import Character, Episode, Location
from core.repository import BaseRepository


class CharacterRepository(BaseRepository[Character]):
     async def search(self, query_str: str) -> Select:
         query = self._query()
         # max 5 results
         query = query.filter(Character.name.like(f"%{query_str}%")).limit(4)
         return await self._all(query)
     
     async def get_distinct(self, column: str) -> list:
          query = self._query()
          query = query.distinct(column) 
         
          results = await self._all(query)
         
          items = []
          for result in results:
               items.append(getattr(result, column))
               
          return items
     
     async def get_filtered(
        self,
        filters: dict[str, str],
        skip: int = 0,
        limit: int = 100,
        join_: set[str] | None = None,
    ) -> list[Character]:
          """
          Returns a list of model instances matching the filters.
          
          :param filters: The filters to match.
          :param skip: The number of records to skip.
          :param limit: The number of records to return.
          :param join_: The joins to make.
          :return: A list of model instances.
          """
          
          query = self._query(join_)
          
          

          
          for key, value in filters.items():
                    if value != "All":
                         if key == "location" or key == "origin": 
                              # Locations table already has relationship with Characters
                              
                              query = query.filter(
                                                   Character.location.has(Location.name == value)
                                                   )
                    
                              
                         else:
                              query = query.filter(getattr(self.model_class, key) == value)
                         
          total_count = await self._count(query)
          has_more = total_count > skip + limit
          query = query.offset(skip).limit(limit)
          return await self._all(query), has_more, total_count
     
     async def get_by_url(self, url: str) -> Select:
          
          query = self._query()
          query = query.filter(Character.url==url)
          return await self._one_or_none(query)
     
class EpisodeRepository(BaseRepository[Episode]):
     async def search(self, query_str: str) -> Select:
          query = self._query()
          query = query.filter(Episode.name.like(f"%{query_str}%")).limit(2)
          return await self._all(query)

     async def get_by_url(self, url: str) -> Select:
          
          query = self._query()
          query = query.filter(Episode.url==url)
          query = await self.__join_Characters(query)
          
          return await self._first_unique(query)

     async def get_filtered(
        self,
        filters: dict[str, str],
        skip: int = 0,
        limit: int = 100,
        join_: set[str] | None = None,
     ) -> list[Episode]:
            """
            Returns a list of model instances matching the filters.
            
            :param filters: The filters to match.
            :param skip: The number of records to skip.
            :param limit: The number of records to return.
            :param join_: The joins to make.
            :return: A list of model instances.
            """
            
            query = self._query(join_)
            
            for key, value in filters.items():
                         if value != "All":
                          query = query.filter(getattr(self.model_class, key) == value)
                          
            total_count = await self._count(query)
            has_more = total_count > skip + limit
            if has_more:  
               query = query.offset(skip).limit(limit)
            else:
               query = query.offset(skip)
            return await self._all(query), has_more, total_count
       
     async def get_by_id(self, id: int) -> Select:
          query = self._query()
          query = query.filter(Episode.id==id) 
          query = await self.__join_Characters(query)
          
          return await self._first_unique(query)
       
     async def __join_Characters(self, query: Select) -> Select:
          return query.options(joinedload(Episode.characters))
     
class LocationRepository(BaseRepository[Location]):
     async def get_by_url(self, url: str) -> Select:
         
          query = self._query()
          query = query.filter(Location.url==url)
          return await self._one_or_none(query)
     
     async def search(self, query_str: str) -> Select:
         query = self._query()
         query = query.filter(Location.name.like(f"%{query_str}%")).limit(2)
         return await self._all(query)
    
     async def get_distinct(self, column: str) -> Select:
          query = self._query()
          query = query.distinct(column) 
         
          return await self._all(query)
          