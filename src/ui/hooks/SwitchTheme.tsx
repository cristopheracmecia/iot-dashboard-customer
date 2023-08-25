import {createContext, FC, PropsWithChildren, useContext, useMemo, useState} from "react";
import useCookie from "react-use-cookie";

type Value = {
    darkMode: boolean
    setDarkMode: (enabled: boolean) => void
}

export const DayNightThemeContext = createContext<Value>({
    darkMode: false,
    setDarkMode: null!
});

export const DayNightThemeProvider: FC<PropsWithChildren> = ({children}) => {
    const [darkMode, setDarkMode] = useCookie("darkMode", "false");
    const isDark = useMemo(() => darkMode === "true", [darkMode])
    return <DayNightThemeContext.Provider value={{
        darkMode: isDark, setDarkMode: (enabled) => {
            setDarkMode(enabled ? "true" : "false")
        }
    }}>
        {children}
    </DayNightThemeContext.Provider>
}

export function useDayNightTheme() {
    return useContext(DayNightThemeContext)
}