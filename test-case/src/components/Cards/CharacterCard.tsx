import clsx from "clsx"
import React from "react"
import { Link } from "react-router-dom"


const CharacterCard: React.FC<{
    character: any
}> = ({ character }) => {
    return (
        <div className="bg-paper shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row items-center">
            <img
                src={character.image}
                alt={character.name}
                className="w-52 h-52 object-cover rounded-xl mt-4 md:mt-0 md:rounded-none"
            />
            <div className="mt-4 md:mt-0 md:ml-4 flex flex-col  gap-5 pb-4">
                <Link to={`/characters/${character.id}`}
                    className="text-white hover:text-secondary-main cursor-pointer transition-all"
                >
                    <p className="text-xl font-semibold ">{character.name}</p>
                    <p className="text-sm flex items-center gap-2">
                        <span
                            className={
                                clsx(
                                    "status-badge",
                                    character.status === "Alive" ? "status-badge--active" : "status-badge--inactive",
                                )
                            }
                        ></span>
                        {character.status ? character.status : "Unknown"}
                        &nbsp; - &nbsp;
                        {character.species ? character.species : "Unknown"}
                    </p>
                </Link>

                <div>
                    <p
                        className="text-sm text-cGray font-semibold"
                    >
                        Last known location:
                    </p>

                    <Link

                        to={/*`/locations/${character.location?.id}`*/ "#"}
                        className="text-sm text-white transition-all "

                    >
                        {character.location ? character.location?.name : "Unknown"}
                    </Link>
                </div>

                <div >
                    <p
                        className="text-sm text-cGray font-semibold"
                    >
                        First seen in:
                    </p>

                    <Link to={
                        character.episodes.length > 0 ? `/episodes/${character.episodes[0].id}` : "#"
                    }
                        className="text-sm text-white cursor-pointer transition-all hover:!text-secondary-main"
                    >
                        {character.episodes.length > 0 ? character.episodes[0].name : "Unknown"}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CharacterCard