/**
 * @type {import("tailwindcss").Config.theme.screens}
 * */
export const screens = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
}

export function isXs(bp: keyof typeof screens | undefined) {
    return !!bp && screens[bp] === undefined
}

export function isSm(bp: keyof typeof screens | undefined) {
    return !!bp && screens[bp] === screens.sm
}

export function isMd(bp: keyof typeof screens | undefined) {
    return !!bp && screens[bp] === screens.md
}

export function isLg(bp: keyof typeof screens | undefined) {
    return !!bp && screens[bp] === screens.lg
}

export function isXl(bp: keyof typeof screens | undefined) {
    return !!bp && screens[bp] === screens.xl
}

export function is2Xl(bp: keyof typeof screens | undefined) {
    return !!bp && screens[bp] === screens["2xl"]
}

export function screenIsAnyOf(bp: keyof typeof screens | undefined, ...test: Array<(bp: keyof typeof screens | undefined) => boolean>) {
    for (let tester of test) {
        if (tester(bp)) {
            return true
        }
    }
    return false
}