import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header/index'
import Footer from '../Footer/index'
import AccountContext from '../../context/AccountContext'

import './index.css'

class AccountPage extends Component {
  logoutFunc = () => {
    const {history} = this.props

    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <AccountContext.Consumer>
        {value => {
          const {userName, password} = value

          return (
            <div className="accountPageOuter">
              <Header />
              <div className="overAll">
                <div className="accountDetailsDiv">
                  <h1 className="accountHeading">Account</h1>
                  <hr className="horLine" />
                  <div className="memberShipDiv">
                    <p className="memberShipPara">Member ship</p>
                    <div className="memberShipDetailsDiv">
                      <p className="memberShipUserPara">{userName}@gmail.com</p>
                      <div className="passDiv">
                        <p className="memberShipPassword">
                          Password : {'*'.repeat(password.length)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <hr className="horLine" />
                  <div className="planDetailsDiv">
                    <p className="planDetailsPara">Plan details</p>
                    <div className="planDetailsDiv2">
                      <p className="premiumPara">Premium</p>
                      <p className="ultraHdPara">Ultra HD</p>
                    </div>
                  </div>
                  <hr className="horLine" />
                  <div className="btnDiv">
                    <button
                      onClick={this.logoutFunc}
                      type="button"
                      className="logoutBtn"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
              <Footer />
            </div>
          )
        }}
      </AccountContext.Consumer>
    )
  }
}
export default AccountPage
