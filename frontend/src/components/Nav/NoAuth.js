import React from "react";

import { NavLink, useMatch } from "react-router-dom";

import {
  Box,
  Toolbar,
  Link,
  ListItemIcon,
  ListItemText,
  IconButton,
  Drawer,
  Container,
  List,
  ListItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import {
	Bullhorn as BullhornIcon,
} from 'mdi-material-ui';

// IMG
import GedureLogo from "../../img/gedure-logo-recto.svg";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { updateDrawer } from "../../store/slices/configs";

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
    icon: <BullhornIcon />,
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

export const ListDrawerNav = ({ children, to = '', noNav, nested, ...rest }) => {
  const match = useMatch(to);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(updateDrawer(false));
  };

  return (
    <ListItem 
      dense
      button
      to={to} 
      selected={Boolean(match)} 
      component={!noNav ? NavLink : null} 
      sx={[
        classes.button,
        nested && {
          paddingLeft: 4,
        }
      ]}
      onClick={handleClose}
      {...rest}
    >
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
              {listNav.map((data, index) => (
                <ListDrawerNav
                  key={index}
                  to={data.path}
                >
                  <ListItemIcon>{data.icon}</ListItemIcon>
                  <ListItemText primary={data.text} />
                </ListDrawerNav>
              ))}
            </List>
          </Container>
        </Box>
      </Drawer>
    </>
  );
};

export default function NoAuth() {
  return (
    <>
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <Toolbar>
          <MobileDrawer />
        </Toolbar>
      </Box>
      <Box sx={{ display: { sm: "block", xs: "none" } }}>
        <Toolbar style={classes.toolBar}>
          {listNav.map((data, index) => (
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
          ))}
        </Toolbar>
      </Box>
    </>
  );
}
