import {FC, Fragment, useEffect, useState} from "react";
import {Breadcrumb, Button, Layout, BreadcrumbProps} from "antd";
import {faAnglesRight} from "@fortawesome/free-solid-svg-icons"
import {appRouteAsBreadcrumbItem, determineCurrentRoutePath} from "../../../utils/Layout";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear, faUser, faArrowLeft, faBars} from "@fortawesome/free-solid-svg-icons";
import {NavigateFunction, useLocation, useNavigate} from "react-router-dom";
import {AppRoute} from "../../../types/Route";
import {BreadcrumbItemType, BreadcrumbSeparatorType} from "antd/es/breadcrumb/Breadcrumb";

type Props = {
    openDrawer: () => void
    isMediumScreen: boolean
}

const {Header} = Layout

const BreadcrumbSeparator = <div className={"h-full flex place-items-center text-neutral-300"}>
    <FontAwesomeIcon icon={faAnglesRight}/>
</div>

const RenderBreadcrumbItem: (navigate: NavigateFunction) => BreadcrumbProps["itemRender"] =  (navigate) => (it) => {
    return <Button className={"p-0 text-neutral-400"} type={"text"} onClick={(_) => {
        navigate({
            pathname: it.href
        })
    }}>{it.title}</Button>
}
export const DashboardLayoutHeader: FC<Props> = ({isMediumScreen, openDrawer}) => {
    const {pathname} = useLocation()
    const navigate = useNavigate()
    const [routePath, setRoutePath] = useState<AppRoute[] | null>(null)
    const [breadcrumbItems, setBreadcrumbItems] = useState<Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[] | null>(null)
    useEffect(() => {
        const rPath = determineCurrentRoutePath(pathname)
        const bItems = rPath.map(it => appRouteAsBreadcrumbItem(it))
        if (JSON.stringify(rPath) !== JSON.stringify(routePath)) setRoutePath(rPath)
        if (JSON.stringify(bItems) !== JSON.stringify(breadcrumbItems)) setBreadcrumbItems(bItems)
        // return () => {
        //     setRoutePath(null)
        //     setBreadcrumbItems(null)
        // }
    }, [pathname])
    return isMediumScreen ? <Header className={"flex flex-row bg-white pl-4 pr-3"}>
        <div className={"w-full h-full flex flex-row place-items-center"}>
            {
                !!routePath && routePath.length !== 0 ? <Fragment>
                    <Button className={"text-neutral-400 mr-2"} type={"text"}
                            icon={<FontAwesomeIcon icon={faArrowLeft}/>}
                            onClick={() => {
                                navigate(-1)
                            }}>
                    </Button>

                    <div className={"w-full overflow-x-auto"}>
                        <Breadcrumb
                            rootClassName={"block flex flex-row place-items-center px-3 py-2"}
                            separator={BreadcrumbSeparator}
                            itemRender={RenderBreadcrumbItem(navigate)}
                            items={breadcrumbItems || []}/>
                    </div>
                </Fragment> : null
            }
            <div className={"ml-auto flex flex-row gap-2 text-neutral-500"}>
                <Button size={"middle"} shape={"round"} type={"text"} ghost={true}
                        icon={<FontAwesomeIcon icon={faUser}/>}/>
                <Button size={"middle"} shape={"round"} type={"text"} icon={<FontAwesomeIcon icon={faGear}/>}/>
            </div>
        </div>
    </Header> : <div className={"flex flex-col w-full"}>
        {
            breadcrumbItems && breadcrumbItems.length !== 0 ? <Fragment>
                <div className={"w-full overflow-hidden"}>
                    <Breadcrumb
                        rootClassName={"w-full block px-3 py-2"}
                        separator={BreadcrumbSeparator}
                        itemRender={RenderBreadcrumbItem(navigate)}
                        items={breadcrumbItems}/>
                </div>
                <hr className={"border-0 h-0.5 bg-neutral-200"}/>
            </Fragment> : null
        }

        <div className={"flex flex-col p-0"}>
            <div className={"w-full h-fit flex flex-row gap-2 py-3 pl-2 place-items-center"}>
                <Button type={"text"} shape={"circle"} icon={<FontAwesomeIcon icon={faBars}/>} onClick={openDrawer}/>
                {
                    !!routePath && routePath.length !== 0 ? <Fragment>
                        <Button className={"text-neutral-400 mr-2"} type={"text"}
                                icon={<FontAwesomeIcon icon={faArrowLeft}/>}
                                onClick={() => {
                                    navigate(-1)
                                }}>
                        </Button>
                    </Fragment> : null
                }

                <div className={"ml-auto flex flex-row gap-2 h-fit"}>
                    <Button shape={"circle"} type={"text"} ghost={true}
                            icon={<FontAwesomeIcon icon={faUser}/>}/>
                    <Button shape={"circle"} type={"text"} icon={<FontAwesomeIcon icon={faGear}/>}/>
                </div>
            </div>
        </div>
        <hr className={"border-0 h-0.5 bg-neutral-200"}/>
    </div>

}