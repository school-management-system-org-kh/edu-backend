import React from "react";
import schoolSystem from "../../../store/dataMenus"; // Your JSON file
import PermissionsMatrix from "./PermissionsMatrix";

const RolePermissions = () => {
  return <PermissionsMatrix modules={schoolSystem} />;
};

export default RolePermissions;
