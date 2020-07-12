import * as React from "react"
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export function WikiEntry({wikiDescription, selectedCity}) {
    if (!wikiDescription) return null

    return (
        <Card>
            <CardContent>
                <Typography>
                    {wikiDescription}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => openInNewTab(selectedCity?.value)}>
                    Learn More
                </Button>
            </CardActions>
        </Card>
    )
}

function openInNewTab(city) {
    const url = encodeURI(`https://en.wikipedia.org/wiki/${city}`)
    var win = window.open(url, '_blank');
    win.focus();
}