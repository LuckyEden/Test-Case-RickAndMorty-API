from celery import Celery
from core.config import config   
from background.tasks import loader

celery_app = Celery(
    "background",
    backend=config.CELERY_BACKEND_URL,
    broker=config.CELERY_BROKER_URL,
    broker_connection_retry_on_startup=True,
)

celery_app.conf.beat_schedule = {
    'periodic-task': {
        'task': "background.tasks.loader",
        'schedule': 5.0,  # Her 60 saniyede bir çalışacak
    },
}

celery_app.conf.timezone = 'UTC'
    
 
celery_app.conf.task_routes = {"worker.celery_worker.test_celery": "test-queue"}
celery_app.conf.update(task_track_started=True)