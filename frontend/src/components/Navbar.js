import React, { useMemo, useCallback } from "react";

import { NavLink, useMatch } from "react-router-dom";

// MUI
import {
  AppBar,
  Box,
  Toolbar,
  Link,
  useScrollTrigger,
  IconButton,
  Drawer,
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Slide,
  Zoom,
  Fab,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// IMG
import GedureLogo from "../img/gedure-logo-recto.svg";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { updateDrawer } from "../store/slices/configs";

const classes = {
  toolBar: {
    justifyContent: "flex-end",
  },
  item: {
    marginRight: 15,
    color: "white",
  },
  drawer: {
    width: 250,
  },
  button: {
    opacity: 0.8,
    transition: "0.5s",
    borderRadius: "5px",
    "&:hover": {
      opacity: 1,
    },
    "&.Mui-selected": {
      background: "linear-gradient(270deg, #2F80ED 0%, #0BA6E0 100%)",
      color: "white",
      "&:hover": {
        opacity: 1,
      },
    },
    "&.Mui-selected .MuiListItemIcon-root": {
      color: "white !important",
    },
  },
  fab: {
    position: 'fixed',
    bottom: 16,
    right: 16,
  },
};

const listNav = [
  {
    text: "Inicio",
    path: "/",
    icon: <HomeIcon />,
  },
  {
    text: "Noticias",
    path: "/noticias",
    icon: <AnnouncementIcon />,
  },
  {
    text: "Contáctanos",
    path: "/contactanos",
    icon: <ContactMailIcon />,
  },
  {
    text: "Entrar",
    path: "/entrar",
    icon: <VpnKeyIcon />,
  },
];

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

const ListDrawerNav = ({ children, to, ...rest }) => {
  const match = useMatch(to);

  return (
    <ListItem to={to} selected={Boolean(match)} {...rest}>
      {children}
    </ListItem>
  );
};

const MobileDrawer = () => {
  const open = useSelector((state) => state.configs.drawer);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(updateDrawer(true));
  };

  const handleClose = () => {
    dispatch(updateDrawer(false));
  };

  return (
    <>
      <IconButton aria-label="menu" onClick={handleClick}>
        <MenuIcon style={{ color: "white" }} />
      </IconButton>
      <Drawer open={open} onClose={handleClose}>
        <Box role="presentation" style={classes.drawer}>
          <Toolbar style={{ justifyContent: "center" }}>
            <img src={GedureLogo} alt="logo de Gedure" height="35" />
          </Toolbar>
          <Container>
            <List component="nav">
              {useMemo(
                () =>
                  listNav.map((data, index) => {
                    return (
                      <ListDrawerNav
                        key={index}
                        button
                        dense
                        component={NavLink}
                        to={data.path}
                        sx={classes.button}
                      >
                        <ListItemIcon>{data.icon}</ListItemIcon>
                        <ListItemText primary={data.text} />
                      </ListDrawerNav>
                    );
                  }),
                []
              )}
            </List>
          </Container>
        </Box>
      </Drawer>
    </>
  );
};

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
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <Toolbar>
              <MobileDrawer />
            </Toolbar>
          </Box>
          <Box sx={{ display: { sm: "block", xs: "none" } }}>
            <Toolbar style={classes.toolBar}>
              {useMemo(
                () =>
                  listNav.map((data, index) => (
                    <Link
                      key={index}
                      style={classes.item}
                      color="inherit"
                      underline="hover"
                      component={NavLink}
                      to={data.path}
                    >
                      {data.text}
                    </Link>
                  )),
                []
              )}
            </Toolbar>
          </Box>
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
