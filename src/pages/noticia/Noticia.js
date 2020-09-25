import React, {useState, useEffect, useRef} from 'react'
import NewComment from "../../components/NewComment"
import {Button, Row, Col, Typography, Divider, Modal} from 'antd'; 
import {getNoticiaService} from "../../services/noticia"
const { Title } = Typography;


const Noticia = (props) => {

    const noticiaId = props.match.params.noticiaId;
    const [currentNoticia, setCurrentNoticia] = useState(null)
    const [showModalAgregar, setShowModalAgregar] = useState(false)
    const childRef = useRef();

    useEffect(()=> {
        async function getNoticia(){
            let {data: result} = await getNoticiaService(noticiaId);
            setCurrentNoticia(result)
        }        
        getNoticia()

    }, [])


    return (
        (currentNoticia && currentNoticia.noticiaAprobada) ? (
            <>
                <Row gutter={[16,16]}>
                    <Col xs={24}>
                        <Title level={2}>{currentNoticia.titulo}</Title>
                    </Col>
                </Row>
                <Row gutter={[16,16]}>
                    <Col xs={24}>
                        <Title level={2}>{currentNoticia.contenido}</Title>
                    </Col>
                </Row>
                <Divider/>

                <Button block onClick={() => setShowModalAgregar(true)}>
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
                    <NewComment ref={childRef} noticiaId={currentNoticia._id} titulo={currentNoticia.titulo} />
                </Modal>

                <Divider/>
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
