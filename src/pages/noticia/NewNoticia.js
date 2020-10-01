import React, {useState, useContext} from 'react'
import {Form, Input, Button, Row, Col, Typography, DatePicker, Select, message} from 'antd'; 
import UploadPhotos from "../../components/UploadPhotos"
import {addNoticiaService} from "../../services/noticia"
import moment from "moment"

import { Redirect } from "react-router-dom"
import { MyContext } from "../../context"

const { TextArea } = Input;
const { Option } = Select
const { Title } = Typography;
const dateFormat = 'DD/MM/YYYY';
const currentDate = moment().format(dateFormat)
const successMsg = () => message.success('Se agrego la noticia satisfactoriamente');


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


const NewNoticia = (props) => {
    const [form] = Form.useForm();
    const [showErrors, setShowErrors] = useState(false)
    const [showMsg, setShowMsg] = useState("")

    const [showLinkInput, setShowLinkInput] = useState(false)
    const [arrayImgUrl, setArrayImgUrl] = useState([])
    const [actualPhoto, setActualPhoto] = useState("")
    const { user } = useContext(MyContext)

    const onFinish = async values => {
        setShowErrors(false)

        if(arrayImgUrl.length === 0)
        {            
            setShowErrors(true)
            setShowMsg("Es necesario agregar imagenes")
            return false;
        }

        let result = await addNoticiaService({...values, imgArray: arrayImgUrl, img: actualPhoto})
        if(result.status === 200 || result.status === 201){
            successMsg();
            props.history.push("/")
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

    if(!user || (user && user.roleType === "User"))
    {
        return <Redirect to="/" />
    }

    return (
        <div>
            <Row justify="center" gutter={16}>
                <Col {...tailFormItemLayout}>
                    <Title level={2}>Agregar Noticia</Title>
                </Col>
            </Row>

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
                rules={[{ required: true, message: 'Favor de agregar un titulo', whitespace: true }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="contenido"
                label="Contenido de la Noticia"
                rules={[{ required: true, message: 'Es necesario agregar contenido a la noticia', whitespace: true }]}
            >
                <TextArea />
            </Form.Item>
            <Form.Item
                name="fechaParaPublicacion"
                label="Cuando se publica la noticia"
            >
                <DatePicker placeholder="Elige Fecha" defaultValue={moment(currentDate, dateFormat)} format={dateFormat}/>
            </Form.Item>
            <Form.Item
                name="tipoNoticia"
                label="Tipo de Noticia"
                initialValue="Editorial"
                rules={[{ required: true, message: 'Es necesario escoger un tipo' }]}
            >
                    <Select >
                        <Option value="Editorial">Editorial</Option>
                        <Option value="Rumor">Rumor</Option>
                        <Option value="Review">Review </Option>
                    </Select>
            </Form.Item>
            <Form.Item
                name="tipoPresentacion"
                label="Tipo de Portada (Imagen o Video)"
                initialValue="Imagen"
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

            
            <Row justify="center">
                <Col {...tailFormItemLayout}>
                    {showErrors && <Title level={5} type="warning">{showMsg}</Title>}
                </Col>
            </Row>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" block style={{marginTop:"30px"}}>
                    Añadir Noticia
                </Button>
            </Form.Item>
            </Form>
        </div>
    )
}

export default NewNoticia