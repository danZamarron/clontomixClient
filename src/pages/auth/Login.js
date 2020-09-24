import React, {useState, useContext} from 'react'
import { Form, Input, Button, Divider, Row, Col, Typography} from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import {loginService} from "../../services/auth"
import { MyContext } from "../../context"

let baseURL
const { Title } = Typography;

process.env.NODE_ENV === "production"
  ? (baseURL = "https://murmuring-reaches-95521.herokuapp.com")
  : (baseURL = "http://localhost:4000")


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

const Login = (props) => {
    const [form] = Form.useForm();
    const [showErrors, setShowErrors] = useState(false)
    const [showMsg, setShowMsg] = useState("")
    const { setCtxUser } = useContext(MyContext)

    const onFinish = async values => {    
            setShowErrors(false)
            let result = await loginService(values)
            if(result.status === 200){
                result.data.password = "";
                setCtxUser(result.data)
                props.history.push("/")
            }
            else
            {
                console.log(result)
                setShowErrors(true)
                setShowMsg(result.message)
            }
        };

    return (
    <div>
        <Form
        name="normal_login"
        form={form}
        layout="vertical"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        >
            <Form.Item
                name="email"
                label="Email"
                rules=
                {[
                    {
                    type: 'email',
                    message: 'El email no es valido',
                    },
                    {
                    required: true,
                    message: 'Favor de introducir su email',
                    },
                ]}
            >
                <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="usuario@clontomix.com" />
            </Form.Item>
            <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: 'Favor de introducir su password!' }]}
            >
                <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password..."
                />
            </Form.Item>

            
            <Row justify="center">
                <Col {...tailFormItemLayout}>
                    {showErrors && <Title level={5} type="warning">{showMsg}</Title>}
                </Col>
            </Row>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" className="login-form-button" block style={{marginTop:"30px"}}>
                Log in
                </Button>
            </Form.Item>
        </Form>
        
        <Divider>Or</Divider>

        <Row>
            <Col xs={24} sm={{span:12, offset:6}} >
            <Button danger type='primary' block style={{ marginTop:"20px"}}>
                <div style={{display:"flex", justifyContent:"center"}}>
                    <span><strong>G</strong></span>
                    <a style={{marginLeft:"30px", color: "white", textDecoration: "none !important"}}href={`${baseURL}/auth/google`}>
                        Login con Google
                    </a>
                </div>
            </Button>
            </Col>
        </Row>

    </div>
    );
}

export default Login