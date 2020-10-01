import React from 'react'
import { Typography, Row, Col } from "antd" 

const {Title} = Typography


const UserTaken = () => {
    return (
        <div>
                <Row justify="center" gutter={30}>
                    <Col>
                        <Title level={1}>Este email ya esta asociado en nuestro sistema, favor de utilizar otro</Title>
                    </Col>
                </Row>
        </div>
    )
}

export default UserTaken
