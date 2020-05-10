import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

function Layout({ children }) {
  return (
    <Grid container direction="column">
      <Grid item container>
        <Grid item xs={2} lg={3} />
        <Grid item xs={8} lg={6}>
          {children}
        </Grid>
        <Grid item xs={2} lg={3} />
      </Grid>
    </Grid>
  );
}

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;
