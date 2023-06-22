import {Component} from 'react'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

class Footer extends Component {
  render() {
    return (
      <div className="footerOuter">
        <div className="footerIconsDiv">
          <FaGoogle />
          <FaTwitter />
          <FaInstagram />
          <FaYoutube />
        </div>
        <p className="contactUsPara">Contact us</p>
      </div>
    )
  }
}
export default Footer
