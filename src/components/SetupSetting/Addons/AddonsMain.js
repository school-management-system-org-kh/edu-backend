import { Pagination } from "antd";
import AddonCard from "./AddonCard";
import UploadDrag from "./UploadDrag";

const AddonsMain = () => {
    return (
        <div className="">
            <UploadDrag />
            <AddonCard />
            <div
                style={{
                    position: 'sticky',
                    bottom: 0,
                    background: '#fff',
                    paddingTop: 12,
                    paddingBottom: 12,
                    textAlign: 'end',
                    borderTop: '1px solid #f0f0f0',
                    zIndex: 1,
                    marginTop:"1rem"
                }}
            >
                <Pagination
                    total={15}
                    showSizeChanger
                    showQuickJumper
                    showTotal={total => `Total ${total} items`}
                    align="end"
                />
            </div>
        </div>
    )
}
export default AddonsMain;