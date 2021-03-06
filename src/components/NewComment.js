import React, {useState, useEffect,forwardRef, useImperativeHandle} from 'react'
import { Form, Input, Row, Col, Typography, message } from "antd"
import {addComentarioService} from "../services/comentario"

const { TextArea } = Input;
const { Title } = Typography;
const successMsg = () => message.success('Se agrego el comentario satisfactoriamente');

const NewComment = forwardRef((props, ref) => {
    const {noticiaId, titulo, closeModal, addedComment} = props;
    const [form] = Form.useForm()
    const [showErrors, setShowErrors] = useState(false)
    const [showMsg, setShowMsg] = useState("")

    useImperativeHandle(
        ref,
        () => ({
            showAlert() {
                form.submit()
            }
         }),
     )

     useEffect(() => {
        return function cleanup() {
            form.resetFields(["comentario"])
        };
      });


      async function submitFormFromChild(values){        
        setShowErrors(false)
        let result = await addComentarioService(noticiaId, values)
        if(result.status === 201 || result.status === 200){
            successMsg();
            closeModal(false)
            addedComment(true)
        }
        else
        {
            setShowErrors(true)
            setShowMsg(result.message)
        }
      }

    return (

        <>

            <Form layout='vertical' form={form} onFinish={submitFormFromChild}>
                  
                <Form.Item
                    name="comentario"
                    label={`Agrega un comentario a ${titulo}`}
                    rules={[{ min: 10, message:"Favor de escribir mas de 10 caracteres" },{ required: true, message: 'Favor de escribir un comentario', whitespace: true }]}
                >
                    <TextArea allowClear rows={8}/>
                </Form.Item>

                <Row justify="center">
                    <Col xs={24} sm={12}>
                        {showErrors && <Title level={5} type="warning">{showMsg}</Title>}
                    </Col>
                </Row>

            </Form>
        </>

    )
})

export default NewComment
