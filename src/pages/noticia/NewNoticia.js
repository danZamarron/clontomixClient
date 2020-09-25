import React, {useState} from 'react'
import {Form, Input, Button, Row, Col, Typography, DatePicker, Select} from 'antd'; 
import {addNoticiaService} from "../../services/noticia"
import moment from "moment"

const { TextArea } = Input;
const { Option } = Select
const { Title } = Typography;
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


const NewNoticia = () => {
    const [form] = Form.useForm();
    const [showErrors, setShowErrors] = useState(false)
    const [showMsg, setShowMsg] = useState("")

    const onFinish = async values => {
        setShowErrors(false)
        let result = await addNoticiaService(values)
        if(result.status === 200)
            alert("Todo bien")
        else
        {
            console.log(result)
            setShowErrors(true)
            setShowMsg(result.message)
        }
    };
    

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
                rules={[{ required: true, message: 'Es necesario escoger un tipo' }]}
            >
                    <Select defaultValue="Editorial">
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
                    Añadir Noticia
                </Button>
            </Form.Item>
            </Form>
        </div>
    )
}

export default NewNoticia