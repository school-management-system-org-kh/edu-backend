import { Card, Col, Row } from "antd";
import Role from "../../components/SetupSetting/RolePermission/Role";
import RoleList from "../../components/SetupSetting/RolePermission/RoleList";
import { getDataRequest } from "../../api/serviceMethods";
import { ROLE_URL } from "../../api/URLs";
import { useState } from "react";
import { useEffect } from "react";

const RolePermissionsPage = () => {
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
    const getListRole = async (value) => {
        setLoading(true);
        await getDataRequest(`${ROLE_URL}`, {
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
        isSearch && getListRole(keyword)
    }, [
        tableParams.pagination?.current,
        tableParams.pagination?.pageSize,
        tableParams?.sortOrder,
        tableParams?.sortField,
        JSON.stringify(tableParams.filters), isSearch
    ]);

    useEffect(() => {
        const delay = setTimeout(() => {
            if (isSearch) getListRole(keyword);
        }, 300);

        return () => clearTimeout(delay);
    }, [keyword]);


    return (
        <Row gutter={24}>
            <Col span={9}>
                <Card title={<span style={{ fontWeight: 600, fontSize: "1.25rem" }}>Role</span>} style={{ height: 'auto' }}>
                    <Role
                        getListRole={getListRole}
                        id={id} setId={setId}
                        loading={loading} setLoading={setLoading}
                        keyword={keyword} setIsSearch={setIsSearch}
                    />
                </Card>
            </Col>
            <Col span={15}>
                <Card title={<span style={{ fontWeight: 600, fontSize: "1.25rem" }}>Role List</span>} style={{ height: 'auto' }}>
                    <RoleList
                        data={data} tableParams={tableParams}
                        setTableParams={setTableParams}
                        loading={loading} setLoading={setLoading}
                        setkeyword={setkeyword} keyword={keyword}
                        id={id} setId={setId}
                    />
                </Card>
            </Col>
        </Row>
    )
}
export default RolePermissionsPage;