import { Tabs } from "antd";
import StudentTab from "./StudentTab";
import StaffTab from "./StaffTab";

const { TabPane } = Tabs;

const SystemFieldsMain = () => {
  return (
    <Tabs defaultActiveKey="1" type="card" size="middle">
      <TabPane tab="Student" key="1">
        <StudentTab />
      </TabPane>
      <TabPane tab="Staff" key="2">
        <StaffTab />
      </TabPane>
    </Tabs>
  );
};

export default SystemFieldsMain;
