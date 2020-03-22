import React from 'react';
import Button from '../button/Button';
import Ready from './Ready';
import './Style.css';

class Backlog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            button: <Button onClick={this.createInput.bind(this)} />,
            input: null,
            inputValue: null,
            buttonInit: false,
            tasks: [],
            taskColumn: [],
            childIndex: null,
            activeTasks: 0,
            finishedTasks: 0
        }
    }

    selectTask(event) {

        const task = event.target.textContent;

        this.setState({
            taskColumn: [...this.state.taskColumn, task]
        })

    }

    createInput() {

        const input = <textarea
            wrap='hard'
            className='taskStyle'
            onChange={this.addValue.bind(this)}
            onClick={this.addTask.bind(this)}>
        </textarea>;
        this.setState({
            buttonInit: true,
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
            activeTasks: this.state.tasks.length + 1
        })

    }

    deleteTask = (value) => {
        this.state.tasks.splice(value, 1);
    }

    clearActiveTasks = () => {
        let activeTasks = this.state.activeTasks - 1;
        this.setState({
            activeTasks: activeTasks
        })
    }

    getFinishedTasks = (value) => {
        console.log(value);
        this.setState({
            finishedTasks: value
        })
    }

    render() {
        const taskList = this.state.tasks.map((item, index) => {
            return <li onClick={this.selectTask.bind(this)} className='taskStyle taskStyleBlock' key={item} index={index}><span
                className='taskText'>{item}</span></li>;
        })

        return (
            <>
                <div className='itemBlockContainer'>
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
                            buttonInit={this.state.buttonInit}
                            tasks={taskList}
                            listInit={this.state.inputValue}
                            taskColumn={this.state.taskColumn}
                            deleteTask={this.deleteTask}
                            clearActiveTasks={this.clearActiveTasks}
                            getFinishedTasks={this.getFinishedTasks} />
                    </div>
                </div>
                <div className='border'>
                    <div className='borderContent'>
                        <div className='tasksCounter'>
                            <p>Active tasks: {this.state.activeTasks}</p>
                            <p>Finished tasks: {this.state.finishedTasks}</p>
                        </div>
                        <p>Kanban board by 'NAME', 'YEAR'</p>
                    </div>
                </div>
            </>
        )
    }

}

export default Backlog