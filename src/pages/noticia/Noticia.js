import React, {useState, useEffect, useRef, useContext} from 'react'
import NewComment from "../../components/NewComment"
import {Button, Row, Col, Typography, Divider, Modal} from 'antd'; 
import NewsDetalle from "../../components/NewsDetalle"
import NewsComments from "../../components/NewsComments"
import {getNoticiaService} from "../../services/noticia"
import { Link } from "react-router-dom"
import { MyContext } from "../../context"

const { Title } = Typography;

const Noticia = (props) => {

    const noticiaId = props.match.params.noticiaId;
    const [currentNoticia, setCurrentNoticia] = useState(null)
    const [showModalAgregar, setShowModalAgregar] = useState(false)
    const [addedComment, setAddedComment] = useState(false)
    const childRef = useRef();
    const { user } = useContext(MyContext)


    useEffect(()=> {
        async function getNoticia(){
            let {data: result} = await getNoticiaService(noticiaId);
            setCurrentNoticia(result)
        }        
        getNoticia()
        setAddedComment(false)
    }, [addedComment])


    return (
        (currentNoticia && currentNoticia.noticiaAprobada) ? (
            <>

                <NewsDetalle news={currentNoticia}/>                
                
                <Row gutter={[16,16]}>
                    <Col sm={24} md={{span:16, offset:4}}>                    
                        <Divider/>
                    </Col>
                </Row>

                    <Row gutter={[16,16]}>
                        <Col sm={24} md={{span:16, offset:4}}>

                            

                             {!user ? 
                                (
                                    <Link to="/login">
                                        <Button type='primary' block>
                                            Necesitas hacer login para escribir comentarios
                                        </Button>
                                    </Link>
                                ) : 
                                (
                                    <>
                                    <Button block type="primary" onClick={() => setShowModalAgregar(true)}>
                                        Agrega un Comentario
                                    </Button>

                                    <Modal
                                        centered
                                        title={'Agrega Comentario a ' + currentNoticia.titulo}
                                        visible={showModalAgregar}
                                        onCancel={() => setShowModalAgregar(false)}
                                        onOk={() => {
                                            childRef.current.showAlert()
                                        }}
                                        width={700}

                                    >
                                        <NewComment ref={childRef} 
                                                    noticiaId={currentNoticia._id} 
                                                    titulo={currentNoticia.titulo} 
                                                    closeModal={setShowModalAgregar} 
                                                    addedComment={setAddedComment} />
                                    </Modal>
                                    </>
                                )
                             } 
                        </Col>
                    </Row>
                    
                <Row gutter={[16,16]}>
                    <Col sm={24} md={{span:16, offset:4}}>                    
                        <Divider/>
                    </Col>
                </Row>

                <Row gutter={[16,16]}>
                    <Col sm={24} md={{span:16, offset:4}}>
                        <Title level={4}>Comentarios</Title>
                    </Col>
                </Row>

                {currentNoticia.idComentarios.flat()?.map(comment => {                   
                    return <NewsComments key={comment._id} values={comment}/>
                })}

            </>
        )
        :
        (
            (currentNoticia && !currentNoticia.noticiaAprobada) ?(
            <>
                <Row gutter={[16,16]}>
                    <Col xs={24}>
                        <h1>Esta noticia se esta cocinando...</h1>
                    </Col>
                </Row>
            </> 
            )
            :
            (
                <h1>Esta noticia se esta preparando...</h1>
            )
        )
    )
}

export default Noticia
