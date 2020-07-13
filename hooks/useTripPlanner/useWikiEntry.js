import {useCallback} from "react"
import {useCachedFetch} from "./useCachedFetch"

export function useWikiEntry(city) {
    const cachedFetch = useCachedFetch()

    return useCallback(() => {
        if (city?.value == null) {
            return Promise.resolve(null)
        }
        return cachedFetch(buildEndpoint(city.value)).then(wiki => wiki.extract)
    }, [city, cachedFetch])
}

function buildEndpoint(city) {
    return encodeURI(`https://en.wikipedia.org/api/rest_v1/page/summary/${city}`)
}