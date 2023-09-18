import { AuthPage } from "../ui/pages/auth";
import { AuthRepository } from "../data/repository/Auth";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { PasswordRecoveryPage } from "../ui/pages/password";
import { PasswordRecoveryValidationPage } from "../ui/pages/recover";
import { DashboardLayout } from "../ui/layouts/DashboardLayout";
import { AppRoute } from "../types/Route";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartSimple,
  faMagnifyingGlassChart,
  faMapLocation,
  faTruck,
  faUserGroup,
  faHomeAlt,
  faUsersLine,
} from "@fortawesome/free-solid-svg-icons";
import { DashboardUserListPage } from "../ui/dashboard/user_list/UserList";
import { DashboardUserCreatePage } from "../ui/dashboard/user_create/UserCreate";
import { DashboardVehicleListPage } from "../ui/dashboard/vehicle_list/VehicleList";
import { DashboardOverviewPage } from "../ui/dashboard/overview/DashboardOverview";
import { Button, Layout, Result } from "antd";
import { DashboardVehiclePage } from "../ui/dashboard/vehicle/Vehicle";
import { LoadingError } from "../ui/components/LoadingError";
import { DashboardUserPage } from "../ui/dashboard/user/User";
import { toNumber } from "lodash";
import { DashboardUserUpdatePage } from "../ui/dashboard/user_update/UserUpdate";
import { MainLayout } from "../ui/layouts/MainLayout";

export const AppRoutes: AppRoute[] = [
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    loader: async () => AuthRepository.getSession(),
    errorElement: <Navigate to={"/auth"} />,
    info: {
      icon: <FontAwesomeIcon icon={faHomeAlt} />,
      label: "Inicio",
    },
    children: [
      {
        path: "/dashboard",
        element: <DashboardOverviewPage />,
        info: {
          label: "Resúmen",
          icon: <FontAwesomeIcon icon={faChartSimple} />,
        },
      },
      {
        path: "/dashboard/users",
        element: <Outlet />,
        info: {
          label: "Adm. Usuarios",
          icon: <FontAwesomeIcon icon={faUserGroup} />,
        },
        children: [
          {
            path: "/dashboard/users/all",
            element: <Outlet />,
            info: {
              label: "Usuarios",
              icon: <FontAwesomeIcon icon={faUsersLine} />,
            },
            children: [
              {
                path: "/dashboard/users/all/",
                element: <DashboardUserListPage />,
                errorElement: <LoadingError />,
                info: {
                  label: "Usuarios",
                  ignore: true,
                },
              },
              {
                path: "/dashboard/users/all/:id",
                element: <DashboardUserPage />,
                errorElement: <LoadingError />,
                info: {
                  label: "Usuario",
                  ignore: true,
                },
                loader: async (c) => {
                  const { id } = c.params;
                  return await new Promise<boolean>((resolve, reject) => {
                    if (isNaN(toNumber(id)))
                      reject(new Error("El id no es válido."));
                    else resolve(false);
                  });
                },
              },
            ],
          },
          {
            path: "/dashboard/users/create",
            element: <DashboardUserCreatePage />,
            info: {
              label: "Crear Usuario",
              ignore: true,
            },
            errorElement: <LoadingError />,
          },
          {
            path: "/dashboard/users/edit/:id",
            errorElement: <LoadingError />,
            element: <DashboardUserUpdatePage />,
            info: {
              label: "Editar Usuario",
              ignore: true,
            },
            loader: async (c) => {
              const { id } = c.params;
              return await new Promise<boolean>((resolve, reject) => {
                if (isNaN(toNumber(id)))
                  reject(new Error("El id no es válido."));
                else resolve(false);
              });
            },
          },
        ],
      },
      {
        path: "/dashboard/vehicles",
        element: <Outlet />,
        info: {
          label: "Vehículos",
          icon: <FontAwesomeIcon icon={faTruck} />,
        },
        children: [
          {
            path: "/dashboard/vehicles/",
            element: <DashboardVehicleListPage />,
            info: {
              label: "Vehículos",
              ignore: true,
            },
          },
          {
            path: "/dashboard/vehicles/:id",
            element: <DashboardVehiclePage />,
            errorElement: <LoadingError />,
            info: {
              label: "Vehículo",
              ignore: true,
            },
            loader: async (c) => {
              const { id } = c.params;
              return await new Promise<boolean>((resolve, reject) => {
                if (isNaN(toNumber(id)))
                  reject(new Error("El id no es válido."));
                else resolve(false);
              });
            },
          },
        ],
      },
      {
        path: "/dashboard/tracking",
        element: <h1>Tracking</h1>,
        info: {
          label: "Tracking",
          icon: <FontAwesomeIcon icon={faMapLocation} />,
        },
      },
      {
        path: "/dashboard/reports",
        element: <h1>Reportes</h1>,
        info: {
          label: "Reportes",
          icon: <FontAwesomeIcon icon={faMagnifyingGlassChart} />,
        },
      },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to={"/dashboard"} />,
      },
      {
        path: "/auth",
        errorElement: <AuthPage />,
        loader: async () => AuthRepository.getSession(),
        element: <Navigate to={"/dashboard"} />,
      },
      {
        path: "/recover-password",
        errorElement: <PasswordRecoveryPage />,
        loader: async () => AuthRepository.getSession(),
        element: <Navigate to={"/dashboard"} />,
      },
      {
        path: "/password-recovery-validation",
        errorElement: <PasswordRecoveryValidationPage />,
        loader: async () => AuthRepository.getSession(),
        element: <Navigate to={"/dashboard"} />,
      },
      {
        path: "*",
        element: (
          <Layout className={"w-full h-full"}>
            <Result
              status="404"
              title="404"
              subTitle="La página que intentas acceder no existe."
              extra={
                <Button type="primary">
                  <NavLink to={"/dashboard"}>Ir al Dashboard</NavLink>
                </Button>
              }
            />
          </Layout>
        ),
      },
    ],
  },
];
