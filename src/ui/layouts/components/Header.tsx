import {FC, Fragment, useMemo} from "react";
import {Breadcrumb, Button, Layout, BreadcrumbProps} from "antd";
import {faAnglesRight} from "@fortawesome/free-solid-svg-icons"
import {appRouteAsBreadcrumbItem, determineCurrentRoutePath} from "../../../utils/Layout";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear, faUser, faArrowLeft, faBars} from "@fortawesome/free-solid-svg-icons";
import {useLocation, useNavigate} from "react-router-dom";

type Props = {
    openDrawer: () => void
    isMediumScreen: boolean
}

const {Header} = Layout

const BreadcrumbSeparator = <div className={"h-full flex place-items-center text-neutral-300"}>
    <FontAwesomeIcon icon={faAnglesRight}/>
</div>

const RenderBreadcrumbItem: BreadcrumbProps["itemRender"] = (it) => {
    const navigate = useNavigate()
    return <Button className={"p-0 text-neutral-400"} type={"text"} onClick={(_) => {
        navigate({
            pathname: it.href
        })
    }}>{it.title}</Button>
}
export const DashboardLayoutHeader: FC<Props> = ({isMediumScreen, openDrawer}) => {
    const {pathname} = useLocation()
    const navigate = useNavigate()
    const routePath = determineCurrentRoutePath(pathname)
    const breadcrumbItems = useMemo(() => {
        return routePath.map(it => appRouteAsBreadcrumbItem(it))
    }, [routePath])
    return isMediumScreen ? <Header className={"flex flex-row bg-white pl-4 pr-3"}>
        <div className={"w-full h-full flex flex-row place-items-center"}>
            {
                routePath.length !== 0 ? <Fragment>
                    <Button className={"text-neutral-400 mr-2"} type={"text"}
                            icon={<FontAwesomeIcon icon={faArrowLeft}/>}
                            onClick={() => {
                                navigate(-1)
                            }}>
                    </Button>
                    {
                        !!breadcrumbItems && breadcrumbItems.length >= 1 ? <Breadcrumb
                            rootClassName={"block flex flex-row place-items-center px-3 py-2"}
                            separator={BreadcrumbSeparator}
                            itemRender={RenderBreadcrumbItem}
                            items={breadcrumbItems}/> : null
                    }
                </Fragment> : null
            }
            <div className={"ml-auto flex flex-row gap-2 text-neutral-500"}>
                <Button size={"large"} shape={"round"} type={"text"} ghost={true}
                        icon={<FontAwesomeIcon icon={faUser}/>}/>
                <Button size={"large"} shape={"round"} type={"text"} icon={<FontAwesomeIcon icon={faGear}/>}/>
            </div>
        </div>
    </Header> : <div className={"flex flex-col"}>
        {
            !!breadcrumbItems && breadcrumbItems.length >= 1 ? <Fragment>
                <Breadcrumb
                    rootClassName={"block flex flex-row place-items-center px-3 py-2"}
                    separator={BreadcrumbSeparator}
                    itemRender={RenderBreadcrumbItem}
                    items={breadcrumbItems}/>
                <hr className={"border-0 h-0.5 bg-neutral-200"}/>
            </Fragment> : null
        }
        <div className={"flex flex-col p-0"}>
            <div className={"w-full h-fit flex flex-row gap-2 py-3 pl-2 place-items-center"}>
                <Button type={"text"} shape={"circle"} icon={<FontAwesomeIcon icon={faBars}/>} onClick={openDrawer}/>
                {
                    routePath.length !== 0 ? <Fragment>
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