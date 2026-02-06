import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Row, Col, Modal } from 'antd';
import { UserOutlined, LockOutlined, ReloadOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import SelectUserLogin from '../components/SelectUserLogin';

const AuthLayoutPage = () => {
    const [loading, setLoading] = useState(false);
    const [showCaptcha, setShowCaptcha] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [formData, setFormData] = useState(null);
    const navigate = useNavigate();

    // Sample CAPTCHA data - in a real app, this would come from your backend
    const [captchaData] = useState({
        instruction: "Select all images containing animals",
        images: [
            { id: 1, url: require('../assets/tiger.avif'), isAnimal: true },
            { id: 2, url: require('../assets/Watermelon.webp'), isAnimal: false },
            { id: 3, url: require('../assets/apple.jpg'), isAnimal: false },
            { id: 4, url: require('../assets/dog.webp'), isAnimal: true },
            { id: 5, url: require('../assets/cherry.jpg'), isAnimal: false },
            { id: 6, url: require('../assets/cat.jpg'), isAnimal: true },
            { id: 7, url: require('../assets/coconut.jpg'), isAnimal: false },
            { id: 8, url: require('../assets/ant-animal.jpeg'), isAnimal: true },
            { id: 9, url: require('../assets/banana.webp'), isAnimal: false },
        ]
    });

    const onFinish = async (values) => {
        // Store form data and show CAPTCHA
        setFormData(values);
        setShowCaptcha(true);
    };

    const handleImageSelect = (id) => {
        if (selectedImages.includes(id)) {
            setSelectedImages(selectedImages.filter(imgId => imgId !== id));
        } else {
            setSelectedImages([...selectedImages, id]);
        }
    };

    const verifyCaptcha = () => {
        // Check if user selected all animal images and no non-animal images
        const animalIds = captchaData.images
            .filter(img => img.isAnimal)
            .map(img => img.id);
        
        const allAnimalsSelected = animalIds.every(id => selectedImages.includes(id));
        const noNonAnimalsSelected = selectedImages.every(id => 
            captchaData.images.find(img => img.id === id).isAnimal
        );
        
        if (allAnimalsSelected && noNonAnimalsSelected) {
            message.success('Verification successful!');
            setShowCaptcha(false);
            // Proceed with login
            performLogin(formData);
        } else {
            message.error('Please select all images containing animals. Try again.');
            setSelectedImages([]);
        }
    };

    const performLogin = async (values) => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log('Login values:', values);
            message.success('Login successful!');
            navigate('/dashboard');
        } catch (error) {
            message.error('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const refreshCaptcha = () => {
        // In a real app, this would fetch new challenges from the server
        setSelectedImages([]);
        message.info('CAPTCHA refreshed');
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px'
        }}>
            <Card
                title={
                    <div style={{ textAlign: 'center', padding: '10px 0' }}>
                        <h1 style={{ margin: 0, color: '#1890ff' }}>Welcome</h1>
                        <h2 style={{ margin: 0, color: '#1890ff' }}>Smart School System</h2>
                    </div>
                }
                style={{
                    width: 500,
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                    borderRadius: '12px'
                }}
            >
                <Form
                    name="login"
                    onFinish={onFinish}
                    autoComplete="off"
                    size="middle"
                    layout="vertical"
                    style={{ marginBottom: 0 }}
                >
                    <Form.Item
                        label="Email or Username"
                        name="username"
                        rules={[
                            { required: true, message: 'Please input your email or username!' }
                        ]}
                        style={{ marginBottom: 1 }}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Enter your email or username"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            { required: true, message: 'Please input your password!' },
                            { min: 6, message: 'Password must be at least 6 characters!' }
                        ]}
                        style={{ marginBottom: 16 }}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Enter your password"
                        />
                    </Form.Item>
                    <Form.Item style={{ marginBottom: 16, }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ width: '100%', fontSize: "1rem", fontWeight: 600, marginTop:"1rem" }}
                            loading={loading}
                        >
                            Login
                        </Button>
                    </Form.Item>
                    <SelectUserLogin />
                    <div style={{marginBottom: 20 , marginTop:"0.5rem", display:'flex', justifyContent:"space-between" }}>
                        <Link to="#!" style={{ fontSize: '14px'}}>
                            Forgot password?
                        </Link>
                        <Link to="#!" style={{ fontSize: '14px', color:"black"}}>
                            Front Site
                        </Link>
                    </div>

                </Form>

                {/* CAPTCHA Modal */}
                <Modal
                    title="Verify You're Not a Robot"
                    open={showCaptcha}
                    onCancel={() => setShowCaptcha(false)}
                    footer={[
                        <Button key="refresh" icon={<ReloadOutlined />} onClick={refreshCaptcha}>
                            Refresh
                        </Button>,
                        <Button 
                            key="verify" 
                            type="primary" 
                            onClick={verifyCaptcha}
                            disabled={selectedImages.length === 0}
                        >
                            Verify
                        </Button>
                    ]}
                    width={600}
                >
                    <div style={{ textAlign: 'center', marginBottom: 20 }}>
                        <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
                            {captchaData.instruction}
                        </p>
                    </div>
                    
                    <Row gutter={[16, 16]}>
                        {captchaData.images.map(image => (
                            <Col span={8} key={image.id}>
                                <div
                                    style={{
                                        border: selectedImages.includes(image.id) 
                                            ? '3px solid #1890ff' 
                                            : '3px solid #f0f0f0',
                                        borderRadius: '8px',
                                        padding: '4px',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s',
                                    }}
                                    onClick={() => handleImageSelect(image.id)}
                                >
                                    <img
                                        src={image.url}
                                        alt="CAPTCHA"
                                        style={{
                                            width: '100%',
                                            height: '100px',
                                            objectFit: 'cover',
                                            borderRadius: '6px',
                                        }}
                                    />
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Modal>
            </Card>
        </div>
    );
};

export default AuthLayoutPage;