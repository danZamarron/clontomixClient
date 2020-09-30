import React, {useState, useEffect,forwardRef, useImperativeHandle} from 'react'
import { Form, Input, Row, Col, Typography, message } from "antd"
import {editComentarioService} from "../services/comentario"

const { TextArea } = Input;
const { Title } = Typography;
const successMsg = () => message.success('Se edito el comentario satisfactoriamente');

const EditComment = forwardRef((props, ref) => {
    const {_id, comentario, idNoticia: {titulo}} = props.comment;
    const {closeModal, changeData} = props
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
            console.log("dismount")
            form.resetFields(["comentario"])
        };
      }, [_id]);


      async function submitFormFromChild(values){        
        setShowErrors(false)
        let result = await editComentarioService(_id, values)
        if(result.status === 201 || result.status === 200){
            successMsg();
            closeModal(false)
            changeData(true)
        }
        else
        {
            console.log(result)
            setShowErrors(true)
            setShowMsg(result.message)
        }
      }

    return (

        <>

            <Form layout='vertical' form={form} onFinish={submitFormFromChild}>
                  
                <Form.Item
                    name="comentario"
                    label={`Edita el comentario de la noticia ${titulo}`}
                    initialValue={comentario}
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

export default EditComment
