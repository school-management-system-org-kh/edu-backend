import { Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import AddSubject from "../../components/Academics/Subject/AddSubject";
import SubjectList from "../../components/Academics/Subject/SubjectList";
import { getDataRequest } from "../../api/serviceMethods";
import { SUBJECT_URL } from "../../api/URLs";

const SubjectPage = () => {
    const [data, setData] = useState("")
    const [loading, setLoading] = useState(false)
    const [keyword, setkeyword] = useState('');
    const [id, setId] = useState("")

    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0,
        },
    });

    // for list all role
    const getListSubjects = async (value) => {
        setLoading(true);
        await getDataRequest(`${SUBJECT_URL}`, {
            pageNo: tableParams.pagination.current,
            pageSize: tableParams.pagination.pageSize,
            search: value ? value.trim() : "",
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

    const [isSearch, setIsSearch] = useState(true)
    useEffect(() => {
        isSearch && getListSubjects(keyword)
    }, [
        tableParams.pagination?.current,
        tableParams.pagination?.pageSize,
        tableParams?.sortOrder,
        tableParams?.sortField,
        JSON.stringify(tableParams.filters), isSearch
    ]);

    useEffect(() => {
        const delay = setTimeout(() => {
            if (isSearch) getListSubjects(keyword);
        }, 3000);

        return () => clearTimeout(delay);
    }, [keyword]);

    return (
        <Row gutter={24}>
            <Col span={9}>
                <Card title={<span style={{ fontWeight: 600, fontSize: "1.25rem" }}>{id ? "Edit Subject" : "Add Subject"}</span>} style={{ height: 'auto' }}>
                    <AddSubject
                        getListSubject={getListSubjects}
                        id={id} setId={setId}
                        loading={loading} setLoading={setLoading}
                        keyword={keyword} setIsSearch={setIsSearch}
                    />
                </Card>
            </Col>
            <Col span={15}>
                <Card title={<span style={{ fontWeight: 600, fontSize: "1.25rem" }}>Subject List</span>} style={{ height: 'auto' }}>
                    <SubjectList
                        data={data} tableParams={tableParams}
                        setTableParams={setTableParams}
                        loading={loading} setLoading={setLoading}
                        setkeyword={setkeyword} keyword={keyword}
                        id={id} setId={setId} getListSubject={getListSubjects}

                    />
                </Card>
            </Col>
        </Row>
    )
}
export default SubjectPage;