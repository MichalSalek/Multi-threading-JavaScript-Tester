export const getSecuredClientBrowserID = (userAgent: string, clientIP: string): string => {
    const base = userAgent + clientIP

    const slicedPart = base.slice(0, base.length - 7).split(/\D/).join('')

    return base.slice(0, base.length - 7) + slicedPart
}
