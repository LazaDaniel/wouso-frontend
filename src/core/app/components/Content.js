import React from 'react'

import { withStyles } from '@material-ui/core'

const styles = theme => {
  return {
    content: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing.unit,
      minHeight: `calc(100vh - 64px - ${theme.custom.footer.height}px - 2 * ${theme.spacing.unit}px)`,
      [theme.breakpoints.down('sm')]: {
        alignItems: 'stretch'
      }
    }
  }
}

const Content = ({ classes, children }) => (
  <div className={classes.content}>
    {children}
  </div>
)

export default withStyles(styles)(Content)
