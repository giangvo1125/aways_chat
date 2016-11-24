import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import * as chatActions from '../../actions/chat';

class ChatBox extends Component {
  constructor() {
    super();
    this.isTop = false;
  }
  _onSend() {
    let message = this.refs.message.value;
    let roomId = this.props.roomId;
    this.props.sendMessageAction(roomId, message);
  }
  _onKeyPress(event) {
    if(event.key == 'Enter'){
      let message = this.refs.message.value;
      let roomId = this.props.roomId;
      this.props.sendMessageAction(roomId, message);
    }
  }
  _onScroll(e) {
    if(e.target.scrollTop == 0) {
      let roomId = this.props.roomId;
      let limit = this.props.content[roomId].length + 5;
      this.isTop = true;
      this.props.receivedMessageAction(roomId, limit);
    }
  }
  componentDidMount() {
    if(this.isTop == false)
      this.refs.chat_page.scrollTop  = this.refs.chat_page.scrollHeight;
  }

  componentDidUpdate() {
    if(this.isTop == false)
      this.refs.chat_page.scrollTop  = this.refs.chat_page.scrollHeight;
  }

  render() {
    let roomId = this.props.roomId;
    let to_user = '';
    if(this.props.content[roomId].length > 0) {
      if(this.props.user.uid == this.props.content[roomId][0].from) {
        to_user = this.props.content[roomId][0].email_to;
      }
      else {
        to_user = this.props.content[roomId][0].email_from;
      }
    }
    let data_message =[];
    this.props.content[roomId].map((item)=> {
      if(item.is_create_message != true) {
        if(item.from != this.props.user.uid) {
          // to_user = item.email_from;
          data_message.push(
            <div key={Math.random()} className="row">
              <div key={Math.random()} className="col-md-10 full-height no-padding"><p className="margin-text background-to">{item.message}</p></div>
          </div>);
        }
        else {
          data_message.push(
            <div key={Math.random()} className="row">
              <div className="col-md-2 full-height no-padding">&nbsp;</div>
              <div key={Math.random()} className="col-md-10 full-height no-padding message-user"><p className="margin-text background-from">{item.message}</p></div>
          </div>);
        }
        data_message.push(<div key={Math.random()} className="row">&nbsp;</div>)
      }
    })

    return (
      <div className="row">
        <div className="col-md-12">
          {to_user}
        </div>
        <div className="col-md-12">
          <div key={Math.random()} className="col-md-5 chat-content" ref="chat_page" onScroll={this._onScroll.bind(this)}>
            {data_message.map((item)=> {
              return (item);
            })}
          </div>
        </div>
        <div className="col-md-12">
          <div className="col-md-5 footer no-padding">
            <div className="col-md-8 full-height no-padding">
              <input className="input-send full-height no-padding" ref="message" onKeyPress={this._onKeyPress.bind(this)} />
            </div>
            <div className="col-md-4 full-height no-padding">
              <button className="form-control full-height button-send" onClick={this._onSend.bind(this)} >Send</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return{
    content: state.chat.content,
    user: state.user.user,
  }
}

export default connect(mapStateToProps, chatActions)(ChatBox);
