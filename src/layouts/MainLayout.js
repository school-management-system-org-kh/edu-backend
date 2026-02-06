import { Layout, Menu, Dropdown, Avatar, Space, Tooltip } from 'antd';
import {
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { FaBullhorn, FaIoxhost, FaUserPlus, FaUniversalAccess, FaDownload, FaCalendarCheck, FaBook, FaFileVideo, FaCreditCard, FaRss, FaFlask, FaObjectGroup, FaBus, FaBuilding, FaRegNewspaper, FaEmpire, FaGears } from "react-icons/fa6";
import { MdDashboard, MdOutlineKeyboardDoubleArrowRight, MdPeople, MdSchool } from "react-icons/md";
import { CgMenuGridR } from "react-icons/cg";
import { FaListAlt, FaMap, FaMapSigns, FaMoneyBillAlt, FaRegCalendarAlt, FaSitemap } from "react-icons/fa";
import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../styles/global.css';
import ListMenuSystem from '../components/ListMenuSystem';
import { AiOutlineCalendar, AiOutlineFileText, AiOutlineMessage } from 'react-icons/ai';
import { BsMortarboardFill } from 'react-icons/bs';
import { HiMiniVideoCamera } from 'react-icons/hi2';
import schoolMenu from '../store/menuListData.json';
import { IoLogoUsd } from 'react-icons/io';
import { FiFileText } from 'react-icons/fi';
import { LiaQrcodeSolid } from 'react-icons/lia';
import { RiLineChartFill } from 'react-icons/ri';
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import BranchModal from '../components/Modals/BranchModal';
import SwitchLanguage from '../components/switchLanguages/SwitchLanguage';
import { useTranslation } from 'react-i18next';


const { Header, Sider, Content } = Layout;

export default function MainLayout({ displayNone }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const showDrawer = () => setOpen(true);
  const [show, setShow] = useState(false)
  const [data, setData] = useState("")

  // Mock user data - you would typically get this from your authentication context
  const [currentUser] = useState({
    name: 'Chham Dararaksmey',
    avatar: require('../assets/avatar.png'),
    email: 'dararaksmey@example.com', // Set to null to use the default avatar
    role: 'Administrator'
  });

  const iconMap = {
    DashboardOutlined: <MdDashboard />,
    UserOutlined: <MdPeople />,
    CalendarOutlined: <AiOutlineCalendar />,
    FileTextOutlined: <AiOutlineFileText />,
    MessageOutlined: <AiOutlineMessage />,
    SafetyCertificateOutlined: <MdSchool />,
    BsMortarboardFill: <BsMortarboardFill />,
    FaBullhorn: <FaBullhorn />,
    FaIoxhost: <FaIoxhost />,
    FaListAlt: <FaListAlt />,
    FaUserPlus: <FaUserPlus />,
    FaUniversalAccess: <FaUniversalAccess />,
    FaDownload: <FaDownload />,
    HiMiniVideoCamera: <HiMiniVideoCamera />,
    FaBook: <FaBook />,
    FaRegCalendarAlt: <FaRegCalendarAlt />,
    FaCalendarCheck: <FaCalendarCheck />,
    FaMoneyBillAlt: <FaMoneyBillAlt />,
    FaFileVideo: <FaFileVideo />,
    FaSitemap: <FaSitemap />,
    FaMapSigns: <FaMapSigns />,
    IoLogoUsd: <IoLogoUsd />,
    FaCreditCard: <FaCreditCard />,
    FiFileText: <FiFileText />,
    FaMap: <FaMap />,
    LiaQrcodeSolid: <LiaQrcodeSolid />,
    FaRss: <FaRss />,
    FaFlask: <FaFlask />,
    FaObjectGroup: <FaObjectGroup />,
    FaBus: <FaBus />,
    FaBuilding: <FaBuilding />,
    FaRegNewspaper: <FaRegNewspaper />,
    FaEmpire: <FaEmpire />,
    RiLineChartFill: <RiLineChartFill />,
    FaGears: <FaGears />
    // Add other mappings as per your JSON
  };
  const truncate = (text, length = 14) => {
    if (!text) return "";
    return text.length > length ? text.slice(0, length) + "..." : text;
  };

  const buildMenuItems = (sections) =>
    sections.map((section) => {
      // Case 1: Single item (no children)
      if (section.url) {
        return {
          key: section.url,
          icon: iconMap[section.icon] || null,
          label: t(section.title),
        };
      }

      // Case 2: Section with children
      return {
        key: section.title,
        icon: iconMap[section.icon] || null,
        label: t(section.title),
        children: (section.items || []).map((item) => {
          const showTooltip = item?.name.length > 14; // define it per item

          const labelContent = (
            <div style={{ display: "flex", alignItems: "center" }} className="cus-menus">
              <MdOutlineKeyboardDoubleArrowRight />
              <span style={{ marginLeft: "0.2rem", fontSize: "0.8rem" }}>
                {truncate(t(item.name))}
              </span>
            </div>
          );

          return {
            key: item.url,
            label: showTooltip ? (
              <Tooltip title={t(item.name)} placement="right" color="blue" style={{ fontWeight: 600, cursor: "pointer" }}>
                {labelContent}
              </Tooltip>
            ) : (
              labelContent
            ),
          };
        }),
      };
    });

  const additionalSections = Object.values(schoolMenu.schoolSystem);
  const menuItems = buildMenuItems(additionalSections);

  // User dropdown menu items
  const userMenuItems = [
    {
      key: 'profile',
      label: (
        <>
          <Avatar
            src={currentUser.avatar}
            icon={!currentUser.avatar && <UserOutlined />}
            style={{ height: "60px", width: "60px", objectFit: "cover", margin: "auto", display: "flex" }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div>
              <div style={{ fontSize: "1rem", fontWeight: 500, textAlign: 'center' }}>{currentUser.name}</div>
              <div style={{ fontSize: "0.875rem", color: "#555", display: "flex", alignItems: "center", gap: 6 }}>
                <MailOutlined /> {currentUser.email}
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: t('Account Settings'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: t('Logout'),
      danger: true,
    },
  ];

  const handleUserMenuClick = ({ key }) => {
    switch (key) {
      case 'profile':
        navigate('/profile');
        break;
      case 'settings':
        navigate('/account-settings');
        break;
      case 'logout':
        // Handle logout logic here
        navigate('/');
        console.log('Logout clicked');
        break;
      default:
        break;
    }
  };

  const userMenuProps = {
    items: userMenuItems,
    onClick: handleUserMenuClick,
  };
  const siderStyle = {
    overflow: 'auto',
    height: '94.5vh',
    position: 'sticky',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} style={siderStyle}>
        <div className="logo" style={{ display: "flex", alignItems: 'center' }}>
          <img
            src={require('../assets/logo.png')}
            alt="STEMMentor Logo"
            style={{
              maxWidth: '100%',
              height: '40px',
              objectFit: 'contain',
              margin: '8px auto',
              display: 'block',
            }}
          />
          <CgMenuGridR onClick={showDrawer} style={{ color: "white", fontSize: "24px", marginRight: "0.3rem", cursor: "pointer" }} />
        </div>

        <Menu
          theme="dark"
          mode="inline"
          items={menuItems}
          onClick={(item) => navigate(item.key)}
        />
      </Sider>
      <Layout>
        <Header style={{
          background: "#fff",
          padding: "0 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",  // makes it stick
          top: 0,              // stick to the top
          zIndex: 1000,        // keeps it above content
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)" // optional shadow
        }}>
          <h2 style={{ margin: 0 }}>{t("STEMMentor Admin")}</h2>
          <div className='' style={{ display: 'flex', alignItems: 'center' }}>
            <SwitchLanguage />
            <Tooltip title="Switch Branch" placement="top" color="black" style={{ fontWeight: 600, cursor: "pointer" }}>
              <HiOutlineSwitchHorizontal onClick={() => setShow(true)} size={24} style={{ marginRight: "1.5rem", cursor: "pointer" }} />
            </Tooltip>
            <Dropdown menu={userMenuProps} trigger={['click']}>
              <Space style={{ cursor: 'pointer' }}>
                <Avatar
                  icon={!currentUser.avatar && <UserOutlined />}
                  src={currentUser.avatar}
                />
              </Space>
            </Dropdown>
          </div>
        </Header>
        <Content style={{ margin: '16px' }}>
          <Outlet />
        </Content>
      </Layout>
      <ListMenuSystem open={open} setOpen={setOpen} />
      <BranchModal data={data} setData={setData} show={show} setShow={setShow} />
    </Layout>
  );
}