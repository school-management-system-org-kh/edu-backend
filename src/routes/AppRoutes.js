import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import SchoolDemoPage from '../pages/SchoolDemoPage';
import AuthLayoutPage from '../layouts/AuthLayout';
import DashboardPage from '../pages/DashboardPage';
import LanguagePage from '../pages/SystemSettings/LanguagePage';
import NotFoundPage from '../pages/NotFoundPage';
import SystemUpdatePage from '../pages/SystemSettings/SystemUpdatePage';
import SidebarMenuPage from '../pages/SystemSettings/SidebarMenuPage';
import FileTypesPage from '../pages/SystemSettings/FileTypesPage';
import OnlineAdmissionPage from '../pages/SystemSettings/OnlineAdmissionPage';
import StudentProfileSettingPage from '../pages/SystemSettings/StudentProfileSettingPage';
import SystemFieldsPage from '../pages/SystemSettings/SystemFieldsPage';
import CaptchaSettingPage from '../pages/SystemSettings/CaptchaSettingPage';
import CustomFieldsPage from '../pages/SystemSettings/CustomFieldsPage';
import ModulePage from '../pages/SystemSettings/ModulePage';
import AddonsPage from '../pages/SystemSettings/AddonsPage';
import UsersPage from '../pages/SystemSettings/UsersPage';
import CurrenciesPage from '../pages/SystemSettings/CurrenciesPage';
import BackupHistoryPage from '../pages/SystemSettings/BackupHistoryPage';
import RolePermissionsPage from '../pages/SystemSettings/RolePermissionsPage';
import RolePermissions from '../components/SetupSetting/RolePermission/AssignPermission';
import FrontCMSSettingPage from '../pages/SystemSettings/FrontCMSSettingPage';
import PrintHeaderFooterPage from '../pages/SystemSettings/PrintHeaderFooterPage';
import ThermalPrintPage from '../pages/SystemSettings/ThermalPrintPage';
import PaymentMethodsPage from '../pages/SystemSettings/PaymentMethodsPage';
import EmailSettingPage from '../pages/SystemSettings/EmailSettingPage';
import SMSSettingPage from '../pages/SystemSettings/SMSSettingPage';
import NotificationSettingPage from '../pages/SystemSettings/NotificationSettingPage';
import SessionSettingPage from '../pages/SystemSettings/SessionSettingPage';
import GeneralSettingPage from '../pages/SystemSettings/GeneralSettingPage';
import SectionsPage from '../pages/Academics/SectionsPage';
import ClassesPage from '../pages/Academics/ClassesPage';
import SubjectPage from '../pages/Academics/SubjectPage';
import SubjectGroupPage from '../pages/Academics/SubjectGroupPage';
import PromoteStudentPage from '../pages/Academics/PromoteStudentPage';
import AssignClassTeacherPage from '../pages/Academics/AssignClassTeacherPage';
import TeacherTimeTablePage from '../pages/Academics/TeacherTimeTablePage';
import ClassTimeTablePage from '../pages/Academics/ClassTimeTablePage';
import ClassTimeTableCreatePage from '../pages/Academics/ClassTimeTableCreatePage ';
import TopicPage from '../pages/LessonPlan/TopicPage';
import LessonPage from '../pages/LessonPlan/LessonPage';
import ManageSyllabusStatusPage from '../pages/LessonPlan/ManageSyllabusStatusPage';
import ManageLessonPlanPage from '../pages/LessonPlan/ManageLessonPlanPage';
import CopyOldLessonsPage from '../pages/LessonPlan/CopyOldLessonsPage';
import NoticeBoardPage from '../pages/Communicate/NoticeBoardPage';
import AddNoticeBoard from '../components/NoticeBoard/AddNoticeBoard';
import SendEmailPage from '../pages/Communicate/SendEmailPage';
import SendSMSPage from '../pages/Communicate/SendSMSPage'
import EmailSMSLogPage from '../pages/Communicate/EmailSMSLogPage';
import ScheduleEmailSMSLogPage from '../pages/Communicate/ScheduleEmailSMSLogPage';
import EmailTempletePage from '../pages/Communicate/EmailTempletePage';
import SMSTempletePage from '../pages/Communicate/SMSTempletePage';
import LoginCredentialsSendPage from '../pages/Communicate/LoginCredentialsSendPage';

