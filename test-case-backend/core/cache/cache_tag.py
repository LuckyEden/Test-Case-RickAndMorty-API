from enum import Enum


class CacheTag(Enum):
    GET_CHARACTER_LIST = "get_character_list"
    GET_CHARACTER_DETAIL = "get_character_detail"
    GET_LOCATION_LIST = "get_location_list"
    GET_LOCATION_DETAIL = "get_location_detail"
    GET_EPISODE_LIST = "get_episode_list"
    GET_EPISODE_DETAIL = "get_episode_detail"