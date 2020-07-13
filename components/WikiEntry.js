import * as React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'

export function WikiEntry({wikiDescription, selectedCity}) {
    if (!wikiDescription) return null

    const onClick = selectedCity?.value ? 
        () => openInNewTab(selectedCity?.value) :
        // this should never happen, but we don't want to send the user to an Undefined Wikipedia page.
        () => alert("oops! unable to find selected city.")

    return (
        <Card>
            <CardContent>
                <Typography>
                    {wikiDescription}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={onClick}>
                    Learn More
                </Button>
            </CardActions>
        </Card>
    )
}

function openInNewTab(city) {
    const url = encodeURI(`https://en.wikipedia.org/wiki/${city}`)
    const win = window.open(url, '_blank')
    win.focus()
}

WikiEntry.propTypes = {
    wikiDescription: PropTypes.string,
    selectedCity: PropTypes.shape({
        value: PropTypes.string.isRequired
    })
}