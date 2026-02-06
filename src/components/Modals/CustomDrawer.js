import React from "react";
import { Col, Divider, Drawer, Row } from "antd";
import { FaRegCalendarCheck, FaRegCalendarDays, FaUser } from "react-icons/fa6";
import { getRoleIcon } from "../../utils/validators";

const CustomDrawer = ({ open, onClose, storeData }) => {
    return (
        <Drawer
            title={storeData?.title || "Drawer Title"}
            width={600}
            closable={true}
            onClose={onClose}
            open={open}
        >
            <p>{storeData?.description}</p>
            <Row gutter={24}>
                <Col span={13} style={{display:"flex"}}>
                    <FaRegCalendarCheck />
                    <span style={{ fontWeight: 600, marginLeft: "0.5rem" }}>Publish Date:</span>
                    <span style={{ marginLeft: "0.5rem" }}>{storeData?.publishDate}</span>
                </Col>
                <Col span={11} style={{display:"flex"}}>
                    <FaRegCalendarDays />
                    <span style={{ fontWeight: 600, marginLeft: "0.5rem" }}>Notice Date:</span>
                    <span style={{ marginLeft: "0.5rem" }}>{storeData?.noticeDate}</span>
                </Col>
                <Col span={13} style={{ marginTop: 10, display:"flex" }}>
                    <FaUser />
                    <span style={{ fontWeight: 600, marginLeft: "0.5rem" }}>Created By:</span>
                    <span style={{ marginLeft: "0.5rem" }}>{storeData?.createdBy}</span>
                </Col>
            </Row>
            <Divider />
            <h3 style={{ fontWeight: 600 }}>Message To</h3>
            <div className="" style={{ display: "flex", alignItems: 'center' }}>
            {
                storeData?.role?.map((role, ind) => (
                    <div key={ind} className="" style={{ display: "flex", alignItems: 'center', marginLeft:"0.5rem" }}>
                        {role && getRoleIcon(role?.name)}
                        <span style={{marginLeft:"0.2rem"}}>{role?.name}</span>
                    </div>
                ))
            }
            </div>
        </Drawer>
    );
};

export default CustomDrawer;
