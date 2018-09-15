import React from 'react'

import { withStyles } from '@material-ui/core'

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  container: {
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.custom.drawer.width
    }
  }
})

const ContentPadding = ({ classes, children }) => (
  <div className={classes.container}>
    {' '}<div className={classes.toolbar} />{children}
  </div>
)

export default withStyles(styles)(ContentPadding)
