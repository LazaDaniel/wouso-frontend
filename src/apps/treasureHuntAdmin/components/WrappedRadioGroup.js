import RadioGroup from '@material-ui/core/RadioGroup'

import React from 'react'

import { withStyles } from '@material-ui/core'

const styles = theme => ({
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
})

const WrappedRadioGroup = ({ classes, input, ...rest }) => {
  return (
    <RadioGroup
      {...input}
      {...rest}
      className={classes.group}
      value={input.value}
      onChange={(e, value) => input.onChange(value)}
    />
  )
}

export default withStyles(styles)(WrappedRadioGroup)
