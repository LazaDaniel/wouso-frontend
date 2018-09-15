import React from 'react'

import { withStyles } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'

const styles = theme => ({
  container: {
    height: theme.custom.footer.height
  },
  content: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.custom.drawer.width,
      width: `calc(100% - ${theme.custom.drawer.width}px)`
    },
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  }
})

const Footer = ({ classes, children }) => (
  <div className={classes.container}>
    <Divider />
    <div className={classes.content}>
      {children}
    </div>
  </div>
)

export default withStyles(styles)(Footer)
