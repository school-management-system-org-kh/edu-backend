import { Image } from "antd"
import features from '../assets/features.png';
import { Card, Row, Col, Avatar, Typography } from 'antd';
import {
    UserOutlined,
    TeamOutlined,
    SolutionOutlined,
    LockOutlined,
    BookOutlined,
    CalculatorOutlined,
    ContactsOutlined,
    MobileOutlined,
    GlobalOutlined
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const SchoolDemoPage = () => {
    const navigate = useNavigate();
    const { Text } = Typography;
    const dataFeatures = [
        {
            background: "#9c27b0",
            color: "white",
            icon: <LockOutlined />,
            name: "Super Admin Login"
        },
        {
            background: "#b0dd38",
            color: "black",
            icon: <UserOutlined />,
            name: "Student Login"
        },
        {
            background: "#e91e64",
            color: "white",
            icon: <TeamOutlined />,
            name: "Parent Login"
        },
        {
            background: "#057fab",
            color: "white",
            icon: <SolutionOutlined />,
            name: "Admin Login"
        },
        {
            background: "#999999",
            color: "white",
            icon: <UserOutlined />,
            name: "Teacher Login"
        },
        {
            background: "#ff9800",
            color: "white",
            icon: <CalculatorOutlined />,
            name: "Accountant Login"
        },
        {
            background: "#1abed3",
            color: "white",
            icon: <ContactsOutlined />,
            name: "Receptionist Login"
        },
        {
            background: "#4aa64e",
            color: "white",
            icon: <BookOutlined />,
            name: "Librarian Login"
        },
        {
            background: "#057fab",
            color: "white",
            icon: <GlobalOutlined />,
            name: "Front Site Login"
        },
        {
            background: "#e91e64",
            color: "white",
            icon: <MobileOutlined />,
            name: "Android App"
        }
    ];

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '60px'
        }}>
            <div className="" style={{ alignItems: "center", display: "flex", flexDirection: "column" }}>
                <h1>Try Smart School demo</h1>
                <p>Try handson demonstration of Smart School with sample data</p>
                <div className="" style={{ display: 'flex' }}>
                    <Image style={{width:"60rem"}} src={features} alt="" preview={false} />
                    <div >
                        <Row gutter={[12, 12]} justify="end" >
                            {dataFeatures.map((item, index) => (
                                <Col xs={24} sm={24} md={24} lg={24} key={index} style={{display:"flex", justifyContent:"end"}}>
                                    <Card
                                        className="login-card"
                                        style={{
                                            backgroundColor: item.background,
                                            color: item.color,
                                            border: 'none',
                                            borderRadius: '12px',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            width:'18rem'
                                        }}
                                        bodyStyle={{
                                            padding: '15px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                        hoverable={{
                                            style: {
                                                transform: 'translateY(-5px)',
                                                boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                                            }
                                        }}
                                        onClick={() => navigate('/login')}
                                    >
                                        <Avatar
                                            size="middle"
                                            icon={item.icon}
                                            style={{
                                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                                color: item.color,
                                            }}
                                        />
                                        <Text strong style={{ color: item.color, fontSize: '16px', marginLeft:'1rem' }}>
                                            {item.name}
                                        </Text>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SchoolDemoPage