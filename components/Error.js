import * as React from 'react'
import PropTypes from 'prop-types'
import ErrorIcon from '@material-ui/icons/Error'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'


export function Error({error}) {
    if (!error) return null

    return (
        <>
            <Typography variant="h5">
                Oops, something went wrong!
            </Typography>
            <Box width="100%" display="flex" alignItems="center" marginTop="2em">
                <ErrorIcon style={{fill: "#ff0000"}} data-testid="error-icon"/>
                <Typography>
                    {error}
                </Typography>
            </Box>
        </>
    )
}

Error.propTypes = {
    error: PropTypes.string
}