import React, { useEffect, useRef, useState } from "react";
import {
  Switch, message, Table,
  Space, Spin
} from "antd";
import dayjs from "dayjs";
import MessageConfirmModal from "@/components/messageModal/MessageConfirmModal";
import { PlusOutlined } from "@ant-design/icons";
import { messageFun } from "@/components/message/Message";
import BtnDeleteSVG from "@/system/assets/svgicons/header/btn_delete";
import BtnEditVG from "@/system/assets/svgicons/header/btn_edit";
import { deleteDonorProgram, getDonorProgramList, updateDonorProgram, updateDonorProgramStatus } from "../../service/donorProgram/DonorProgram";
import { IsHavePermissionBtnByLevel } from "@/components/guarded-route/guarded-routes";
import TablePage from "@/components/table/TablePage";

const ListPage = ({ setCurrentLoc, setId, setDisplayNone }) => {
  const [dataDonor, setDataDonor] = useState([]);
  const messageModalRef = useRef('rememberMe');
  const [query, setQuery] = useState({
    pageSize: 10,
    pageNo: 1,
  });
  const [totalData, setTotalData] = useState({ total: 0, data: [] });
  const [loading, setLoading] = useState(false);

  const getDonorProgram = async () => {
    setLoading(true)
    try {
      await getDonorProgramList({
        pageSize: query.pageSize,
        pageNo: query.pageNo,
      })
        .then((res) => {
          if (res.status === 200) {
            setDataDonor(res.data);
            setTotalData({
              total: res.total ? res.total : 0,
              data: res.data
            });
          }
          setLoading(false)
        })
        .catch((err) => {
          message.error(err,2)
          setLoading(false)
        });
    } catch (error) {
      message.error("Internal Server Error",2)
    }
  }

  const handleCreate = async (type) => {
    setDisplayNone("hideSiteBar")
    setCurrentLoc('create');
  };
  
  const handleEdit = (id) => {
    setDisplayNone("hideSiteBar")
    setId(id)
    setCurrentLoc(`edit`)
  };

  const handleDelete = async (item) => {
    if (dataDonor.length == 1) {
      message.error("At least one program is required",2);
      return;
    } else {
      messageModalRef.current.showWarningConfirm('Are you sure you want to delete this donor program ?', () => {
        setLoading(true)
        deleteDonorProgram(item._id)
          .then(async(res) => {
            messageModalRef.current.showSuccessConfirmsAutoClose(res.message, () => {},"", true);
            await getDonorProgram();
            setLoading(false)
          }).catch((err) => {
            setLoading(false)
            messageModalRef.current.showWarningConfirms("Failed!", () => { }, "", true);
          });
      },"", true);
    }
  }

  const handleUpdateStatus = async (item) => {
    setLoading(true)
    await updateDonorProgramStatus(item._id, "",
      {
        "status": !item.status
      })
      .then(async(res) => {
        if (res.status == 200) {
          messageModalRef.current.showSuccessConfirmsAutoClose(res.message, () => {},"", true);
          await getDonorProgram();
        }
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        messageModalRef.current.showWarningConfirms("Failed!", () => { }, "", true);
      });
  };
  
  const handlePageOnChange = ({ size, pageIndex }) => {
    let _q = { ...query };
    _q.pageNo = pageIndex;
    _q.pageSize = size;
    setQuery(_q);
  };

  useEffect(() => {
    getDonorProgram();
  }, [query]);

  const columns = [
    {
      title: (
        <span className="text-tittle-size20-weight500" style={{ textWrap: 'nowrap' }}>
          Donor Program
        </span>
      ),
      dataIndex: "title",
      render: (text, record, index) => (
        <span className="text-size16-weight400" style={{ textWrap: 'nowrap' }}>
          {text}
        </span>
      ),
    },
    {
      title: (
        <span className="text-tittle-size20-weight500" style={{ textWrap: 'nowrap' }}>
          Product Type
        </span>
      ),
      dataIndex: 'code',
      key: "code",
      render: (text, record, index) => (record.productType ? <span className="text-size16-weight400" key={index} style={{ textWrap: 'nowrap' }}> {record.productType.title} </span> : <span className="text-size16-weight400">N/A</span>)
    },
    {
      title: (
        <span className="text-tittle-size20-weight500" style={{ textWrap: 'nowrap' }}>
          Creator
        </span>
      ),
      dataIndex: 'userId',
      key: "userId",
      render: (text, record, index) => (record.employeeId ? <span className="text-size16-weight400" style={{ textWrap: 'nowrap' }}> {record.employeeId.firstName + " " + record.employeeId.lastName} </span> : "N/A")
    },
    {
      title: (
        <span className="text-tittle-size20-weight500" style={{ textWrap: 'nowrap' }}>
          Create Time
        </span>
      ),
      dataIndex: 'createdAt',
      key: "createdAt",
      render: (text, record, index) => <span className="text-size16-weight400" style={{ textWrap: 'nowrap' }}>{!record.createdAt ? "N/A" : dayjs(record.createdAt).format('MM/DD/YYYY  h:mm a')}</span>
    },
    {
      title: (
        <span className="text-tittle-size20-weight500" style={{ textWrap: 'nowrap' }}>
          Action
        </span>
      ),
      dataIndex: "Action",
      render: (text, record, index) => (
        <Space
          size="middle"
          style={{
            display: "flex",
            alignItems: "self-start",
          }}
        >
          <Switch
            style={{ cursor: 'pointer' }}
            checked={record.status}
            disabled={!IsHavePermissionBtnByLevel(`Product Management`)}
            onChange={() => {
              handleUpdateStatus(record);
            }}
          />
          <span
            onClick={() => {
              handleEdit(record._id);
            }}
            style={{ cursor: 'pointer', marginLeft: '1.5rem' }}
          >
            <BtnEditVG />
          </span>

          <span
            onClick={() => {
              if(IsHavePermissionBtnByLevel(`Product Management`)) {
                handleDelete(record);
              }
            }}
            style={{ 
              marginLeft: '1.5rem', 
              cursor: IsHavePermissionBtnByLevel(`Product Management`) ? 'pointer' : "no-drop",
              opacity: IsHavePermissionBtnByLevel(`Product Management`) ? 1 : 0.4,
            }}
          >
            <BtnDeleteSVG />
          </span>
        </Space>
      ),
    },
  ];
  
  return (
      <>
      <div className="h--100 w-100 mymain d-flex flex-column">
        <div className='w-100 jum-header-cus d-flex justify-content-between' style={{ flexShrink: 0 }}> 
          <button className='back_section1'>
            <div className="back_title1">
              {`Donor Program`}
            </div>
          </button>
        </div>
        
        <div className="w-100 flex-grow-1 d-flex flex-column bgCardTableSystem- bluediv scoll-auto div-new-content" style={{ overflow: "hidden" }}>
          <div className="main_title" style={{ flexShrink: 0, marginBottom: "2rem" }}>
            List of Donor Program
          </div>
          
        <div className="flex-grow-1 position-relative" style={{ minHeight: 0, overflow: "hidden" }}>
        <div className="h-100 d-flex flex-column">
          <div className="flex-grow-1 cus-scroll-content" style={{ overflow: "auto" }}>
            <div
              style={{
                background: "#F0F3F9",
                borderRadius: "0.63rem",
              }}
            >
              <Table
                className={`pacs-table-config-css ${dataDonor && dataDonor?.length > 0 ? 'tablebottomtable' : ''}`}
                columns={columns}
                dataSource={dataDonor}
                pagination={false}
                hideOnSinglePage={false}
                loading={loading && <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                  <Spin size="middle" tip="Loading..."></Spin>
                </div>}
              />
            </div>
            
          <div
            style={{
              borderRadius: "0rem 0rem 0.63rem 0.63rem",
              border: "0.13rem solid rgba(230,233,239,1)",
              borderTop: "none",
              marginLeft: "7rem",
              width: "fit-content",
              padding: "0.5rem",
              color: "rgba(21,44,91,0.800000011920929)",
              fontFamily: "Montserrat",
              fontWeight: 500,
              fontSize: "0.9rem",
              lineHeight: "normal",
              letterSpacing: "0rem",
              textAlign: "center",
              cursor: IsHavePermissionBtnByLevel(`Product Management`) ? "pointer" : "no-drop",
              opacity: IsHavePermissionBtnByLevel(`Product Management`) ? "1" : "0.4",
              marginBottom: "1rem",
            }}
            onClick={() => {
              if(IsHavePermissionBtnByLevel(`Product Management`)) {
                handleCreate('create');
              }
            }}
          >
            <span className='d-flex flex-row align-items-center' style={{ fontWeight: 600, padding: '0 1.5rem' }}>
              <PlusOutlined className='me-1' />
              Add New Donor Program
            </span>
          </div>
        </div>
      </div>
      </div>
      
      <div style={{ 
        flexShrink: 0, 
        padding: "10px 0", 
        backgroundColor: "#fff", 
        zIndex: 2,
        position: "sticky",
        bottom: 0,
        // borderTop: totalData.total > 0 ? "1px solid rgba(232, 232, 232, 0.5)" : "none"
      }}>
        {totalData.total > 0 && (
          <TablePage
            total={totalData.total}
            pageIndex={query.pageNo}
            size={query.pageSize}
            onChange={handlePageOnChange}
          />
        )}
          </div>
        </div>
      </div>
      <MessageConfirmModal textCentered ref={messageModalRef} />
      </>
  );
};

export default ListPage;