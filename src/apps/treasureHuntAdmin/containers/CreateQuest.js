import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import * as manifest from '../manifest'
import { selectAppData } from 'core/app/reducers'

import CreateQuestComponent from '../components/CreateQuest'
import { getQuestions, postQuest } from '../actions'

import { reduxForm } from 'redux-form'

const CreateQuestForm = reduxForm({ form: 'treasure-hunt/CreateQuest' })(
  CreateQuestComponent
)

class CreateQuest extends React.Component {
  state = { noQuestions: true }

  componentDidMount () {
    this.props.getQuestions()
  }

  onSubmit = quest => {
    if (!quest.questions || quest.questions.length === 0) {
      // console.log('No question selected!')
      return null
    }
    this.props
      .postQuest(quest)
      .then(this.props.history.push('dashboard'))
      .catch(console.err)
  }

  render () {
    return (
      <CreateQuestForm
        questions={this.props.questions}
        onSubmit={this.onSubmit}
      />
    )
  }
}

const selector = createSelector(selectAppData(manifest), ({ questions }) => ({
  questions
}))

export default connect(selector, { getQuestions, postQuest })(CreateQuest)
