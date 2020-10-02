import React from 'react'
import {Row, Col, Typography, Card, Divider} from "antd"
import ReactPlayer from "react-player"
import { Link } from "react-router-dom"
import { DateTime } from "luxon"

const { Title, Text } = Typography;

 const NewsTemplate = (props) => {

    let noticia = props.news;

    return (
        <>
            <Col sm={24} md={{span:16, offset:4}}>
                
                    <Card 
                        style={{marginBottom:"30px", minHeight:"400px"}}
                        title={<Title level={3}>{noticia.titulo}</Title>} 
                        bordered={false}
                        cover=
                        {
                            (noticia.tipoPresentacion === "Imagen") ? 
                            (
                                <center>
                                    <img 
                                        style={{marginTop:"30px", width:"100%"}}
                                        alt="example"
                                        src={noticia?.img}
                                    />
                                </center>
                            ) 
                            :
                            (
                                <center><ReactPlayer url={noticia?.ytLink} style={{marginTop:"30px", width:"100%"}}/></center>
                            )
                        }
                    
                    >
                        <Row gutter={[0, 50]}>
                            <Col>
                                {noticia.contenido.length > 500 ? noticia.contenido.substring(0,497).concat("...") :  noticia.contenido}
                            </Col>
                        </Row>
                        <Divider></Divider>
                        <Row>
                            <Col span={12}>
                                <Text strong>Autor:</Text> {noticia.idUser.username}
                            </Col>
                            <Col span={12}>
                                <Text strong>Fecha de Publicacion:</Text> {DateTime.fromISO(noticia.fechaParaPublicacion).toLocaleString()}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Text strong>{noticia.idComentarios.length}</Text> comentario(s) 
                            </Col>
                            <Col span={12}>
                                <Text strong>Tipo de Noticia:</Text> {noticia.tipoNoticia}
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col justify="center" align="middle"  style={{marginTop:"20px"}}span={24}>
                                <Title level={3}>
                                    <Link to={`/noticia/${noticia._id}`}>
                                        Ir a leer la noticia
                                    </Link>
                                </Title> 
                            </Col>
                        </Row>
                </Card>
            </Col>
        </>
    )
}

export default NewsTemplate;