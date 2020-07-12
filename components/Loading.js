import * as React from "react"
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import makeStyles from "@material-ui/core/styles/makeStyles"

export function Loading({isLoading}) {
    if (!isLoading) return null

    const { backdrop } = useStyles()

    return (
        <Backdrop open={true} className={backdrop} data-testid="loading">
            <CircularProgress color="inherit" />
        </Backdrop>
    )
    
}


const useStyles = makeStyles(theme => ({
    backdrop: {
        color: "#fff",
        zIndex: Number.MAX_SAFE_INTEGER
    }
}))