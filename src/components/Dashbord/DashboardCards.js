import { Row, Col, Card, Progress } from "antd";
import { motion } from "framer-motion";

// Add color to each item
const overviewData = [
  {
    title: "Fees Overview",
    items: [
      { label: "Unpaid", value: 103, percent: 85.12, color: "#ff4d4f" }, // red
      { label: "Partial", value: 8, percent: 6.61, color: "#faad14" },    // orange
      { label: "Paid", value: 10, percent: 8.26, color: "#52c41a" },      // green
    ],
  },
  {
    title: "Enquiry Overview",
    items: [
      { label: "Active", value: 5, percent: 50, color: "#1890ff" },       // blue
      { label: "Won", value: 2, percent: 20, color: "#52c41a" },
      { label: "Passive", value: 1, percent: 10, color: "#faad14" },
      { label: "Lost", value: 1, percent: 10, color: "#ff4d4f" },
      { label: "Dead", value: 1, percent: 10, color: "#595959" },         // gray
    ],
  },
  {
    title: "Library Overview",
    items: [
      { label: "Due For Return", value: 99, percent: 22, color: "#faad14" },
      { label: "Returned", value: 95, percent: 21, color: "#52c41a" },
      { label: "Issued Out Of", value: 36, percent: 8, color: "#1890ff" },
      { label: "Available Out Of", value: 414, percent: 92, color: "#52c41a" },
    ],
  },
  {
    title: "Student Today Attendance",
    items: [
      { label: "Present", value: 19, percent: 32.76, color: "#52c41a" },
      { label: "Late", value: 5, percent: 8.62, color: "#faad14" },
      { label: "Absent", value: 11, percent: 18.97, color: "#ff4d4f" },
      { label: "Half Day", value: 3, percent: 5.17, color: "#1890ff" },
    ],
  },
];

const DashboardCards = ({t}) => {
  return (
    <Row gutter={16} style={{ marginTop: 20 }}>
      {overviewData.map((section, index) => (
        <Col span={6} key={index}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index, duration: 0.6, type: "spring" }}
          >
            <Card title={t(section.title)} style={{height:'22rem'}}>
              {section.items.map((item, i) => (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span>{t(item.label)}</span>
                    <span>{item.percent ? `${item.percent}%` : item.value}</span>
                  </div>
                  {item.percent && (
                    <Progress
                      percent={item.percent}
                      size="small"
                      showInfo={false}  
                      strokeColor={item.color} // set color dynamically
                      status="active"
                    />
                  )}
                </div>
              ))}
            </Card>
          </motion.div>
        </Col>
      ))}
    </Row>
  );
};

export default DashboardCards;
