import React, { useRef, useState } from "react";
import { Card, Table } from "antd";
import { TiDelete } from "react-icons/ti";
import { FaBook, FaBuilding, FaPlus, FaRegClock } from "react-icons/fa";
import { MdEdit, MdOutlineViewHeadline } from "react-icons/md";
import { CiCircleRemove } from "react-icons/ci";
import LessonPlanModal from "../../Modals/LessonPlanModal";
import { useTranslation } from "react-i18next";
import ViewLessonPlanModal from "../../Modals/ViewLessonPlanModal";
import MessageConfirmModal from "../../Modals/MessageConfirmModal";

const TeacherTimeTableList = ({ storeData }) => {
    const { t } = useTranslation()
    const [open, setOpen] = useState(false);
    const [viewShow, setViewShow] = useState(false);
    const [data, setData] = useState(false);
    const messageModalRef = useRef('');

    let addLesson = false;
    const columns = [
        {
            title: <>{t("Monday")}<br /><span style={{ fontWeight: 600 }}>10/28/2024</span></>,
            dataIndex: "monday",
            key: "monday",
            render: renderCard
        },
        {
            title: <>{t("Tuesday")}<br /><span style={{ fontWeight: 600 }}>10/29/2024</span></>,
            dataIndex: "tuesday",
            key: "tuesday",
            render: renderCard
        },
        {
            title: <>{t("Wednesday")}<br /><span style={{ fontWeight: 600 }}>10/30/2024</span></>,
            dataIndex: "wednesday",
            key: "wednesday",
            render: renderCard
        },
        {
            title: <>{t("Thursday")}<br /><span style={{ fontWeight: 600 }}>10/31/2024</span></>,
            dataIndex: "thursday",
            key: "thursday",
            render: renderCard
        },
        {
            title: <>{t("Friday")}<br /><span style={{ fontWeight: 600 }}>11/01/2024</span></>,
            dataIndex: "friday",
            key: "friday",
            render: renderCard
        },
        {
            title: <>{t("Saturday")}<br /><span style={{ fontWeight: 600 }}>11/02/2024</span></>,
            dataIndex: "saturday",
            key: "saturday",
            render: renderCard
        },
        {
            title: <>{t("Sunday")}<br /><span style={{ fontWeight: 600 }}>11/03/2024</span></>,
            dataIndex: "sunday",
            key: "sunday",
            render: renderCard
        },
    ];


    // Render function for a subject card
    function renderCard(record) {
        if (!record) return <Card size="small" style={{ width: "150px", color: "red", fontWeight: 500 }}><div className="" style={{ display: 'flex', alignItems: 'center' }}><TiDelete size={20} /> Not Scheduled</div></Card>;
        return (
            <Card size="small" bordered style={{ width: "200px", color: "" }}>
                {
                    addLesson ?
                        <div className="" style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', justifyContent: "end" }}>
                            <FaPlus size={16} color="#444" style={{ cursor: "pointer", float: "right" }} onClick={() => setOpen(true)} />
                        </div>
                        :
                        <div className="" style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem', justifyContent: "end" }}>
                            <MdOutlineViewHeadline size={16} color="#444" style={{ cursor: "pointer" }} onClick={() => setViewShow(true)}/>
                            <MdEdit size={16} color="#444" style={{ marginLeft: "0.5rem", cursor: "pointer" }} onClick={() => setOpen(true)} />
                            <CiCircleRemove size={16} color="#444" style={{ marginLeft: "0.5rem", cursor: "pointer" }}  onClick={() => handleDelete()}/>
                        </div>
                }
                <p style={{ textWrap: "wrap", color: "#38a13c" }}><FaBook size={12} color="#525252" /><span style={{ marginLeft: "0.5rem" }}>Class:</span> {record.className}</p>
                <p style={{ textWrap: "wrap", color: "#38a13c", marginLeft: "1.3rem" }}><span>Subject:</span> {record.subject}</p>
                <p style={{ textWrap: "wrap", color: "#38a13c" }}><FaRegClock size={12} color="#525252" /><span style={{ marginLeft: "0.5rem" }}>{record.time}</span></p>
                <p style={{ textWrap: "wrap", color: "#38a13c" }}><FaBuilding size={12} color="#525252" /><span style={{ marginLeft: "0.5rem" }}>Room No.:</span> {record.room}</p>
            </Card>
        );
    }

    // Example dataset (just 2 rows, you can expand with all your data)
    const dataSource = [
        {
            key: "1",
            time: "09:00 - 09:45",
            monday: { className: "Class 4(A)", subject: "English (210)", time: "09:00 AM - 09:45 AM", room: "15" },
            tuesday: { className: "Class 1(D)", subject: "English (210)", time: "09:00 AM - 09:45 AM", room: "15" },
            wednesday: { className: "Class 2(D)", subject: "English (210)", time: "09:00 AM - 09:45 AM", room: "12" },
            thursday: { className: "Class 5(D)", subject: "English (210)", time: "09:00 AM - 09:45 AM", room: "15" },
            friday: { className: "Class 1(C)", subject: "English (210)", time: "09:00 AM - 09:45 AM", room: "15" },
            saturday: { className: "Class 2(C)", subject: "Social Studies (212)", time: "09:00 AM - 09:45 AM", room: "15" },
            sunday: null,
        },
        {
            key: "2",
            time: "09:45 - 10:30",
            monday: { className: "Class 1(D)", subject: "Mathematics (110)", time: "09:45 AM - 10:30 AM", room: "15" },
            tuesday: { className: "Class 5(A)", subject: "Mathematics (110)", time: "09:45 AM - 10:30 AM", room: "12" },
            wednesday: { className: "Class 2(C)", subject: "Drawing (200)", time: "09:45 AM - 10:30 AM", room: "12" },
            thursday: { className: "Class 5(B)", subject: "Mathematics (110)", time: "09:45 AM - 10:30 AM", room: "15" },
            friday: { className: "Class 6(B)", subject: "Hindi (230)", time: "09:45 AM - 10:30 AM", room: "15" },
            saturday: { className: "Class 9(B)", subject: "Hindi (232)", time: "09:45 AM - 10:30 AM", room: "15" },
            sunday: null,
        },
    ];

    const handleDelete = async (item) => {
    // if (dataDonor.length == 1) {
    //   message.error("At least one program is required",2);
    //   return;
    // } else {
      messageModalRef.current.showWarningConfirm('Are you sure you want to delete this lesson plan?', () => {
          // .then(async(res) => {
            messageModalRef.current.showSuccessConfirmsAutoClose("Successfully", () => {},"", true);
          // }).catch((err) => {
          //   messageModalRef.current.showWarningConfirms("Failed!", () => { }, "", true);
          // });
      },"", true);
    // }
  }

    return (
        <div className="" style={{ marginTop: "1.5rem" }}>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                scroll={{
                    y: 390,
                    x: "auto"   // vertical scroll height (px)
                }}
            />
            <LessonPlanModal t={t} show={open} setShow={setOpen} data={data} setData={setData} />
            <ViewLessonPlanModal t={t} show={viewShow} setShow={setViewShow} data={data} setData={setData} />
            <MessageConfirmModal textCentered ref={messageModalRef} />
        </div>
    )
}

export default TeacherTimeTableList;