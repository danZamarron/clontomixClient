import React, {useState, useEffect} from 'react'
import { Carousel, Row, Col, Typography} from 'antd';
import {getNoticiaDestacadaService} from "../services/destacado"
import { Link } from "react-router-dom"

const { Title } = Typography;

const NewsDestacada = () => {

    const [dataNews, setDataNews] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        async function getData(){            
            let {data} = await getNoticiaDestacadaService();
            setDataNews(data)
            setLoading(false)
        }
        getData()
        return function cleanup() {
        };
      },[]);

      const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: "#45b4df",        
        objectPosition: "center",
        objectFit: "cover"
      };

        if(loading)
        return <>Loading</> 

        if(!loading && !dataNews)
        return <></> 

        if (!loading && dataNews)
        return (
            <>
                <Row justify="center" gutter={30}>
                    <Col>
                        <Title level={1}>Noticias Destacadas:</Title>
                    </Col>
                </Row>

                <Row justify="center">
                    <Col sm={24} md={{span:16}}>
                        <Carousel autoplay>
                            {dataNews?.map(cNews => (
                                <Link to={`/noticia/${cNews.idNoticia._id}`}>
                                <div name="Hola" key={cNews._id}>
                                    <h3 style={contentStyle}>{cNews.idNoticia.titulo}</h3>
                                </div>
                                </Link>
                            ))}
                        </Carousel>
                    </Col>
                </Row>
            </>
        )

        return (<></>)
}
    


export default NewsDestacada
