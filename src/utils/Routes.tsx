import {AuthPage} from "../ui/pages/auth";
import {AuthRepository} from "../data/repository/Auth";
import {defer, Navigate, NavLink, Outlet} from "react-router-dom";
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
    faHomeAlt,
    faUserGear,
    faUsersGear,
    faUsersLine, faServer
} from "@fortawesome/free-solid-svg-icons";
import {DashboardUserListPage} from "../ui/dashboard/user_list/UserList";
import {DashboardUserCreatePage} from "../ui/dashboard/user_create/UserCreate";
import {DashboardUserRolesPage} from "../ui/dashboard/user_roles/UserRoles";
import {DashboardRolePermissionsListPage} from "../ui/dashboard/role_permissions/main/RolePermissions";
import {DashboardRolePermissionPage} from "../ui/dashboard/role_permissions/role/RolePermission";
import {PermissionRepository} from "../data/repository/Permission";
import {DashboardCustomerListPage} from "../ui/dashboard/customer_list/CustomerList";
import {DashboardCustomerCreatePage} from "../ui/dashboard/customer_create/CustomerCreate";
import {DashboardVehicleListPage} from "../ui/dashboard/vehicle_list/VehicleList";
import {DashboardVehicleCreatePage} from "../ui/dashboard/vehicle_create/VehicleCreate";
import {DashboardUnitListPage} from "../ui/dashboard/unit_list/UnitList";
import {DashboardUnitCreatePage} from "../ui/dashboard/unit_create/UnitCreate";
import {DashboardDeviceListPage} from "../ui/dashboard/device_list/DeviceList";
import {DashboardDeviceCreatePage} from "../ui/dashboard/device_create/DeviceCreate";
import {DashboardOverviewPage} from "../ui/dashboard/overview/DashboardOverview";
import {DashboardGatewayListPage} from "../ui/dashboard/gateway_list/GatewayList";
import {DashboardGatewayCreatePage} from "../ui/dashboard/gateway_create/GatewayCreate";
import {Button, Result} from "antd";
import {DashboardVehiclePage} from "../ui/dashboard/vehicle/Vehicle";
import {LoadingError} from "../ui/components/LoadingError";

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
                    element: <DashboardOverviewPage/>,
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
                            path: "/dashboard/users/",
                            element: <DashboardUserListPage/>,
                            info: {
                                label: "Usuarios",
                                icon: <FontAwesomeIcon icon={faUsersLine}/>
                            },
                        }, {
                            path: "/dashboard/users/roles",
                            element: <DashboardUserRolesPage/>,
                            info: {
                                label: "Roles",
                                icon: <FontAwesomeIcon icon={faUsersGear}/>
                            },
                        },
                        {
                            path: "/dashboard/users/permissions",
                            element: <Outlet/>,
                            info: {
                                label: "Permisos",
                                icon: <FontAwesomeIcon icon={faUserGear}/>
                            },
                            children: [
                                {
                                    path: "/dashboard/users/permissions/",
                                    element: <DashboardRolePermissionsListPage/>,
                                    info: {
                                        ignore: true
                                    },
                                },
                                {
                                    path: "/dashboard/users/permissions/:id",
                                    element: <DashboardRolePermissionPage/>,
                                    info: {
                                        label: "Permisos",
                                        ignore: true
                                    },
                                    loader: async (c) => {
                                        const {id} = c.params
                                        const pR = await PermissionRepository.getRolePermissions(Number.parseInt(id!!))
                                        return pR!!.data
                                    }
                                }
                            ]
                        },

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
                    element: <Outlet/>,
                    info: {
                        label: "Clientes",
                        icon: <FontAwesomeIcon icon={faPeopleGroup}/>
                    },
                    children: [
                        {
                            path: "/dashboard/customers/",
                            element: <DashboardCustomerListPage/>,
                            info: {
                                ignore: true
                            }
                        },
                        {
                            path: "/dashboard/customers/create",
                            element: <DashboardCustomerCreatePage/>,
                            info: {
                                label: "Crear Cliente",
                                ignore: true
                            }
                        }
                    ]
                },
                {
                    path: "/dashboard/vehicles",
                    element: <Outlet/>,
                    info: {
                        label: "Vehículos",
                        icon: <FontAwesomeIcon icon={faTruck}/>
                    },
                    children: [
                        {
                            path: "/dashboard/vehicles/",
                            element: <DashboardVehicleListPage/>,
                            info: {
                                label: "Vehículos",
                                ignore: true
                            }
                        },
                        {
                            path: "/dashboard/vehicles/create",
                            element: <DashboardVehicleCreatePage/>,
                            info: {
                                label: "Crear Vehículo",
                                ignore: true
                            }
                        },
                        {
                            path: "/dashboard/vehicles/:id",
                            element: <DashboardVehiclePage />,
                            errorElement: <LoadingError />,
                            info: {
                                label: "Vehículo",
                                ignore: true
                            },
                        }
                    ]
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
                    path: "/dashboard/units",
                    element: <Outlet/>,
                    info: {
                        label: "Unidades",
                        icon: <FontAwesomeIcon icon={faRuler}/>
                    },
                    children: [
                        {
                            path: "/dashboard/units/",
                            element: <DashboardUnitListPage/>,
                            info: {
                                label: "Unidades",
                                ignore: true
                            }
                        },
                        {
                            path: "/dashboard/units/create",
                            element: <DashboardUnitCreatePage/>,
                            info: {
                                label: "Crear Unidad",
                                ignore: true
                            }
                        }
                    ]
                },
                {
                    path: "/dashboard/gateways",
                    element: <Outlet/>,
                    info: {
                        label: "Gateways",
                        icon: <FontAwesomeIcon icon={faServer}/>
                    },
                    children: [
                        {
                            path: "/dashboard/gateways/",
                            element: <DashboardGatewayListPage/>,
                            info: {
                                label: "Gateways",
                                ignore: true
                            }
                        },
                        {
                            path: "/dashboard/gateways/create",
                            element: <DashboardGatewayCreatePage/>,
                            info: {
                                label: "Añadir Gateway",
                                ignore: true
                            }
                        }
                    ]
                },
                {
                    path: "/dashboard/devices",
                    element: <Outlet/>,
                    info: {
                        label: "Dispositivos",
                        icon: <FontAwesomeIcon icon={faSatelliteDish}/>
                    },
                    children: [
                        {
                            path: "/dashboard/devices/",
                            element: <DashboardDeviceListPage/>,
                            info: {
                                label: "Dispositivos",
                                ignore: true
                            }
                        },
                        {
                            path: "/dashboard/devices/create",
                            element: <DashboardDeviceCreatePage/>,
                            info: {
                                label: "Crear Dispositivo",
                                ignore: true
                            }
                        }
                    ]
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
        },
        {
            path: "*",
            element: <Result
                status="404"
                title="404"
                subTitle="La página que intentas acceder no existe."
                extra={<Button type="primary">
                    <NavLink to={"/dashboard"}>Ir al Dashboard</NavLink>
                </Button>}
            />,
        }
    ]