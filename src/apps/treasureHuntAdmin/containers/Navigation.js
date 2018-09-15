import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'

import { selectOrchestration } from 'core/app/reducers'
import { selectApps } from 'core/app/reducers/orchestrationReducer'

class Navigation extends React.Component {
  getNavigation () {
    return this.props.apps.map(app => ({ title: app, path: app }))
  }

  render () {
    const routes = this.props.user && this.props.user.username === 'admin'
      ? [
          { title: 'Dashboard', path: 'dashboard' },
          { title: 'Create Quest', path: 'quest' },
          { title: 'Add question', path: 'question' },
          { title: 'Gradebook', path: 'gradebook' }
      ]
      : [{ title: 'Dashboard', path: 'dashboard' }]

    return this.props.render(routes)
  }
}

const selector = createSelector(selectOrchestration, selectApps, apps => ({
  apps
}))

export default connect(state => ({
  apps: selector(state),
  user: state.user
}))(Navigation)
