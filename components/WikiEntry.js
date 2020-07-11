import * as React from "react"

export function WikiEntry({wikiDescription}) {
    if (!wikiDescription) return null

    return (
        <div>
            WIKI FOR {wikiDescription}
        </div>
    )
}