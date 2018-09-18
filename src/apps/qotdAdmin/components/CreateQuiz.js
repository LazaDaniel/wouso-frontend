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
import TextField from '@material-ui/core/TextField'
import { Field, FieldArray } from 'redux-form'
import WrappedTextField from 'shared/reduxForm/components/TextField'
import WrappedDateTimePicker from './WrappedDateTimePicker'
import { required } from 'utils/validators'

import { withStyles } from '@material-ui/core'

const styles = theme => ({
  paper: {
    width: 800,
    height: 640,
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
          if (!fields.getAll() || !fields.getAll().some(e => e.id === id)) {
            fields.push({ id, text })
          }
        }}
      >
        <ListItemText primary={text} />
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

  renderFieldArray = ({ fields }) => (
    <React.Fragment>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flexBasis: '66.66%' }}>
          <List style={{ height: 334, overflow: 'auto' }}>
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
            style={{ textAlign: 'center' }}
            color='primary'
          >
            {fields.length} întrebări selectate:
          </Typography>
          <List dense style={{ height: 318, overflow: 'auto' }}>
            {fields.map((question, index) =>
              this.renderSelected(question, fields, index)
            )}
          </List>

        </div>
      </div>
      <div className={this.props.classes.actions}>
        <Button
          variant='contained'
          color='secondary'
          component={Link}
          to={'/quizadmin'}
        >
          Anulare
        </Button>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          disabled={fields.length === 0}
          className={this.props.classes.button}
        >
          {fields.length > 0 ? 'Creează quiz' : 'Alege întrebări'}
        </Button>
      </div>
    </React.Fragment>
  )

  validateFieldArray = (value, allValues, props) => {
    return !value || value.length === 0
      ? 'Un quiz trebuie să conțină cel puțin o întrebare!'
      : undefined
  }

  render () {
    const { classes, handleSubmit, onSubmit } = this.props
    return (
      <Paper className={classes.paper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant='title'>Creează un quiz nou</Typography>
          <Typography variant='subheading'>
            Alege intrebările quiz-ului din lista de mai jos. Poți folosi mecanismul de filtrare.
          </Typography>

          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Field
              name='name'
              component={WrappedTextField}
              label='Nume quiz'
              validate={required}
              style={{
                display: 'flex',
                flexBasis: '50%',
                paddingRight: '4px'
              }}
            />
            {/* Should be auto generated at some point in the future */}
            <Field
              name='secret'
              component={WrappedTextField}
              label='Cod secret'
              validate={required}
              style={{
                display: 'flex',
                flexBasis: '50%',
                paddingLeft: '4px'
              }}
            />
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'row', paddingTop: '8px' }}
          >
            <Field
              name='start'
              component={WrappedDateTimePicker}
              label='Început'
              style={{
                display: 'flex',
                flexBasis: '50%',
                paddingRight: '4px'
              }}
              validate={required}
            />
            <Field
              name='end'
              component={WrappedDateTimePicker}
              label='Sfârșit'
              style={{
                display: 'flex',
                flexBasis: '50%',
                paddingLeft: '4px'
              }}
              validate={required}
            />
          </div>
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
            validate={this.validateFieldArray}
          />
        </form>
      </Paper>
    )
  }
}

export default withStyles(styles)(CreateQuiz)
