import React, { useEffect } from "react";
import { PiTelevisionSimpleFill } from "react-icons/pi";
import InfiniteScroll from "react-infinite-scroll-component";
import { Outlet } from "react-router-dom";
import useSWR from "swr";
import EpisodeCard from "../../components/Cards/EpisodeCard";
import { Divider } from "../../components/elements";
import { client } from "../../libs/api";
import { MdError } from "react-icons/md";


const Episodes: React.FC = () => {
    const [pagination, setPagination] = React.useState({
        skip: 0,
        limit: 12
    });

    const {
        data,
        isLoading,
        error,
        mutate
    } = useSWR("episodes", () => client.getEpisodes(
        pagination.skip,
        pagination.limit
    ), {
        revalidateIfStale: true
    });

    const [episodeData, setEpisodeData] = React.useState<any[]>([]);
    const [seasons, setSeasons] = React.useState<any[]>([]);

    useEffect(() => {
        mutate();
    }, [pagination]);


    useEffect(() => {
        if (data?.data) {
            if (pagination.skip === 0) {
                setEpisodeData(data.data);
            } else {
                setEpisodeData([...episodeData, ...data.data]);
            }
        }
    }, [data]);

    useEffect(() => {
        if (episodeData?.length > 0) {
            let seasons: any[] = [];
            let seasonNumber = 1;
            let _season = {
                season: seasonNumber,
                episodes: [] as any[]
            }
            episodeData?.forEach((episode: any) => {


                const epSeason = Number(episode.episode?.split("E")[0].replace("S", "").trim());
                if (epSeason === seasonNumber) {
                    _season.episodes.push(episode);

                } else {
                    seasons.push(_season);
                    seasonNumber++;
                    _season = {
                        season: seasonNumber,
                        episodes: [] as any[]
                    }

                }


            });
            setSeasons(seasons);

        }
    }, [episodeData]);


    return (
        <>
            <section
                className='sc sc__l '
            >
                <InfiniteScroll
                    dataLength={episodeData.length || 0}
                    next={() => setPagination({
                        skip: pagination.skip + pagination.limit,
                        limit: 6
                    })}
                    hasMore={
                        data?.has_more || false
                    }
                    loader={<h4>Loading...</h4>}
                >
                    <div
                        className="container grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-5"
                    >
                        <div
                            className="col-span-full"
                        >
                            <h1
                                className="text-white text-2xl font-bold"
                            >
                                Episodes
                            </h1>

                            <p
                                className="text-cGray mt-2"
                            >
                                List of all episodes in Rick and Morty.
                            </p>
                        </div>

                        {
                            (isLoading || seasons.length === 0) && (
                                <div
                                    className="col-span-full flex items-center justify-center gap-2 text-white font-semibold"
                                    style={{
                                        textWrap: "nowrap",
                                        whiteSpace: "nowrap",
                                    }}
                                >
                                    Loading...
                                </div>
                            )
                        }

                        {
                            error && (
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
                            )
                        }

                        {
                            // split the episodes into seasons
                            seasons.map((season: any) => {

                                return (
                                    <>
                                        <div
                                            key={"season-" + season.season}
                                            className="col-span-full flex items-center justify-center gap-2 text-white font-semibold"
                                            style={{
                                                textWrap: "nowrap",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            <PiTelevisionSimpleFill />
                                            Season {season.season} ( {season.episodes.length} Episodes )
                                            <Divider />
                                        </div>

                                        {
                                            season.episodes.map((episode: any) => {
                                                return (
                                                    <EpisodeCard
                                                        key={"episode-" + episode.id}
                                                        episode={episode}
                                                    />
                                                )
                                            })
                                        }
                                    </>
                                )
                            })
                        }


                    </div>
                </InfiniteScroll>
            </section>
            <Outlet />
        </>
    );
}

export default Episodes;