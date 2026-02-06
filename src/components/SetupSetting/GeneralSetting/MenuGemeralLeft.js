import React from "react";
import { Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
const { Sider } = Layout;

const MenuGeneralLeft = ({menuItems, setStoreTitleMenus}) => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location", location)
  // Find current key from location
  const currentItem = menuItems.find(item => item.link === location.pathname);
  console.log("currentItem", currentItem)
  const selectedKey = currentItem ? currentItem.key : "";

  return (
    <Layout style={{ minHeight: "auto", background: "#fff" }}>
      <Sider
        width={250}
        style={{
          background: "#fff",
          borderRight: "none", // ✅ Removed the vertical border on the right
        }}
      >
        <div >
          {menuItems.map((item, index) => (
            <React.Fragment key={item.key}>
              <Menu
                mode="vertical"
                selectable={false}
                selectedKeys={[selectedKey]}
                style={{ border: "none", padding:0}}
                onClick={() => {
                  navigate(item.link)
                  setStoreTitleMenus(item.title)
                }}
              >
                <Menu.Item key={item.key} style={{fontSize:'1rem', fontWeight:500, backgroundColor:"transparent"}}>{item.title}</Menu.Item>
              </Menu>
              {/* ✅ Divider after each item except the last one */}
              {index !== menuItems.length - 1 && (
                <div style={{ borderBottom: "1px solid #f0f0f0", width:"15.8rem" }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </Sider>
    </Layout>
  );
};

export default MenuGeneralLeft;
