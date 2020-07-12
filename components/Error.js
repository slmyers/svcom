import * as React from "react"

export function Error({error}) {
    if (!error) return null

    return <h1 data-testid="error">{error}</h1>
}