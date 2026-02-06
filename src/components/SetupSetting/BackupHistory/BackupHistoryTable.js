import { Table, Flex, Tag, } from "antd";
import { FaDownload } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { LuDatabaseBackup } from "react-icons/lu";

const BackupHistoryTable = () => {
    const data = [
        { key: "1", backup: "db_ver_7.0.1_2024-09-16_10-44-39.sql" },
        { key: "2", backup: "db_ver_7.0.1_2025-01-01_00-27-26.sql" },
    ];
    const generateBackupFileName = (version = "7.0.1") => {
        const now = new Date();

        const pad = (num) => String(num).padStart(2, "0");

        const date = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
        const time = `${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;

        return `db_ver_${version}_${date}_${time}.sql`;
    };

    const downloadFile = (filename, content, mimeType = "application/sql") => {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();

        URL.revokeObjectURL(url);
    };

    // Example usage in your component

    const sqlBackupContent = `
        -- Your SQL backup content here
        CREATE TABLE users(id INT, name VARCHAR(100));
        INSERT INTO users VALUES (1, 'Alice'), (2, 'Bob');
    `;

    const version = "7.0.1"; // Or dynamically get your app version

    const filename = generateBackupFileName(version);


    const columns = [
        {
            title: "Backup Files",
            width: "58%",
            render: (record) => <span style={{ color: "#0084B4", fontSize: "1rem" }}>{record.backup}</span>
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Flex gap="4px 0" wrap align="center">
                    <Tag onClick={() => downloadFile(filename, sqlBackupContent)} icon={<FaDownload />} color="#398439 " style={{ display: 'flex', alignItems: 'center', cursor: "pointer" }}>
                        <span style={{ marginLeft: "0.3rem" }}>Download</span>
                    </Tag>
                    <Tag icon={<LuDatabaseBackup />} color="#727272" style={{ display: 'flex', alignItems: 'center', cursor: "pointer" }}>
                        <span style={{ marginLeft: "0.3rem" }}>Restore</span>
                    </Tag>
                    <Tag icon={<FaTrashCan />} color="#cd201f" style={{ display: 'flex', alignItems: 'center', cursor: "pointer" }}>
                        <span style={{ marginLeft: "0.3rem" }}>Delete</span>
                    </Tag>
                </Flex>
            ),
        },
    ];

    return (
        <Table
            dataSource={data}
            columns={columns}
            pagination={false}
            scroll={{ y: 330 }}
        />
    );
};

export default BackupHistoryTable;