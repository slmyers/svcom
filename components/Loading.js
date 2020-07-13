import * as React from "react"
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from "@material-ui/core/Box"
import PropTypes from "prop-types"
import Typography from "@material-ui/core/Typography"

export function Loading({isLoading}) {
    if (!isLoading) return null

    return (
        <Box 
            flexGrow={1} 
            maxHeight={300} 
            width="100%" 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            flexDirection="column"
        >
            <CircularProgress color="primary" />
            <Typography>
                loading...
            </Typography>
        </Box>
    )    
}

Loading.propTypes = {
    isLoading: PropTypes.bool.isRequired
}