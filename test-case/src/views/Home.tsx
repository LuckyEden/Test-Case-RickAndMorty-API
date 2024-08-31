import useSWR from "swr";
import CharacterCard from "../components/Cards/CharacterCard";
import { client } from "../libs/api";


const Home = () => {
    const {
        data,
        error,
        isLoading
    } = useSWR("home-characters", () => client.getRandomCharactersData(12));
    return (
        <section
            className='sc sc__l '
        >
            <div
                className="container grid grid-cols-3 gap-4"
            >
                <div
                    className="col-span-3 flex justify-center items-center"
                >
                    <h1 className="text-3xl text-white">
                        Popular Characters</h1>
                </div>
                {isLoading && <p className="text-white">Loading...</p>}
                {error && <p className="text-white">Failed to load data</p>}
                {data && data.map((character: any) => { 

                    return (
                        <div
                        key={"character-" + character.id}
                            className="col-span-3 md:col-span-1"
                        >
                            <CharacterCard 
                                character={character}
                            />
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default Home;