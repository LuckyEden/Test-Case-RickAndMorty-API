from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Table
from sqlalchemy.orm import relationship

from core.database import Base
from core.database.mixins import TimestampMixin

character_episode_association = Table(
    'character_episode_association',
    Base.metadata,
    Column('character_id', Integer, ForeignKey('characters.id')),
    Column('episode_id', Integer, ForeignKey('episodes.id'))
)

location_resident_association = Table(
    'location_resident_association',
    Base.metadata,
    Column('character_id', Integer, ForeignKey('characters.id')),
    Column('location_id', Integer, ForeignKey('locations.id'))
)

class Character(Base):
    __tablename__ = 'characters'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    status = Column(String, nullable=False)
    species = Column(String, nullable=False)
    type = Column(String, nullable=True)
    gender = Column(String, nullable=False)
    origin_id = Column(Integer, ForeignKey('locations.id'))
    location_id = Column(Integer, ForeignKey('locations.id'))
    image = Column(String, nullable=False)
    url = Column(String, nullable=False, unique=True)
    created = Column(DateTime, nullable=False)

    origin = relationship('Location', foreign_keys=[origin_id], back_populates='origin_residents', lazy="selectin")
    location = relationship('Location', foreign_keys=[location_id], back_populates='current_residents', lazy="selectin")
    episodes = relationship(
        'Episode',
        secondary=character_episode_association,
        back_populates='characters',
        lazy="selectin"
    )

class Episode(Base, TimestampMixin):
    __tablename__ = 'episodes'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    air_date = Column(String, nullable=False)
    episode = Column(String, nullable=False)
    url = Column(String, nullable=False, unique=True)
    created = Column(DateTime, nullable=False)
    image = Column(String, nullable=True, default="https://rickandmortyapi.com/api/character/avatar/19.jpeg")
    description = Column(String, nullable=True, default="No description available")
    rating = Column(String, nullable=True, default="No rating available")

    characters = relationship(
        'Character',
        secondary=character_episode_association,
        back_populates='episodes',
        lazy="joined"
    )


class Location(Base):
    __tablename__ = 'locations'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    type = Column(String, nullable=True)
    dimension = Column(String, nullable=True)
    url = Column(String, nullable=False, unique=True)
    created = Column(DateTime, nullable=False)

    origin_residents = relationship('Character', foreign_keys=[Character.origin_id], back_populates='origin', lazy="selectin")
    current_residents = relationship('Character', foreign_keys=[Character.location_id], back_populates='location', lazy="selectin")