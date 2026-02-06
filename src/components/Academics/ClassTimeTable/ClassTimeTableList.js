import React from "react";
import { Button, Card, Table } from "antd";
import { TiDelete } from "react-icons/ti";
import { FaBook, FaBuilding, FaRegClock, FaUserTie } from "react-icons/fa";
import { LiaPrintSolid } from "react-icons/lia";
import dayjs from "dayjs";

const ClassTimeTableList = ({storeData}) => {
    const columns = [
        { title: "Monday", dataIndex: "monday", key: "monday", render: renderCard },
        { title: "Tuesday", dataIndex: "tuesday", key: "tuesday", render: renderCard },
        { title: "Wednesday", dataIndex: "wednesday", key: "wednesday", render: renderCard },
        { title: "Thursday", dataIndex: "thursday", key: "thursday", render: renderCard },
        { title: "Friday", dataIndex: "friday", key: "friday", render: renderCard },
        { title: "Saturday", dataIndex: "saturday", key: "saturday", render: renderCard },
        { title: "Sunday", dataIndex: "sunday", key: "sunday", render: renderCard },
    ];
    
    // Render function for a subject card
    function renderCard(record) {
        if (!record) return <Card size="small" style={{ width: "150px", color: "red", fontWeight: 500 }}><div className="" style={{ display: 'flex', alignItems: 'center' }}><TiDelete size={20} /> Not Scheduled</div></Card>;
        return (
            <Card size="small" bordered style={{ width: "200px", color: "" }}>
                <p style={{ textWrap: "wrap", color: "#38a13c" }}><FaBook size={12} color="#525252" /><span style={{ marginLeft: "0.5rem" }}>Subject:</span> {record.subject}</p>
                <p style={{ textWrap: "wrap", color: "#38a13c"}}><FaUserTie size={12} color="#525252" /><span style={{ marginLeft: "0.5rem" }}></span> {record.teacher}</p>
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
            monday: { className: "Class 4(A)", subject: "English (210)", time: "09:00 AM - 09:45 AM", room: "15", teacher:"Shivam Verma (9002)" },
            tuesday: { className: "Class 1(D)", subject: "English (210)", time: "09:00 AM - 09:45 AM", room: "15", teacher:"Shivam Verma (9002)"  },
            wednesday: { className: "Class 2(D)", subject: "English (210)", time: "09:00 AM - 09:45 AM", room: "12", teacher:"Albert Thomas (54545454)"  },
            thursday: { className: "Class 5(D)", subject: "English (210)", time: "09:00 AM - 09:45 AM", room: "15", teacher:"Shivam Verma (9002)"  },
            friday: { className: "Class 1(C)", subject: "English (210)", time: "09:00 AM - 09:45 AM", room: "15", teacher:"Albert Thomas (54545454)"  },
            saturday: { className: "Class 2(C)", subject: "Social Studies (212)", time: "09:00 AM - 09:45 AM", room: "15", teacher:"Shivam Verma (9002)"  },
            sunday: null,
        },
        {
            key: "2",
            time: "09:45 - 10:30",
            monday: { className: "Class 1(D)", subject: "Mathematics (110)", time: "09:45 AM - 10:30 AM", room: "15", teacher:"Shivam Verma (9002)"  },
            tuesday: { className: "Class 5(A)", subject: "Mathematics (110)", time: "09:45 AM - 10:30 AM", room: "12", teacher:"Shivam Verma (9002)"  },
            wednesday: { className: "Class 2(C)", subject: "Drawing (200)", time: "09:45 AM - 10:30 AM", room: "12", teacher:"Albert Thomas (54545454)"  },
            thursday: { className: "Class 5(B)", subject: "Mathematics (110)", time: "09:45 AM - 10:30 AM", room: "15", teacher:"Shivam Verma (9002)"  },
            friday: { className: "Class 6(B)", subject: "Hindi (230)", time: "09:45 AM - 10:30 AM", room: "15", teacher:"Albert Thomas (54545454)"  },
            saturday: { className: "Class 9(B)", subject: "Hindi (232)", time: "09:45 AM - 10:30 AM", room: "15", teacher:"Albert Thomas (54545454)"  },
            sunday: null,
        },
    ];
    const printTable = (columns, data) => {
        // Build tables per day
        const dayTables = columns
            .filter((col) => col.dataIndex) // only days
            .map((col) => {
                // Table headers
                const headers = `
        <th style="border:1px solid #ddd; padding:6px; background:#4F81BD; color:white;">Subject</th>
        <th style="border:1px solid #ddd; padding:6px; background:#4F81BD; color:white;">Time</th>
        <th style="border:1px solid #ddd; padding:6px; background:#4F81BD; color:white;">Teacher</th>
        <th style="border:1px solid #ddd; padding:6px; background:#4F81BD; color:white;">Room No.</th>
      `;

                // Rows for this day
                const rows = data
                    .map((row) => {
                        const cell = row[col.dataIndex];
                        if (!cell) return ""; // skip "Not Scheduled"

                        return `
            <tr>
              <td style="border:1px solid #ddd; padding:6px;">${cell.subject || ""}</td>
              <td style="border:1px solid #ddd; padding:6px;">${cell.time || ""}</td>
              <td style="border:1px solid #ddd; padding:6px;">${cell.teacher || ""}</td>
              <td style="border:1px solid #ddd; padding:6px;">${cell.room || ""}</td>
            </tr>
          `;
                    })
                    .join("");

                if (!rows) return ""; // skip empty days

                // Return complete table for the day
                return `
        <h3 style="margin-top:30px;">${col.title}</h3>
        <table style="border-collapse:collapse; width:100%; margin-bottom:20px;">
          <thead><tr>${headers}</tr></thead>
          <tbody>${rows}</tbody>
        </table>
      `;
            })
            .join("");

        // Full HTML
        const printContent = `
    <html>
      <head>
        <title>Teacher Time Table - ${dayjs().format("MM/DD/YYYY hh:mm A")}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ddd; padding: 6px; }
          th { background: #4F81BD; color: white; text-align: start }
          h3 { margin: 16px 0 8px; color:#333; }
        </style>
      </head>
      <body>
        <h2 style="text-align:center;">Teacher Time Table</h2>
        <h2 style="text-align:start;">${storeData?.security}</h2>
        ${dayTables}
      </body>
    </html>
  `;

        // Open Print Window
        const printWindow = window.open("", "", "height=600,width=800");
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
    };




    return (
        <div className="" style={{ marginTop: "1.5rem" }}>
            <Button 
                onClick={() => printTable(columns, dataSource)} 
                style={{
                    backgroundColor: "#525252",
                    color: "white",
                    border: "none",
                    float:"right",
                    marginBottom:"1rem"
                }}><LiaPrintSolid size={19} /></Button>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                scroll={{
                    y: 390,
                    x: "auto"   // vertical scroll height (px)
                }}
            />
        </div>
    )
}

export default ClassTimeTableList;