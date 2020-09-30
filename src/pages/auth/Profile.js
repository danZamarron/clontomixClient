import React, {useState, useEffect, useContext, useRef} from 'react' 
import {Form, Input, Button, Row, Col, Typography, Divider,  message, Table, Modal} from 'antd'; 
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from "axios"
import {updateProfileDataService, updateProfileAvatarService, getCurrentUserService} from "../../services/auth"
import {getComentariosService, deleteComentarioService} from "../../services/comentario"
import { MyContext } from "../../context"
import {DateTime} from "luxon"
import EditComment from "../../components/EditComment"

const { Title } = Typography;
const { Column } = Table;
const { confirm } = Modal;
const { TextArea } = Input;
const successMsg = () => message.success('Se actualizo los datos satisfactoriamente');
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dsrw38rwx/image/upload"
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

const Profile = () => {

    const [form] = Form.useForm()
    const [showErrors, setShowErrors] = useState(false)
    const [showMsg, setShowMsg] = useState("")
    
    const [updateData, setUpdateData] = useState(false)
    const [updateAvatar, setUpdateAvatar] = useState(false)
    const [updateTable, setUpdateTable] = useState(false)
    const {setCtxUser, user} = useContext(MyContext)

    const [dataComentarios, setDataComentarios] = useState(null)
    const [showEditModal, setShowEditModal] = useState(false)
    const [objEditData, setObjEditData] = useState({})
    const childRef = useRef();
    

    const formUpdateDataValues = async values => {
        let result = await updateProfileDataService(values)
        if(result.status === 201 || result.status === 200){
            successMsg();
            const {
                data: { user }
              } = await getCurrentUserService()
              setCtxUser(user)
            setUpdateData(true)
        }
        else
        {
            console.log(result)
            setShowErrors(true)
            setShowMsg(result.message)
        }
    }

    const onChangeAvatarUpdate = async ({ target: { files } }) => {

        const formdata = new FormData()
        formdata.append("file", files[0])
        formdata.append("upload_preset", "ma1cews4")
        const {
          data: { secure_url }
        } = await axios.post(CLOUDINARY_URL, formdata)


        let result = await updateProfileAvatarService(secure_url)
        if(result.status === 201 || result.status === 200){
            successMsg();
            const {
                data: { user }
              } = await getCurrentUserService()
              setCtxUser(user)
            setUpdateAvatar(true)
        }
        else
        {
            console.log(result)
            setShowErrors(true)
            setShowMsg(result.message)
        }
    }

    function showDeleteConfirm({idNoticia: {titulo: tituloNoticia}, _id: comentarioId}) {
        confirm({
          title: `Eliminar Comentario`,
          icon: <ExclamationCircleOutlined />,
          content: `Desea eliminar el comentario en la noticia ${tituloNoticia}"?`,
          okText: 'Si',
          okType: 'Primary',
          cancelText: 'No',
          centered: true,
          async onOk() {
            await deleteComentarioService(comentarioId)
            setUpdateTable(true)
          },
          onCancel() {
          },
        });
      }


    useEffect(() => {

        async function getComentariosUser(){
            
            let {data: { comentariosPorUser }} = await getComentariosService();
            setDataComentarios(comentariosPorUser)
        }
        
        getComentariosUser()
        
        setUpdateTable(false)
        setUpdateAvatar(false)
        setUpdateData(false)

    }, [updateData, updateAvatar, updateTable])




    return (
        
            (user ? 
                (
                    <div>
                        <Row gutter={24}>
                            <Col {...tailFormItemLayout}>
                                <Title level={2}>Mi Perfil</Title>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12}>
                                <Form layout='vertical' form={form} onFinish={formUpdateDataValues}>
                    
                                    <Form.Item
                                        name="facebook"
                                        label={"Facebook Link"}
                                        initialValue={user?.facebook}
                                    >
                                        <Input/>
                                    </Form.Item>                                    
                                    
                                    <Form.Item
                                        name="twitter"
                                        label={"Twitter Link"}
                                        initialValue={user?.twitter}
                                    >
                                        <Input/>
                                    </Form.Item>                                    
                                    
                                    <Form.Item
                                        name="acercaDe"
                                        label={"Acerca de ti"}
                                        initialValue={user?.acercaDe}
                                    >
                                        <TextArea allowClear rows={4}/>
                                    </Form.Item>
                    
                                    <Row justify="center">
                                        <Col xs={24}>
                                            {showErrors && <Title level={5} type="warning">{showMsg}</Title>}
                                        </Col>
                                    </Row>                    
                                    
                                    <Form.Item {...tailFormItemLayout}>
                                        <Button type="primary" htmlType="submit" block style={{marginTop:"30px"}}>
                                            Actualizar Datos
                                        </Button>
                                    </Form.Item>

                                </Form>
                            </Col>
                            <Col xs={12} >
                                <Row justify="center" align="middle" style={{marginBottom:"40px"}}>
                                    <img style={{objectFit:"cover", width:"300px", height:"300px", borderRadius:"200px"}} alt="perfil" src={user?.profilePicture}></img>

                                </Row>
                                <Row justify="center" align="middle">
                                    <input type="file" id="file" onChange={onChangeAvatarUpdate}/> 
                                    <label htmlFor="file">Upload</label>
                                </Row>
                                
                            </Col>
                        </Row>

                        <Divider />

                        <Row justify="center" gutter={24}>
                            <Col {...tailFormItemLayout}>
                                <Title level={3}>Mis comentarios </Title>
                            </Col>
                        </Row>
                            
                        <Table key={"comentarios"} rowKey={record => record._id} dataSource={dataComentarios}>
                            <Column title="Titulo de la Noticia" dataIndex="idNoticia.titulo" key="idNoticia.titulo" 
                            render={(text, record) => (
                                record.idNoticia.titulo
                            )}


                            />
                            <Column title="Comentario" dataIndex="comentario" key="comentario" />

                            <Column title="Fecha" dataIndex="createdAt" key="createdAt" 
                            render={(text, record) => (
                                DateTime.fromISO(record.createdAt).toLocaleString(DateTime.DATETIME_SHORT)
                            )}
                            />
                            <Column
                                title="Editar Comentario"
                                key="Editar"
                                render={(text, record) => (
                                    <>
                                        <Button onClick={() => {
                                            setShowEditModal(true)
                                            setObjEditData(record)
                                        }}  type="primary">
                                            Editar
                                        </Button>
                                    </>
                            )}
                            />
                            <Column
                                title="Borrar Comentario"
                                key="Borrar"
                                render={(text, record) => (
                                    <>
                                        <Button onClick={() => showDeleteConfirm(record)} type="danger">
                                            Borrar
                                        </Button>
                                    </>
                            )}
                            />
                        </Table>
                        
                        <Modal
                                centered
                                title={'Agrega Comentario a ' + objEditData?.idNoticia?.titulo}
                                visible={showEditModal}
                                onCancel={() => setShowEditModal(false)}
                                onOk={() => {
                                    childRef.current.showAlert()
                                }}
                                okType="primary"
                                width={700}
                            >
                                <EditComment ref={childRef} comment={objEditData} closeModal={setShowEditModal} changeData={setUpdateTable}/>
                            </Modal>

                    </div>
                ) 
                : 
                (
                    <div></div>
                ))

        
    )
}

export default Profile
