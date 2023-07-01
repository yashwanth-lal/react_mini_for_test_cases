import {Component} from 'react'
import {HiOutlineSearch} from 'react-icons/hi'
import {Link} from 'react-router-dom'
import './index.css'

class Header extends Component {
  state = {text: '', hidden: true}

  toggleNavItems = () => {
    this.setState(prevState => ({
      hidden: !prevState.hidden,
    }))
  }

  inputChange = e => {
    this.setState({text: e.target.value})
  }

  func = () => {
    const {sampleFunc} = this.props
    const {text} = this.state
    if (text !== '') {
      sampleFunc(text)
    }
  }

  render() {
    const {searchRoute} = this.props

    const {hidden, text} = this.state
    const borderClass = searchRoute ? '_inputSearchIconDivMobile' : ''
    return (
      <nav className="NavDiv">
        <div className="headerOuterDivDesktop">
          <div className="logoLinkDiv">
            <Link to="/" style={{textDecoration: 'none'}}>
              <img
                alt="website logo"
                src="https://res.cloudinary.com/yash9676/image/upload/v1686221353/moviesAppMiniProjectCCBP/Group_7399MoviesLogo_zupf50.png"
                className="appLogoHeader"
              />
            </Link>
            <ul className="header1Ul">
              <Link style={{textDecoration: 'none'}} to="/">
                <li className="headerHomePara">Home</li>
              </Link>
              <Link style={{textDecoration: 'none'}} to="/popular">
                <li className="headerPopularPara">Popular</li>
              </Link>
            </ul>
          </div>
          <div className="accountSearchDiv">
            <div className={borderClass}>
              {searchRoute && (
                <input
                  value={text}
                  onChange={this.inputChange}
                  type="search"
                  className="_inputElMobile"
                />
              )}
              <Link to="/search">
                <button
                  onClick={this.func}
                  testid="searchButton"
                  type="button"
                  className="_searchBtnMobile"
                >
                  <HiOutlineSearch className="_searchIconMobile" />
                </button>
              </Link>
            </div>

            <Link to="/account">
              <img
                alt="profile"
                className="avatarImg"
                src="https://res.cloudinary.com/yash9676/image/upload/v1686304849/moviesAppMiniProjectCCBP/Avatar_v8weae.png"
              />
            </Link>
            <img
              alt="navIcon"
              src="https://res.cloudinary.com/yash9676/image/upload/v1687001605/moviesAppMiniProjectCCBP/add-to-queue_1_n6qfom.png"
              className="navIconMobile"
              onClick={this.toggleNavItems}
            />
          </div>
        </div>
        <nav className="headerLogoLinkDivMobile">
          {!hidden && (
            <ul className="header1UlMobile">
              <Link style={{textDecoration: 'none', color: 'white'}} to="/">
                <li className="headerHomeParaMobile">Home</li>
              </Link>
              <Link style={{textDecoration: 'none'}} to="/popular">
                <li className="headerPopularParaMobile">Popular</li>
              </Link>
              <Link style={{textDecoration: 'none'}} to="/account">
                <li className="headerPopularParaMobile">Account</li>
              </Link>
              <img
                className="closeCircleMobile"
                src="https://res.cloudinary.com/yash9676/image/upload/v1687002932/moviesAppMiniProjectCCBP/Shape_rpt4nh.png"
                alt="close icon"
                onClick={this.toggleNavItems}
              />
            </ul>
          )}
        </nav>
      </nav>
    )
  }
}
export default Header
