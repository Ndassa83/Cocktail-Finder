import {
  AccountCircleSharp,
  FavoriteBorder,
  InvertColors,
  LocalBar,
} from "@material-ui/icons";
import {
  Typography,
  AppBar,
  Toolbar,
  Button,
  Grid,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { useStyles } from "./useStyles";
import firebase from "firebase/compat/app";

import { useState } from "react";
import { drink } from "./App";
import { Link } from "react-router-dom";
import React from "react";

type NavBarProps = {
  setFilteredDrinks?: any;
  allDrinks?: drink[];
  currentUser: any;
  setCurrentUser: any;
  setInteractState: any;
};

export const NavBar: React.FC<NavBarProps> = ({
  setFilteredDrinks,
  allDrinks,
  currentUser,
  setCurrentUser,
  setInteractState,
}) => {
  const classes = useStyles();

  const getCurrentUserData = async () => {
    let firebaseUser: any;
    if (currentUser) {
      firebaseUser = firebase
        .firestore()
        .collection("favorites")
        .doc(currentUser.uid);
    }
    const request = await firebaseUser.get();
    const data = await request.data();
    return data;
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        setCurrentUser(result.user);
      });
  };

  const handleMyFavoritesScreen = async () => {
    const userData = await getCurrentUserData();
    setFilteredDrinks(userData.favoriteDrinks);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Button
              onClick={() => {
                setInteractState("");
                window.scrollTo({ top: 0, behavior: "smooth" });
                setFilteredDrinks(allDrinks);
              }}
            >
              <Link to="/" className={classes.link}>
                <LocalBar className={`${classes.icon} ${classes.navBar}`} />
                <Typography variant="h6" className={classes.navBar}>
                  Find My Drink
                </Typography>
              </Link>
            </Button>
          </Grid>
          {!currentUser ? (
            <Grid item>
              <Button onClick={() => handleLogin()}>
                <Typography variant="h6" className={classes.navBar}>
                  Sign In
                </Typography>
                <AccountCircleSharp
                  className={`${classes.icon} ${classes.navBar}`}
                />
              </Button>
            </Grid>
          ) : (
            <>
              <Grid item>
                <Button onClick={handleMyFavoritesScreen}>
                  <Link to="/my-favorites" className={classes.link}>
                    <FavoriteBorder
                      className={`${classes.icon} ${classes.navBar}`}
                    />
                    <Typography variant="h6" className={classes.navBar}>
                      My Favorites
                    </Typography>
                  </Link>
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <Link to="/my-ingredients" className={classes.link}>
                    <Typography variant="h6" className={classes.navBar}>
                      My Ingredients
                    </Typography>
                    <InvertColors
                      className={`${classes.icon} ${classes.navBar}`}
                    />
                  </Link>
                </Button>
              </Grid>
              <Grid item>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleOpenMenu}
                >
                  <Typography variant="h6" className={classes.navBar}>
                    {currentUser.displayName}
                  </Typography>
                  <AccountCircleSharp
                    className={`${classes.icon} ${classes.navBar}`}
                  />
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}
                  className={classes.menu}
                >
                  <MenuItem onClick={() => setCurrentUser()}>
                    <Link to="/" className={classes.link}>
                      Sign Out
                    </Link>
                  </MenuItem>
                </Menu>
              </Grid>
            </>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
