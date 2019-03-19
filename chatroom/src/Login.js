import React, { Component } from "react";
import "./Login.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKhanda } from "@fortawesome/free-solid-svg-icons";
import { faShieldAlt } from "@fortawesome/free-solid-svg-icons";
library.add(faKhanda);
library.add(faShieldAlt);
class Login extends Component {
  state = {
    appUserId: null
  };
  moveToChatShield = () => {
    this.props.history.push("/chatroom/user/2");
  };
  moveToChatSword = () => {
    this.props.history.push("/chatroom/user/1");
  };

  render() {
    return (
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <form>
            <div>
              <img
                src="https://www.mcvuk.com/.image/t_share/MTUzMDY4NzA2MTQ3MzQ2MDQw/ignjpg.jpg"
                alt="ign logo"
                height="70"
                width="150"
              />
            </div>
            <div className=" title fadeIn first">
              Welcome to the IGN Chatroom <br />
              <div className="spacing">Are you Sword or Shield?</div>
            </div>

            <div>
              <button
                type="button"
                className="swordButton fadeIn fourth"
                onClick={this.moveToChatSword}
              >
                Sword <FontAwesomeIcon icon="khanda" />
              </button>
              <button
                type="button"
                className="shieldButton fadeIn fourth"
                onClick={this.moveToChatShield}
              >
                Shield <FontAwesomeIcon icon="shield-alt" />
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default Login;
