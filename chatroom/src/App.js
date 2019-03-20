import React, { Component } from "react";
import io from "socket.io-client";
import "./App.css";
import { GetAllMessages, InsertMessage } from "./services/app.services";
import moment from "moment";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import { faKhanda } from "@fortawesome/free-solid-svg-icons";
import { faShieldAlt } from "@fortawesome/free-solid-svg-icons";
library.add(faRocket);
library.add(faKhanda);
library.add(faShieldAlt);
class App extends Component {
  state = {
    appUserId: null,
    messages: [],
    messageForm: "",
    message: "",
    value: [],
    alreadyScrolled: false
  };
  componentDidMount() {
    this.getMessages();
    const id = parseInt(this.props.match.params.appUserId);
    this.setState({ appUserId: id });
  }
  onChange = e => {
    e.preventDefault();
    this.setState({
      message: e.target.value
    });
  };
  constructor(props) {
    super(props);
    this.socket = io(window.location.host, {
      transports: ["websocket"]
    });

    this.socket.on("RECEIVE_MESSAGE", function(data) {
      newMessage(data);
    });

    const newMessage = data => {
      this.setState({ messages: [...this.state.messages, data] });
      this.scrollToBottom();
    };
  }

  sendMessage = e => {
    e.preventDefault();
    this.socket.emit("send_message", {
      message: this.state.message,
      appUserId: this.state.appUserId
    });
    InsertMessage({
      appUserId: this.state.appUserId,
      message: this.state.message
    });
    this.setState({ message: "" });
  };
  getMessages = () => {
    GetAllMessages().then(response => {
      if (response.data) {
        const result = response.data;
        this.setState({ messages: result });
        if (this.state.alreadyScrolled === false) {
          this.scrollToBottom();
          this.setState({ alreadyScrolled: true });
        }
      }
    });
  };
  scrollToBottom = () => {
    if (this.messagesEnd !== null) {
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
  };
  backToLogin = () => {
    this.props.history.push("/");
  };
  render() {
    const messages = this.state.messages;
    return (
      <div className="container">
        <div className="menu">
          <a
            href="https://www.linkedin.com/in/brian-nguyen-0802b7104"
            className="back"
          >
            <i className="fa fa-angle-left" />{" "}
            <img
              src="https://i.imgur.com/G4EjwqQ.jpg"
              alt="img"
              draggable="false"
            />
          </a>
          <div className="name">IGN Chatroom</div>
          <div>
            {" "}
            <button
              className="backToLogin"
              type="button"
              onClick={this.backToLogin}
            >
              Back
            </button>
          </div>
          <div className="members">
            <b>
              Sword <FontAwesomeIcon icon="khanda" />
            </b>
            , Shield <FontAwesomeIcon icon="shield-alt" />
          </div>
        </div>
        <ol className="chat">
          {messages.length > 0
            ? this.state.messages.map(message => (
                <div>
                  {message.appUserId !== 1 ? (
                    <li className="other">
                      <div className="msg leftChat">
                        <div className="shield">
                          Shield <FontAwesomeIcon icon="shield-alt" />
                        </div>
                        <p>{message.message}</p>
                        <time>
                          {moment(message.dateCreated).format("ddd LT")}
                        </time>
                      </div>
                    </li>
                  ) : (
                    <li className="self">
                      <div className="msg rightChat">
                        <div className="sword">
                          Sword <FontAwesomeIcon icon="khanda" />
                        </div>
                        <p>{message.message}</p>

                        <time>
                          {moment(message.dateCreated).format("ddd LT")}
                        </time>
                      </div>
                    </li>
                  )}
                </div>
              ))
            : ""}
          <div
            style={{ float: "left", clear: "both" }}
            ref={el => {
              this.messagesEnd = el;
            }}
          />
        </ol>

        <div className="typezone">
          <form>
            <textarea
              type="text"
              placeholder="Say something"
              value={this.state.message}
              onChange={this.onChange}
            />
            <button
              type="button"
              className="send"
              onClick={this.sendMessage}
              disabled={!this.state.message}
            >
              <FontAwesomeIcon icon="rocket" /> Send
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
