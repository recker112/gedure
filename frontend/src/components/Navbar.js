import React from "react";

import { useMatch } from "react-router-dom";

// MUI
import { AppBar, Box, useScrollTrigger, Slide, Zoom, Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

// Components
import NoAuth from "./Nav/NoAuth";
import Auth from "./Nav/Auth";

// Redux
import { useSelector } from "react-redux";

const classes = {
  fab: (theme) => ({
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  }),
};

const HiddeOnScroll = (props) => {
  const { children } = props;

  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

function ScrollTop(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 800,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box onClick={handleClick} sx={classes.fab}>
        {children}
      </Box>
    </Zoom>
  );
}

export default function Navbar() {
  const match = useMatch("/");

  const auth = useSelector(state => state.auth.auth);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 350,
  });

  return (
    <>
      <HiddeOnScroll>
        <AppBar
          enableColorOnDark
          variant="static"
          color={!trigger && match ? "transparent" : "primary"}
          elevation={0}
        >
          {auth ? <Auth /> : <NoAuth />}
        </AppBar>
      </HiddeOnScroll>
      <ScrollTop>
        <Fab color="secondary" size="small">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
}
