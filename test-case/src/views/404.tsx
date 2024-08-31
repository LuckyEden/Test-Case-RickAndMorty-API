import { Link } from "react-router-dom";


const NotFound = () => {
    return (
        <div
            className="flex justify-center items-center h-96 sc sc__l flex-col text-white gap-8"
        >
            <h1
                className="text-4xl"
            >
                404 - Not Found
            </h1>
            <p>
                The page you are looking for might have been removed or is temporarily unavailable.
            </p>
            <p>
                Suggested actions:
            </p>
            <div
                className="grid grid-cols-3 gap-4"
            >
                <Link to="/">
                    <button
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Home
                    </button>
                </Link>

                <Link to="/characters">
                    <button
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Characters
                    </button>

                </Link>

                <Link to="/episodes">
                    <button
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Episodes
                    </button>

                </Link>
            </div>
        </div>
    );
}

export default NotFound;