import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, withRouter } from 'react-router-dom'

import { MuiThemeProvider } from '@material-ui/core/styles'

import store from '../store'
import theme from '../theme'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Content from '../components/Content'
import Footer from '../components/Footer'
import Copyright from '../components/Copyright'
import SessionChecker from '../containers/SessionChecker'
import ContentSwitch from '../components/ContentSwitch'
import ContentPadding from '../components/ContentPadding'
import LoadingOverlayComponent from 'shared/containers/LoadingOverlay'
import Orchestrator from '../containers/Orchestrator'

/* LoadingOverlayComponent is connected to redux and blocks route updates. See
 * https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/redux.md
 * for more details.
 */
const LoadingOverlay = withRouter(LoadingOverlayComponent)

class Orchestrated extends React.Component {
  state = {
    drawerOpen: false
  }

  handleMenuClicked = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen })
  }

  handleDrawerClose = () => this.setState({ drawerOpen: false })

  render () {
    const { navigation, routes, title } = this.props
    return (
      <React.Fragment>
        <Sidebar open={this.state.drawerOpen} onClose={this.handleDrawerClose}>
          {navigation}
        </Sidebar>
        <Header title={title} onMenuClicked={this.handleMenuClicked} />
        <ContentPadding>
          <LoadingOverlay delay={1000}>
            <Content>
              <SessionChecker>
                <ContentSwitch routes={routes} />
              </SessionChecker>
            </Content>
          </LoadingOverlay>
        </ContentPadding>
        <Footer>
          <Copyright />
        </Footer>
      </React.Fragment>
    )
  }
}

class App extends React.Component {
  state = {
    drawerOpen: false
  }

  handleMenuClicked = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen })
  }

  handleDrawerClose = () => this.setState({ drawerOpen: false })

  renderContent = ({ navigation, routes, title }) => {
    return (
      <React.Fragment>
        <Sidebar open={this.state.drawerOpen} onClose={this.handleDrawerClose}>
          {navigation}
        </Sidebar>
        <Header
          title={`Rendered ${this.state.drawerOpen}`}
          onMenuClicked={this.handleMenuClicked}
        />
        <ContentPadding>
          <LoadingOverlay delay={1000}>
            <Content>
              <SessionChecker>
                <ContentSwitch routes={routes} />
              </SessionChecker>
            </Content>
          </LoadingOverlay>
        </ContentPadding>
        <Footer>
          <Copyright />
        </Footer>
      </React.Fragment>
    )
  }

  render () {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <Orchestrator component={Orchestrated} />
          </BrowserRouter>
        </Provider>
      </MuiThemeProvider>
    )
  }
}

export default App
