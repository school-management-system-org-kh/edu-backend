import React from 'react';
import { Drawer, Row, Col, Card, Tag } from 'antd';
import { MdDashboard, MdOutlineKeyboardDoubleArrowRight, MdPeople, MdSchool } from 'react-icons/md';
import { Link } from 'react-router-dom';
import schoolMenu from '../store/menuListData.json';
import { AiOutlineCalendar, AiOutlineFileText, AiOutlineMessage } from 'react-icons/ai';
import { BsMortarboardFill } from 'react-icons/bs';
import { FaBook, FaBuilding, FaBullhorn, FaBus, FaCalendarCheck, FaCreditCard, FaDownload, FaEmpire, FaFileVideo, FaFlask, FaGears, FaIoxhost, FaObjectGroup, FaRegNewspaper, FaRss, FaUniversalAccess, FaUserPlus } from 'react-icons/fa6';
import { FaListAlt, FaMap, FaMapSigns, FaMoneyBillAlt, FaRegCalendarAlt, FaSitemap } from 'react-icons/fa';
import { HiMiniVideoCamera } from 'react-icons/hi2';
import { IoLogoUsd } from 'react-icons/io';
import { FiFileText } from 'react-icons/fi';
import { LiaQrcodeSolid } from 'react-icons/lia';
import { RiLineChartFill } from 'react-icons/ri';
import { useTranslation } from "react-i18next";

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

const getIcon = (iconName) => iconMap[iconName] || null;

const SchoolMenuDrawer = ({ open, setOpen }) => {
  const { t } = useTranslation();
  const closeDrawer = () => setOpen(false);
  const additionalSections = Object.values(schoolMenu.schoolSystem);

  return (
    <Drawer
      title={t("School Management Menu Lists")}
      placement="left"
      onClose={closeDrawer}
      open={open}
      width="85%"
      style={{ marginLeft: '12.57rem' }}
    >
      <div style={{ height: '100%', overflowY: 'auto' }}>
        <Row gutter={[16, 16]}>
          {additionalSections.map((section, index) => (
            section?.title ==="Dashboard" ? " " :
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <Card
                title={
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {getIcon(section.icon)}
                    <span>{t(section.title)}</span>
                  </div>
                }
                bordered={false}
                style={{ height: '100%' }}
                headStyle={{ backgroundColor: '#fafafa' }}
              >
                {section.items?.length > 0 ? (
                  <ul style={{ paddingLeft: 0, margin: 0 }}>
                    {section.items.map((item, i) => (
                      <div
                        key={i}
                        style={{
                          marginBottom: 8,
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <MdOutlineKeyboardDoubleArrowRight />
                        <Link
                          to={item.url}
                          onClick={() => setOpen(false)}
                          style={{ marginLeft: '0.3rem', color: '#282828' }}
                        >
                          {t(item.name)}
                        </Link>
                      </div>
                    ))}
                  </ul>
                ) : (
                  <Tag color="blue">View Reports</Tag>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Drawer>
  );
};

export default SchoolMenuDrawer;

