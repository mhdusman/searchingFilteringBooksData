import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';

const SmartCheckbox = withStyles((theme) => ({
    root: (theme.palette.font.bodyColor == '#FFFFFF') ? {
        color: theme.palette.font.bodyColor,
        '&$checked': {
            color: theme.palette.font.bodyColor,
        },
    } : {},
    checked: {},
}))((props) => <Checkbox color="default" {...props} />);


export const CustomCheckbox = (props) => {
    return (
        <label>
            {/* <Checkbox
                checked={props.checked}
                id={props.id}
                onChange={props.onChange}
                color="primary"
                indeterminate={props.indeterminate && !props.checked}
            /> */}
            <SmartCheckbox
                checked={props.checked}
                id={props.id}
                onChange={props.onChange}
                color="primary"
                indeterminate={props.indeterminate && !props.checked}
            />
            {/* <input
                checked={props.checked}
                id={props.id}
                type="checkbox"
                className="filled-in"
                onChange={props.onChange} /> */}
            <span>{props.label}</span>
        </label>
    )
}