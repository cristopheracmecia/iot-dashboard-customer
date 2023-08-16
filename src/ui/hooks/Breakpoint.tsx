import {useContext} from "react";
import {AppBreakpointsContext} from "../context/Breakpoint";

export function useBreakpoints() {
    const breakpoint = useContext(AppBreakpointsContext)
    return ({
        breakpoint
    })
}