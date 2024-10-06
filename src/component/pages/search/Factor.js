import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeFactor } from '../../../store';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { makeStyles } from '@material-ui/core/styles';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const useStyles = makeStyles((theme) => ({
    contentBackground: {
        // background: theme.palette.background.blockColor,
        // background: "#3C3C3C",
        color: theme.palette.font.bodyColor,
        '& span': {
            color: theme.palette.font.bodyColor,
        },
    }
}));

export const Factor = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const factor = useSelector((state) => state.filters.factor)
    console.log(factor)

    const handleClick = (event, value) => {
        dispatch(changeFactor(value));
    }

    return (
        <ToggleButtonGroup
            value={factor}
            exclusive
            onChange={handleClick}
            aria-label="text alignment"
        // className={classes.contentBackground}
        >
            <ToggleButton value="1" className={classes.contentBackground} >Phrase Match</ToggleButton>
            <ToggleButton value="2" className={classes.contentBackground}>Term Match (AND)</ToggleButton>
            <ToggleButton value="3" className={classes.contentBackground}>Term Match (OR)</ToggleButton>
        </ToggleButtonGroup>
    )
};