import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCategory, changeFilter } from '../../../store';
import { categoryData, getCategoryText } from '../../utils/Common';
import { makeStyles } from '@material-ui/core/styles';
// import { Button } from '../../design';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';


const useStyles = makeStyles((theme) => {
    return {
        root: {
            color: theme.palette.font.bodyColor,
            background: theme.palette.background.button,
        },
    }
});


export const Category = () => {

    const classes = useStyles();
    const category = useSelector(state => state.filters.category)
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState('books');

    const categoryText = getCategoryText(category);

    const handleClick = () => {
        console.info(`You clicked ${categoryText}`);
    };

    const handleMenuItemClick = (event, value) => {
        setSelectedIndex(value);
        setOpen(false);
        dispatch(changeCategory(value))
        dispatch(changeFilter())
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    return (
        <Grid container direction="column" alignItems="center">
            <Grid item xs={12}>
                <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button" >
                    <Button onClick={handleClick} className={classes.root}>{categoryText}</Button>
                    <Button
                        className={classes.root}
                        size="small"
                        aria-controls={open ? 'split-button-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-label="select merge strategy"
                        aria-haspopup="menu"
                        onClick={handleToggle}
                    >
                        <ArrowDropDownIcon />
                    </Button>
                </ButtonGroup>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal
                    style={{ zIndex: '1' }}>
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                            }}

                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList id="split-button-menu" className={classes.root}>
                                        {categoryData.map((row) => (
                                            <MenuItem
                                                key={row.key}
                                                selected={row.key === selectedIndex}
                                                onClick={(event) => handleMenuItemClick(event, row.key)}
                                            >
                                                {row.text}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </Grid>
        </Grid>
    )
}