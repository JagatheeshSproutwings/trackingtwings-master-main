import {
  DashboardOutlined,
  AppstoreOutlined,
  MailOutlined,
  ProfileOutlined,
  FileDoneOutlined,
  CarOutlined,
  InfoCircleOutlined,
  DotChartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { APP_PREFIX_PATH } from "configs/AppConfig";

const dashBoardNavTree = [
  {
    key: "dashboard",
    path: `${APP_PREFIX_PATH}/dashboards/`,
    title: "sidenav.dashboard",
    icon: DashboardOutlined,
    breadcrumb: false,

    submenu: [
      {
        key: "admin_dashboard",
        path: `${APP_PREFIX_PATH}/dashboards/admin`,
        title: "Dashboard",
        icon: DashboardOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "dashboard.customer",
        path: `${APP_PREFIX_PATH}/dashboards/customer`,
        title: "Customer",
        icon: DashboardOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "dashboard.single",
        path: `${APP_PREFIX_PATH}/single_dashboard`,
        title: "Single Dashboard",
        icon: DashboardOutlined,
        breadcrumb: false,
        submenu: [],
      },
    ],
  },
];

const vehcileManagementNavTree = [
  {
    key: "vehicleManagement",
    path: `${APP_PREFIX_PATH}/vehicle_management`,
    title: "Vehicle Management",
    icon: AppstoreOutlined,
    breadcrumb: false,

    submenu: [
      {
        key: "vehicle_creation",
        path: `${APP_PREFIX_PATH}/vehicle_management/vehicle/creation`,
        title: "Vehicle Creation",
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "vehicle_documents",
        path: `${APP_PREFIX_PATH}/vehicle_management/documents`,
        title: "Documents",
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "vehicle_settings",
        path: `${APP_PREFIX_PATH}/vehicle_management/settings`,
        title: "Settings",
        breadcrumb: false,
        submenu: [],
      },
    ],
  },
];

const fuelManagementNavTree = [
  {
    key: "fuel_management",
    path: `${APP_PREFIX_PATH}/fuel_management`,
    title: "Fuel Management",
    icon: DotChartOutlined,
    breadcrumb: false,

    submenu: [
      {
        key: "configuration",
        path: `${APP_PREFIX_PATH}/fuel_management/configuration`,
        title: "Fuel Configuration",
        breadcrumb: false,
        submenu: [],
      },
    ],
  },
];

const userManagementNavTree = [
  {
    key: "usermanagement",
    path: `${APP_PREFIX_PATH}/user_managements`,
    title: "User Management",
    icon: ProfileOutlined,
    breadcrumb: false,

    submenu: [
      {
        key: "user_management.roles",
        path: `${APP_PREFIX_PATH}/user_management/roles`,
        title: "Roles",
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "user_management.permissions",
        path: `${APP_PREFIX_PATH}/user_management/permissions`,
        title: "Permissions",
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "permissionAssign",
        path: `${APP_PREFIX_PATH}/user_management/permissionAssign`,
        title: "Role Permission Assign",
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "user",
        path: `${APP_PREFIX_PATH}/user_management/user`,
        title: "User",
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "customer",
        path: `${APP_PREFIX_PATH}/user_management/customer`,
        title: "Customer",
        breadcrumb: false,
        submenu: [],
      },
    ],
  },
];

// const stockManagementNavTree = [
//   {
//     key: "stockmanagement",
//     path: `${APP_PREFIX_PATH}/stock_management`,
//     title: "Stock Management",
//     icon: ProfileOutlined,
//     breadcrumb: false,

//     submenu: [
//       {
//         key: "stock_management.sim",
//         path: `${APP_PREFIX_PATH}/stock_management/sim`,
//         title: "Sim",
//         breadcrumb: false,
//         submenu: [],
//       },
//       {
//         key: "stock_management.device",
//         path: `${APP_PREFIX_PATH}/stock_management/device`,
//         title: "Device",
//         breadcrumb: false,
//         submenu: [],
//       },
//     ],
//   },
// ];

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
const deviceNavTree = [
  {
    key: "devices",
    path: `${APP_PREFIX_PATH}/device_management`,
    title: "Device",
    icon: CarOutlined,
    breadcrumb: false,
    isGroupTitle: false,
    submenu: [],
  },
];
// const reportNavTree = [
//   {
//     key: "reports",
//     path: `${APP_PREFIX_PATH}/reports`,
//     title: "Reports",
//     icon: FileDoneOutlined,
//     breadcrumb: false,
//     isGroupTitle: true,
//     submenu: [
//       {
//         key: "generic_report",
//         path: `${APP_PREFIX_PATH}/reports/generic_report`,
//         title: "Generic Report",
//         icon: FileDoneOutlined,
//         breadcrumb: false,
//         submenu: [
//           {
//             key: "idle_report",
//             path: `${APP_PREFIX_PATH}/reports/idle_report`,
//             title: "Idle Report",
//             icon: "",
//             breadcrumb: false,
//             submenu: [],
//           },
//           {
//             key: "parking_report",
//             path: `${APP_PREFIX_PATH}/reports/parking_report`,
//             title: "Parking Report",
//             icon: "",
//             breadcrumb: false,
//             submenu: [],
//           },
//           {
//             key: "distance_report",
//             path: `${APP_PREFIX_PATH}/reports/distance_report`,
//             title: "Distance Report",
//             icon: "",
//             breadcrumb: false,
//             submenu: [],
//           },
//           {
//             key: "trip_report",
//             path: `${APP_PREFIX_PATH}/reports/trip_report`,
//             title: "Trip Report",
//             icon: "",
//             breadcrumb: false,
//             submenu: [],
//           },
//           {
//             key: "playback_history",
//             path: `${APP_PREFIX_PATH}/reports/playback_history`,
//             title: "Playback History",
//             icon: "",
//             breadcrumb: false,
//             submenu: [],
//           },
//           {
//             key: "geofence_report",
//             path: `${APP_PREFIX_PATH}/reports/geofence_report`,
//             title: "Geofence Report",
//             icon: "",
//             breadcrumb: false,
//             submenu: [],
//           },
//         ],
//       },
//       {
//         key: "executive_report",
//         path: `${APP_PREFIX_PATH}/reports/executive_report`,
//         title: "Executive Report",
//         icon: FileDoneOutlined,
//         breadcrumb: false,
//         submenu: [],
//       },
//       {
//         key: "smart_report",
//         path: `${APP_PREFIX_PATH}/reports/smart_report`,
//         title: "Smart Report",
//         icon: InfoCircleOutlined,
//         breadcrumb: false,
//         submenu: [],
//       },
//       {
//         key: "alert_report",
//         path: `${APP_PREFIX_PATH}/reports/alert_report`,
//         title: "Alert Report",
//         icon: MailOutlined,
//         breadcrumb: false,
//         submenu: [
//           {
//             key: "report_notification_alert",
//             path: `${APP_PREFIX_PATH}/reports/notification_alert`,
//             title: "Notification Report",
//             icon: "",
//             breadcrumb: false,
//             submenu: [],
//           },
//           {
//             key: "alert_configuration",
//             path: `${APP_PREFIX_PATH}/reports/alert_configuration`,
//             title: "Alert Configuration",
//             icon: "",
//             breadcrumb: false,
//             submenu: [],
//           },
//         ],
//       },
//     ],
//   },
// ];
const pointNavTree = [
  {
    key: "points",
    path: `${APP_PREFIX_PATH}/points`,
    title: "Points",
    icon: SettingOutlined,
    breadcrumb: false,
    isGroupTitle: false,
    submenu: [],
  },
];
const settingNavTree = [
  {
    key: "settings",
    path: `${APP_PREFIX_PATH}/settings`,
    title: "Settings",
    icon: SettingOutlined,
    breadcrumb: false,
    isGroupTitle: false,
    submenu: [],
  },
];

const navigationConfig = [
  ...dashBoardNavTree,
  ...reportNavTree,
  ...deviceNavTree,
  ...settingNavTree,
];

export default navigationConfig;
