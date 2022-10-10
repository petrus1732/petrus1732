import React from 'react';

class Item extends React.Component {
    render() {
        return (
            <li className='todo-app__item' style={this.props.show? {} : {display: "none"}}>
                <div className='todo-app__checkbox'>
                    <input id={this.props.num} type='checkbox' checked={this.props.isChecked}></input>
                    <label htmlFor={this.props.num} onClick={() => this.props.changeState(this.props.num-1)}></label>
                </div>
                <h1 className='todo-app__item-detail' 
                    style={this.props.isChecked? {textDecoration: "line-through", opacity: "0.5"} : {}}>
                    {this.props.text}</h1>
                <img className='todo-app__item-x' src={require('../img/x.png')} onClick={() => this.props.delete(this.props.num-1)} alt='cross'></img>
            </li>
        )
    }
}

export default Item;
