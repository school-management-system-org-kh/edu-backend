import React, { useRef, useState } from "react";
import { Button, Radio, Table } from "antd";
import MessageConfirmModal from "../../Modals/MessageConfirmModal";

const PromoteStudentList = () => {
    const messageModalRef = useRef('');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = newSelectedRowKeys => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const dataSource = [
        { key: "1", no: "120020", studentName: "Chham Pichmaly", fatherName: "Kong Kon", bod: "09/05/2000" },
        { key: "2", no: "18001", studentName: "Chham Kanika", fatherName: "Morn Chanda", bod: "09/05/2007" },
        { key: "3", no: "520039", studentName: "Chham Dararaksmey", fatherName: "Morn Chantha", bod: "09/05/1995" },
    ];

    const columns = [
        {
            title: "Admission No",
            dataIndex: "no",
            key: "no",
        },
        {
            title: "Student Name",
            dataIndex: "studentName",
            key: "studentName",
        },
        {
            title: "Father Name",
            dataIndex: "fatherName",
            key: "fatherName",
        },
        {
            title: "Date Of Birth",
            dataIndex: "bod",
            key: "bod",
        },
        {
            title: "Current Result",
            render: (_, record) => (
                <Radio.Group
                    name="radiogroup"
                    defaultValue={1}
                    options={[
                        { value: "pass", label: 'Pass' },
                        { value: "fail", label: 'Fail' },
                    ]}
                />
            ),
        },
        {
            title: "Next Session Status",
            render: (_, record) => (
                <Radio.Group
                    name="radiogroup1"
                    defaultValue={1}
                    options={[
                        { value: "continue", label: 'Continue' },
                        { value: "leave", label: 'Leave' },
                    ]}
                />
            ),
        },
    ];
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange
    }

    const handlePromote = async (item) => {
        // if (dataDonor.length == 1) {
        //   message.error("At least one program is required",2);
        //   return;
        // } else {
        messageModalRef.current.showWarningConfirm('Are You Sure You, Want To Promote Confirm?', () => {
            // .then(async(res) => {
            messageModalRef.current.showSuccessConfirmsAutoClose("Successfully", () => { }, "", true);
            // }).catch((err) => {
            //   messageModalRef.current.showWarningConfirms("Failed!", () => { }, "", true);
            // });
        }, "", true);
        // }
    }

    return (
        <div>
            <Table
                dataSource={dataSource}
                columns={columns}
                rowSelection={rowSelection}
                pagination={false}
                scroll={{
                    y: 330,   // vertical scroll height (px)
                }}
            />
            <div style={{ textAlign: "center", marginTop: 20 }}>
                <Button
                    size="middle"
                    style={{ width: "15%", fontSize: "1rem", fontWeight: 600, backgroundColor: "#525252", color: 'white', border: "none" }}
                    onClick={handlePromote}
                >
                    Promote
                </Button>
            </div>
            <MessageConfirmModal textCentered ref={messageModalRef} />
        </div>
    )
}

export default PromoteStudentList;