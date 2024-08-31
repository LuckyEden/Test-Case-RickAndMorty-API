from celery import shared_task
from core.database import get_session
from app.models import Character, Episode
import ramapi

@shared_task
def loader():
    print("Celery is working!")
    # to-do rick and morty api call and save to db
    result = ramapi.Episode.get_all()
    with get_session() as session:
        for episode in result.results:
            n_episode = Episode(
                id=episode.id,
                name=episode.name,
                air_date=episode.air_date,
                episode=episode.episode,
                url=episode.url,
                created=episode.created
            )
            session.add(n_episode)
        session.commit()
    
    return "Celery is working!"



