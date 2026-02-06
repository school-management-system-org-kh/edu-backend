import { Button, Card, Form, Input, message, Space, Spin, Switch,} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { FaRegEdit } from "react-icons/fa";
import { HiPlus } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";
import MessageConfirmModal from "../../components/Modals/MessageConfirmModal";
import LanguageModal from "../../components/Modals/LanguageModal";
import { US, FR, KH, CN, DE, JP, IN, GB, CA, AU } from "country-flag-icons/react/3x2";
import { LANGAUGE_URL } from "../../api/URLs";
import { deleteDataRequest, getDataRequest, postDataRequest, putDataRequest } from "../../api/serviceMethods";
import TableFetchData from "../../components/data-table/TableFetchData";
import { useTranslation } from "react-i18next";

const LanguagePage = () => {
  const messageModalRef = useRef('');
  const { t } = useTranslation()
  const flags = {
    us: US,  // 🇺🇸 English (United States)
    fr: FR,  // 🇫🇷 French
    kh: KH,  // 🇰🇭 Khmer (Cambodia)
    cn: CN,  // 🇨🇳 Chinese (China)
    de: DE,  // 🇩🇪 German (Germany)
    jp: JP,  // 🇯🇵 Japanese
    in: IN,  // 🇮🇳 Hindi / India
    gb: GB,  // 🇬🇧 English (United Kingdom)
    ca: CA,  // 🇨🇦 English/French (Canada)
    au: AU   // 🇦🇺 English (Australia)
    // continue for all countries you need
  };
  const [show, setShow] = useState(false)
  const [data, setData] = useState("")
  const [loading, setLoading] = useState(false)
  const [keyword, setkeyword] = useState('');
  const [isSubmit, setIsSubmit] = useState(false)
  const [id, setId] = useState("")
  const [form] = Form.useForm();
  const [dataObject, setDataObject] = useState({
    language: "",
    shortCode: "",
    countryCode: "",
    status: true
  });

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
  });


  const checkError = () => {
    if (!dataObject.language && !dataObject.shortCode && !dataObject.countryCode) {
      return "Please fill in all required fields."
    }
    return false
  }

  const addNewValue = async (data) => {
    setDataObject(
      {
        language: data.language,
        shortCode: data.shortCode,
        countryCode: data.countryCode,
        status: data.status,
      }
    )
  }

  // update langauge
  const insertParams = () => {
    const langaugePayload = {
      language: dataObject.language,
      shortCode: dataObject.shortCode,
      countryCode: dataObject.countryCode,
      status: dataObject.status,
    }
    return langaugePayload
  }

  // get language Id
  const getLangaugeById = async () => {
    try {
      setLoading(true);
      await getDataRequest(`${LANGAUGE_URL}/${id && id}`)
        .then((res) => {
          if (res) {
            addNewValue(res)
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      message.error('Server Error!');
    }
  }
  useEffect(() => {
    if (id && id) { getLangaugeById() }
  }, [id]);

  // for list all langauge
  const getListLangauge = async (value) => {
    setLoading(true);
    await getDataRequest(`${LANGAUGE_URL}`, {
      pageNo: tableParams.pagination.current,
      pageSize: tableParams.pagination.pageSize,
      keyword: value ? value.trim() : '',
    }).then((res) => {
      if (res.status === 200) {
        setData(res?.data);
      }
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: res.total,
        },
      });
      setLoading(false);
    }).catch((err) => {
      setLoading(false)
      console.log("Error", err)
    });
  };

  // Save member
  const handleSubmit = async () => {
    setIsSubmit(true)
    const error = checkError();
    if (error) {
      messageModalRef.current.showWarningConfirms(
        error
        ,
        () => { }, "", true
      );
      return false;
    }
    setLoading(true);
    const langagePayload = insertParams()
    try {
      const res = await postDataRequest(LANGAUGE_URL, langagePayload);
      if (res?.status === 200) {
        messageModalRef.current.showSuccessConfirmsAutoClose(res.data?.message || t("Saved Successfully"), () => {
          form.resetFields(); // ✅ clears all fields
          setDataObject({ language: "", shortCode: "", countryCode: "", status: true });
          getListLangauge();
          setShow(false)
          setIsSubmit(false)
        }, "", true);
      } else {
        messageModalRef.current.showWarningConfirmsAutoClose(res.message, () => { }, "", true);
      }
    } catch (err) {
      messageModalRef.current.showWarningConfirmsAutoClose(err && err.message, () => { }, "", true);
    } finally {
      setLoading(false);
      setIsSubmit(false);
    }
  }

  const handleSwitch = async (item) => {
    try {
      setLoading(true);
      await putDataRequest(`${LANGAUGE_URL}/${item.id} `, {
        status: !item.status,
        language: item.language,
        shortCode: item.shortCode,
        countryCode: item.countryCode
      })
        .then((res) => {
          if (res.status === 200) {
            messageModalRef.current.showSuccessConfirmsAutoClose(res && res.message, () => { }, "", true);
            getListLangauge();
            setTimeout(() => {
              setLoading(false);
            }, 2000);
          } else {
            messageModalRef.current.showWarningConfirmsAutoClose(res && res.message, () => { }, "", true);
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          messageModalRef.current.showWarningConfirmsAutoClose(err && err.response && err.response.data && err.response.data.message, () => { }, "", true);
        });
    } catch (error) {
      setLoading(false)
      messageModalRef.current.showWarningConfirmsAutoClose(`Server Error!`, () => { }, "", true);
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    const error = checkError();
    if (error) {
      messageModalRef.current.showWarningConfirms(
        error
        ,
        () => { }, "", true
      );
      return false;
    }
    try {
      const langagePayload = insertParams()
      setLoading(true);
      await putDataRequest(`${LANGAUGE_URL}/${id && id} `, langagePayload)
        .then((res) => {
          if (res.status === 200) {
            setLoading(false);
            messageModalRef.current.showSuccessConfirmsAutoClose(res && res.message, () => {
              if (!id) {
                form.resetFields(); // ✅ clears all fields
                setDataObject({ language: "", shortCode: "", countryCode: "", status: true });
                setId("")
                setIsSubmit(false)
              }
              getListLangauge();
              setShow(false)
            }, "", true);

          } else {
            messageModalRef.current.showWarningConfirmsAutoClose(res && res.message, () => { }, "", true);
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          messageModalRef.current.showWarningConfirmsAutoClose(err && err.message, () => { }, "", true);
        });
    } catch (error) {
      console.log("error", error)
      setLoading(false);
      message.error('Server Error!');
    }
  }

  const handleDelete = async (item) => {
    messageModalRef.current.showWarningConfirm(t('Are you sure you want to delete this language ?'), async () => {
      setLoading(true)
      await deleteDataRequest(`${LANGAUGE_URL}/${item?.id}`).then((res) => {
        messageModalRef.current.showSuccessConfirmsAutoClose(res && res.message, () => { }, "", true);
        getListLangauge();
        setLoading(false)
      }).catch((err) => {
        messageModalRef.current.showWarningConfirmsAutoClose(err.message, () => { }, "", true);
        setLoading(false)
      });
    }, "", true);
  };

  const tableLangaugeMangement = {
    appendable: false,
    removable: false,
    bordered: false,
    numbered: true,
    size: 'middle',
    pagination: {
      showLessItems: true,
      showSizeChanger: false,
      pageSize: 20,
    },
    columns: [
      {
        title: <span style={{fontWeight:600}}>Language</span>,
        dataIndex: "language",
        key: "language",
        sorter: (a, b) => a.language.localeCompare(b.language), // Proper string sorting
        sortDirections: ["ascend", "descend"], // show sort icons
        showSorterTooltip: false, // removes tooltip, keeps icon
        render: (_, record) => {
          const FlagIcon = flags[record.shortCode.toLowerCase()]; // dynamically select

          return (
            <div style={{ display: "flex", alignItems: "center" }}>
              {FlagIcon && <FlagIcon style={{ width: 24, height: 18 }} />}
              <span style={{ marginLeft: "0.5rem" }}>{record.language}</span>
            </div>
          );
        }
      },
      {
        title: <span style={{fontWeight:600}}>Short Code</span>,
        sorter: (a, b) => a.shortCode.localeCompare(b.shortCode), // Proper string sorting
        sortDirections: ["ascend", "descend"], // show sort icons
        showSorterTooltip: false, // removes tooltip, keeps icon
        dataIndex: "shortCode",
        key: "shortCode"
      },
      {
        title: <span style={{fontWeight:600}}>Country Code</span>,
        sorter: (a, b) => a.countryCode.localeCompare(b.countryCode), // Proper string sorting
        sortDirections: ["ascend", "descend"], // show sort icons
        showSorterTooltip: false, // removes tooltip, keeps icon
        dataIndex: "countryCode",
        key: "countryCode"
      },
      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Space className="d-flex aligin-items-center">
            <Switch onChange={() => handleSwitch(record)} checked={record.status} />
            <FaRegEdit
              style={{ fontSize: "1.2rem", color: "#1677ff", cursor: "pointer", marginTop: "0.4rem", marginLeft: "0.5rem" }}
              onClick={() => {
                setShow(true)
                setId(record && record?.id)
              }}
            />
            <DeleteOutlined
              style={{ fontSize: "1.2rem", color: "#e60b29", cursor: "pointer", marginTop: "0.4rem" }}
              onClick={() => handleDelete(record)}
            />
          </Space>
        ),
      },
    ]
  }

  const [isSearch, setIsSearch] = useState(true)
  useEffect(() => {
    isSearch && getListLangauge(keyword)
  }, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams?.sortOrder,
    tableParams?.sortField,
    JSON.stringify(tableParams.filters), isSearch
  ]);

  return (
    <Card title={
      <div className="" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontWeight: 600, fontSize: "1.25rem" }}>Language List</div>
        <Button
          onClick={() => {
            setShow(true)
            form.resetFields(); // ✅ clears all fields
            setDataObject({ language: "", shortCode: "", countryCode: "", status: true });
            setIsSubmit(false)
            setId("")
          }}
          type="" icon={<HiPlus />}
          size="middle" style={{ fontSize: "1rem", fontWeight: 500 }}
        >
          Create
        </Button>
      </div>
    }>

      <div className="w-100 h-100 overflow-auto" style={{ overflow: 'auto', width: "100%", height: '100%' }}>
        <Spin spinning={loading}>
          {/* <div className="w-100">
            <div className="d-flex justify-content-between mt-3 mb-3">
              <div className="d-flex align-items-center col-6 row">
                <div className='col-6'>
                  <Input
                    placeholder={t('employee_search')}
                    size="large"
                    disabled={loading}
                    allowClear
                    prefix={
                      <SearchOutlined
                        onClick={() => { }}
                        style={{
                          color: '#8c8c8c',
                          cursor: "pointer",
                          opacity: "0.4"
                        }}
                      />
                    }
                    onChange={(e) => {
                      const value = e.target.value;
                      setkeyword(value);
                    }}
                    onPressEnter={async (e) => {
                    }}
                  />
                </div>
                <div className='col-6'>
                  <DateRangeComponent value={dates ? dates : [null, null]} setValue={(value) => {
                    setDates(value)
                    setTableParams({
                      ...tableParams,
                      pagination: {
                        ...tableParams.pagination,
                        current: 1,
                        total: 0,
                      },
                    });
                  }} />
                </div>
              </div>
              <div className='d-flex alight-items-center'>
                <Button size={'large'}
                  onClick={() => {
                    setTableParams({
                      ...tableParams,
                      pagination: {
                        ...tableParams.pagination,
                        current: 1,
                        total: 0,
                      },
                    });
                    setIsSearch(false)
                    setTimeout(() => {
                      setIsSearch(true)
                    }, 100);
                    // initLoadStaffData(keyword);
                  }}
                >
                  {t('btnSearch')}
                </Button>
                <div className="me-2 ms-2 d-flex align-items-center" style={{ height: "100%", borderLeft: "1px solid rgba(220, 220, 220, 0.83)" }}></div>
                
              </div>
            </div>
          </div> */}

          <div className="w-100">
            <TableFetchData
              tableParams={tableParams} setTableParams={setTableParams}
              data={data}
              columns={tableLangaugeMangement.columns}
            />
          </div>
        </Spin>
      </div>
      <LanguageModal
        show={show} setShow={setShow}
        dataObject={dataObject}
        setDataObject={setDataObject}
        handleSubmit={handleSubmit}
        isSubmit={isSubmit} setIsSubmit={setIsSubmit}
        form={form} id={id} handleUpdate={handleUpdate}
      />
      <MessageConfirmModal textCentered ref={messageModalRef} />
    </Card>
  );
}

export default LanguagePage;
