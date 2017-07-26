'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';

class FetchDemo extends React.Component {
  constructor() {
    super()
    this.state = {
      meg: '',
      respon: [],
      megArray: []
    }
  }
  handleData(e) {
    this.setState({
      meg: e.target.value
    })
  }
  sendMessage() {
    var message = this.state.meg
    if (message === '') {
      alert('不能发送空白消息哦')
    } else {
      this.setState({
        megArray: [...this.state.megArray, message]
      })
      var that = this
      var func = fetch('https://www.tuling123.com/openapi/api?key=ba0aa634b4f04190b6d781ce4d8feb7c&info=' + message, {
        method: 'POST',
        type: 'cors'
      }).then(function(response) {
        return response.json()
      }).then(function(detail) {
        return (that.setState({
          respon: [...that.state.respon, detail.text]
        }, () => {
          var el = ReactDOM.findDOMNode(that.refs.msgList);
          el.scrollTop = el.scrollHeight;
        }))
      })
      this.state.meg = ''
    }
  }
  render() {
    var meg = this.state.meg
    var megArray = this.state.megArray
    var respon = this.state.respon

    return (
      <div className="content">
        <p className="header">CHAT--FOCUS</p>
        <div className="msg-list" ref="msgList">
          {megArray.map((elem,index) => (
            <div className="container" key={index}>
              <div className="reqDiv"><p className="message">{elem}</p> <img src="./src/req.jpg" className="reqHead"/></div>
              <div className="resDiv"><img src="./src/res.jpg" className="resHead"/> <p className="response">{respon[index]}</p></div>
            </div>)
           )}
        </div>
         <div className="fixedBottom">
           <input className="input" value={meg} onChange={this.handleData.bind(this)} />
           <button className="button" onClick={this.sendMessage.bind(this)}>发送</button>
         </div>
      </div>
    )
  }
}

ReactDOM.render(<FetchDemo />, document.getElementById('app'))
