import React, { useEffect } from "react";
import Modal from "../../components/elements/Modal";
import { Link, useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { client } from "../../libs/api";
import { Divider } from "../../components/elements";


const EpisodeDetails: React.FC = () => {
    const {
        id
    } = useParams<{ id: string }>();

    const navigation = useNavigate();

    const {
        data,
        error,
        isLoading
    } = useSWR(id, () => client.getEpisode(id), {

    });

    useEffect(() => {
        if (error || !id) {
            navigation("/episodes");
        }
    }, [error, id]);


    return (
        <Modal
            open={true}
            onClose={() =>
                navigation("/episodes")
            }
        >
            <div
                className="flex flex-col gap-2 max-h-[85vh] overflow-auto relative"
            >
                {isLoading &&
                    <div className="flex justify-center items-center">
                        Loading...
                    </div>
                }

                {data && (<>
                    <div
                        className="flex items-center justify-between fixed w-full flex-col left-0 top-0 bg-paper p-2"
                    >
                        <div
                        className="flex items-center justify-between w-full p-1"
                        >
                            <p
                                className="text-xl text-white font-semibold"
                            >
                                {data?.name}
                            </p>
                            <p
                                className="text-xl text-cGray"
                            >
                                {data?.episode}
                            </p>
                        </div>

                        <Divider />
                    </div>

                    <div
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-10"
                    >
                        <img
                            src={
                                data?.image
                                    ? data.image
                                    : "https://via.placeholder.com/300x300.png?text=No+Image"
                            }
                            alt="Episode"
                            className="w-64 h-64 object-cover rounded-lg col-span-3 md:col-span-1"
                        />
                        <div className="col-span-3 md:col-span-2 grid grid-cols-3 gap-2 h-max">
                            <div
                                className="flex flex-col gap-2 col-span-3"
                            >
                                <p
                                    className="text-white font-semibold "
                                >
                                    Episode Summary
                                </p>

                                <p
                                    className="text-white text-sm"
                                >
                                    {data?.description}
                                </p>
                            </div>
                            <div className="col-span-3"> </div>
                            <div
                                className="flex flex-col gap-1 "
                            >
                                <p
                                    className="text-cGray text-sm "
                                >
                                    Rating
                                </p>

                                <p
                                    className="text-white text-sm"
                                >
                                    IMDB: {data?.rating}
                                </p>
                            </div>
                            <div
                                className="flex flex-col gap-1 "
                            >
                                <p
                                    className="text-cGray text-sm "
                                >
                                    Air Date
                                </p>

                                <p
                                    className="text-white text-sm"
                                >
                                    {data?.air_date}
                                </p>
                            </div>
                            <div
                                className="flex flex-col gap-1 "
                            >
                                <p
                                    className="text-cGray text-sm "
                                >
                                    Character Count
                                </p>

                                <p
                                    className="text-white text-sm"
                                >
                                    {data?.character_count}
                                </p>
                            </div>
                        </div>
                        <div
                            className="col-span-3"
                        >
                            <div
                                className="flex flex-row items-center gap-3"
                            >
                                <span
                                    className="text-white font-semibold"
                                >
                                    Characters
                                </span>
                                <Divider />
                            </div>
                        </div>

                        <div
                            className="grid grid-cols-1 md:grid-cols-3 gap-4 col-span-3 max-h-72 overflow-auto"
                        >
                            {
                                data?.characters?.map((character: any) => (
                                    <Link
                                        to={`/characters/${character.id}`}
                                        key={
                                            "character-" + character.id
                                        }
                                        className="bg-paper p-4 rounded-lg shadow group cursor-pointer hover:shadow-lg transition-shadow duration-300 flex flex-row md:flex-col items-center gap-2"
                                    >
                                        <div
                                            className="group-hover:opacity-80 transition-opacity duration-300"
                                        >
                                            <img
                                                src={
                                                    character.image
                                                        ? character.image
                                                        : "https://via.placeholder.com/300x300.png?text=No+Image"
                                                }
                                                alt="Character"
                                                className=" min-w-16 md:min-w-full h-16 md:h-48 object-cover rounded-lg"
                                            />
                                        </div>
                                        <p
                                            className="text-white font-semibold mt-2 group-hover:text-secondary-main transition-colors duration-300 text-sm md:text-base"
                                        >
                                            {character.name}
                                        </p>
                                        <div
                                            className="items-center justify-between hidden md:flex"
                                        >
                                            <p
                                                className="text-cGray"
                                            >
                                                {character.species}
                                            </p>
                                        </div>
                                    </Link>
                                ))
                            }

                        </div>
                    </div>
                </>)}
            </div>
        </Modal>
    );
}

export default EpisodeDetails;