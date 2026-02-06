import React, { useRef, useState } from "react";
import { Table } from "antd";
import "jspdf-autotable";
import { FaRegEdit } from "react-icons/fa";
import { DeleteOutlined } from "@ant-design/icons";
import MessageConfirmModal from "../Modals/MessageConfirmModal";
import { MdOutlineMailOutline } from "react-icons/md";
import CustomDrawer from "../Modals/CustomDrawer";
import { useNavigate } from "react-router-dom";

const NoticeBoardTable = ({ setData, t }) => {
    const messageModalRef = useRef('');
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [storeData, setStoreDate] = useState("")
    const showDrawer = () => {
        setOpen(true);
    };

    const handleDelete = async (item) => {
        // if (dataDonor.length == 1) {
        //   message.error("At least one program is required",2);
        //   return;
        // } else {
        messageModalRef.current.showWarningConfirm('Are you sure you want to delete this notice board?', () => {
            // .then(async(res) => {
            messageModalRef.current.showSuccessConfirmsAutoClose("Successfully", () => { }, "", true);
            // }).catch((err) => {
            //   messageModalRef.current.showWarningConfirms("Failed!", () => { }, "", true);
            // });
        }, "", true);
        // }
    }


    const dataSource = [
        {
            key: "1",
            title: "Online Learning Notice",
            description: "Online learning refers to instruction that is delivered electronically through various multimedia and Internet platforms and applications.",
            publishDate: "12/20/2025",
            noticeDate: "11/27/2025",
            createdBy: "Chham Dararaksmey",
            role: [
                {
                    name: "Super Admin"
                },
                {
                    name: "Admin"
                },
                {
                    name: "Teacher"
                },
                {
                    name: "Accountant"
                },
                {
                    name: "Receptionist"
                },
                {
                    name: "Librarian"
                }
            ]
        },
        {
            key: "2",
            title: "Student Health Check-up",
            description: `To assess normal development of the child. To keep track of immunization schedule. Early detection of disease / abnormalities, which when treated in time, allows the child to lead a normal life.`,
            publishDate: "12/11/2025",
            noticeDate: "11/11/2025",
            createdBy: "Chham Pichmaly",
            role: [
                {
                    name: "Super Admin"
                },
                {
                    name: "Admin"
                },
            ]
        },
        {
            key: "3",
            title: "School Vacation Notice ..!!!!",
            description: `Dear Parents,
It’s vacation time! Time to refresh yourself and visit new places. At the same time, we want our students to learn and explore more. So here we have fun filled holiday homework. Please take a printout of the homework sheets and follow the instructions. Please take care of the neatness of work.`,
            publishDate: "09/20/2025",
            noticeDate: "08/27/2025",
            createdBy: "Chham Kanika",
            role: [
                {
                    name: "Super Admin"
                },
                {
                    name: "Admin"
                },
                {
                    name: "Teacher"
                },
                {
                    name: "Accountant"
                },
            ]
        },
        {
            key: "4",
            title: "Notice for new Book collection",
            description: `Parents are hereby informed that books of the syllabus from Class I - XII are now available in school. You are requested to collect them before last date.`,
            publishDate: "09/20/2025",
            noticeDate: "09/27/2025",
            createdBy: "Chham Vitro",
            role: [
                {
                    name: "Super Admin"
                },
                {
                    name: "Admin"
                },
                {
                    name: "Teacher"
                },
            ]
        },
    ];

    const columns = [
        {
            title: t("Name"),
            render: (_, record) => (
                <div
                    className=""
                    style={{ display: 'flex', alignItems: "center", color: "#0084b4", cursor: "pointer" }}
                    onClick={() => {
                        showDrawer()
                        setStoreDate(record)
                    }}
                >
                    <MdOutlineMailOutline size={20} />
                    <span style={{ marginLeft: "0.5rem" }}>{record?.title}</span>
                </div>
            )
        },
        {
            title: t("Action"),
            key: "action",
            width: 100,
            align: "right", // align to end
            fixed: 'right',
            render: (_, record) => (
                <div className="" style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                    <FaRegEdit
                        style={{ fontSize: "1.2rem", color: "#1677ff", cursor: "pointer", marginTop: "0.4rem", marginLeft: "0.5rem" }}
                        onClick={() => {
                            navigate("/communicate/notice-board/add")
                        }}
                    />
                    <DeleteOutlined
                        style={{ fontSize: "1.2rem", color: "#e60b29", cursor: "pointer", marginTop: "0.4rem", marginLeft: "0.5rem" }}
                        onClick={() => handleDelete(record)}
                    />

                </div>
            ),
        },
    ];

    return (
        <div>
            <Table
                dataSource={dataSource}
                scroll={{ x: 1000, y: 400 }}
                columns={columns}
            />
            <CustomDrawer
                open={open}
                onClose={() => setOpen(false)}
                storeData={storeData}
            />
            <MessageConfirmModal textCentered ref={messageModalRef} />
        </div>
    )
}

export default NoticeBoardTable;