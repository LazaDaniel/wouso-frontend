import React from 'react'

import { withStyles, withWidth } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'

const styles = theme => ({
  drawerPaper: { width: theme.custom.drawer.width },
  toolbar: theme.mixins.toolbar
})

const Sidebar = ({ classes, children, width, open, onClose }) => (
  <Drawer
    classes={{ paper: classes.drawerPaper }}
    anchor='left'
    variant={width !== 'xs' ? 'permanent' : undefined}
    open={open}
    onClose={onClose}
  >
    {width !== 'xs' && <div className={classes.toolbar} />}
    {children}
  </Drawer>
)

export default withStyles(styles)(withWidth()(Sidebar))
