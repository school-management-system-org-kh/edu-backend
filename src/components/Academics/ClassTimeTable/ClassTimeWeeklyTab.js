import { Tabs } from "antd";
import TableEditClass from "./TableEditClass";
const { TabPane } = Tabs;

const ClassTimeWeeklyTab = () => {
  return (
    <div className="" style={{marginTop:"1rem"}}>
    <Tabs defaultActiveKey="Monday" type="card" size="middle">
      <TabPane tab="Monday" key="Monday">
        <TableEditClass />
      </TabPane>
      <TabPane tab="Tuesday" key="Tuesday">
        <TableEditClass />
      </TabPane>
      <TabPane tab="Wednesday" key="Wednesday">
        <TableEditClass />
      </TabPane>
      <TabPane tab="Thursday" key="Thursday">
        <TableEditClass />
      </TabPane>
      <TabPane tab="Friday" key="Friday">
        <TableEditClass />
      </TabPane>
      <TabPane tab="Saturday" key="Saturday">
        <TableEditClass />
      </TabPane>
      <TabPane tab="Sunday" key="Sunday">
        <TableEditClass />
      </TabPane>
    </Tabs>
    </div>
  );
};

export default ClassTimeWeeklyTab;
