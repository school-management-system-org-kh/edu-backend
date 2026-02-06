import React, { useState } from 'react';
import { Table, Checkbox, Tooltip, Typography, Button } from 'antd';
import { FaEdit } from 'react-icons/fa';
import TemplateModal from '../../Modals/TemplateModal';

const { Text } = Typography;

const NotificationSettingMain = ({ data }) => {
  const [notifications, setNotifications] = useState(data);
  const [show, setShow] = useState(false)
  const [dataTemplate, setDataTemplate] = useState("")

  const handleCheckboxChange = (index, type, key) => {
    const updated = [...notifications];
    updated[index][type][key] = !updated[index][type][key];
    setNotifications(updated);
  };

  const columns = [
    {
      title: 'Event',
      dataIndex: 'event',
      key: 'event',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Destination',
      key: 'destination',
      render: (_, record, index) => (
        <div className='' style={{ display: 'flex', flexDirection: 'column' }}>
          <Checkbox
            checked={record.destinations.email}
            onChange={() => handleCheckboxChange(index, 'destinations', 'email')}
          >
            Email
          </Checkbox>
          <Checkbox
            checked={record.destinations.sms}
            onChange={() => handleCheckboxChange(index, 'destinations', 'sms')}
          >
            SMS
          </Checkbox>
          <Checkbox
            checked={record.destinations.app}
            onChange={() => handleCheckboxChange(index, 'destinations', 'app')}
          >
            Mobile App
          </Checkbox>
        </div>
      ),
    },
    {
      title: 'Recipient',
      key: 'recipient',
      render: (_, record, index) => (
        <div className='' style={{ display: 'flex', flexDirection: 'column' }}>
          <Checkbox
            checked={record.recipients.student}
            onChange={() => handleCheckboxChange(index, 'recipients', 'student')}
          >
            Student
          </Checkbox>
          <Checkbox
            checked={record.recipients.guardian}
            onChange={() => handleCheckboxChange(index, 'recipients', 'guardian')}
          >
            Guardian
          </Checkbox>
        </div>
      ),
    },
    {
      title: 'Sample Message',
      render: (text) => (
        <div className='' style={{display:'flex', alignItems:'center'}}>
        <Tooltip title={text.sampleMessage}>
          <Text ellipsis style={{ maxWidth: 350, display: 'inline-block' }}>
            {text.sampleMessage}
          </Text>
            <FaEdit
              onClick={() => {
                setShow(true)
                setDataTemplate(text)
              }}
              style={{ marginLeft: 8, cursor: "pointer" }}
            />
        </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={notifications}
        columns={columns}
        rowKey="event"
        pagination={false}
      />
      {/* Save Button */}
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <Button
          type="primary"
          size="middle"
          style={{ width: "15%", fontSize: "1rem", fontWeight: 600 }}
          onClick={console.log("Savme")}
        >
          Save
        </Button>
      </div>
      <TemplateModal show={show} setShow={setShow} data={dataTemplate} setData={setDataTemplate}/>
    </>
  );
};

export default NotificationSettingMain;
