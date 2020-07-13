import * as React from 'react'
import {useCachedFetch} from './useCachedFetch'

export function useWikiEntry(city) {
    const cachedFetch = useCachedFetch()

    return React.useCallback(() => {
        if (city?.value == null) {
            return Promise.resolve(null)
        }
        return cachedFetch(buildEndpoint(city.value)).then(wiki => wiki.extract)
    }, [city, cachedFetch])
}

function buildEndpoint(city) {
    return encodeURI(`https://en.wikipedia.org/api/rest_v1/page/summary/${city}`)
}