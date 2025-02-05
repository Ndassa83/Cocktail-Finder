import { useStyles } from "./useStyles";
import { Button, Grid, Typography } from "@material-ui/core";
import { LocalBar } from "@material-ui/icons";
import { drink } from "./App";
import { Link } from "react-router-dom";
import React from "react";

type FooterProps = {
  setFilteredDrinks?: any;
  allDrinks?: drink[];
  setInteractState: any;
};

export const Footer: React.FC<FooterProps> = ({
  setFilteredDrinks,
  allDrinks,
  setInteractState,
}) => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Grid item>
          <Button
            onClick={() => {
              setInteractState("");
              window.scrollTo({ top: 0, behavior: "smooth" });
              setFilteredDrinks(allDrinks);
            }}
            style={{ paddingLeft: "0px" }}
          >
            <Link to="/" className={classes.link}>
              <LocalBar className={classes.icon} color="secondary" />
              <Typography variant="h6" color="textPrimary">
                Find My Drink
              </Typography>
            </Link>
          </Button>
        </Grid>
        <Grid item></Grid>
        <Grid item>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            gutterBottom
          >
            Drinks provided by{" "}
            <a href="https://thecocktaildb.com/"> thecocktaildb.com</a>
          </Typography>
        </Grid>
      </Grid>
    </footer>
  );
};
