import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    textColor: {
        color: theme.palette.font.bodyColor,
        background: theme.palette.background.button,
        '&:hover': {
            background: theme.palette.background.buttonHover,
        },
    }
}));

export const CustomButton = (props) => {

    const classes = useStyles();
    const { disabled, onClick, variant, children } = props
    return (
        <Button
        // {...other}
            className={classes.textColor}
            variant={variant}
            onClick={onClick}
            disabled={disabled}
           
        >{children}</Button>
    )
};