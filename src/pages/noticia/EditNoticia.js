import React, {useState, useEffect, useContext} from 'react'
import {Form, Input, Button, Row, Col, Typography, DatePicker, Select, message, Radio} from 'antd'; 
import UploadPhotos from "../../components/UploadPhotos"
import {getNoticiaService, editNoticiaService} from "../../services/noticia"
import moment from "moment"

import { Redirect } from "react-router-dom"
import { MyContext } from "../../context"

const { TextArea } = Input;
const { Option } = Select
const { Title, Text} = Typography;
const dateFormat = 'DD/MM/YYYY';
const currentDate = moment().format(dateFormat)
const successMsg = () => message.success('Se edito la noticia satisfactoriamente');

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 12,
      offset: 6,
    },
  },
};


const EditNoticia = (props) => {
    const [form] = Form.useForm();
    const [showErrors, setShowErrors] = useState(false)
    const [showMsg, setShowMsg] = useState("")
    const [currentNoticia, setCurrentNoticia] = useState(null)
    const noticiaId = props.match.params.noticiaId;
    const { user } = useContext(MyContext)

    
    const [showLinkInput, setShowLinkInput] = useState(false)
    const [arrayImgUrl, setArrayImgUrl] = useState([])
    const [actualPhoto, setActualPhoto] = useState("")
    const [deletePreviousPhotos, setDeletePreviousPhoto] = useState(false)

    const onFinish = async values => {
        setShowErrors(false)

        if(arrayImgUrl.length === 0 && deletePreviousPhotos)
        {            
            setShowErrors(true)
            setShowMsg("Es necesario agregar imagenes")
            return false;
        }

        let result = await editNoticiaService({...values,noticiaId, imgArray: arrayImgUrl, img: actualPhoto})
        if(result.status === 201){
            successMsg();
            props.history.push("/listNoticias")
        }
        else
        {
            setShowErrors(true)
            setShowMsg(result.message)
        }
    };

    const onChangeSelectTipoPresentacion = () => {
        setShowLinkInput(!showLinkInput)
    }

    const onChangeRadio = (e) => {
        setDeletePreviousPhoto(e.target.value)
    }

    useEffect(()=> {
        async function getNoticia(){
            let {data: result} = await getNoticiaService(noticiaId);
            setCurrentNoticia(result)
            setShowLinkInput(result.tipoPresentacion === "Video" ? true : false)
        }
        
        getNoticia()

    }, [])


    if(!user || (user && user.roleType === "User"))
    {
        return <Redirect to="/" />
    }


    return (
        currentNoticia ? (            

        <div>
            <Row justify="center" gutter={16}>
                <Col {...tailFormItemLayout}>
                    <Title level={2}>Editar Noticia</Title>
                </Col>
            </Row>
            
            {!currentNoticia.noticiaAprobada &&
            (<Row justify="center" gutter={16}>
                <Col {...tailFormItemLayout}>
                    <Text level={2} type="danger">Esta noticia aun no ha sido aprobada</Text>
                </Col>
            </Row>)
            }
            <Form
                layout="vertical"
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
            >
  
            <Form.Item
                name="titulo"
                label="Titulo de la Noticia"
                initialValue = {currentNoticia.titulo}
                rules={[{ required: true, message: 'Favor de agregar un titulo', whitespace: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="contenido"
                label="Contenido de la Noticia"
                initialValue = {currentNoticia.contenido}
                rules={[{ required: true, message: 'Es necesario agregar contenido a la noticia', whitespace: true }]}
            >
                <TextArea />
            </Form.Item>
            <Form.Item
                name="fechaParaPublicacion"
                label="Cuando se publica la noticia"
                initialValue = {moment(moment(currentNoticia.fechaParaPublicacion).format(dateFormat), dateFormat)}
            >
                <DatePicker placeholder="Elige Fecha" format={dateFormat}/>
            </Form.Item>
            <Form.Item
                name="tipoNoticia"
                label="Tipo de Noticia"
                initialValue = {currentNoticia.tipoNoticia}
                rules={[{ required: true, message: 'Es necesario escoger un tipo' }]}
            >
                    <Select>
                        <Option value="Editorial">Editorial</Option>
                        <Option value="Rumor">Rumor</Option>
                        <Option value="Review">Review </Option>
                    </Select>
            </Form.Item>

            
            <Form.Item
                name="tipoPresentacion"
                label="Tipo de Portada (Imagen o Video)"
                initialValue = {currentNoticia.tipoPresentacion}
                rules={[{ required: true, message: 'Es necesario escoger un tipo de presentacion' }]}
            >
                    <Select onChange={onChangeSelectTipoPresentacion}>
                        <Option value="Imagen">Imagen</Option>
                        <Option value="Video">Video</Option>
                    </Select>
            </Form.Item>

            <Form.Item
                name="ytLink"
                label="Link de Video Youtube"
                hidden={!showLinkInput}
                initialValue = {currentNoticia.ytLink}
                rules={[{ required:(showLinkInput ? true : false), message: 'Favor de agregar un link', whitespace: true }]}
            >
                <Input />
            </Form.Item>


            <Form.Item
                name="Imagenes"
                label="Imagenes"
            >
                <UploadPhotos setArrayPhotos={setArrayImgUrl} setPhotos={setActualPhoto}></UploadPhotos>
            </Form.Item>

            <Form.Item
                name="borrarPhoto"
                label="Eliminar Imagenes Anteriores"
                initialValue={false}
            >
                <Radio.Group onChange={onChangeRadio}>
                    <Radio.Button value={false}>Añadir</Radio.Button>
                    <Radio.Button value={true}>Reemplazar</Radio.Button>
                </Radio.Group>
            </Form.Item>

            <Row justify="start">
                <Col>
                    {!deletePreviousPhotos && <Title level={5} type="keyboard">Las imagenes nuevas se añaden</Title>}
                    {deletePreviousPhotos && <Title level={5} type="danger">Las imagenes nuevas reemplazan</Title>}
                </Col>
            </Row>
            
            <Row justify="center">
                <Col {...tailFormItemLayout}>
                    {showErrors && <Title level={5} type="warning">{showMsg}</Title>}
                </Col>
            </Row>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" block style={{marginTop:"30px"}}>
                    Editar Noticia
                </Button>
            </Form.Item>
            </Form>
        </div>
        ):
        (
            <div>Estoy cargando</div>
        )
    )
}

export default EditNoticia