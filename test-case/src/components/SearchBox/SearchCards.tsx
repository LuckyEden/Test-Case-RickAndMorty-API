import React from "react";
import { TCTypes } from "../../types";
import { Divider } from "../elements";
import {
    ImEnlarge
} from "react-icons/im";
import { Link } from "react-router-dom";

const SearchCardWrapper: React.FC<TCTypes.SearchCardWrapperProps> = ({ children,
    targetLink
}) => {
    return (
        <div
            className="flex flex-row w-full overflow-hidden rounded-lg shadow-md items-center"
        >

            {children}
            {targetLink && (
                <Link
                    to={targetLink}
                    className="ml-auto mr-4"
                >
                    <ImEnlarge
                        data-tooltip-id="tooltip-globe"
                        data-tooltip-content="Details"
                        className="text-lg text-link hover:text-secondary-main transition-all"
                    />
                </Link>
            )}
        </div>
    );
}


const SearchCardCharacter: React.FC<TCTypes.SearchCardProps> = ({
    data
}) => {

    return (
        <SearchCardWrapper
            targetLink={`/characters/${data.id}`}
        >

            <div
                className=""
            >
                <div
                    className="flex flex-row items-center gap-2"
                >
                    <img
                        src={data.image}
                        alt={data.name}
                        className="w-16 h-16"
                    />
                    <div
                        className="flex flex-col"
                    >
                        <h2
                            className="text-sm md:text-lg font-bold"

                        >
                            {data.name}
                        </h2>
                        <p
                            className="text-xs md:text-sm text-cGray flex gap-1"
                        >
                            <span
                                className=""
                            >
                                {data.species}
                            </span>
                        </p>
                    </div>

                    <div
                        className="h-12 mx-2 hidden md:flex md:flex-col"
                    >
                        <Divider orientation="vertical" flexItem />
                    </div>

                    <div
                        className="hidden md:flex md:flex-col flex-col gap-1"
                    >
                        <span
                            className="text-cGray text-sm flex flex-col" >
                            Status:
                            <span className="text-primary-light font-semibold text-xs">
                                {data.status}
                            </span>
                        </span>
                    </div>

                    <div
                        className="h-12 mx-2 hidden md:flex md:flex-col"
                    >
                        <Divider orientation="vertical" flexItem />
                    </div>


                    <div
                        className="hidden md:flex md:flex-col flex-col gap-1"
                    >
                        <span
                            className="text-cGray text-sm flex flex-col" >
                            Last known location:
                            <span className="text-primary-light font-semibold text-xs">
                                {data.location?.name || "Unknown"}
                            </span>
                        </span>
                    </div>
                    <div
                        className="h-12 mx-2 hidden md:flex md:flex-col"
                    >
                        <Divider orientation="vertical" flexItem />
                    </div>
                    <div
                        className="hidden md:flex md:flex-col flex-col gap-1"
                    >
                        <span
                            className="text-cGray text-sm flex flex-col" >
                            First Seen Episode:
                            <span className="text-primary-light font-semibold text-xs">
                                {data.episodes.length > 0 ? data.episodes[0].name : "Unknown"}
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </SearchCardWrapper>
    );
}

