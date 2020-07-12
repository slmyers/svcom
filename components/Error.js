import * as React from "react"
import PropTypes from "prop-types"

export function Error({error}) {
    if (!error) return null

    return <h1 data-testid="error">{error}</h1>
}

Error.propTypes = {
    error: PropTypes.string.isRequired
}