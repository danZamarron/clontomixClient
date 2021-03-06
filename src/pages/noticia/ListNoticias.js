import React, {useState, useEffect, useContext} from 'react'
import { Link } from "react-router-dom"
import { Table, Space, Modal, Button, Row, Col, Typography, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {getAllNoticiasByUserParamService, deleteNoticiaService } from "../../services/noticia"
import { MyContext } from "../../context"
import moment from "moment"

const dateFormat = 'DD/MM/YYYY';
const { Column } = Table;
const { confirm } = Modal;
const { Title } = Typography;
const successMsg = () => message.success('Se elimino la noticia satisfactoriamente');
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

async function deleteNoticia(noticiaId)
{
    let result = await deleteNoticiaService(noticiaId)
    if(result.status === 200 || result.status === 201)
        successMsg()
}

const ListNoticias = () => {
    const [deletedNoticia, setDeletedNoticia] = useState(false)
    const [noticiasByUser, setNoticiasByUser] = useState([]);
    const { user } = useContext(MyContext)
    
    function showDeleteConfirm({titulo, _id: noticiaId}) {
        confirm({
          title: `Borrar Noticia`,
          icon: <ExclamationCircleOutlined />,
          content: `En verdad deseas eliminar la noticia: ${titulo}`,
          okText: 'Si',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            deleteNoticia(noticiaId)
            setDeletedNoticia(true)
          },
          onCancel() {
          },
        });
      }

    useEffect(()=> {
        async function getNoticiaByUser(){
            let {data: result} = await getAllNoticiasByUserParamService(user?._id);
            setNoticiasByUser(result)
        }
        
        getNoticiaByUser()
        setDeletedNoticia(false)

    }, [deletedNoticia, user])


    return (
        <div>
            <Row justify="center" gutter={24}>
                <Col {...tailFormItemLayout}>
                    <Title level={3}>Mis noticias publicadas</Title>
                </Col>
            </Row>
        {            
            (!noticiasByUser) ? (<h1>Hola</h1>) : 
            (
            <Table key={"x"} rowKey={record => record._id} dataSource={noticiasByUser}>
                <Column title="Titulo de la Noticia" dataIndex="titulo" key="titulo" />
                <Column title="Aprobada" dataIndex="noticiaAprobada" key="noticiaAprobada" 
                    render={(text, record) => (
                        record.noticiaAprobada ? "Si" : "no"
                    )}
                    />
                <Column
                    title="Fecha para Publicar"
                    dataIndex="fechaParaPublicacion"
                    key="fechaParaPublicacion"
                    render={(text, record) => (
                        moment(record.fechaParaPublicacion).format(dateFormat))
                    }
                />
                <Column
                title="Editar"
                key="editar"
                render={(text, record) => (
                    <Space size="middle">
                        
                        
                        <Button type="primary">
                            <Link to={`/editNoticia/${record._id}`}>Editar Noticia</Link>
                        </Button>
                    </Space>
                )}
                />
                <Column
                title="Borrar"
                key="Borrar"
                render={(text, record) => (
                    <Space size="middle">
                    <Button onClick={() => showDeleteConfirm(record)} danger type="dashed">
                        Borrar Noticia
                    </Button>
                    </Space>
                )}
                />
            </Table>
            )
        }        
        </div>
    )
}

export default ListNoticias
