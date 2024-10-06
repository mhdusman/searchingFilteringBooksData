import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { Switch } from '../../design';
import { changeTheme } from '../../../store';
import logo from '../../../static/logo-golden.png';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    textColor: {
        color: theme.palette.font.bodyColor,
    }
}));

export const Menu = () => {

    const classes = useStyles();
    const [theme, setTheme] = useState('');
    const dispatch = useDispatch();

    const [selectedIndex, setSelectedIndex] = useState(1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    useEffect(() => {
        const themeName = localStorage.getItem('theme');
        if (themeName) {
            setTheme(themeName);
            dispatch(changeTheme(themeName));
        }
    }, [dispatch])

    const toggleTheme = (e) => {
        const themeName = (e.target.checked) ? 'themeTwo' : 'themeOne';
        localStorage.setItem('theme', themeName);
        setTheme(themeName);
        dispatch(changeTheme(themeName));
    }

    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center">
            <Grid item md={10} sm={10} xs={10}>
                <img className="logo-small" src={logo} alt="app logo" /> {/* "logo-large" */}
            </Grid>
            <Grid item md={9} sm={9} xs={9}>
                <Switch
                    label={(theme == "themeTwo") ? "Dark Theme" : "Light Theme"}
                    checked={theme === 'themeTwo' ? true : false}
                    onChange={toggleTheme}
                />
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
                <Divider />
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
                <List component="nav" aria-label="secondary mailbox folder">
                    <Link to="/">
                        <ListItem
                            button
                            selected={selectedIndex === 2}
                            onClick={(event) => handleListItemClick(event, 2)}
                        >
                            <ListItemText primary={<span className={classes.textColor}>Search</span>} />
                        </ListItem>
                    </Link>
                </List>
            </Grid>
        </Grid>
    )
};