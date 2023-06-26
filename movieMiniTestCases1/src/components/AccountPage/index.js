import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header/index'
import Footer from '../Footer/index'
import './index.css'

class AccountPage extends Component {
  logoutFunc = () => {
    const {history} = this.props

    Cookies.remove('jwt_token')
    Cookies.remove('my_username')
    Cookies.remove('my_password')
    history.replace('/login')
  }

  render() {
    const username = Cookies.get('my_username')
    const password = Cookies.get('my_password')
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
                <p className="memberShipUserPara">{username}@gmail.com</p>
                <div className="passDiv">
                  <p className="memberShipPassword">Password</p>
                  <p className="hiddenPass"> : {'*'.repeat(password.length)}</p>
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
  }
}
export default AccountPage
