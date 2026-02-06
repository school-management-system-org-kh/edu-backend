import React, { useState } from "react";
import { Card, Button, Table, TimePicker } from "antd";

const StaffAttendanceSetting = () => {
  // Example roles data
  const roles = [
    {
      name: "Admin",
      attendanceTypes: [
        { type: "Present (P)" },
        { type: "Late (L)" },
        { type: "Half Day (F)" },
        { type: "Half Day Second Shift (S/H)" },
      ],
    },
    {
      name: "Teacher",
      attendanceTypes: [
        { type: "Present (P)" },
        { type: "Late (L)" },
        { type: "Half Day (F)" },
        { type: "Half Day Second Shift (S/H)" },
      ],
    },
    {
      name: "Accountant",
      attendanceTypes: [
        { type: "Present (P)" },
        { type: "Late (L)" },
        { type: "Half Day (F)" },
        { type: "Half Day Second Shift (S/H)" },
      ],
    },
  ];

  // State for storing selected times
  const [timeValues, setTimeValues] = useState({});

  const handleTimeChange = (role, type, field, value) => {
    const key = `${role}-${type}-${field}`;
    setTimeValues((prev) => ({ ...prev, [key]: value }));
  };

  // Build columns dynamically
  const getColumns = (role) => [
    {
      title: "Attendance Type",
      dataIndex: "type",
      key: "type",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Entry From (hh:mm:ss)",
      key: "entryFrom",
      render: (_, record) => {
        const key = `${role}-${record.type}-from`;
        return (
          <TimePicker
            value={timeValues[key] || null}
            onChange={(val) => handleTimeChange(role, record.type, "from", val)}
            format="HH:mm:ss"
            style={{ width: "100%" }}
             size="middle"
          />
        );
      },
    },
    {
      title: "Entry Upto (hh:mm:ss)",
      key: "entryUpto",
      render: (_, record) => {
        const key = `${role}-${record.type}-upto`;
        return (
          <TimePicker
            value={timeValues[key] || null}
            onChange={(val) => handleTimeChange(role, record.type, "upto", val)}
            format="HH:mm:ss"
            style={{ width: "100%" }}
            size="middle"
          />
        );
      },
    },
    {
      title: "Total Hour",
      key: "totalHour",
      render: (_, record) => {
        const key = `${role}-${record.type}-total`;
        return (
          <TimePicker
            value={timeValues[key] || null}
            onChange={(val) => handleTimeChange(role, record.type, "total", val)}
            format="HH:mm:ss"
            style={{ width: "100%" }}
             size="middle"
          />
        );
      },
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      {roles.map((role) => (
        <Card
          key={role.name}
          title={`Role: ${role.name}`}
          extra={<Button type="primary">Update</Button>}
          style={{ marginBottom: 20 }}
        >
          <Table
            columns={getColumns(role.name)}
            dataSource={role.attendanceTypes}
            pagination={false}
            rowKey="type"
            bordered
          />
        </Card>
      ))}
    </div>
  );
};

export default StaffAttendanceSetting;
