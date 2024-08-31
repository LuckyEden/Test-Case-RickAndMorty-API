from typing import List

from fastapi import Depends, FastAPI, Request
from fastapi.middleware import Middleware
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from api import router
from core.cache import Cache, CustomKeyMaker, RedisBackend
from core.config import config
from core.exceptions import CustomException 
from core.middlewares import ( 
    SQLAlchemyMiddleware,
)


def on_auth_error(request: Request, exc: Exception):
    status_code, error_code, message = 401, None, str(exc)
    if isinstance(exc, CustomException):
        status_code = int(exc.code)
        error_code = exc.error_code
        message = exc.message

    return JSONResponse(
        status_code=status_code,
        content={"error_code": error_code, "message": message},
    )


def init_routers(app_: FastAPI) -> None:
    app_.include_router(router)


def init_listeners(app_: FastAPI) -> None:
    @app_.exception_handler(CustomException)
    async def custom_exception_handler(request: Request, exc: CustomException):
        return JSONResponse(
            status_code=exc.code,
            content={"error_code": exc.error_code, "message": exc.message},
        )


def make_middleware() -> List[Middleware]:
    middleware = [
        Middleware(
            CORSMiddleware,
            allow_origins=["*"],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        ), 
        Middleware(SQLAlchemyMiddleware), 
    ]
    return middleware


def init_cache() -> None:
    Cache.init(backend=RedisBackend(), key_maker=CustomKeyMaker())


def create_app() -> FastAPI:
    app_ = FastAPI(
        title="Test Case Backend - Eray Aydın",
        description="Test Case Backend - Eray Aydın",
        version="1.0.0",
        docs_url=None if config.ENVIRONMENT == "production" else "/docs",
        redoc_url=None if config.ENVIRONMENT == "production" else "/redoc", 
        middleware=make_middleware(),
    )
    init_routers(app_=app_)
    init_listeners(app_=app_)
    init_cache()
    return app_


app = create_app()

from core.database import get_session, standalone_session, session
from core.factory import Factory
from app.controllers import EpisodeController
from app.models import Character, Episode, character_episode_association
from sqlalchemy import exc
from asyncpg.exceptions import UniqueViolationError
from app.controllers import ramapi
from bs4 import BeautifulSoup
from requests import Session as requests_session
import datetime


async def get_episodes_data(
    episode_controller: EpisodeController
):
    imbd_url = "https://www.imdb.com/title/tt2861424/episodes"
     
    episodes = []
    try:
        request_headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
            "Accept-Language": "en-US,en;q=0.5"
        }
        web_session = requests_session(
        )
        web_session.headers.update(request_headers)
        for i in range(1, 6): # 5 seasons verisi alınacak 
            response = web_session.get(f"{imbd_url}?season={i}")
            soup = BeautifulSoup(response.text, 'html.parser')
            
            episode_list = soup.find_all("article", class_="episode-item-wrapper")
            
            for episode in episode_list:
                episode_number = episode.find("div", class_="ipc-title__text").get_text()
                episode_name = episode_number.split("∙")[1].strip() 
                
                image = episode.find("img", class_="ipc-image")['src']
                rating = episode.find("span", class_="ipc-rating-star ipc-rating-star--base ipc-rating-star--imdb ratingGroup--imdb-rating")["aria-label"].replace("IMDb rating:", "").strip()
                description = episode.find("div", class_="ipc-html-content-inner-div").get_text()
                
                episodes.append(
                    { 
                        "name": episode_name ,
                        "image": image,
                        "rating": rating,
                        "description": description,
                    }
                )
         
                
        
        return episodes
    except Exception as e:
        print(e)
        return episodes    


