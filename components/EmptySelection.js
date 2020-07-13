import * as React from 'react'
import Typography from '@material-ui/core/Typography'
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation'
import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'

export function EmptySelection({show}) {
    if(!show) return null

    return (
        <Box display="flex" flexDirection="column" width="100%" alignItems="center">
            <NotListedLocationIcon style={{fill: LIGHT_GREY}} />
            <Typography variant="h5">
                No location selected
            </Typography>
        </Box>
    )
}

const LIGHT_GREY = "#b7b7b7"

EmptySelection.propTypes = {
    show: PropTypes.bool.isRequired
}