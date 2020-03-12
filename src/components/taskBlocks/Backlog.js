import React from 'react';
import Button from '../button/Button';
import './Style.css';
import Ready from './Ready';

class Backlog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            button: <Button onClick={this.createInput.bind(this)} />,
            input: null,
            inputValue: null,
            tasks: [],
            listInit: false
        }
    }

    createInput() {
        const input = <input
            className='taskStyle'
            onChange={this.addValue.bind(this)}
            onClick={this.addTask.bind(this)}>
        </input>;
        this.setState({
            button: <Button onClick={this.addTask.bind(this)} />,
            input: input,
            listInit: false
        });
    }

    addValue(event) {
        this.setState({
            inputValue: event.target.value,
        })
    }

    addTask() {
        if (this.state.inputValue === null) {
            return
        }

        this.setState({
            input: null,
            inputValue: null,
            listInit: true,
            tasks: [...this.state.tasks, this.state.inputValue],
            button: <Button onClick={this.createInput.bind(this)} />,
        })

    }

    render() {
        const taskList = this.state.tasks.map((item, index) => {
            return <li className='taskStyle' key={index}><span>{item}</span></li>;
        })

        return (
            <div className='itemBlockContayner'>
                <div>
                    <div className='itemBlock'>
                        <p className='titleStyle'>{this.props.title}</p>
                        <div className='inputBlock'>
                            <ul className='listItemStyle'>
                                {taskList}
                            </ul>
                            <div className='inputBlock'>
                                {this.state.input}
                                {this.state.button}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Ready title='Ready'
                        tasks={taskList}
                        listInit={this.state.listInit} />
                </div>
            </div>
        )
    }

}

export default Backlog