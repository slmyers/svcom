import React from 'react';
import {default as MaterialAppBar} from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


export function AppBar({className}) {
    return (
        <MaterialAppBar position="static" className={className}>
            <Toolbar>
            <Typography variant="h6">
                Trip Planner
            </Typography>
            </Toolbar>
        </MaterialAppBar>
    );
  }