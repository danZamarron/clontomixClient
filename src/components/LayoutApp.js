import React, {useState, useContext} from 'react'
import { Layout, Menu, message, Col, Row, Typography} from 'antd';
import { Link } from "react-router-dom"
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  LogoutOutlined,
  LoginOutlined,
  UserOutlined
} from '@ant-design/icons';

import { logoutService } from "../services/auth"
import { MyContext } from "../context"

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const LayoutApp = ({children}) => {
    let [collapsedSlider, setCollapsedSlider] = useState(false)
    const { clearCtxUser, user } = useContext(MyContext)

    const toCollapse = () => {
        setCollapsedSlider(!collapsedSlider)
    };

    const logoutProcess = async () => {
        await logoutService()
        clearCtxUser()
        message.success(`Has cerrado tu sesion!`);
      }

    return (
        <Layout style={{ minHeight: '100vh' }}>
          <Sider 
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}          
          >
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1" icon={<PieChartOutlined />}>
                <Link to='/'>Home</Link>
              </Menu.Item>
              {!user && <Menu.Item key="2" icon={<DesktopOutlined />}>
                <Link to='/signup'>Signup</Link>
              </Menu.Item>}
              {!user && <Menu.Item key="3" icon={<LoginOutlined />}>
                <Link to='/login'>Login</Link>
              </Menu.Item>}
              {user && <Menu.Item key="4" icon={<DesktopOutlined />}>
                <Link to='/profile'>Mi Perfil</Link>
              </Menu.Item>}
              {user && (user.roleType === "Editor" || user.roleType === "Admin") && <SubMenu key="sub1" icon={<UserOutlined />} title="Menu de Editor">
                <Menu.Item key="101"><Link to='/listNoticias'>Mis Noticias</Link></Menu.Item>
                <Menu.Item key="100"><Link to='/newNoticia'>Nueva Noticia</Link></Menu.Item>
              </SubMenu>}
              {user && user.roleType === "Admin" && <SubMenu key="sub2" icon={<UserOutlined />} title="Menu de Admin">
                <Menu.Item key="200"><Link to='/admin/aprobarNoticia'>Aprobar Noticia</Link></Menu.Item>
                <Menu.Item key="201"><Link to='/admin/destacarNoticia'>Destacar Noticia</Link></Menu.Item>
              </SubMenu>}
              {user && <Menu.Item key="5" icon={<LogoutOutlined />}>
                <Link to="/" icon={<LogoutOutlined />}onClick={logoutProcess}>Cerrar Sesion</Link>
              </Menu.Item>}
            </Menu>
          </Sider>
          <Layout className="site-layout" style={{ marginLeft: 200 }}>
            <Header className="site-layout-background" style={{ padding: 0, backgroundColor: 'rgb(100,100,100,1)' }}>
                <Row justify = "center" align="middle">
                  <Col>
                    <Typography.Title level={1} style={{color:"White"}}>ClonTomix</Typography.Title>
                  </Col>
                </Row>
            </Header>
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                {children}
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Clontomix ©2020. Creado por D Zam, diseño de Ant D</Footer>
          </Layout>
        </Layout>
      );
  
}

export default LayoutApp
