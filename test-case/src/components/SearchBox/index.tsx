import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
    ImCancelCircle,
    ImSearch
} from "react-icons/im";
import { Divider } from "../elements";
import clsx from "clsx";
import { SearchCardCharacter, SearchCardEpisode, SearchCardLocation } from "./SearchCards";
import useSWR from "swr";
import { client } from "../../libs/api";

const SearchBox: React.FC = () => {

    const searchBoxRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);


    const [searchValue, setSearchValue] = useState<string>("");
    const {
        data,
        error,
        isLoading,
        mutate
    } = useSWR("globe-search", () => client.searchAll(searchValue), {
        shouldRetryOnError: false,
    });


    // Handle search input focus event
    const handleSearchInputFocus = (evt: React.FocusEvent<HTMLInputElement>) => {
        evt.preventDefault();
        if (!searchBoxRef.current?.classList.contains("focus-search-box")) {
            searchBoxRef.current?.classList.add("focus-search-box");
        }
    }

    // Handle search input blur event
    const handleSearchInputBlur = (evt:
        React.FocusEvent<HTMLInputElement>
    ) => {

        evt.preventDefault();
        if (searchBoxRef.current?.classList.contains("focus-search-box")) {
            searchBoxRef.current?.classList.remove("focus-search-box");
        }
    }

    const handleSearchInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        evt.preventDefault();
        setSearchValue(evt.target.value);
    }


    useEffect(() => {
        if (searchValue.length > 0) {
            mutate();
        }
    }, [searchValue]);

    return (
        <div
            ref={searchBoxRef}
            className="w-full flex items-center  absolute -bottom-4 left-1/2 transform -translate-x-1/2  flex-col z-50"
        >
            <div
                className={
                    clsx("search__box group w-11/12 md:w-1/2 py-2 px-4 border border-b-0 h-12 border-primary-light bg-white rounded  flex items-center gap-2",
                        searchValue.length > 0 && "rounded-b-none"
                    )
                }
            >
                <input type="text"
                    ref={searchInputRef}

                    onFocus={handleSearchInputFocus}
                    onBlur={handleSearchInputBlur}
                    onChange={handleSearchInputChange}

                    value={searchValue}

                    className="w-full h-full outline-none bg-transparent"
                    placeholder="Search"
                />

                <span
                    className="flex gap-2 flex-row h-4"
                >
                    <AnimatePresence mode="wait">
                        {searchValue.length > 0 && (
                            <motion.div

                                key={"search-icon-cancel-animation"}
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -10, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ImCancelCircle
                                    onClick={() => setSearchValue("")}
                                    className="search__icon"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <Divider orientation="vertical" flexItem />
                    <ImSearch />
                </span>


            </div>

            <div
                className={
                    clsx(
                        "absolute top-12 px-4 w-11/12 md:w-1/2 border border-t-0 border-primary-main transition-all overflow-hidden bg-white rounded rounded-t-none   items-center z-50    ",
                        searchValue.length > 0 && "py-2  shadow-xl"
                    )
                }
                style={{
                    height: searchValue.length > 0 ? "auto" : "0px",
                }}
            >
                {isLoading && (
                    <div className="w-full h-full flex items-center justify-center ">
                        <p>Loading...</p>
                    </div>
                )}

                {error && (
                    <div className="w-full h-full flex items-center justify-center">
                        <p>Error</p>
                    </div>
                )}

                {(data && isLoading == false && !error) && data.results_count === 0 ? (<>
                    <div className="w-full h-full flex items-center justify-center flex-col gap-4">
                        <Divider />
                        <p>No results found</p>
                    </div>
                </>) : (
                    <div
                        className="flex flex-col gap-2 mt-2"
                    >
                        <Divider />
                        {data && data.results.characters.length > 0 && data.results.characters.map((character: any) => {
                            return (
                                <SearchCardCharacter key={"search-character-" + character.id} data={character} />
                            )
                        })}
                        {data && data.results.episodes.length > 0 && <Divider />}
                        {data && data.results.episodes.length > 0 && data.results.episodes.map((episode: any) => {
                            return (
                                <SearchCardEpisode key={"search-episode-" + episode.id} data={episode} />
                            )
                        })}
                        
                        <Divider />
                        {data && data.results.locations.length > 0 && data.results.locations.map((location: any) => {
                            return (
                                <SearchCardLocation key={"search-location-" + location.id} data={location} />
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchBox;