import React, {useState} from 'react'
import {Form, Input, Button, Row, Col, Typography, message} from 'antd'; 

import {signupService} from "../../services/auth"

const { Title } = Typography;
const successMsg = () => message.success('Gracias por registrarse!');

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

const SignUp = (props) => {
    const [form] = Form.useForm();
    const [showErrors, setShowErrors] = useState(false)
    const [showMsg, setShowMsg] = useState("")

    const onFinish = async values => {
        setShowErrors(false)
        let result = await signupService(values)
        if(result.status === 200){
          successMsg();
          props.history.push("/login")
        }
        else
        {
            console.log(result)
            setShowErrors(true)
            setShowMsg(result.message)
        }
    };
    
    return (
      <>
        <Row justify="center" gutter={24}>
                <Col {...tailFormItemLayout}>
                    <Title level={3}>Registro</Title>
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
            name="username"
            label="Nombre"
            rules={[{ required: true, message: 'Favor de agregar un nombre de usuario', whitespace: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'El email no es valido',
              },
              {
                required: true,
                message: 'Favor de agregar un email',
              },
            ]}
          >
            <Input />
          </Form.Item>
    
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Favor de introducir un password',
              },
            ]}
            hasFeedback
          >          
              <Input.Password />
          </Form.Item>
    
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Favor de confirmar su password',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Las password no coinciden');
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Row justify="center">
            <Col {...tailFormItemLayout}>
                {showErrors && <Title level={5} type="warning">{showMsg}</Title>}
            </Col>
          </Row>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" block style={{marginTop:"30px"}}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </>
      );
}

export default SignUp