import React, { useRef, useState } from "react";
import { Col, Row, Switch, Table, Tag } from "antd";
import MessageConfirmModal from "../../Modals/MessageConfirmModal";
import { AiOutlineFileExcel } from "react-icons/ai";
import { LiaPrintSolid } from "react-icons/lia";
import * as XLSX from "xlsx";
import dayjs from "dayjs";

const ManageSyllabusStatusList = ({ t }) => {
    const messageModalRef = useRef("");

    const [dataSource, setDataSource] = useState([
        {
            chapterId: 1,
            chapterTitle: "First Day at School",
            topics: [
                { id: "1.1", title: "School Life", date: "2025-04-19", status: "Completed", active: true },
                { id: "1.2", title: "School Day's", date: "2025-05-22", status: "Completed", active: true },
                { id: "1.3", title: "Chapter-2", status: "Incomplete", active: false },
            ],
        },
        {
            chapterId: 2,
            chapterTitle: "The Wind and the Sun",
            topics: [{ id: "2.1", title: "The Wind", date: "2025-08-26", status: "Completed", active: true }],
        },
        {
            chapterId: 3,
            chapterTitle: "Storm in the Garden",
            topics: [
                { id: "3.1", title: "My Garden", date: "2025-04-25", status: "Completed", active: true },
                { id: "3.2", title: "Chapter 2", status: "Incomplete", active: false },
            ],
        },
    ]);

    const handleToggle = (chapterId, topicId, checked) => {
        setDataSource((prev) =>
            prev.map((chapter) =>
                chapter.chapterId === chapterId
                    ? {
                        ...chapter,
                        topics: chapter.topics.map((topic) =>
                            topic.id === topicId ? { ...topic, active: checked } : topic
                        ),
                    }
                    : chapter
            )
        );
    };

    const columns = [
        {
            title: t("Lesson Topic"),
            dataIndex: "chapterTitle",
            render: (_, record) => (
                <>
                    <span style={{ fontWeight: 600 }}>{record.chapterTitle}</span>
                    {record.topics?.map((topic) => (
                        <div key={topic.id} style={{ paddingLeft: "1rem", marginTop: "0.5rem" }}>
                            {topic.id + " " + topic.title}
                        </div>
                    ))}
                </>
            ),
            key: "lessonTopic",
        },
        {
            title: t("Topic Completion Date"),
            render: (_, record) => (
                <>
                    {record.topics?.map((topic) => (
                        <div key={topic.id} style={{ marginTop: "0.5rem" }}>
                            {topic.date || "-"}
                        </div>
                    ))}
                </>
            ),
            key: "date",
        },
        {
            title: t("Status"),
            render: (_, record) => (
                <>
                    {record.topics?.map((topic) => (
                        <div key={topic.id} style={{ marginTop: "0.5rem" }}>
                            <Tag color={topic.status === "Completed" ? "#87d068" : "red"}>
                                {topic.status}
                            </Tag>
                        </div>
                    ))}
                </>
            ),
            key: "status",
        },
        {
            title: t("Action"),
            render: (_, record) => (
                <>
                    {record.topics?.map((topic) => (
                        <div key={topic.id} style={{ marginTop: "0.5rem" }}>
                            <Switch
                                checked={topic.active}
                                onChange={(checked) => handleToggle(record.chapterId, topic.id, checked)}
                            />
                            {/* <Switch 
              defaultChecked 
              onChange={onChange} /> */}
                        </div>
                    ))}
                </>
            ),
            key: "action",
        },
    ];

    // ----------- EXPORT EXCEL ------------
    const exportToExcel = () => {
        const flattenedData = [];

        dataSource.forEach((chapter) => {
            chapter.topics.forEach((topic) => {
                flattenedData.push({
                    Chapter: chapter.chapterTitle,
                    "Lesson Topic": `${topic.id} ${topic.title}`,
                    "Completion Date": topic.date
                        ? dayjs(topic.date).format("YYYY-MM-DD")
                        : "-",
                    Status: topic.status,
                });
            });
        });

        const worksheet = XLSX.utils.json_to_sheet(flattenedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Syllabus");
        XLSX.writeFile(workbook, "Syllabus_Status.xlsx");
    };

    // ----------- PRINT TABLE ------------
    const printTable = () => {
        const htmlContent = `
      <html>
        <head>
          <title>${t("Syllabus Status")}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { text-align: center; margin-bottom: 20px; }
            table { border-collapse: collapse; width: 100%; font-size: 14px; }
            th, td { border: 1px solid #ddd; padding: 8px; vertical-align: top; }
            th { background: #f5f5f5; text-align: left; font-weight: bold; }
            .chapter { font-weight: 600; }
            .topic { padding-left: 1rem; }
            .tag {
              display: inline-block;
              padding: 2px 8px;
              border-radius: 6px;
              font-size: 13px;
              font-weight: 500;
              color: white;
            }
            .completed { background: #87d068; }
            .incomplete { background: #ff4d4f; }
          </style>
        </head>
        <body>
          <h2>${t("Syllabus Status")}</h2>
          <table>
            <thead>
              <tr>
                <th>${t("Lesson Topic")}</th>
                <th>${t("Topic Completion Date")}</th>
                <th>${t("Status")}</th>
              </tr>
            </thead>
            <tbody>
              ${dataSource
                .map(
                    (chapter) => `
                  <tr>
                    <td colspan="3" class="chapter">${chapter.chapterTitle}</td>
                  </tr>
                  ${chapter.topics
                            .map(
                                (topic) => `
                    <tr>
                      <td class="topic">${topic.id} ${topic.title}</td>
                      <td>${topic.date ? dayjs(topic.date).format("YYYY-MM-DD") : "-"}</td>
                      <td>
                        <span class="tag ${topic.status === "Completed"
                                        ? "completed"
                                        : "incomplete"
                                    }">${topic.status}</span>
                      </td>
                    </tr>
                  `
                            )
                            .join("")}
                `
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `;

        const printWindow = window.open("", "", "height=800,width=1000");
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        printWindow.print();
    };


    return (
        <div>
            <Row
                gutter={[16, 16]}
                style={{
                    marginBottom: 25,
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Col
                    span={24}
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div
                            style={{ marginLeft: "0.5rem", cursor: "pointer" }}
                            onClick={() => exportToExcel(dataSource)}
                        >
                            <AiOutlineFileExcel size={18} />
                        </div>
                        <div
                            style={{ marginLeft: "0.5rem", cursor: "pointer" }}
                            onClick={() => printTable(dataSource)}
                        >
                            <LiaPrintSolid size={19} />
                        </div>
                    </div>
                </Col>

            </Row>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                scroll={{ y: 330 }}
                rowKey="chapterId"
            />
            <MessageConfirmModal textCentered ref={messageModalRef} />
        </div>
    );
};

export default ManageSyllabusStatusList;
