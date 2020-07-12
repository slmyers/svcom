import {useCallback} from "react"

export function useWikiEntry(city) {
    return useCallback(() => {
        if (city?.value == null) {
            return Promise.resolve(null)
        }

        return fetch(buildEndpoint(city.value))
            .then(res => res.json())
            .then(wiki => wiki.extract)
    }, [city])
}

function buildEndpoint(city) {
    return encodeURI(`https://en.wikipedia.org/api/rest_v1/page/summary/${city}`)
}