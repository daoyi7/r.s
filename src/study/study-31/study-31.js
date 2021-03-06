import React, {Component} from 'react'
import './study-31.css';

class Header extends Component {
  render() {
    return (
      <div className = "title">
        <span>kawhi.me</span>
      </div>
    )
  }
}

class ListWrap extends Component {

  handleClick(a) {
    console.log(a)
    console.log(this)
  }

  render() {
    return (
      <div className = "listWrap">
        <ul>
          {
            this.props.li.map((child, index) => {
              console.log(child)
              return (
                <li key={index} onClick = {this.handleClick.bind(this, child.title)}>
                  <div className="listItem">
                    <h2>{child.title}</h2>
                    <p>{child.info}</p>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}


export default class App extends Component {

  state = {
    listArray: [
      {
        id: '1',
        title: 'title1',
        info: 'info1'
      },
      {
        id: '2',
        title: 'title2',
        info: 'info2'
      },
      {
        id: '3',
        title: 'title3',
        info: 'info3'
      },
    ]
  }

  render() {
    return (
      <div className = "work">
        <Header />
        <ListWrap li = {this.state.listArray} />
      </div>
    )
  }
}
