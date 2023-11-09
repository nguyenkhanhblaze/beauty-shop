import { createEffect } from "solid-js";

const Infinitie = () => {
    // const fetchApi = async () => await fetch("https://jsonplaceholder.typicode.com/posts").json()
    const fetchNextData = async () => {
        if (episodes()?.info?.next) {
            const { data } = await fetchEpisodes(episodes()?.info.next);
            const modifiedEpisodes = [...episodes()?.results, ...data.results];
            setEpisodes((prevState) => ({
                ...prevState,
                results: modifiedEpisodes,
                info: data.info,
            }));
        }
    };
    const handleScroll = () => {
        console.log('handle scroll');
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            fetchNextData();
        }
    };

    createEffect(() => {
        window.addEventListener("scroll", handleScroll);
    });

    return (
        <>
            <h3>Infinitie Page</h3>
        </>
    )
}

export default Infinitie