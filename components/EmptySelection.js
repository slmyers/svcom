import * as React from "react"
import Typography from "@material-ui/core/Typography"

export function EmptySelection({show}) {
    if(!show) return null

    return (
        <Typography variant="h5">
            No location selected
        </Typography>
    )
}