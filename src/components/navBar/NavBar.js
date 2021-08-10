import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme, useMediaQuery } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from "../Drawer"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        overflow: "hidden"
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    logo: {
        width: "17vw"
    }
}));

export default function ButtonAppBar() {
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('sm'))

    const classes = useStyles();
    const [show, setShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleScroll = () => {
        setShow(window.pageYOffset > 140);
    };

    return (
        <>
            {
                isMatch ? (<Drawer />) : (

                    <div className={classes.root}>
                        <AppBar position="static">
                            <Toolbar>
                                {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton> */}
                                <Typography variant="h6" className={classes.title}>
                                    <img className={classes.logo} src="https://cdn-static.spcafe.in/articles/white-logo-asset.svg" alt="logo" />
                                </Typography>
                                <Typography variant="h6" className={classes.title}>
                                    News Feeds
                        </Typography>

                                <Button color="inherit" onClick={() => window.scrollTo(0, 0)}>About Us</Button>


                            </Toolbar>
                        </AppBar>
                    </div>

                )
            }
        </>
    );
}
