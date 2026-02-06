import StaffTab from "./StaffTab";
import StudentTab from "./StudentTab";
import SystemTab from "./SystemTab";
import { useState } from "react";

const ModuleMain = () => {
    const [selectModule, setSelectModule] = useState("system")
    const [loading, setLoading] = useState(false);
    return (
        <div className="">
            {
                selectModule === "system" && <SystemTab selectModule={selectModule} setSelectModule={setSelectModule} loading={loading} setLoading={setLoading}/>
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

export default ModuleMain;
