import React from 'react'
import {Row, Col, Typography, Card, Divider} from "antd"
import { Link } from "react-router-dom"
import { DateTime } from "luxon"

const { Title, Text } = Typography;

 const NewsTemplate = (props) => {

    let noticia = props.news;

    return (
        <>
            <Col sm={24} md={{span:16, offset:4}}>
                <Link to={`/noticia/${noticia._id}`}>
                    <Card 
                        style={{marginBottom:"30px", maxHeight:"400px"}}
                        title={noticia.titulo} 
                        bordered={false}
                        cover=
                        {
                            true ? (<div>algo</div>) :(<div>algo</div>)
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
                    </Card>
                </Link>
            </Col>
        </>
    )
}

export default NewsTemplate;