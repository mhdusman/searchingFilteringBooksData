import React from 'react';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    textColor: {
        color: theme.palette.font.bodyColor,
    }
}));

export const CustomSwitch = (props) => {

    const classes = useStyles();
    return (
        <>
            <span className={classes.textColor}>{props.label}</span>
            <Switch
                checked={props.checked}
                onChange={props.onChange}
                color="primary"
                // name="checkedB"
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
        </>
    )
};