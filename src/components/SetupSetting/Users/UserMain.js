import ParentTab from "./ParentTab";
import StaffTab from "./StaffTab";
import StudentTab from "./StudentTab";
import { useState } from "react";

const UserMain = () => {
    const [selectModule, setSelectModule] = useState("student")
    const [loading, setLoading] = useState(false);
    return (
        <div className="">
            {
                selectModule === "parent" && <ParentTab selectModule={selectModule} setSelectModule={setSelectModule} loading={loading} setLoading={setLoading}/>
            }
            {
                selectModule === "student" && <StudentTab selectModule={selectModule} setSelectModule={setSelectModule} loading={loading} setLoading={setLoading}/>
            }
            {
                selectModule === "staff" && <StaffTab selectModule={selectModule} setSelectModule={setSelectModule} loading={loading} setLoading={setLoading}/>
            }
        </div>
    );
};

export default UserMain;
