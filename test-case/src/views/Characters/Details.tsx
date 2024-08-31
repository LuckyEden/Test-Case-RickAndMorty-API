import { useEffect } from "react";
import {
    TbCircle,
    TbGenderAgender,
    TbGenderFemale,
    TbGenderMale
} from "react-icons/tb";
import { Link, useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { Divider } from "../../components/elements";
import Modal from "../../components/elements/Modal";
import { client } from "../../libs/api";

const CharacterDetails = () => {
    const {
        id
    } = useParams<{ id: string }>();

    const navigation = useNavigate();

    const {
        data,
        error,
        isLoading
    } = useSWR(id, () => client.getCharacter(id), {

    });

    useEffect(() => {
        if (error) {
            navigation("/characters");
        }
    }, [error]);

    useEffect(() => {
        if (!id) {
            navigation("/characters");
            return;
        }
    }, [id]);



    return (
        <Modal open={
            id !== undefined
        } onClose={() => {
            navigation("/characters");
        }}>
            {isLoading &&
                <div className="flex justify-center items-center">
                    Loading...
                </div>
            }
            {data &&
                <div className="overflow-auto max-h-[85vh]">
                    <div className="flex flex-col md:flex-row text-white">
                        <div className="w-full md:w-1/3 rounded-xl overflow-hidden shadow">
                            <img
                                src={
                                    data?.image
                                }
                                alt={
                                    data?.name
                                }
                                className="w-full"
                            />
                        </div>
                        <div className="w-full md:w-2/3 px-3">
                            <h1 className="text-2xl font-bold">
                                {data?.name}
                            </h1>
                            <div
                                className="flex items-center gap-2"
                            >
                                <span
                                    className={
                                        `status-badge ${data?.status === "Alive" ? "status-badge--active" : "status-badge--inactive"}`
                                    }
                                ></span>
                                <p>{
                                    data?.status || "Unknown"
                                }</p>

                                <div
                                    data-tooltip-content={data?.gender}
                                    data-tooltip-id="tooltip-globe"
                                    className="ml-auto"
                                >
                                    {
                                        data?.gender === "Male" && <TbGenderMale />

                                    }

                                    {
                                        data?.gender === "Female" && <TbGenderFemale />

                                    }

                                    {
                                        data?.gender === "unknown" && <TbGenderAgender />
                                    }

                                    {
                                        data?.gender === "Genderless" && <TbCircle />
                                    }
                                </div>
                            </div>

                            <div
                                className="my-2"
                            >

                                <Divider />
                            </div>

                            <div
                                className="flex flex-col gap-1"
                            >

                                <p
                                    className="flex items-center justify-between"
                                >
                                    <span className="font-semibold text-cGray">Species:</span> {data?.species || "Unknown"}
                                </p>
                                <p
                                    className="flex items-center justify-between"
                                >
                                    <span className="font-semibold text-cGray">Type:</span> {data?.type || "Unknown"}
                                </p>
                                <p
                                    className="flex items-center justify-between"
                                >
                                    <span className="font-semibold text-cGray">
                                        Origin:
                                    </span> {data?.origin?.name || "Unknown"}
                                </p>

                                <p
                                    className="flex items-center justify-between"
                                >
                                    <span className="font-semibold text-cGray">
                                        Last known location:
                                    </span> {data?.location?.name || "Unknown"}
                                </p>

                                <p
                                    className="flex items-center justify-between"
                                >
                                    <span className="font-semibold text-cGray">
                                        First seen in:
                                    </span>
                                    {data?.episodes?.length > 0 ? data?.episodes[0].name : "Unknown"}
                                </p>

                                <p
                                    className="flex items-center justify-between"
                                >
                                    <span className="font-semibold text-cGray">
                                        Last seen in:
                                    </span>
                                    {data?.episodes?.length > 0 ? data?.episodes[data?.episodes?.length - 1].name : "Unknown"}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-white text-xl font-semibold my-4">
                        Episodes <Divider />
                    </div>

                    <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-40 overflow-auto pr-4"
                    >
                        {data?.episodes?.map((episode: any) => {
                            return (
                                <Link to={`/episodes/${episode.id}`}
                                    key={episode.id}
                                    className="bg-primary-light p-4 rounded-lg shadow group"
                                >
                                    <p
                                        className="text-white font-semibold group-hover:text-secondary-main"
                                    >
                                        {episode.name}
                                    </p>
                                    <p
                                        className="text-cGray"
                                    >
                                        {episode.episode}
                                    </p>
                                </Link>
                            );
                        })}
                    </div>
                </div>}
        </Modal>
    );
}

export default CharacterDetails;
