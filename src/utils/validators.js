import { BsReception4 } from "react-icons/bs";
import { GiTeacher } from "react-icons/gi";
import { IoLibrarySharp } from "react-icons/io5";
import { MdAccountBalance, MdAdminPanelSettings } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";

export const uppercaseText = (text) => text.toUpperCase();
export const capitalizedText = (text) => {
  if (!text) return "";
  const lower = text.toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
}
export const getRoleIcon = (role) => {
  switch (role) {
    case "Super Admin":
      return <MdAdminPanelSettings size={18} />;

    case "Admin":
      return <RiAdminFill size={18} />;

    case "Teacher":
      return <GiTeacher size={18} />;

    case "Accountant":
      return <MdAccountBalance size={18} />;

    case "Receptionist":
      return <BsReception4 size={18} />;

    case "Librarian":
      return <IoLibrarySharp size={18} />;

    default:
      return <RiAdminFill size={18} />;
  }
};