import React, { useState } from "react";

// MUI
import {
  Box,
  Container,
  Fade,
  Grid,
  Slide,
} from "@mui/material";

// Components
import { BoxFAQ } from "./BoxFAQ";

// // SNOW
// import Snowfall from 'react-snowfall';

// Redux
import { useSelector } from "react-redux";
import { TabsFAQ } from "./TabsFAQ";

const classes = {
  container: {
    flexGrow: 1,
  },
  header: (theme) => ({
    background: theme.palette.primary.main,
    height: 300,
    borderRadius: "0px 0px 15px 15px",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  }),
  content: {
    position: "relative",
    top: 20,
    zIndex: 10,
    pb: 4,
  },
  // snow: {
  //   position: 'absolute',
  //   height: 1/1,
  //   width: 1/1,
  // }
};

/**
 * Encabezado de la page
 * @returns JSX.Element
 */
function Header() {
  return (
    <Container sx={{ height: "100%", position: "relative", zIndex: 10 }}>
      <Grid
        container
        justifyContent="flex-start"
        alignItems="center"
        sx={{ height: "100%" }}
      >
        <Grid item xs>
          <Box
            color="primary.contrastText"
            fontSize={{
              xs: "h5.fontSize",
              sm: "h4.fontSize",
              md: "h3.fontSize",
            }}
            className="text__bold--semi"
          >
            <Box color="secondary.main" component="span">
              Preguntas
            </Box>{" "}
            frecuentes,
          </Box>
          <Box
            color="primary.contrastText"
            fontSize={{ xs: "h6.fontSize", sm: "h5.fontSize" }}
            className="text__bold--semi"
          >
            resuelva sus dudas sobre{" "}
            <Box color="secondary.main" component="span">
              Gedure
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default function FAQ() {
  const [value, setValue] = useState('all');

  const { count_notify } = useSelector((state) => ({
    count_notify: state.auth.notify.count,
  }));

  /**
   * Title
   */
  document.title =
    count_notify > 0
      ? `(${count_notify}) Preguntas Frecuentes - La Candelaria`
      : "Preguntas Frecuentes - La Candelaria";

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box component="main" sx={classes.container}>
      <Slide
        direction="down"
        in={true}
        timeout={1000}
        mountOnEnter
        unmountOnExit
      >
        <Box sx={classes.header}>
          {/* <Box sx={classes.snow}>
            <Snowfall
              snowflakeCount={40}
            />
          </Box> */}
          <Header />
          <TabsFAQ
            value={value}
            handleChange={handleChange}
          />
        </Box>
      </Slide>
      <Fade in={true} style={{ transitionDelay: "1000ms" }}>
        <Container sx={classes.content}>
          <BoxFAQ value={value} />
        </Container>
      </Fade>
    </Box>
  );
}

