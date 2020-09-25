import React, {useState, useEffect} from 'react'
import {Form, Input, Button, Row, Col, Typography, DatePicker, Select} from 'antd'; 
import {getNoticiaService, editNoticiaService} from "../../services/noticia"
import moment from "moment"
import Moment from "react-moment"

const { TextArea } = Input;
const { Option } = Select
const { Title, Text} = Typography;
const dateFormat = 'DD/MM/YYYY';
const currentDate = moment().format(dateFormat)

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

    const onFinish = async values => {
        setShowErrors(false)
        let result = await editNoticiaService({...values,noticiaId})
        if(result.status === 201)
            alert("Todo bien")
        else
        {
            console.log(result)
            setShowErrors(true)
            setShowMsg(result.message)
        }
    };

    useEffect(()=> {
        async function getNoticia(){
            let {data: result} = await getNoticiaService(noticiaId);
            console.log(result.fechaParaPublicacion)
            setCurrentNoticia(result)
        }
        
        getNoticia()

    }, [])

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