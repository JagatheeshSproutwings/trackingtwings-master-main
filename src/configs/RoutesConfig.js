import React from "react";
import { AUTH_PREFIX_PATH, APP_PREFIX_PATH } from "configs/AppConfig";
import { useSelector } from "react-redux";

export const publicRoutes = [
  {
    key: "login",
    path: `${AUTH_PREFIX_PATH}/login`,
    component: React.lazy(() =>
      import("views/auth-views/authentication/login")
    ),
  },
  {
    key: "register",
    path: `${AUTH_PREFIX_PATH}/register`,
    component: React.lazy(() =>
      import("views/auth-views/authentication/register")
    ),
  },
  {
    key: "forgot-password",
    path: `${AUTH_PREFIX_PATH}/forgot-password`,
    component: React.lazy(() =>
      import("views/auth-views/authentication/forgot-password")
    ),
  },
];

export const protectedRoutes = [
  {
    key: "dashboard.admin",
    path: `${APP_PREFIX_PATH}/dashboard/admin`,
    component: React.lazy(() => import("views/app-views/dashboard/admin")),
  },
  {
    key: "dashboard.customer",
    path: `${APP_PREFIX_PATH}/dashboard/customer`,
    component: React.lazy(() => import("views/app-views/dashboard/customer")),
  },
  {
    key: "dashboard.single",
    path: `${APP_PREFIX_PATH}/dashboard/single_dashboard`,
    component: React.lazy(() => import("views/app-views/single_dashboard")),
  },

  {
    key: "reports",
    path: `${APP_PREFIX_PATH}/report_management`,
    component: React.lazy(() => import("views/app-views/report_management")),
  },
  {
    key: "devices",
    path: `${APP_PREFIX_PATH}/device_management`,
    component: React.lazy(() => import("views/app-views/device_management")),
  },
  {
    key: "reports.parking_report",
    path: `${APP_PREFIX_PATH}/reports/parking_report`,
    component: React.lazy(() =>
      import("views/app-views/reports/parking_report")
    ),
  },
  {
    key: "reports.distance_report",
    path: `${APP_PREFIX_PATH}/reports/distance_report`,
    component: React.lazy(() =>
      import("views/app-views/reports/distance_report")
    ),
  },
  {
    key: "reports.trip_report",
    path: `${APP_PREFIX_PATH}/reports/trip_report`,
    component: React.lazy(() => import("views/app-views/reports/trip_report")),
  },
  {
    key: "reports.playback_history",
    path: `${APP_PREFIX_PATH}/reports/playback_history`,
    component: React.lazy(() =>
      import("views/app-views/reports/playback_history")
    ),
  },
  {
    key: "reports.geofence_report",
    path: `${APP_PREFIX_PATH}/reports/geofence_report`,
    component: React.lazy(() =>
      import("views/app-views/reports/geofence_report")
    ),
  },
  {
    key: "points",
    path: `${APP_PREFIX_PATH}/points`,
    component: React.lazy(() => import("views/app-views/points")),
  },
  {
    key: "user_management.roles",
    path: `${APP_PREFIX_PATH}/user_management/roles`,
    component: React.lazy(() =>
      import("views/app-views/user_management/roles")
    ),
  },
  {
    key: "user_management.permissions", // unique value in key
    path: `${APP_PREFIX_PATH}/user_management/permissions`, // path in ui
    component: React.lazy(() =>
      import("views/app-views/user_management/permissions")
    ), // component path
  },
  {
    key: "user_management.customer",
    path: `${APP_PREFIX_PATH}/user_management/customer`,
    component: React.lazy(() =>
      import("views/app-views/user_management/customer")
    ),
  },
  {
    key: "user_management.user",
    path: `${APP_PREFIX_PATH}/user_management/user`,
    component: React.lazy(() => import("views/app-views/user_management/user")),
  },
  {
    key: "settings",
    path: `${APP_PREFIX_PATH}/settings`,
    component: React.lazy(() => import("views/app-views/settings")),
  },

  {
    key: "stock_management.sim",
    path: `${APP_PREFIX_PATH}/stock_management/sim`,
    component: React.lazy(() => import("views/app-views/stock_management/sim")),
  },
  {
    key: "stock_management.device",
    path: `${APP_PREFIX_PATH}/stock_management/device`,
    component: React.lazy(() =>
      import("views/app-views/stock_management/device")
    ),
  },
  {
    key: "stock_management.demo",
    path: `${APP_PREFIX_PATH}/stock_management/demo`,
    component: React.lazy(() =>
      import("views/app-views/stock_management/demo")
    ),
  },
  {
    key: "vehicle_management.vehicle",
    path: `${APP_PREFIX_PATH}/vehicle_management/vehicle`,
    component: React.lazy(() =>
      import("views/app-views/vehicle_management/vehicle")
    ),
  },
];

export const customerRoutes = [
  {
    key: "dashboard.customer",
    path: `${APP_PREFIX_PATH}/customer`,
    component: React.lazy(() => import("views/app-views/customer")),
  },
];
