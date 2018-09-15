import React from 'react'
import classNames from 'classnames'
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core'
import groupBy from 'lodash/groupBy'

import { withStyles } from '@material-ui/core'

const styles = theme => ({
  paper: {
    [theme.breakpoints.up('sm')]: {
      padding: '48px 40px 36px',
      width: 400
    },
    padding: theme.spacing.unit * 2
  },
  block: {
    display: 'block'
  },
  padded: {
    paddingLeft: theme.spacing.unit
  }
})

const userIdToName = {
  '11': 'team1',
  '25': 'team10',
  '24': 'team11',
  '26': 'team12',
  '27': 'team13',
  '12': 'team2',
  '10': 'team3',
  '9': 'team4',
  '13': 'team5',
  '14': 'team6',
  '20': 'team7',
  '22': 'team8',
  '23': 'team9'
}

const renderUserRecords = (userRecords, classes) => {
  const userId = userRecords[0].userId

  return (
    <ListItem key={userId}>
      <ListItemText
        primary={`Utilizatorul ${userIdToName[userId.toString()] || userId}`}
        secondary={
          <span className={classes.block}>
            <span className={classes.block}>
              Răspunsuri corecte:
              {' '}
              {userRecords.map(rec => rec.grade).reduce((a, b) => a + b)}
            </span>
            <span>
              Progres:
              {userRecords.map(record => {
                const { question, grade, thSession: { name } } = record

                return (
                  <span
                    className={classNames(classes.padded, classes.block)}
                    key={name}
                    style={{ paddingLeft: 8 }}
                  >
                    {name}: Întrebarea {question} ({grade} corecte)
                  </span>
                )
              })}

            </span>
          </span>
        }
      />
    </ListItem>
  )
}

const Gradebook = ({ classes, gradebook }) => (
  <Paper className={classes.paper}>
    <List>
      <ListItem>
        <Typography variant='title'>Rezultate</Typography>
      </ListItem>
      {Object.values(groupBy(gradebook, item => item.userId)).map(recs =>
        renderUserRecords(recs, classes)
      )}
    </List>
  </Paper>
)

export default withStyles(styles)(Gradebook)
