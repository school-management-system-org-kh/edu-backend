// permissionsMatrix.js
import React, { useState } from "react";
import { Table, Checkbox } from "antd";

const PermissionsMatrix = ({ modules }) => {
    const [permissions, setPermissions] = useState({});

    const handleCheckboxChange = (moduleId, featureId, action) => {
        setPermissions((prev) => {
            const key = `${moduleId}_${featureId}`;
            return {
                ...prev,
                [key]: {
                    ...prev[key],
                    [action]: !prev[key]?.[action],
                },
            };
        });
    };

    // Flatten data for table
    const dataSource = [];
    Object.values(modules).forEach((module) => {
        if (module.items && module.items.length > 0) {
            module.items.forEach((item, index) => {
                dataSource.push({
                    key: `${module.id}_${item.id}`,
                    module: module.title,
                    feature: item.name,
                    moduleId: module.id,
                    featureId: item.id,
                    rowIndex: index,
                    rowSpan: index === 0 ? module.items.length : 0, // merge rows
                });
            });
        } else {
            // ✅ Handle single-module entries (like Dashboard)
            dataSource.push({
                key: `${module.id}_0`,
                module: module.title,
                feature: "-", // or module.title if you want
                moduleId: module.id,
                featureId: 0,
                rowIndex: 0,
                rowSpan: 1,
            });
        }
    });

    const columns = [
        {
            title: "Module",
            dataIndex: "module",
            key: "module",
            render: (text, row) => {
                return {
                    children: text,
                    props: {
                        rowSpan: row.rowSpan, // merge rows for same module
                    },
                };
            },
        },
        {
            title: "Feature",
            dataIndex: "feature",
            key: "feature",
        },
        {
            title: "View",
            key: "view",
            align: 'center',
            render: (_, record) => (
                <Checkbox
                    checked={permissions[`${record.moduleId}_${record.featureId}`]?.view}
                    onChange={() =>
                        handleCheckboxChange(record.moduleId, record.featureId, "view")
                    }
                />
            ),
        },
        {
            title: "Add",
            key: "add",
            align: 'center',
            render: (_, record) => (
                <Checkbox
                    checked={permissions[`${record.moduleId}_${record.featureId}`]?.add}
                    onChange={() =>
                        handleCheckboxChange(record.moduleId, record.featureId, "add")
                    }
                />
            ),
        },
        {
            title: "Edit",
            key: "edit",
            align: 'center',
            render: (_, record) => (
                <Checkbox
                    checked={permissions[`${record.moduleId}_${record.featureId}`]?.edit}
                    onChange={() =>
                        handleCheckboxChange(record.moduleId, record.featureId, "edit")
                    }
                />
            ),
        },
        {
            title: "Delete",
            key: "delete",
            align: 'center',
            render: (_, record) => (
                <Checkbox
                    checked={permissions[`${record.moduleId}_${record.featureId}`]?.delete}
                    onChange={() =>
                        handleCheckboxChange(record.moduleId, record.featureId, "delete")
                    }
                />
            ),
        },
        {
            title: "All",
            key: "all",
            align: "center",
            render: (_, record) => {
                const key = `${record.moduleId}_${record.featureId}`;
                const rowPermissions = permissions[key] || {};

                const isAllChecked =
                    rowPermissions.view &&
                    rowPermissions.add &&
                    rowPermissions.edit &&
                    rowPermissions.delete;

                return (
                    <Checkbox
                        checked={isAllChecked}
                        onChange={(e) => {
                            const checked = e.target.checked;
                            setPermissions((prev) => ({
                                ...prev,
                                [key]: {
                                    view: checked,
                                    add: checked,
                                    edit: checked,
                                    delete: checked,
                                },
                            }));
                        }}
                    />
                );
            },
        }
    ];

    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            bordered
            sticky
            scroll={{ y: 660 }}
        />
    );
};

export default PermissionsMatrix;
