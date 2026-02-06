import React from "react";
import {
  Card,
  Col,
  Row,
} from "antd";
import { barData, expenseData, incomeData } from "../../store/dashbordData";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import AnimatedStatCards from "./AnimatedStatCards";
import DoughnutChart from "./DoughnutChart";
import { motion } from "framer-motion";
import FeesDashboard from "./FeesDashboard";
import DashboardCards from "./DashboardCards";
import AnimatedEmployeeCards from "./AnimatedEmployeeCards";
import WeeklyCalendar from "./WeeklyCalendar";
import { useTranslation } from 'react-i18next';
import dayjs from "dayjs";
import { currentMonth } from "../../utils/formatDate";

export default function AllDashbord() {
  const { t } = useTranslation();
  const incomeDataNew = incomeData.map(item => ({
    name: t(item.name),
    value: item.value,
  }));
   const expenseDataNew = expenseData.map(item => ({
    name: t(item.name),
    value: item.value,
  }));


  return (
    <div style={{ padding: 10 }}>
      <AnimatedStatCards />
      {/* Charts */}
      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={16}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, type: "spring" }}
          >
            <Card title={`${t("Fees Collection & Expenses For")} ${t(currentMonth)} 2025`} style={{height:"27.5rem"}}>
              <BarChart width={750} height={250} data={barData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="fee" fill="#82ca9d" name={t("Fees")} />
                <Bar dataKey="expense" fill="#ff4d4f" name={t("Expenses")} />
              </BarChart>
            </Card>
          </motion.div>
        </Col>

        {/* Doughnut Chart Card */}
        <Col span={8}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
          >
            <Card title={`${t("Income")} - ${t(currentMonth)} 2025`}>
              <DoughnutChart data={incomeDataNew} />
            </Card>
          </motion.div>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 20 }}>
        <Col span={16}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
          >
            <FeesDashboard t={t}/>
          </motion.div>
        </Col>


        {/* Doughnut Chart Card */}
        <Col span={8}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6, type: "spring" }}
          >
            <Card title={`${t("Expenses")} - ${t(currentMonth)} 2025`}>
              <DoughnutChart data={expenseDataNew} />
            </Card>
          </motion.div>
        </Col>
      </Row>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
      >
        <DashboardCards t={t}/>
      </motion.div>
      <AnimatedEmployeeCards t={t}/>
      <WeeklyCalendar t={t}/>
    </div>
  );
}
