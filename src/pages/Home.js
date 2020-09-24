import React, {useEffect} from 'react'
import { useSWRInfinite } from "swr"

const fetcher = url => fetch(url).then(r => r.json())
const PAGE_SIZE = 10;

const Home = () => {
    
    const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite((index, previousPageData) => {
        if (previousPageData && previousPageData.length === 0) 
            return null

        return `http://localhost:4000/api/noticia/pagination?page=${index}`
    }, fetcher)

    const news = data ? data.map(({ noticias }) => noticias) : []
    const isLoadingInitialData = !data && !error;
    const isLoadingMore = isLoadingInitialData ||
                          (size > 0 && data && typeof data[size - 1] === "undefined");
    const isEmpty = data?.[0]?.length === 0;
    const isReachingEnd = isEmpty || 
                          (data && data?.length < PAGE_SIZE);
    
    console.log(news)
    return !data ? (
        <p>Loading...</p>
      ) : (
        <>
            <div>
            <h1>Rick and Morty infinite Scroll</h1>
                {news?.flat()?.map(cNews => (
                    <h4 key={cNews._id}>{cNews.titulo}</h4>
                ))}
            </div>
            <div>
            {isLoadingMore
            ? "loading..."
            : isReachingEnd
            ? "no more issues"
            : "load more"}
            </div>
        </>
      )
}

export default Home
