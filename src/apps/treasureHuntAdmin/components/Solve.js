import React from 'react'
import { Field } from 'redux-form'
import { Link } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'
import { FormControl, FormControlLabel, Radio } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import WrappedRadioGroup from './WrappedRadioGroup'

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

const Solve = ({ classes, active, handleSubmit, onSubmit }) => {
  // console.log(active)
  const { answers, text: questionText } = active.question
  return (
    <Paper className={classes.paper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant='subheading'>
          Rezolvi quest-ul: {active.name}
        </Typography>
        <Typography variant='title'>
          {questionText}
        </Typography>
        <FormControl component='fieldset' className={classes.formControl}>
          <Field name='answer' component={WrappedRadioGroup}>
            <FormControlLabel
              value={answers[0]}
              control={<Radio />}
              label={answers[0]}
            />
            <FormControlLabel
              value={answers[1]}
              control={<Radio />}
              label={answers[1]}
            />
            <FormControlLabel
              value={answers[2]}
              control={<Radio />}
              label={answers[2]}
            />
            <FormControlLabel
              value={answers[3]}
              control={<Radio />}
              label={answers[3]}
            />
          </Field>
        </FormControl>
        <div className={classes.actions}>
          <Button
            variant='contained'
            color='secondary'
            component={Link}
            to={'/treasure-hunt/dashboard'}
          >
            Anulare
          </Button>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.button}
          >
            Răspunde
          </Button>
        </div>
      </form>
    </Paper>
  )
}

export default withStyles(styles)(Solve)
