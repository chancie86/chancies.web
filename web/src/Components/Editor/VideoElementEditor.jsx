import React from "react";
import PropTypes from "prop-types";

import ResponsiveEmbed from 'react-responsive-embed';

import { Grid } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';

export default function VideoElementEditor({
  onChange,
  value
}) {

  return (
    <Grid container direction="column">
      <TextField id="Url" label="Embed Url" value={value} onChange={(event) => onChange(event.target.value)} fullWidth style={{ marginBottom: '0.5em' }} />
      <ResponsiveEmbed src={value} allowFullScreen />
    </Grid>
  );
};

VideoElementEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
