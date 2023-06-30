import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import AccountContext from '../../context/AccountContext'

import './index.css'

class LoginPage extends Component {
  state = {errorMessage: ''}

  render() {
    if (Cookies.get('jwt_token')) {
      return <Redirect to="/" />
    }
    const {errorMessage} = this.state
    return (
      <AccountContext.Consumer>
        {value => {
          const {userName, password, setUserName, setPassword} = value
          const userNameSet = e => {
            setUserName(e.target.value)
          }

          const passwordSet = e => {
            setPassword(e.target.value)
          }

          const submitLogin = async e => {
            e.preventDefault()
            console.log('userName, password')

            const userDetails = {username: userName, password}
            console.log(userDetails)

            const url = 'https://apis.ccbp.in/login'
            const options = {
              method: 'POST',

              body: JSON.stringify(userDetails),
            }
            const response = await fetch(url, options)
            console.log(response)
            if (response.ok === true) {
              const data = await response.json()

              Cookies.set('jwt_token', data.jwt_token, {expires: 30})

              const {history} = this.props
              history.replace('/')
            } else {
              const wrongCredentialData = await response.json()

              const errorMsg = wrongCredentialData.error_msg

              this.setState({errorMessage: errorMsg})
            }
          }

          return (
            <div className="loginPageBackgroundOuter">
              <img
                alt="login website logo"
                src="https://res.cloudinary.com/yash9676/image/upload/v1686221353/moviesAppMiniProjectCCBP/Group_7399MoviesLogo_zupf50.png"
                className="appLogo"
              />
              <div className="loginFormOuter">
                <div className="loginFormDiv">
                  <h1 className="loginHeading">Login</h1>

                  <form onSubmit={submitLogin} className="loginFormEl">
                    <label
                      className="loginUsernameLabelEl"
                      htmlFor="usernameEl"
                    >
                      USERNAME
                    </label>
                    <input
                      value={userName}
                      onChange={userNameSet}
                      id="usernameEl"
                      type="text"
                      className="loginUserNameInputEl"
                      autoComplete="true"
                    />
                    <label
                      className="loginPasswordLabelEl"
                      htmlFor="passwordEl"
                    >
                      PASSWORD
                    </label>
                    <input
                      value={password}
                      onChange={passwordSet}
                      id="passwordEl"
                      type="password"
                      className="loginPasswordInputEl"
                      autoComplete="true"
                    />
                    <p className="loginErrorMessageEl">{errorMessage}</p>
                    <button type="submit" className="loginBtnEl">
                      Login
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )
        }}
      </AccountContext.Consumer>
    )
  }
}

export default LoginPage
