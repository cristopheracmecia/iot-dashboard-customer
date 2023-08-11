import {useCallback, useEffect, useMemo, useState} from "react";
import {screens} from "../../utils/tailwind.screens";

export const breakpoints = {
    xs: "xs",
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl"
}

type ScreenPair = {
    name: keyof typeof breakpoints
    breakpoint: number
}

export function useBreakpoints() {
    const [breakpoint, setBreakpoint] = useState<keyof typeof breakpoints | undefined>()
    const pairs: Array<ScreenPair> = useMemo(() => {
        return [...Object.keys(screens).filter(it => it !== "xs").map((it) => {
            const bp = (screens as any)[it]
            return ({
                name: it as keyof typeof breakpoints,
                breakpoint: bp
            })
        }).sort((a, b) => b.breakpoint - a.breakpoint), {
            name: "xs",
            breakpoint: 0
        }]
    }, [])

    const windowSizeListener = useCallback(() => {
        const windowWidth = window.innerWidth
        for (let size of pairs) {
            if (windowWidth >= size.breakpoint) {
                if (breakpoint !== size.name) {
                    setBreakpoint(size.name)
                    return
                }
            }
        }
        if (breakpoint !== undefined) setBreakpoint("xs")
    }, [])

    useEffect(() => {
        window.addEventListener("resize", windowSizeListener)
        windowSizeListener()
        return () => {
            window.removeEventListener("resize", windowSizeListener)
        }
    }, [])

    return ({
        breakpoint
    })
}