export default function AppRoutes() {

  return (
    <Routes>
      {/* Login route outside of MainLayout */}
      <Route path="/" element={<SchoolDemoPage />} />
      <Route path="/login" element={<AuthLayoutPage />} />
      {/* All other routes inside MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        {/* Communicate */}
        <Route path='/communicate/notice-board' element={<NoticeBoardPage />} />
        <Route path='/communicate/notice-board/add' element={<AddNoticeBoard />} />
        <Route path='/communicate/send-email' element={<SendEmailPage />} />
        <Route path='/communicate/send-sms' element={<SendSMSPage />} />
        <Route path='/communicate/email-sms-log' element={<EmailSMSLogPage />} />
        <Route path='/communicate/schedule-log' element={<ScheduleEmailSMSLogPage />} />
        <Route path='/communicate/email-template' element={<EmailTempletePage />} />
        <Route path='/communicate/sms-template' element={<SMSTempletePage />} />
        <Route path='/communicate/login-credentials' element={<LoginCredentialsSendPage />} />

        {/* Academics */}
        <Route path="/academics/timetable/create" element={<ClassTimeTableCreatePage />} />
        <Route path="/academics/timetable" element={<ClassTimeTablePage />} />
        <Route path="/academics/teachers-timetable" element={<TeacherTimeTablePage />} />
        <Route path="/academics/assign-teacher" element={<AssignClassTeacherPage />} />
        <Route path="/academics/promote-students" element={<PromoteStudentPage />} />
        <Route path="/academics/subject-group" element={<SubjectGroupPage />} />
        <Route path="/academics/subjects" element={<SubjectPage />} />
        <Route path="/academics/class" element={<ClassesPage />} />
        <Route path="/academics/sections" element={<SectionsPage />} />

        {/* Lesson Plan */}
        <Route path='/lesson-plan/copy-lessons' element={<CopyOldLessonsPage />} />
        <Route path="/lesson-plan/manage" element={<ManageLessonPlanPage />} />
        <Route path="/lesson-plan/syllabus-status" element={<ManageSyllabusStatusPage />} />
        <Route path="/lesson-plan/lesson" element={<LessonPage />} />
        <Route path="/lesson-plan/topic" element={<TopicPage />} />

        {/* System Setting */}
        <Route path="/settings/general" element={<GeneralSettingPage />} />
        <Route path="/settings/session" element={<SessionSettingPage />} />
        <Route path="/settings/notification" element={<NotificationSettingPage />} />
        <Route path="/settings/sms" element={<SMSSettingPage />} />
        <Route path="/settings/email" element={<EmailSettingPage />} />
        <Route path="/settings/payment-methods" element={<PaymentMethodsPage />} />
        <Route path="/settings/thermal-print" element={<ThermalPrintPage />} />
        <Route path="/settings/print-header-footer" element={<PrintHeaderFooterPage />} />
        <Route path="/settings/front-cms" element={<FrontCMSSettingPage />} />
        <Route path="/admin/roles/permission" element={<RolePermissions />} />
        <Route path="/settings/roles-permissions" element={<RolePermissionsPage />} />
        <Route path="/settings/backup-restore" element={<BackupHistoryPage />} />
        <Route path="/settings/languages" element={<LanguagePage />} />
        <Route path="/settings/currency" element={<CurrenciesPage />} />
        <Route path="/settings/users" element={<UsersPage />} />
        <Route path="/settings/addons" element={<AddonsPage />} />
        <Route path="/settings/modules" element={<ModulePage />} />
        <Route path="/settings/custom-fields" element={<CustomFieldsPage />} />
        <Route path="/settings/captcha" element={<CaptchaSettingPage />} />
        <Route path="/settings/system-fields" element={<SystemFieldsPage />} />
        <Route path="/settings/student-profile" element={<StudentProfileSettingPage />} />
        <Route path="/settings/online-admission" element={<OnlineAdmissionPage />} />
        <Route path="/settings/file-types" element={<FileTypesPage />} />
        <Route path="/settings/sidebar-menu" element={<SidebarMenuPage />} />
        <Route path="/settings/system-update" element={<SystemUpdatePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
