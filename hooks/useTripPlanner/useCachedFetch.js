import React, {useCallback, useState} from "react"

export function useCachedFetch() {
    // for testing we wrap the App with our own values, but in production / development environments
    // we will default to the values at the bottom of the file. The colocation is convienient.
    const { maxAge, cache } = useCachedFetchCtx()
    return useCallback((url) => {
        if (cache.has(url)) {
            const value = cache.get(url)
            if ((Date.now() - value.crePit) >= maxAge) {
                cache.delete(url)
            } else {
                return Promise.resolve(value.data)
            }
        }

        return fetch(url)
            .then(res => res.json())
            .then(data => {
                cache.set(url, {
                    data,
                    crePit: Date.now(),
                })

                return data
            })
    }, [maxAge, cache])
}

export const CachedFetchCtx = React.createContext({maxAge: 1000 * 60 * 2, cache: new Map()})
export function CachedFetchProvider({children, value}) {
    return (
        <CachedFetchCtx.Provider value={value}>
            {children}
        </CachedFetchCtx.Provider>
    )
}
function useCachedFetchCtx() {
    return React.useContext(CachedFetchCtx)
}
