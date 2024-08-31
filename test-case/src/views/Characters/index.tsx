import { useEffect, useState } from 'react';
import {
    FaFilter
} from 'react-icons/fa';
import {
    MdError
} from 'react-icons/md';
import InfiniteScroll from "react-infinite-scroll-component";
import { Outlet } from 'react-router-dom';
import useSWR from 'swr';
import CharacterCard from '../../components/Cards/CharacterCard';
import { Divider } from '../../components/elements';
import Select from '../../components/elements/Select';
import { client } from '../../libs/api';

const Characters: React.FC = () => {
    const { data } = useSWR("characters-options", () => client.getCharactersOptions(), {
        revalidateIfStale: true
    });

    const [filter, setFilter] = useState({
        status: "All",
        species: "All",
        type: "All",
        origin: "All",
        location: "All",
        gender: "All",
    });

    const [pagination, setPagination] = useState({
        skip: 0,
        limit: 12
    });

    const [loadedData, setLoadedData] = useState<any[]>([]);

    const {
        data: characters,
        error: charactersError,
        isLoading: charactersLoading,
        mutate
    } = useSWR("characters", () => client.filterCharacters(
        Object.entries(filter)
            .map(([key, value]) => `${key}=${value}`)
            .join("&"),
        pagination.skip,
        pagination.limit
    ), {
        revalidateIfStale: true
    });

    const handleFilter = (
        column: string,
        value: string
    ) => {
        setFilter({
            ...filter,
            [column]: value
        });
        setPagination({
            skip: 0,
            limit: 12
        });
    }

    useEffect(() => {

        mutate();

    }, [filter, pagination]);


    useEffect(() => {
        if (characters) {
            if (pagination.skip === 0) {
                setLoadedData(characters.data);
                return;
            }
            setLoadedData([...loadedData, ...characters.data]);
        }
    }, [characters]);

    return (
        <>
            <section
                className='sc sc__l '
            >
                <InfiniteScroll
                    hasMore={characters?.has_more}
                    next={() => setPagination({
                        ...pagination,
                        skip: pagination.skip + pagination.limit,
                        limit: pagination.limit * 2
                    })}
                    loader={<h4>Loading...</h4>}
                    dataLength={characters?.data.length || 0}
                >
                    <div
                        className="container grid grid-cols-3 gap-4 relative"
                    >
                        <div
                            className="col-span-3 flex items-center text-2xl gap-2"
                        >
                            <FaFilter
                                className="text-white text-lg"
                            />

                            <h1 className=" text-white">
                                Filters</h1>

                        </div>

                        <div
                            className=" flex justify-center items-center col-span-3 md:col-span-1"
                        >
                            <Select
                                id="filter-status"
                                Label="Status"
                                value={data?.Status[0].name}
                                options={
                                    [
                                        {
                                            label: "All",
                                            value: "All"
                                        },
                                        ...data?.Status.map((status: any) => ({
                                            label: status.name,
                                            value: status.name
                                        })) || []
                                    ]
                                }

                                onChange={(e) =>
                                    handleFilter("status", e.target.value)
                                }
                            />
                        </div>

                        <div
                            className=" flex justify-center items-center col-span-3 md:col-span-1"
                        >
                            <Select
                                id="filter-species"
                                Label="Species"
                                value={data?.Species[0].name}
                                options={
                                    [
                                        {
                                            label: "All",
                                            value: "All"
                                        },
                                        ...data?.Species.map((species: any) => ({
                                            label: species.name,
                                            value: species.name
                                        })) || []
                                    ]
                                }

                                onChange={(e) =>
                                    handleFilter("species", e.target.value)
                                }
                            />
                        </div>

                        <div
                            className=" flex justify-center items-center col-span-3 md:col-span-1"
                        >
                            <Select
                                id="filter-type"
                                Label="Type"
                                value={data?.Types[0].name}
                                options={
                                    [
                                        {
                                            label: "All",
                                            value: "All"
                                        },
                                        ...data?.Types.map((type: any) => ({
                                            label: type.name,
                                            value: type.name
                                        })) || []

                                    ]
                                }

                                onChange={(e) =>
                                    handleFilter("type", e.target.value)
                                }
                            />
                        </div>

                        <div
                            className=" flex justify-center items-center col-span-3 md:col-span-1"
                        >
                            <Select
                                id="filter-origin"
                                Label="Origin"
                                value={data?.Locations[0].name}
                                options={
                                    [
                                        {
                                            label: "All",
                                            value: "All"
                                        },
                                        ...data?.Locations.map((location: any) => ({
                                            label: location.name,
                                            value: location.name
                                        })) || []
                                    ]
                                }

                                onChange={(e) =>
                                    handleFilter("origin", e.target.value)
                                }
                            />
                        </div>
                        <div
                            className=" flex justify-center items-center col-span-3 md:col-span-1"
                        >
                            <Select
                                id="filter-location"
                                Label="Location"
                                value={data?.Locations[0].name}
                                options={
                                    [
                                        {
                                            label: "All",
                                            value: "All"
                                        },
                                        ...data?.Locations.map((location: any) => ({
                                            label: location.name,
                                            value: location.name
                                        })) || []
                                    ]
                                }

                                onChange={(e) =>
                                    handleFilter("location", e.target.value)
                                }
                            />
                        </div>

                        <div
                            className=" flex justify-center items-center col-span-3 md:col-span-1"
                        >
                            <Select
                                id="filter-gender"
                                Label="Gender"
                                value={data?.Gender[0]}
                                options={
                                    [
                                        {
                                            label: "All",
                                            value: "All"
                                        },
                                        ...data?.Gender.map((gender: any) => ({
                                            label: gender,
                                            value: gender
                                        })) || []
                                    ]
                                }

                                onChange={(e) =>
                                    handleFilter("gender", e.target.value)
                                }
                            />
                        </div>

                        <div
                            className='col-span-3 flex justify-center  flex-col gap-2'
                        >
                            <Divider />
                            {characters && loadedData?.length > 0 && <p className="text-white">
                                Founded {loadedData.length} characters of {characters.total_count}
                            </p>}
                        </div>



                        {charactersLoading && <p className="text-white">Loading...</p>}
                        {
                            charactersError &&
                            <div
                                className='absolute top-0 right-0 w-full h-full bg-black bg-opacity-75 z-50 flex p-8 pt-24 items-center text-white text-2xl flex-col gap-2'
                            >
                                Failed to load data
                                <MdError className="text-red-500 text-4xl" />
                                <button
                                    className='bg-secondary-main text-white p-2 rounded-md hover:bg-opacity-75 transition-all'
                                    onClick={() =>
                                        window.location.reload()
                                    }
                                >
                                    Refresh
                                </button>
                            </div>
                        }

                        {characters && loadedData?.map((character: any) => {
                            return (
                                <div
                                    key={"character-" + character.id}
                                    className='col-span-3 md:col-span-1'
                                >
                                    <CharacterCard
                                        character={character}
                                    />
                                </div>
                            );
                        })}
                        {characters && loadedData?.length === 0 && <p className="text-white">No characters found</p>}
                        <div
                            className='col-span-3 flex justify-center  flex-col gap-2'
                        >
                            {characters && loadedData?.length > 0 && <p className="text-white">
                                Founded {loadedData.length} characters of {characters.total_count}
                            </p>}
                        </div>
                    </div>
                </InfiniteScroll>

            </section>
            <Outlet />
        </>
    )
}

export default Characters