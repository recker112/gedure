import React from "react";

import {
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

export default function SingleBox({
  icon,
  title,
  loading,
  data,
  colorTPrimary,
  textPrimaryFormat,
  textSecondary,
  extraInfo,
}) {
  return (
    <Paper className="paper--padding" elevation={3}>
      <Grid container rowSpacing={2}>
        <Grid item xs={12}>
          <Stack alignItems="center" direction="row" spacing={2}>
            {icon}
            <Typography variant="h6" className="text__bold--semi">
              {title}
            </Typography>
          </Stack>
        </Grid>
        {extraInfo && (
          <Grid item xs={12}>
            {extraInfo}
          </Grid>
        )}
        {loading && (
          <Grid textAlign="center" item xs={12}>
            <CircularProgress />
          </Grid>
        )}
        {!data && !loading && (
          <Grid container justifyContent="center" item xs={12}>
            <Typography>No hay nada que mostrar.</Typography>
          </Grid>
        )}
        {data && !loading && (
          <Grid container justifyContent="center" item xs={12}>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ color: colorTPrimary }}>
                {textPrimaryFormat(data.textPrimary)}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {data.textSecondary ? data.textSecondary : textSecondary}
              </Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
}
