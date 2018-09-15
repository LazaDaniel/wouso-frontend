import React from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  ListItemSecondaryAction,
  Typography,
  Paper
} from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
  paper: {
    width: 800,
    padding: '48px 40px 36px'
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

class CreateQuiz extends React.Component {
  state = {
    query: ''
  }

  renderQuestion (question) {
    const { id, text } = question
    return (
      <ListItem key={id} role={undefined} button>
        <ListItemText primary={text} />
        <ListItemSecondaryAction>
          <Checkbox
            // checked={this.props.quizQuestions.includes(id)}
            onClick={() => this.handleTick(id)}
          />
        </ListItemSecondaryAction>
      </ListItem>
    )
  }

  handleQuery (event) {
    this.setState({ query: event.target.value.toLowerCase() })
  }

  handleTick (questionId) {
    this.props.tickQuestion(questionId)
  }

  normalizeDate = date => {
    return date.toISOString()
  }

  render () {
    const { classes } = this.props
    return (
      <Paper className={classes.paper}>
        <Typography variant='title'>Creează un quiz nou</Typography>
        <Typography variant='subheading'>
          Alege din întrebările deja create sau creează una nouă
        </Typography>

        {/*      <form
          onSubmit={this.props.handleSubmit(this.props.onSubmit)}
          style={{
            paddingLeft: '10px',
            paddingRight: '10px'
          }}
        >
          <Field
            name='quizName'
            component={TextField}
            label='Quiz Name'
            placeholder='i.e. [SO] Lab. 3'
            style={{
              display: 'flex'
            }}
          />
          </form> */}

        {/* Pickers for quiz start & end times */}
        {/* } <link
        //   rel='stylesheet'
        //   href='https://fonts.googleapis.com/icon?family=Material+Icons'
        // />
        // <form>
        //   <div
        //     style={{
        //       display: 'flex',
        //       flexDirection: 'row',
        //       paddingLeft: '10px',
        //       paddingRight: '10px'
        //     }}
        //   >

        //     <Field
        //       name='quizStart'
        //       component={WrappedDateTimePicker}
        //       label='Start time'
        //       style={{
        //         flex: 0.5,
        //         paddingRight: 5
        //       }}
        //       normalize={this.normalizeDate}
        //     />

        //     <Field
        //       name='quizEnd'
        //       component={WrappedDateTimePicker}
        //       label='End time'
        //       style={{
        //         flex: 0.5,
        //         paddingLeft: 5
        //       }}
        //       normalize={this.normalizeDate}
        //     />
        //   </div>
          // </form> */}

        <form
        // style={{
        //   paddingLeft: '10px',
        //   paddingRight: '10px'
        // }}
        >
          <TextField
            id='filterQuestions'
            label='Filtrează întrebările'
            placeholder='i.e. kernel'
            style={{ display: 'flex' }}
            value={this.state.query}
            onChange={event => this.handleQuery(event)}
          />
        </form>

        <List>
          {/* <Divider /> */}
          {this.state.query
            ? this.props.questions
                .filter(q => q.text.toLowerCase().includes(this.state.query))
                .map(question => this.renderQuestion(question))
            : this.props.questions.map(question =>
                this.renderQuestion(question)
              )}
        </List>

        {/* <Button
          variant='contained'
          color='primary'
          component={Link}
          to={`/question/new`}
        >
          Add Question
        </Button> */}
        {/* <Button
          variant='contained'
          color='secondary'
          onClick={this.props.untickAll}
        >
          Uncheck all
        </Button> */}
        <div className={classes.actions}>
          <Button
            variant='contained'
            color='secondary'
            component={Link}
            to={`/quizadmin`}
          >
            Anulare
          </Button>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.button}
          >
            Creează quiz
          </Button>
        </div>
      </Paper>
    )
  }
}

export default withStyles(styles)(CreateQuiz)
