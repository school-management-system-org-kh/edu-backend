import { Table, Card, InputNumber, Radio, Switch, Row, Col, Tag } from "antd";
import { useState } from "react";

const CurrenciesPage = () => {
    const [data, setData] = useState([
        { key: "1", currency: "USD", shortCode: "USD", currencySymbol: "$", baseCurrency: true, conversionRate: 1.00 },
        { key: "2", currency: "KHR", shortCode: "KHR", currencySymbol: "៛", baseCurrency: false, conversionRate: 4000 },
    ]);

    const handleRateChange = (value, record) => {
        const newData = data.map(item =>
            item.key === record.key
                ? { ...item, conversionRate: value || "0" }
                : item
        );
        setData(newData);
    };
    const [selectedBaseKey, setSelectedBaseKey] = useState("1");

    const handleBaseCurrencyChange = (key) => {
        setSelectedBaseKey(key);
        const newData = data.map(item => ({
            ...item,
            baseCurrency: item.key === key
        }));
        setData(newData);
    };

    const columns = [
        { title: "Currency", dataIndex: "currency", key: "currency" },
        { title: "Short Code", dataIndex: "shortCode", key: "shortCode" },
        { title: "Currency Symbol", dataIndex: "currencySymbol", key: "currencySymbol" },
        {
            title: "Conversion Rate",
            dataIndex: "conversionRate",
            key: "conversionRate",
            render: (_, record) => (
                <InputNumber
                    value={parseFloat(record.conversionRate)}
                    onChange={(value) => handleRateChange(value, record)}
                    min={0}
                    precision={2}
                    style={{ width: 120 }}
                    controls={false}
                    onKeyPress={(e) => {
                        const allowedKeys = /[0-9.]/
                        if (!allowedKeys.test(e.key)) {
                            e.preventDefault();
                        }
                    }}
                    onPaste={(e) => {
                        const paste = e.clipboardData.getData('text');
                        if (!/^\d*\.?\d*$/.test(paste)) {
                            e.preventDefault();
                        }
                    }}
                />

            ),
        },
        {
            title: "Base Currency",
            dataIndex: "baseCurrency",
            key: "baseCurrency",
            align: 'center',
            render: (baseCurrency) => (
                baseCurrency ? <Tag color="#87d068" style={{ fontWeight: 500 }}>Active</Tag> : ""
            )
        },
        {
            title: "Active",
            dataIndex: "active",
            key: "active",
            align: 'center',
            render: (_, record) => (
                <Radio
                    checked={record.key === selectedBaseKey}
                    onChange={() => handleBaseCurrencyChange(record.key)}
                />
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => <Switch defaultChecked />,
        },
    ];

    return (
        <Row gutter={24}>
            <Col span={24}>
                <Card title={<span style={{ fontWeight: 600, fontSize: "1.25rem" }}>Currencies</span>}>
                    <Table
                        dataSource={data}
                        columns={columns}
                        pagination={false}
                        scroll={{ y: 330 }}
                    />
                </Card>
            </Col>
        </Row>
    );
};

export default CurrenciesPage;
