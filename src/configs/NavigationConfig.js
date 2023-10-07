import {
  DashboardOutlined,
  ProfileOutlined,
  FileDoneOutlined,
  CarOutlined,
} from "@ant-design/icons";
import { APP_PREFIX_PATH } from "configs/AppConfig";

const dashBoardNavTree = [
  {
    key: "dashboard",
    path: `${APP_PREFIX_PATH}/dashboards/`,
    title: "sidenav.dashboard",
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [],
  },
];
const userManagementNavTree = [
  {
    key: "usermanagement",
    path: `${APP_PREFIX_PATH}/user_management/user`,
    title: "User Management",
    icon: ProfileOutlined,
    breadcrumb: false,
    isGroupTitle: false,
    submenu: [],
  },
];
const deviceNavTree = [
  {
    key: "devices",
    path: `${APP_PREFIX_PATH}/device_management`,
    title: "Vehicle Management",
    icon: CarOutlined,
    breadcrumb: false,
    isGroupTitle: false,
    submenu: [],
  },
];
const reportNavTree = [
  {
    key: "reports",
    path: `${APP_PREFIX_PATH}/report_management`,
    title: "Reports",
    icon: FileDoneOutlined,
    breadcrumb: false,
    isGroupTitle: false,
    submenu: [],
  },
];

const navigationConfig = [
  ...dashBoardNavTree,
  ...userManagementNavTree,
  ...deviceNavTree,
  ...reportNavTree,
];

export default navigationConfig;
