import React from 'react';
import Item from '../Components/item'

class ToDoApp extends React.Component {

    constructor() {
        super();
        this.state = {
            itemText: [],
            isChecked: [],
            showChecked: true,
            showUnchecked: true
        }
    }

    addItem() {
        const text = document.getElementsByClassName('todo-app__input')[0].value
        this.setState({
            itemText: [...this.state.itemText, text],
            isChecked: [...this.state.isChecked, false]
        })    
    }

    changeItemState(i) {
        this.setState(state => state.isChecked[i] = !state.isChecked[i]);
    }

    deleteItem(i) {
        const newText = [...this.state.itemText];
        const newState = [...this.state.isChecked];
        newText.splice(i,1);
        newState.splice(i,1);
        this.setState({
            itemText: newText,
            isChecked: newState,

        })
    }

    changeVisibility(v) {
        if (v === "all") this.setState({showChecked:true, showUnchecked: true}) 
        else if (v === "active") this.setState({showChecked: false, showUnchecked: true})
        else this.setState({showChecked: true, showUnchecked: false})
        
    }

    clear() {
        const clearedText = [...this.state.itemText.filter((x, i) => !this.state.isChecked[i])]
        const clearedState = [...this.state.isChecked.filter(x => !x)]
        console.log(clearedState);
        console.log(clearedText);
        this.setState({
            itemText: clearedText,
            isChecked: clearedState  
        })
    }

    render() {
        return(
            <div id="root" className='todo-app__root'>
                
                <header className='todo-app__header'>
                    <h1 className='todo-app__title'>todos</h1>
                </header>

                <section className='todo-app__main'>
                    <input className='todo-app__input' placeholder='What needs to be done?' 
                    onKeyDown={(e) => e.key === 'Enter' ? this.addItem() : null}></input>

                    <ul id="todo-list" className='todo-app__list'
                        style={(this.state.isChecked.filter(x => x).length && this.state.showChecked) 
                        || (this.state.isChecked.filter(x => !x).length && this.state.showUnchecked)? {}: {display:"none"}}>
                        {this.state.itemText.map((x, i) => 
                            <Item key={i} num={i+1}
                                text={this.state.itemText[i]} 
                                isChecked={this.state.isChecked[i]}
                                changeState={i => this.changeItemState(i)}
                                delete={i => this.deleteItem(i)}
                                show={(this.state.isChecked[i] && this.state.showChecked) ||
                                    (!this.state.isChecked[i] && this.state.showUnchecked)}
                                />
                        )}
                    </ul>

                </section>
                <footer className='todo-app__footer' id='todo-footer'
                    style={this.state.itemText.length? {}: {display:"none"}}>

                    <div className='todo-app__total'>
                        {this.state.isChecked.filter(x => !x).length + " left"}
                    </div>

                    <ul className='todo-app__view-buttons'>
                        <button onClick={() => this.changeVisibility("all")}
                            style={this.state.showChecked && this.state.showUnchecked? 
                            {border: "1px rgba(175, 47, 47, 0.15) solid"} : {}}>All</button>
                        <button onClick={() => this.changeVisibility("active")}
                            style={!this.state.showChecked && this.state.showUnchecked? 
                            {border: "1px rgba(175, 47, 47, 0.15) solid"} : {}}>Active</button>
                        <button onClick={() => this.changeVisibility("completed")}
                            style={this.state.showChecked && !this.state.showUnchecked? 
                            {border: "1px rgba(175, 47, 47, 0.15) solid"} : {}}>Completed</button>
                    </ul>

                    <div className='todo-app__clean'>
                        <button onClick={() => this.clear()}
                            style={this.state.isChecked.filter(x => x).length? {}: {visibility:"hidden"}}>
                                Clear completed
                        </button>
                    </div>

                </footer>
            </div>
        )
    }
}

export default ToDoApp;
