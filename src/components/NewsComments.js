import React from 'react'
import { Comment, Tooltip, Avatar, Row, Col } from 'antd';
import { DateTime } from "luxon"

const NewsComments = (props) => {

    const comentario = props.values;

    const styleCustom={
        border: "1px solid black",
        borderRadius: "20px",
        padding: "20px",
        background: "white",
        marginBottom: "20px"
    }


    return (
                <Col sm={24} md={{span:16, offset:4}}>     
                <Comment
                style={styleCustom}
                author={<span style={{fontSize:"16px"}}>{comentario.idUser.username}</span>}
                avatar={
                    <Avatar className="extra" shape="square" size={64}
                    src={comentario.idUser.profilePicture}
                    alt={comentario.idUser.username}
                    />
                }
                content={
                    <p style={{fontSize:'16px'}}>
                    {comentario.comentario}
                    </p>
                }
                datetime={
                    <Tooltip title={DateTime.fromISO(comentario.createdAt).toLocaleString(DateTime.DATETIME_SHORT)}>
                        <span>{DateTime.local().toRelative({ base: DateTime.fromISO(comentario.createdAt) })}</span>
                    </Tooltip>
                }
                />
                </Col>
    )
}

export default NewsComments
