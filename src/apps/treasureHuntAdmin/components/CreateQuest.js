import React from 'react'
import { Link } from 'react-router-dom'
import {
  Button,
  List,
  Typography,
  Paper,
  ListItem,
  ListItemText
} from '@material-ui/core'

import { Field, FieldArray } from 'redux-form'
import TextField from '@material-ui/core/TextField'
import WrappedTextField from 'shared/reduxForm/components/TextField'
import { required } from 'utils/validators'

import { withStyles } from '@material-ui/core'

const styles = theme => ({
  paper: {
    width: 800,
    height: 600,
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

  handleQuery (event) {
    this.setState({ query: event.target.value.toLowerCase() })
  }

  renderField = (question, fields) => {
    const { id, text, answers } = question
    return (
      <ListItem
        key={id}
        button
        onClick={() => {
          // console.log(fields.getAll())
          if (!fields.getAll() || !fields.getAll().some(e => e.id === id)) {
            fields.push({ id, text })
          }
        }}
      >
        <ListItemText
          primary={text}
          secondary={`corect: ${answers.valid}; greșit: ${answers.invalid}`}
        />
      </ListItem>
    )
  }

  renderSelected = (question, fields, index) => {
    const { id, text } = fields.get(index)
    return (
      <ListItem key={id} button onClick={() => fields.remove(index)}>
        <ListItemText primary={`${index + 1}. ${text}`} />
      </ListItem>
    )
  }

  renderFieldArray = ({ fields, meta: { touched, error } }) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flexBasis: '66.66%' }}>
          <List style={{ maxHeight: 370, overflow: 'auto' }}>
            {this.state.query
              ? this.props.questions
                  .filter(q => q.text.toLowerCase().includes(this.state.query))
                  .map(question => this.renderField(question, fields))
              : this.props.questions.map(question =>
                  this.renderField(question, fields)
                )}
          </List>
        </div>
        <div style={{ flexBasis: '33.33%' }}>
          <Typography
            variant='subheading'
            style={{ paddingTop: '18px', textAlign: 'center' }}
          >
            Întrebări selectate (afișate jucătorului în această ordine):
          </Typography>
          <List dense style={{ maxHeight: 310, overflow: 'auto' }}>
            {fields.map((question, index) =>
              this.renderSelected(question, fields, index)
            )}
          </List>
        </div>
      </div>
    )
  }

  render () {
    const { classes, handleSubmit, onSubmit, noQuestions } = this.props
    return (
      <Paper className={classes.paper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant='title'>Creează un quest nou</Typography>
          <Typography variant='subheading'>
            Alege 10 intrebări din lista de mai jos. Poți folosi mecanismul de filtrare.
          </Typography>

          <Field
            name='name'
            component={WrappedTextField}
            label='Nume quest'
            validate={required}
            style={{
              display: 'flex'
            }}
          />
          <TextField
            id='filterQuestions'
            label='Filtrează întrebările'
            placeholder='i.e. kernel'
            value={this.state.query}
            onChange={event => this.handleQuery(event)}
            style={{ display: 'flex' }}
          />
          <FieldArray
            name='questions'
            component={this.renderFieldArray.bind(this)}
          />

          <div className={classes.actions}>
            <Button
              variant='contained'
              color='secondary'
              component={Link}
              to={'/treasure-admin/dashboard'}
            >
              Anulare
            </Button>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              disabled={noQuestions}
              className={classes.button}
            >
              Creează quest
            </Button>
          </div>
        </form>
      </Paper>
    )
  }
}

export default withStyles(styles)(CreateQuiz)
