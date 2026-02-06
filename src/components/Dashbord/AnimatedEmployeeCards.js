import React from "react";
import { Card, Col, Row } from "antd";
import { motion } from "framer-motion";
import { FaMoneyBillAlt } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa6";
import { PiStudentBold, PiStudentFill } from "react-icons/pi";
import { RiAdminFill } from "react-icons/ri";
import { GiTeacher } from "react-icons/gi";
import { MdAccountBalance, MdAdminPanelSettings } from "react-icons/md";
import { IoLibrarySharp } from "react-icons/io5";
import { BsReception4 } from "react-icons/bs";


const stats = [
  {
    title: "Monthly Fees Collection",
    label:"$4,800.00",
    icon: <FaMoneyBillAlt style={{ fontSize: 40 }} />,
  },
  {
    title: "Monthly Expenses",
    label:"$1,000.00",
    icon: <FaCreditCard style={{ fontSize: 40 }} />,
  },
  {
    title: "Student",
    label:"100",
    icon: <PiStudentBold style={{ fontSize: 40 }} />,
  },
  {
    title: "Student Head Count",
    label:"100",
    icon: <PiStudentFill style={{ fontSize: 40 }} />,
  },
  {
    title: "Admin",
    label:"1",
    icon: <RiAdminFill style={{ fontSize: 40 }} />,
  },
  {
    title: "Teacher",
    label:"5",
    icon: <GiTeacher style={{ fontSize: 40 }} />,
  },
  {
    title: "Accountant",
    label:"1",
    icon: <MdAccountBalance style={{ fontSize: 40 }} />,
  },
  {
    title: "Librarian",
    label:"1",
    icon: <IoLibrarySharp style={{ fontSize: 40 }} />,
  },{
    title: "Receptionist",
    label:"1",
    icon: <BsReception4 style={{ fontSize: 40 }} />,
  },
  {
    title: "Super Admin",
    label:"1",
    icon: <MdAdminPanelSettings style={{ fontSize: 40 }} />,
  },
];

export default function AnimatedEmployeeCards({t}) {
  return (
    <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
      {stats.map((item, index) => (
        <Col xs={24} sm={12} md={8} lg={8} xl={6} key={index}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6, type: "spring" }}
          >
            <Card
              hoverable
              style={{ borderRadius: 12, boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}
            >
              <div style={{ display: "flex", }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {item.icon}
                </div>
                <div style={{display:'flex', alignItems:"flex-start", flexDirection:"column", marginLeft:"1.5rem"}}>
                  <span style={{ fontWeight: 500 }}>{t(item.title)}</span>
                <motion.span
                  style={{ fontWeight: 600 }}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.3 + 0.3, duration: 0.4 }}
                >
                  <span style={{ fontWeight: 600, fontSize:"1.25rem" }}>{item.label}</span>
                </motion.span>
                </div>
              </div>
            </Card>
          </motion.div>
        </Col>
      ))}
    </Row>
  );
}
