import React, {useEffect} from 'react'
import {Typography, Row, Col, Divider ,Button} from "antd"
import { useSWRInfinite } from "swr"
import NewsTemplate from "../components/NewsTemplate"
import NewsDestacada from "../components/NewsDestacada"

const { Title } = Typography;
const fetcher = url => fetch(url).then(r => r.json())
const PAGE_SIZE = 5;
let baseURL;
process.env.NODE_ENV === "production"
? (baseURL = "/")
: (baseURL = process.env.REACT_APP_LOCALHOST)

const Home = () => {
    
    const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite((index, previousPageData) => {
        console.log(previousPageData)
        if (previousPageData && previousPageData.length === 0) 
            return null

        return `${baseURL}api/noticia/pagination?page=${index}`
    }, fetcher)

    debugger;

    const news = data ? data.map(({ noticias }) => noticias) : []
    const isLoadingInitialData = !data && !error;
    const isLoadingMore = isLoadingInitialData ||
                          (size > 0 && data && typeof data[size - 1] === "undefined");
    
    const isEmpty = data?.[size - 1]?.noticias?.length === 0; //{"noticias":[]} <- Vacio
    const isReachingEnd = isEmpty || (typeof data?.[size - 1] === "object" && data?.[size - 1]?.noticias?.length < PAGE_SIZE);

    return !data ? (
        <p>Loading...</p>
      ) : (
        <>
            <div>
                <h1>{isLoadingInitialData}</h1>
                <h1>{isLoadingMore}</h1>
                <h1>{isEmpty}</h1>
                <h1>{isReachingEnd}</h1>
            </div>

            <div>
                <NewsDestacada/>
            </div>

            <Divider/>

            <div>
                <Row justify="center" gutter={30}>
                    <Col>
                        <Title level={1}>Noticias:</Title>
                    </Col>
                </Row>

                {news?.flat()?.map(cNews => (
                    <NewsTemplate key={cNews._id} news={cNews}></NewsTemplate>
                   
                ))}
            </div>
            <div>

                <Row justify="center" gutter={30}>
                    <Col>
                    <Button 
                        type="primary"
                        disabled={isLoadingMore || isReachingEnd}
                        onClick={() => setSize(size + 1)}
                        >
                        {
                            isLoadingMore
                            ? "Cargando..."
                            : isReachingEnd
                                ? "No hay mas noticias..."
                                : "Cargar mas noticias"
                        }
                    </Button>
                    </Col>
                </Row>
            </div>
        </>
      )
}

export default Home
