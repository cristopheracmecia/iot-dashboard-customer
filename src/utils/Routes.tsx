import {AuthPage} from "../ui/pages/auth";
import {AuthRepository} from "../data/repository/Auth";
import {Navigate, Outlet} from "react-router-dom";
import {PasswordRecoveryPage} from "../ui/pages/password";
import {PasswordRecoveryValidationPage} from "../ui/pages/recover";
import {DashboardLayout} from "../ui/layouts/DashboardLayout";
import {DashboardPage} from "../ui/pages/dashboard";
import {AppRoute} from "../types/Route";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faChartSimple, faMagnifyingGlassChart,
    faMapLocation,
    faPeopleGroup,
    faRuler, faSatelliteDish,
    faTruck,
    faUserGroup,
    faHomeAlt
} from "@fortawesome/free-solid-svg-icons";
import {DashboardUserListPage} from "../ui/dashboard/user_list/UserList";
import {DashboardUserCreatePage} from "../ui/dashboard/user_create/UserCreate";

export const AppRoutes: AppRoute[] =
    [{
        path: "/auth",
        errorElement: <AuthPage/>,
        loader: async () => AuthRepository.getSession(),
        element: <Navigate to={"/dashboard"}/>,
    },
        {
            path: "/recover-password",
            errorElement: <PasswordRecoveryPage/>,
            loader: async () => AuthRepository.getSession(),
            element: <Navigate to={"/dashboard"}/>,
        },
        {
            path: "/password-recovery-validation",
            errorElement: <PasswordRecoveryValidationPage/>,
            loader: async () => AuthRepository.getSession(),
            element: <Navigate to={"/dashboard"}/>,
        },
        {
            path: "/dashboard",
            element: <DashboardLayout/>,
            loader: async () => AuthRepository.getSession(),
            errorElement: <Navigate to={"/auth"}/>,
            info: {
                icon: <FontAwesomeIcon icon={faHomeAlt}/>,
                label: "Inicio"
            },
            children: [
                {
                    path: "/dashboard",
                    element: <DashboardPage/>,
                    info: {
                        label: "Resúmen",
                        icon: <FontAwesomeIcon icon={faChartSimple}/>
                    }
                },
                {
                    path: "/dashboard/users",
                    element: <Outlet/>,
                    info: {
                        label: "Adm. Usuarios",
                        icon: <FontAwesomeIcon icon={faUserGroup}/>
                    },
                    children: [
                        {
                            path: "/dashboard/users/all",
                            element: <DashboardUserListPage/>,
                            info: {
                                label: "Usuarios",
                            },
                        }, {
                            path: "/dashboard/users/roles",
                            element: <DashboardPage/>,
                            info: {
                                label: "Roles",
                            },
                        },
                        {
                            path: "/dashboard/users/permissions",
                            element: <DashboardPage/>,
                            info: {
                                label: "Permisos",
                            },
                        }
                    ]
                },
                {
                    path: "/dashboard/users/create",
                    element: <DashboardUserCreatePage/>,
                    info: {
                        label: "Crear Usuario",
                        ignore: true
                    }
                },
                {
                    path: "/dashboard/customers",
                    element: <h1>Customers</h1>,
                    info: {
                        label: "Clientes",
                        icon: <FontAwesomeIcon icon={faPeopleGroup}/>
                    },
                },
                {
                    path: "/dashboard/vehicles",
                    element: <DashboardPage/>,
                    info: {
                        label: "Vehículos",
                        icon: <FontAwesomeIcon icon={faTruck}/>
                    },
                },
                {
                    path: "/dashboard/tracking",
                    element: <DashboardPage/>,
                    info: {
                        label: "Tracking",
                        icon: <FontAwesomeIcon icon={faMapLocation}/>
                    },
                },
                {
                    path: "/dashboard/unities",
                    element: <DashboardPage/>,
                    info: {
                        label: "Unidades",
                        icon: <FontAwesomeIcon icon={faRuler}/>
                    },
                },
                {
                    path: "/dashboard/devices",
                    element: <DashboardPage/>,
                    info: {
                        label: "Dispositivos",
                        icon: <FontAwesomeIcon icon={faSatelliteDish}/>
                    },
                },
                {
                    path: "/dashboard/reports",
                    element: <DashboardPage/>,
                    info: {
                        label: "Reportes",
                        icon: <FontAwesomeIcon icon={faMagnifyingGlassChart}/>
                    },
                }
            ],
        },
        {
            path: "/",
            element: <Navigate to={"/dashboard"}/>,
        }]