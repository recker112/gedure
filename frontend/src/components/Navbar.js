import React, { useCallback } from "react";

import { useMatch } from "react-router-dom";

// MUI
import {
  AppBar,
  Box,
  useScrollTrigger,
  Slide,
  Zoom,
  Fab,
} from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import NoAuth from "./Nav/NoAuth";

const classes = {
  fab: {
    position: 'fixed',
    bottom: 16,
    right: 16,
  },
};

const HiddeOnScroll = (props) => {
	const { children } = props;

	const trigger = useScrollTrigger();

	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	);
}

function ScrollTop(props) {
  const { children } = props;
	
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 800,
  });

  const handleClick = useCallback((event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#top-anchor');

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  return (
    <Zoom in={trigger}>
      <Box onClick={handleClick} sx={classes.fab}>
        {children}
      </Box>
    </Zoom>
  );
}

export default function Navbar() {
  const match = useMatch('/');

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
          color={(!trigger && match) ? "transparent" : "primary"}
        >
          <NoAuth />
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
