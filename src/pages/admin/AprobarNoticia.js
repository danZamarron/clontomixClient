import React, {useState, useEffect, useContext} from 'react'
import { Redirect } from "react-router-dom"
import { Table, Space, Modal, Button, Row, Col, Typography, message} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {getAllNoticiasNotApprovedService, approveNoticiaService } from "../../services/noticia"
import { MyContext } from "../../context"
import { DateTime } from "luxon"

const { Column } = Table;
const { confirm } = Modal;
const { Title } = Typography;
const successMsg = () => message.success('Se aprobo la noticia satisfactoriamente');
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

const approveNoticia = async (noticiaId) =>
{
    let result = await approveNoticiaService(noticiaId)
    if(result.status === 200)
        successMsg();
}

const AprobarNoticia = () => {


    const [approvedNoticia, setApprovedNoticia] = useState(false)
    const [noticiasNotApproved, setNoticiasNotApproved] = useState([]);
    const { user } = useContext(MyContext)


    function showApproveConfirm({titulo, _id: noticiaId}) {
        confirm({
          title: `Aprobar Noticia`,
          icon: <ExclamationCircleOutlined />,
          content: `Aprobar la noticia "${titulo}" para su publicacion?`,
          okText: 'Si',
          cancelText: 'No',
          cancelType: 'Dashed',
          centered: true,
          onOk() {
            approveNoticia(noticiaId)
            setApprovedNoticia(true)
          },
          onCancel() {
          },
        });
      }

    useEffect(()=> {
        async function getNoticiasNotApproved(){
            let {data: { noticiasNotApproved}} = await getAllNoticiasNotApprovedService();
            setNoticiasNotApproved(noticiasNotApproved)
        }
        
        getNoticiasNotApproved()
        setApprovedNoticia(false)

    }, [approvedNoticia, user])


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
                 
            <Table key={"x"} rowKey={record => record._id} dataSource={noticiasNotApproved}>
                <Column title="Titulo de la Noticia" dataIndex="titulo" key="titulo" />
                <Column
                    title="Fecha para Publicar"
                    dataIndex="fechaParaPublicacion"
                    key="fechaParaPublicacion"
                    render={(text, record) => (
                        DateTime.fromISO(record.fechaParaPublicacion).toLocaleString()
                    )
                    }
                />
                <Column
                title="Aprobar"
                key="Aprobar"
                render={(text, record) => (
                    <Space size="middle">
                    <Button onClick={() => showApproveConfirm(record)}  type="primary">
                        Aprobar Noticia
                    </Button>
                    </Space>
                )}
                />
            </Table>
            
                
        </div>)
    }

}

export default AprobarNoticia
