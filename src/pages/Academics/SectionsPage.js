import { Card, Col, Row } from "antd";
import AddSection from "../../components/Academics/Selection/AddSection";
import SectionList from "../../components/Academics/Selection/SectionList";
import { useEffect, useState } from "react";
import { SECTION_LIST_URL, SECTION_URL } from "../../api/URLs";
import { getDataRequest } from "../../api/serviceMethods";

const SectionsPage = () => {
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
    const getListSections = async (value) => {
        setLoading(true);
        await getDataRequest(`${SECTION_URL}`, {
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
        isSearch && getListSections(keyword)
    }, [
        tableParams.pagination?.current,
        tableParams.pagination?.pageSize,
        tableParams?.sortOrder,
        tableParams?.sortField,
        JSON.stringify(tableParams.filters), isSearch
    ]);

    useEffect(() => {
        const delay = setTimeout(() => {
            if (isSearch) getListSections(keyword);
        }, 3000);

        return () => clearTimeout(delay);
    }, [keyword]);

    return (
        <Row gutter={24}>
            <Col span={9}>
                <Card title={<span style={{ fontWeight: 600, fontSize: "1.25rem" }}>Add Section</span>} style={{ height: 'auto' }}>
                    <AddSection 
                        getListSection={getListSections}
                        id={id} setId={setId}
                        loading={loading} setLoading={setLoading}
                        keyword={keyword} setIsSearch={setIsSearch}
                    />
                </Card>
            </Col>
            <Col span={15}>
                <Card title={<span style={{ fontWeight: 600, fontSize: "1.25rem" }}>Section List</span>} style={{ height: 'auto' }}>
                    <SectionList 
                        data={data} tableParams={tableParams}
                        setTableParams={setTableParams}
                        loading={loading} setLoading={setLoading}
                        setkeyword={setkeyword} keyword={keyword}
                        id={id} setId={setId}  getListSection={getListSections}
                    />
                </Card>
            </Col>
        </Row>
    )
}
export default SectionsPage;