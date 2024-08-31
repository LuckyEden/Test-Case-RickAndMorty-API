import clsx from "clsx";
import { useEffect } from "react";
import {
    ImGithub,
    ImHeart,
    ImTwitter,
} from "react-icons/im";
import { useSelector } from "react-redux";

const Footer: React.FC = () => {
    const serviceData = useSelector((state: any) => state.service);
    useEffect(() => {
        
    }, [serviceData]);
    return (
        <footer
            className="sc sc__d flex flex-col items-center text-cGray font-bold uppercase text-xs md:text-sm !py-16"
        >
            <div className="flex flex-row gap-6">
                <a
                    href="#"
                    className="hover:text-secondary-main transition-all"
                >
                    Characters: {
                        serviceData.metaData?.character_count}
                </a>
                <a
                    href="#"
                    className="hover:text-secondary-main transition-all"
                >
                    Locations: {
                        serviceData.metaData?.location_Count}
                </a>
                <a
                    href="#"
                    className="hover:text-secondary-main transition-all"
                >
                    Episodes:  {
                        serviceData.metaData?.episode_count}
                </a>
            </div>
            <div
                className="flex items-center gap-2 mt-2"
            >
                Server Status
                <span
                    className={
                        clsx(
                            "h-3 w-3 rounded-full",
                            {
                                "bg-green-500": serviceData.status === "OK",
                                "bg-red-500": serviceData.status === "ERROR"
                            }
                        )
                    }
                ></span>
            </div>

            <div
                className="flex flex-row gap-4 mt-6"
            >
                <a href="https://www.docker.com/" target="_blank">
                    <img
                        className="h-10 grayscale hover:filter-none"
                        src="https://www.ianlivingstone.ca/assets/docker-banner.png" alt="deployed by Docker" />
                </a>
                <a href="https://react.dev/" target="_blank">
                    <img
                        className="h-10 grayscale hover:filter-none"
                        src="https://madewithreactjs.com/images/powered-madewithreactjs--white.png?1" alt="made with reactjs" />
                </a>
            </div>

            <div
                className="flex flex-row gap-4 mt-6 "
            >
                <a href="">
                    <ImGithub
                        className="text-lg text-cGray hover:text-white transition-all"
                    />
                </a>

                <a href="">
                    <ImTwitter
                        className="text-lg text-cGray hover:text-blue-400 transition-all"
                    />

                </a>

                <a href="">
                    <ImHeart
                        className="text-lg text-cGray hover:text-red-600 transition-all"
                    />

                </a>
            </div>

            <div
                className="flex flex-row h-5 gap-1 font-normal normal-case mt-4"
            >
                ReCreated by
                <a href="" className="text-white transition-all font-semibold border-b border-secondary-main hover:border-none hover:text-secondary-main">
                    Eray Aydın
                </a>
                2024
            </div>
            
            <div
                className="flex flex-row h-5 gap-1 font-normal normal-case mt-2 text-xs"
            >
                Originally
                <a href="https://rickandmortyapi.com/" className="text-white transition-all font-semibold border-b border-secondary-main hover:border-none hover:text-secondary-main">
                    Rick and Morty API
                </a>

            </div>
        </footer>
    );
}

export default Footer;