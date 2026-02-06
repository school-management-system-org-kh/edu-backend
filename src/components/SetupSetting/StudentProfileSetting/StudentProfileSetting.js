import { Tabs } from "antd";
import StudentProfileUpdate from "./StudentProfileUpdate";
import DashboardSetting from "./DashboardSetting";

const { TabPane } = Tabs;

const OnlineAdmissionSettings = () => {
  return (
    <Tabs defaultActiveKey="1" type="card" size="middle">
      <TabPane tab="Student Profile Update" key="1">
        <StudentProfileUpdate />
      </TabPane>
      <TabPane tab="Dashboard Setting" key="2">
        <DashboardSetting />
      </TabPane>
    </Tabs>
  );
};

export default OnlineAdmissionSettings;
