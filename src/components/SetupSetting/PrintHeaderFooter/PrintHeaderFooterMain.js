
import { useState } from "react";
import FeesReceiptTab from "./FeesReceiptTab";

const PrintHeaderFooterMain = () => {
    const [selectModule, setSelectModule] = useState("feesReceipt")
    const [loading, setLoading] = useState(false);
    return (
        <div className="">
            {
                selectModule === "feesReceipt" && <FeesReceiptTab selectModule={selectModule} setSelectModule={setSelectModule} loading={loading} setLoading={setLoading}/>
            }
            {
                selectModule === "payslip" && <FeesReceiptTab selectModule={selectModule} setSelectModule={setSelectModule} loading={loading} setLoading={setLoading}/>
            }
            {
                selectModule === "onlineAdmissionReceipt" && <FeesReceiptTab selectModule={selectModule} setSelectModule={setSelectModule} loading={loading} setLoading={setLoading}/>
            }
            {
                selectModule === "onlineexam" && <FeesReceiptTab selectModule={selectModule} setSelectModule={setSelectModule} loading={loading} setLoading={setLoading}/>
            }
            {
                selectModule === "generalPurpose" && <FeesReceiptTab selectModule={selectModule} setSelectModule={setSelectModule} loading={loading} setLoading={setLoading}/>
            }
        </div>
    );
};

export default PrintHeaderFooterMain;
