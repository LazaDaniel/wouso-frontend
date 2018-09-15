import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import * as manifest from '../manifest'
import { selectAppData } from 'core/app/reducers'

import AddQuestionComponent from '../components/AddQuestion'
import { postQuestion } from '../actions'

import { reduxForm } from 'redux-form'

const AddQuestionForm = reduxForm({ form: 'trasure-hunt/AddQuestion' })(
  AddQuestionComponent
)

class AddQuestion extends React.Component {
  onSubmit = ({ text, valid, invalidOne, invalidTwo, invalidThree }) => {
    this.props
      .postQuestion({
        text,
        answers: { valid, invalid: [invalidOne, invalidTwo, invalidThree] }
      })
      .then(() => this.props.history.push('treasure-hunt/dashboard'))
      .catch(console.err)
  }

  render () {
    return <AddQuestionForm onSubmit={this.onSubmit} />
  }
}

const selector = createSelector(selectAppData(manifest), () => ({}))

export default connect(selector, { postQuestion })(AddQuestion)
