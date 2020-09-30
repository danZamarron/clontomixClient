import React, {useState, useEffect, useContext} from 'react'
import { Redirect } from "react-router-dom"
import { Table, Space, Modal, Button, Row, Col, Typography, message} from 'antd';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import {getAllNoticiasDestacadasService } from "../../services/noticia"
import {addNoticiaDestacadaService, deleteNoticiaDestacada } from "../../services/destacado"
import { MyContext } from "../../context"

const { Column } = Table;
const { confirm } = Modal;
const { Title } = Typography;
const successMsg = () => message.success('Se agrego una noticia como destacada');
const successMsgDelete = () => message.success('Se elimino la noticia como destacada');
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

const addNoticiaD = async (noticiaId) =>
{
    let result = await addNoticiaDestacadaService(noticiaId)
    if(result.status === 200)
        successMsg();
    else
    {
        console.log(result)
    }
}

const deleteNoticiaD = async (destacadoId) =>
{
    let result = await deleteNoticiaDestacada(destacadoId)
    if(result.status === 200)
        successMsgDelete();
    else
    {
        console.log(result)
    }
}

const DestacarNoticia = () => {


    const [accionNoticia, setAccionNoticia] = useState(false)
    const [noticiasDestacadas, setNoticiasDestacadas] = useState([]);
    const { user } = useContext(MyContext)


    function showAddConfirm({titulo, _id: noticiaId}) {
        confirm({
          title: `Destacar Noticia`,
          icon: <PlusOutlined />,
          content: `Destacar la noticia "${titulo}"?`,
          okText: 'Si',
          cancelText: 'No',
          cancelType: 'Dashed',
          centered: true,
          onOk() {
            addNoticiaD(noticiaId)
            setAccionNoticia(true)
          },
          onCancel() {
          },
        });
      }


      function showDeleteConfirm({titulo, esDestacado}) {
        confirm({
          title: `Eliminar Noticia Destacada`,
          icon: <ExclamationCircleOutlined />,
          content: `Eliminar la noticia "${titulo}" como destacada?`,
          okText: 'Si',
          cancelText: 'No',
          cancelType: 'Dashed',
          centered: true,
          onOk() {
            let destacadoId = esDestacado?.[0]?._id;
            deleteNoticiaD(destacadoId)
            setAccionNoticia(true)
          },
          onCancel() {
          },
        });
      }

    useEffect(()=> {
        async function getNoticiasNotApproved(){
            let {data} = await getAllNoticiasDestacadasService();
            setNoticiasDestacadas(data)
        }
        
        getNoticiasNotApproved()
        setAccionNoticia(false)

    }, [accionNoticia, user])


    if(!user || (user && user.roleType !== "Admin"))
    {
        return <Redirect to="/" />
    }
    else{

        return (<div>
            <Row justify="center" gutter={24}>
                <Col {...tailFormItemLayout}>
                    <Title level={3}>Mis noticias publicadas</Title>
                </Col>
            </Row>
                 
            <Table key={"x"} rowKey={record => record._id} dataSource={noticiasDestacadas}>
                <Column title="Titulo de la Noticia" dataIndex="titulo" key="titulo" />
                <Column
                title="Accion"
                key="Accion"
                align="center"
                render={(text, record) => (
                    <>
                        {
                            (record.esDestacado?.length === 0) ?
                            (
                                <Button onClick={() => showAddConfirm(record)} type="primary">
                                    Destacar Noticia
                                </Button>
                            )
                            :
                            (
                                <Button onClick={() => showDeleteConfirm(record)} type="danger">
                                    Quitar Noticia Destacada
                                </Button>
                            )
                            
                        }
                        
                    </>
                )}
                />
            </Table>
            
                
        </div>)
    }

}

export default DestacarNoticia
