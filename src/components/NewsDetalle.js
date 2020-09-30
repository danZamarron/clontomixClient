import React from 'react'
import {Row, Col, Typography, Card, Divider, Image} from "antd"
import ReactPlayer from "react-player"
import { DateTime } from "luxon"

const { Title, Text } = Typography;

 const NewsDetalle = (props) => {

    let noticia = props.news;

    return (
        <>
            <Col sm={24} md={{span:16, offset:4}}>
                    <Card 
                        style={{marginBottom:"30px", borderRadius:"10px"}}
                        title={
                            <Title level={2}>{noticia.titulo}</Title>
                            } 
                        bordered={false}
                        cover=
                        {
                            (noticia.tipoPresentacion === "Imagen") ? 
                            (
                                <center>
                                    <img 
                                    style={{marginTop:"30px"}}
                                        alt="example"
                                        src={noticia.imgArray?.[0]}
                                    />
                                </center>
                            ) 
                            :
                            (
                                <center><ReactPlayer url='https://youtu.be/n25nqibaIDg' style={{marginTop:"30px"}} light={true}/></center>
                            )
                        }
                    
                    >
                        <Row gutter={[0, 50]}>
                            <Col>
                                <p style={{fontSize:"16px"}}>{noticia.contenido}</p>
                            </Col>
                        </Row>                        
                        <Row gutter={[0, 50]}>
                            <Col>
                                {
                                    noticia.imgArray.map(img => (
                                        
                                        <Image
                                            style={{marginLeft:"20px"}}
                                            width={100}
                                            height={100}
                                            src={img}
                                        />
                                    ))
                                }
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
                    </Card>
            </Col>
        </>
    )
}

export default NewsDetalle;