import React from "react";
import { Card, Col, Row, Progress } from "antd";
import {
  RiseOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { FaCalendarCheck, FaIoxhost } from "react-icons/fa6";
import { FaMoneyBillAlt } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

const stats = [
  {
    title: "Fees Awaiting Payment",
    value: "10/120",
    percent: 8,
    color: "#00CFFF",
    icon: <FaMoneyBillAlt style={{ fontSize: 20 }} />,
  },
  {
    title: "Staff Approved Leave",
    value: "1/4",
    percent: 25,
    color: "#00B8D9",
    icon: <FaIoxhost style={{ fontSize: 20 }} />,
  },
  {
    title: "Student Approved Leave",
    value: "5/21",
    percent: 24,
    color: "#1890ff",
    icon: <FaIoxhost style={{ fontSize: 20 }} />,
  },
  {
    title: "Converted Leads",
    value: "2/10",
    percent: 20,
    color: "#ff4d4f",
    icon: <RiseOutlined style={{ fontSize: 20 }} />,
  },
  {
    title: "Staff Present Today",
    value: "0/8",
    percent: 0,
    color: "#52c41a",
    icon: <FaCalendarCheck style={{ fontSize: 20 }} />,
  },
  {
    title: "Student Present Today",
    value: "29/58",
    percent: 50,
    color: "#fa8c16",
    icon: <FaCalendarCheck style={{ fontSize: 20 }} />,
  },
];

export default function AnimatedStatCards() {
  const { t } = useTranslation();
  return (
    <Row gutter={[16, 16]}>
      {stats.map((item, index) => (
        <Col xs={24} sm={12} md={8} lg={8} xl={8} key={index}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6, type: "spring" }}
          >
            <Card
              hoverable
              style={{ borderRadius: 12, boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {item.icon}
                  <span style={{ fontWeight: 500 }}>{t(item.title)}</span>
                </div>
                <motion.span
                  style={{ fontWeight: 600 }}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.3 + 0.3, duration: 0.4 }}
                >
                  {item.value}
                </motion.span>
              </div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: index * 0.3 + 0.5, duration: 0.8 }}
              >
                <Progress
                  percent={item.percent}
                  showInfo={false}
                  strokeColor={item.color}
                  style={{ marginTop: 8 }}
                />
              </motion.div>
            </Card>
          </motion.div>
        </Col>
      ))}
    </Row>
  );
}