const SearchCardLocation: React.FC<TCTypes.SearchCardProps> = ({
    data
}) => {

    return (
        <SearchCardWrapper 
        >
            <div
                className="flex flex-row relative h-20"
            >
                <div
                    className="w-16 h-16 text-white flex items-start p-4 rotate-90  justify-center text-xs  -left-6 absolute top-1/2 -translate-y-1/2 rounded-full bg-blue-900"
                >
                    Location
                </div>

                <div
                    className="ml-14"
                >
                    <h2
                        className="text-sm md:text-lg font-bold mt-4"
                    >
                        Name
                    </h2>
                    <p
                        className="text-xs md:text-sm text-cGray mt-1"
                    >
                        {data.name}
                    </p>
                </div>
                <div
                    className="mx-4 h-10 my-auto hidden md:flex md:flex-col"
                >
                    <Divider
                        orientation="vertical"
                    />
                </div>
                <div
                    className="hidden md:flex md:flex-col "
                >
                    <h2
                        className="text-lg font-bold mt-4"
                    >
                        Dimension
                    </h2>
                    <p
                        className="text-sm text-cGray mt-1"
                    >
                        {data.dimension || "Unknown"}
                    </p>
                </div>
                <div
                    className="mx-4 h-10 my-auto hidden md:flex md:flex-col"
                >
                    <Divider
                        orientation="vertical"
                    />
                </div>
                <div
                    className="hidden md:flex md:flex-col"
                >
                    <h2
                        className="text-lg font-bold mt-4"
                    >
                        Type
                    </h2>
                    <p
                        className="text-sm text-cGray mt-1"
                    >
                        {data.type || "Unknown"}
                    </p>
                </div>
                <div
                    className="mx-4 h-10 my-auto hidden md:flex md:flex-col"
                >
                    <Divider
                        orientation="vertical"
                    />
                </div>
                <div
                    className="hidden md:flex md:flex-col"
                >
                    <h2
                        className="text-lg font-bold mt-4"
                    >
                        Resident Count
                    </h2>
                    <p
                        className="text-sm text-cGray mt-1"
                    >
                        {data.residents ? data.residents.length : 0}
                    </p>
                </div>
            </div>
        </SearchCardWrapper>
    );
}


const SearchCardEpisode: React.FC<TCTypes.SearchCardProps> = ({
    data
}) => {

    return (
        <SearchCardWrapper
            targetLink={`/episodes/${data.id}`}
        >
            <div
                className="flex flex-row relative h-20 group"
            >
                <div
                    className="group-hover:rotate-0 group-hover:left-0 transition-all group-hover:rounded-none w-16 h-16 group-hover:h-full text-white flex overflow-hidden items-start rotate-90  justify-center text-xs -left-6 absolute top-1/2 -translate-y-1/2 rounded-full bg-red-900"
                >
                    <img src={
                        data.image
                            ? data.image
                            : "https://via.placeholder.com/300x300.png?text=No+Image"
                    } alt=""
                        className="w-full h-full object-cover"
                    />
                </div>

                <div
                    className="ml-14 group-hover:ml-20 transition-all"
                >
                    <h2
                        className=" text-sm md:text-base font-bold mt-4"
                    >
                        Name
                    </h2>
                    <p
                        className="text-xs md:text-sm text-cGray mt-1"
                    >
                        {data.name}
                    </p>
                </div>
                <div
                    className="mx-4 h-10 my-auto hidden md:flex md:flex-col"
                >
                    <Divider
                        orientation="vertical"
                    />
                </div>
                <div
                    className="hidden md:flex md:flex-col"
                >
                    <h2
                        className="  font-bold mt-4"
                    >
                        Air Date
                    </h2>
                    <p
                        className="text-sm text-cGray mt-1"
                    >
                        {data.air_date}
                    </p>
                </div>
                <div
                    className="mx-4 h-10 my-auto hidden md:flex md:flex-col"
                >
                    <Divider
                        orientation="vertical"
                    />
                </div>
                <div
                    className="hidden md:flex md:flex-col"
                >
                    <h2
                        className="  font-bold mt-4"
                    >
                        Episode Code
                    </h2>
                    <p
                        className="text-sm text-cGray mt-1"
                    >
                        {data.episode}
                    </p>
                </div>
                <div
                    className="mx-4 h-10 my-auto hidden md:flex md:flex-col"
                >
                    <Divider
                        orientation="vertical"
                    />
                </div>
                <div
                    className="hidden md:flex md:flex-col"
                >
                    <h2
                        className=" font-bold mt-4"
                    >
                        Incl. Characters Count
                    </h2>
                    <p
                        className="text-sm text-cGray mt-1"
                    >
                        {data.characters ? data.characters.length : 0}
                    </p>
                </div>
            </div>
        </SearchCardWrapper>
    );
}


export {
    SearchCardWrapper,
    SearchCardCharacter,
    SearchCardLocation,
    SearchCardEpisode
}