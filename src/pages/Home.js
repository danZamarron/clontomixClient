import React, {useEffect} from 'react'
import {Typography, Row, Col} from "antd"
import { useSWRInfinite } from "swr"
import NewsTemplate from "../components/NewsTemplate"

const { Title } = Typography;
const fetcher = url => fetch(url).then(r => r.json())
const PAGE_SIZE = 10;
let baseURL;
process.env.NODE_ENV === "production"
? (baseURL = process.env.REMOTEURL)
: (baseURL = process.env.REACT_APP_LOCALHOST)
console.log(baseURL)

const Home = () => {
    
    const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite((index, previousPageData) => {
        if (previousPageData && previousPageData.length === 0) 
            return null

        return `${baseURL}api/noticia/pagination?page=${index}`
    }, fetcher)

    const news = data ? data.map(({ noticias }) => noticias) : []
    const isLoadingInitialData = !data && !error;
    const isLoadingMore = isLoadingInitialData ||
                          (size > 0 && data && typeof data[size - 1] === "undefined");
    const isEmpty = data?.[0]?.length === 0;
    const isReachingEnd = isEmpty || 
                          (data && data?.length < PAGE_SIZE);
    
    console.log(news)
                        /* <h4 key={cNews._id}><Link to={`/noticia/${cNews._id}`}>{cNews.titulo}</Link></h4> 
                         
                         */
    return !data ? (
        <p>Loading...</p>
      ) : (
        <>
            <div>
                <Row justify="center" gutter={30}>
                    <Col just>
                        <Title level={1}>Noticias:</Title>
                    </Col>
                </Row>

                {news?.flat()?.map(cNews => (
                    <NewsTemplate news={cNews}></NewsTemplate>
                   
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
