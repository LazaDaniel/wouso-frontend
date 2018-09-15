import React from 'react'
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from '@material-ui/core'
import AssignmentIcon from '@material-ui/icons/Assignment'

import { withStyles } from '@material-ui/core'

const styles = theme => ({
  paper: {
    [theme.breakpoints.up('sm')]: {
      padding: '48px 40px 36px',
      width: 400
    },
    padding: theme.spacing.unit * 2
  },
  actions: {
    paddingTop: 3 * theme.spacing.unit,
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginLeft: '10px'
  }
})

const renderQuest = quest => (
  <ListItem key={quest.id} button component={Link} to={`solve/${quest.id}`}>
    <ListItemAvatar>
      <Avatar>
        <AssignmentIcon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary={quest.name} />
  </ListItem>
)

const Dashboard = ({ classes, quests }) => {
  return (
    <Paper className={classes.paper}>
      <Typography variant='title'>Quest-uri disponibile</Typography>
      <Typography variant='subheading'>
        Alege să răspunzi la unul dintre quest-urile de mai jos.
      </Typography>
      <List>{quests.map(quest => renderQuest(quest))}</List>

    </Paper>
  )
}

export default withStyles(styles)(Dashboard)