@app.on_event("startup")
@standalone_session
async def startup_event():
    
    character_controller = Factory().get_character_controller(
        db_session=session
    )
    
    characters_ram = ramapi.Character.get_all()
    characters_ram_pages = characters_ram['info']['pages']
    characters_count = characters_ram['info']['count']
    
    db_characters_count = await character_controller.character_repository.count()
    
    if characters_count == db_characters_count:
        print("Data is up to date")
        return
    
    
    location_controller = Factory().get_location_controller(    
        db_session=session
    )
  
    episode_controller = Factory().get_episode_controller(
        db_session=session
    )
    imbdb_episodes = await get_episodes_data(episode_controller) 
    
    locations_ram = ramapi.Location.get_all()
    episodes_ram = ramapi.Episode.get_all()
    
    characters_d = []
    characters_d.extend(characters_ram['results'])
    for i in range(1, characters_ram_pages+1):
        for e in ramapi.Character.get_page(i) ["results"]:
            characters_d.append(e)
        
    locations_d = []
    locations_d.extend(locations_ram['results'])
    for i in range(1, locations_ram['info']['pages']+1):
        locations_d.extend(ramapi.Location.get_page(i) ["results"])
        
    episodes_d = []
    episodes_d.extend(episodes_ram['results'])
    for i in range(1, episodes_ram['info']['pages']+1):
        episodes_d.extend(ramapi.Episode.get_page(i) ["results"])
        
    for i in range(len(locations_d)):
        element = locations_d[i]
        
        location_model = await location_controller.location_repository.get_by_url(element.get('url'))
        
        if location_model is None:
            m_dict = {
                'id': element.get('id'),
                'name': element.get('name'),
                'type': element.get('type'),
                'dimension': element.get('dimension'),
                'url': element.get('url'),
                'created': datetime.datetime.now()
            }
            
            location_model = await location_controller.location_repository.create(m_dict)
            await session.commit()
            
    for i in range(len(episodes_d)):
        element = episodes_d[i]
        
        episode_model = await episode_controller.episode_repository.get_by_url(element.get('url'))
        
        if episode_model is None:
            imbdb_episode = None
            for e in imbdb_episodes:
                if e.get('name') == element.get('name'):
                    imbdb_episode = e
                    break
            if imbdb_episode is None:
                print("IMDB not found: ", element.get('name'))
                imbdb_episode = {}
        
            m_dict = {
                'id': element.get('id'),
                'name': element.get('name'),
                'air_date': element.get('air_date'),
                'episode': element.get('episode'),
                'url': element.get('url'),
                'created': datetime.datetime.now(),
                'image': imbdb_episode.get('image'),
                'description': imbdb_episode.get('description'),
                'rating': imbdb_episode.get('rating')
            }
            
            episode_model = await episode_controller.episode_repository.create(m_dict)
            await session.commit()
         
    #Create characters
    for i in range(len(characters_d)):
        element = characters_d[i]
        
        try:
            origin_url = element.get('origin', {}).get('url')
            location_url = element.get('location', {}).get('url')
        
            origin = await location_controller.location_repository.get_by_url(origin_url) 
            
            location = await location_controller.location_repository.get_by_url(location_url) 
            
            # if character exists, update it
            character_model = await character_controller.character_repository.get_by('url', element.get('url'), unique=True)
            
            if character_model is None:
                m_dict = {
                    'id': element.get('id'),
                    'name': element.get('name'),
                    'status': element.get('status'),
                    'species': element.get('species'),
                    'type': element.get('type'),
                    'gender': element.get('gender'),
                    'origin_id': origin.id if origin is not None else None,
                    'location_id': location.id if location is not None else None,
                    'image': element.get('image'),
                    'url': element.get('url'),
                    'created': datetime.datetime.now()
                }
                
                character_model = await character_controller.character_repository.create(m_dict)
                 
            """
            
            try:
                for ep in element.get('episode', []): 
                  
                    episode = await episode_controller.episode_repository.get_by_url(ep)
                    if episode is not None:
                        character_model.episodes.append(episode) 
            except Exception as e:
                print("episode error: ", e, episode)
                pass
                 
            """
            
            if origin is not None:
                origin.origin_residents.append(character_model)
            if location is not None:
                location.current_residents.append(character_model)
            await session.commit()
            
            
        except Exception as e:
            await session.rollback()
            print(e, origin_url)
            pass
        
    await session.commit()
    
    characters_db = await character_controller.character_repository.get_all(limit=5000)
    for character in characters_db:
        character_meta = next((item for item in characters_d if item["url"] == character.url), None)
        if character_meta is None:
            print("Character not found in RAM: ", character.name)
            continue
        
        character.episodes = []
        
        for ep in character_meta.get('episode', []): 
            print("processing episode: ", ep)
            episode = await episode_controller.episode_repository.get_by_url(ep)
            if episode is not None:
                character.episodes.append(episode)
                episode.characters.append(character)
    
    await session.commit()