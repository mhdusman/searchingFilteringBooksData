import React, { useEffect, useState } from 'react';
// import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';//, useSelector 
// import { verifyToken } from '../store';

// import { Search } from './Search';
import { Menu } from '../component/pages';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 228;
const useStyles = makeStyles(theme => ({
    contentBackground: {
        background: theme.palette.background.bodyColor,
        // color: theme.palette.themeOne.color,
    },
    showHeader: {
        background: theme.palette.background.headerColor,
        visibility: 'visible',
        opacity: 1
    },
    hideHeader: {
        visibility: 'hidden',
        opacity: 0,
        transition: 'visibility 0.5s linear,opacity 0.5s linear'
    },
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        background: theme.palette.background.headerColor,
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        background: theme.palette.background.bodyColor,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    closeMenuButton: {
        marginRight: 'auto',
        marginLeft: 0,
    },
}));

let offset = 0;
export const Layout = ({ children }) => {

    const [visible, setVisible] = useState(true);
    const dispatch = useDispatch();
    // const {
    //     isAuthenticated,
    //     awaitAuth,
    //     // loading
    // } = useSelector((state) => ({
    //     isAuthenticated: state.auth.isAuthenticated,
    //     awaitAuth: state.auth.awaitAuth,
    //     // loading: state.search.loading,
    // }));

    useEffect(() => {
        // dispatch(verifyToken())
    }, [dispatch])

    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    function handleDrawerToggle() {
        setMobileOpen(!mobileOpen)
    }

    const toggleHeader = () => {
        const newOffset = window.pageYOffset;
        setVisible(newOffset > offset ? false : true)
        offset = newOffset;
    }

    useEffect(() => {
        addEventListener('scroll', toggleHeader);
        return () => {
            removeEventListener('scroll', toggleHeader);
        }
    }, [])


    // if (awaitAuth) {
    //     return (
    //         <div className="height-100 padding-top-40">Loading...
    //         </div>
    //     )
    // } else if (!isAuthenticated) {
    //     return <Redirect to="/signin" />
    // } else if (isAuthenticated) {
    return (
        <>
            <Grid container
                direction="row"
                style={{ minHeight: '100vh' }}
            >
                <Grid item lg={2} xl={2}>
                    <div className={classes.root}>
                        <CssBaseline />
                        <AppBar position="fixed" style={{ height: '50px' }} className={`${classes.appBar} ${(visible) ? classes.showHeader : classes.hideHeader}`}  >
                            <Toolbar>
                                <IconButton
                                    color="inherit"
                                    aria-label="Open drawer"
                                    edge="start"
                                    onClick={handleDrawerToggle}
                                    className={classes.menuButton}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Typography variant="h6" style={{ paddingBottom: '5px' }} noWrap>Minnatul Aleem</Typography>
                            </Toolbar>
                        </AppBar>

                        <nav className={classes.drawer} >
                            <Hidden smUp implementation="css">
                                <Drawer
                                    variant="temporary"
                                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                                    open={mobileOpen}
                                    onClose={handleDrawerToggle}
                                    classes={{ paper: classes.drawerPaper }}
                                    ModalProps={{ keepMounted: true }} // Better open performance on mobile.
                                >
                                    <IconButton
                                        onClick={handleDrawerToggle}
                                        className={classes.closeMenuButton}>
                                        <CloseIcon />
                                    </IconButton>
                                    <Menu />
                                </Drawer>
                            </Hidden>
                            <Hidden xsDown implementation="css">
                                <Drawer
                                    className={classes.drawer}
                                    variant="permanent"
                                    classes={{ paper: classes.drawerPaper }}
                                >
                                    <div className={classes.toolbar} />
                                    <Menu />
                                </Drawer>
                            </Hidden>
                        </nav>
                    </div>

                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={10} xl={10} className={classes.contentBackground}>
                    <Box
                        boxShadow={3}
                        style={{ minHeight: '100vh', paddingTop: 50 }}
                    >
                        {children}
                    </Box>
                </Grid>
            </Grid>
        </>
    )
    // }
};