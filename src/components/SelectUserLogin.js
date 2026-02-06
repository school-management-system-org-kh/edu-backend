import React from 'react';
import { Card, Row, Col, Avatar, Typography } from 'antd';
import {
  UserOutlined,
  SolutionOutlined,
  LockOutlined,
  BookOutlined,
  CalculatorOutlined,
  ContactsOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

function SelectUserLogin() {
  const firstRow = [
    {
      background: "#9c27b0",
      color: "white",
      icon: <LockOutlined />,
      name: "Super Admin"
    },
    {
      background: "#057fab",
      color: "white",
      icon: <SolutionOutlined />,
      name: "Admin"
    },
    {
      background: "#999999",
      color: "white",
      icon: <UserOutlined />,
      name: "Teacher"
    }
  ];

  const secondRow = [
    {
      background: "#ff9800",
      color: "white",
      icon: <CalculatorOutlined />,
      name: "Accountant"
    },
    {
      background: "#1abed3",
      color: "white",
      icon: <ContactsOutlined />,
      name: "Receptionist"
    },
    {
      background: "#4aa64e",
      color: "white",
      icon: <BookOutlined />,
      name: "Librarian"
    }
  ];

  return (
    <>
          {/* First Row */}
          <Row gutter={[0, 0]} style={{ marginBottom: '20px' }}>
            {firstRow.map((item, index) => (
              <Col xs={24} sm={12} md={8} lg={8} key={index}>
                <Card 
                  className="login-card"
                  style={{ 
                    backgroundColor: item.background,
                    color: item.color,
                    border: 'none',
                    borderRadius: '0px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    
                  }}
                  bodyStyle={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding:"6px"
                  }}
                  hoverable={{
                    style: {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                    }
                  }}
                >
                  <Avatar 
                    size="small" 
                    icon={item.icon} 
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                      color: item.color,
                    }} 
                  />
                  <Text strong style={{ color: item.color, fontSize: '14px', marginLeft:"0.5rem" }}>
                    {item.name}
                  </Text>
                </Card>
              </Col>
            ))}
          </Row>
          
          {/* Second Row */}
          <Row gutter={[0, 0]}>
            {secondRow.map((item, index) => (
              <Col xs={24} sm={12} md={8} lg={8} key={index}>
                <Card 
                  className="login-card"
                  style={{ 
                    backgroundColor: item.background,
                    color: item.color,
                    border: 'none',
                    borderRadius: '0px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',

                  }}
                  bodyStyle={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                     padding:"6px",
                  }}
                  hoverable={{
                    style: {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                    }
                  }}
                >
                  <Avatar 
                    size="small" 
                    icon={item.icon} 
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                      color: item.color,
                    }} 
                  />
                  <Text strong style={{ color: item.color, fontSize: '14px', marginLeft:"0.5rem" }}>
                    {item.name}
                  </Text>
                </Card>
              </Col>
            ))}
          </Row>
        </>
  );
}

export default SelectUserLogin;