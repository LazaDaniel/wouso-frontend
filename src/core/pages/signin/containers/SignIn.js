import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { parse } from 'querystring'

import { withStyles } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'

import SignInForm from '../components/SignInForm'
import { signIn } from '../actions'
import { isUserAuthenticated } from '../reducers/user'

const styles = theme => ({
  paper: {
    [theme.breakpoints.up('sm')]: {
      width: 400,
      padding: '48px 40px 36px'
    },
    padding: 2 * theme.spacing.unit
  }
})

const Form = reduxForm({ form: 'signIn' })(SignInForm)

class SignIn extends Component {
  handleSubmit = ({ username, password }) =>
    this.props.signIn(username, password)

  renderRedirect () {
    const { location: { search } } = this.props
    const { from } = parse(search.substr(1))

    return <Redirect to={from || '/'} />
  }

  render () {
    const { classes, authenticated } = this.props

    if (authenticated) {
      return this.renderRedirect()
    }

    return (
      <Paper className={classes.paper}>
        <Form onSubmit={this.handleSubmit} />
      </Paper>
    )
  }
}

export default connect(
  state => ({ authenticated: isUserAuthenticated(state) }),
  { signIn }
)(withStyles(styles)(SignIn))
