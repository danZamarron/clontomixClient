import React, {useState, useContext} from 'react'
import { Layout, Menu, message, Col, Row, Typography} from 'antd';
import { Link, NavLink } from "react-router-dom"
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
          <Sider collapsible collapsed={collapsedSlider} onCollapse={toCollapse}>
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
              {user && <Menu.Item key="5" icon={<LogoutOutlined />}>
                <Link to="/" icon={<LogoutOutlined />}onClick={logoutProcess}>logout</Link>
              </Menu.Item>}
              {user && (user.roleType === "Editor" || user.roleType === "Admin") && <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                <Menu.Item key="101"><Link to='/listNoticias'>Mis Noticias</Link></Menu.Item>
                <Menu.Item key="100"><Link to='/newNoticia'>Nueva Noticia</Link></Menu.Item>
                <Menu.Item key="102">Alex</Menu.Item>
              </SubMenu>}
              {user && user.roleType === "Admin" && <SubMenu key="sub2" icon={<UserOutlined />} title="Admin Menu">
                <Menu.Item key="200"><Link to='/admin/aprobarNoticia'>Aprobar Noticia</Link></Menu.Item>
              </SubMenu>}
              <Menu.Item key="9" icon={<FileOutlined />}><Link to='/logout'>Algo aqui</Link></Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0, backgroundColor: 'rgb(100,100,100,1)' }}>
                <Row justify = "center" align="middle">
                  <Col>
                    <Typography.Title level={1} style={{color:"White"}}>ClonTomix</Typography.Title>
                  </Col>
                </Row>
            </Header>
            <Content style={{ margin: '0 16px' }}>
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
