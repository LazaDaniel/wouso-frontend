import React from 'react'

import { withStyles, withWidth, IconButton } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  }
})

const Header = ({ classes, title, width, onMenuClicked }) => (
  <AppBar className={classes.appBar}>
    <Toolbar>
      {width === 'xs' &&
        <IconButton
          color='inherit'
          aria-label='Open drawer'
          onClick={onMenuClicked}
        >
          <MenuIcon />
        </IconButton>}
      <Typography variant='title' color='inherit'>
        {title}
      </Typography>
    </Toolbar>
  </AppBar>
)

export default withStyles(styles)(withWidth()(Header))
