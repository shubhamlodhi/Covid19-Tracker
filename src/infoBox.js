import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

function InfoBox({title, cases, total, colr, ...props}){
    return (
        
        <Card onClick = {props.onClick} className = "infoBox">
            <CardContent>
    <Typography className = "infoBox__title" color = "textSecondary">{title}</Typography>
    <h2 className = "infoBox__cases" style = {{color:colr}}>{cases}</h2>
    <Typography classname = "infoBox__total" color = "textSecondary">{total} Total</Typography>
            </CardContent>
        </Card>
        
    );
}

export default InfoBox;
