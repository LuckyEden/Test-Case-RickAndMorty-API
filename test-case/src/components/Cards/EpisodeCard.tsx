import React from "react";
import {
    FaPersonBooth,
    FaStar
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { TCTypes } from "../../types";

const EpisodeCard: React.FC<TCTypes.EpisodeCardProps> = ({ episode }) => {
    return (
        <Link
            to={`/episodes/${episode.id}`}
            key={episode.id}
            className="bg-paper p-4 rounded-lg shadow relative group cursor-pointer hover:shadow-lg transition-shadow duration-300"
        >
            <div
            className="absolute right-0 top-2 text-xs bg-yellow-600 flex items-center gap-2 p-2 rounded-l-lg z-40"
            >
                <FaStar className="text-white" />
                <p className="text-white font-semibold">
                    {episode.rating}
                </p>
            </div>

            <div
                className="group-hover:opacity-80 transition-opacity duration-300"
            >
                <img
                    src={
                        episode.image
                            ? episode.image
                            : "https://via.placeholder.com/300x300.png?text=No+Image"
                    }
                    alt="Episode"
                    className="w-full h-48 object-cover rounded-lg"
                />
            </div>
            <p
                className="text-white font-semibold mt-2 group-hover:text-secondary-main transition-colors duration-300"
            >
                {episode.name}
            </p>
            <div
                className="flex items-center justify-between"
            >
                <p
                    className="text-cGray"
                >
                    {episode.episode}
                </p>

                <div
                    data-tooltip-id="tooltip-globe"
                    data-tooltip-content={`
                        Character count in this episode`}
                    className="flex items-center space-x-2"
                >
                    <FaPersonBooth className="text-cGray" /> <p className="text-cGray">{episode.character_count}</p>
                </div>
            </div>
        </Link>
    );
}

export default EpisodeCard;