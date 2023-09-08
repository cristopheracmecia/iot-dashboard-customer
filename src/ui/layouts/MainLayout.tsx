import {Button, Layout, Switch, Typography} from "antd"
import {FC} from "react";
import {Outlet} from "react-router-dom";
import {useBreakpoints} from "../hooks/Breakpoint";
import {isSm, screenIsAnyOf, isXs} from "../../utils/tailwind.screens";
import {useDayNightTheme} from "../hooks/SwitchTheme";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoon, faSun} from "@fortawesome/free-solid-svg-icons";

const {Content, Footer, Header} = Layout
export const MainLayout: FC = () => {
    const {breakpoint} = useBreakpoints()
    const isMobile = screenIsAnyOf(breakpoint, isXs, isSm)
    const {setDarkMode, darkMode} = useDayNightTheme()

    return <Layout className={"w-screen h-screen overflow-hidden"}>
            {
                !isMobile ? <Header className={"flex flex-row pl-4 pr-3 absolute bg-transparent top-0 w-full"}>
                    <div className={"w-full h-full flex flex-row place-items-center"}>
                        <Button.Group className={"place-items-center ml-auto"}>
                            <Switch checked={darkMode} checkedChildren={<FontAwesomeIcon icon={faSun}/>}
                                    unCheckedChildren={<FontAwesomeIcon icon={faMoon}/>} onChange={setDarkMode}/>
                        </Button.Group>
                    </div>
                </Header> : <div className={"absolute bg-transparent top-0 w-full"}>

                    <div className={"flex flex-col p-0"}>
                        <div className={"w-full h-fit flex flex-row gap-2 py-3 pl-2 place-items-center"}>

                            <Button.Group className={"ml-auto place-items-center"}>
                                <Switch checked={darkMode} checkedChildren={<FontAwesomeIcon icon={faSun}/>}
                                        unCheckedChildren={<FontAwesomeIcon icon={faMoon}/>} onChange={setDarkMode}/>
                            </Button.Group>
                        </div>
                    </div>
                    <hr className={"border-0 h-0.5 bg-neutral-200"}/>
                </div>

            }
            <Content className={"w-full h-full overflow-hidden"}>
                <Outlet/>
                <Footer className={"flex place-content-center w-full bg-transparent py-1 m-0"}>
                    <Typography.Text style={{padding: 0, margin: 0}} type={"secondary"}>
                        2023 ACME & CIA. Todos los derechos reservados.
                    </Typography.Text>
                </Footer>
            </Content>
    </Layout>
};
