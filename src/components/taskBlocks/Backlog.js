import React from 'react';
import Button from '../button/Button';
import Ready from './Ready';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ItemsPage from './tasksRouter/ItemsPage';
import './ItemColumn.css';
import './Style.css';
import ExternalClickInit from './ExternalClickInit';

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
            finishedTasks: 0,
            disableButton: null,
            linkCheck: false,
            taskDescrPos: '-132px',
            clickInit: false,
            inputNone: null
        }
    }

    selectTask(event) {

        const task = event.target.textContent;

        this.setState({
            taskColumn: [...this.state.taskColumn, task]
        })

    }

    createInput() {

        const input = <input
            autoFocus={true}
            id='input'
            className='taskStyle'
            onChange={this.addValue.bind(this)}
            onClick={this.addTask.bind(this)}>
        </input>;
        this.setState({
            buttonInit: true,
            input: input,
            listInit: false,
            clickInit: false,
            inputNone: null
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
            activeTasks: this.state.tasks.length + 1,
            clickInit: false
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
        this.setState({
            finishedTasks: value
        })
    }

    hideDropdown = () => {
        if (this.state.input === null) {
            return
        }
        
        document.getElementById('input').value = '';
        this.setState({
            inputValue: null,
            inputNone: 'none'
        })
    }

    linkTest(even) {

    }

    render() {
        const taskList = this.state.tasks.map((item, index) => {
            return <li onClick={this.selectTask.bind(this)} className='taskStyle' key={item} index={index}><span
                className='taskText'>{item}</span></li>;
        })

        const Page = () => <ItemsPage
            title='Backlog'
            taskColumn={this.state.tasks}
            taskDescrPos={this.state.taskDescrPos} />

        return (
            <Router>
                <Route path='/backlog' component={Page} />
                <div className='itemBlockContainer'>
                    <ExternalClickInit hideDropdown={this.hideDropdown}>
                        <div className='columnBlock firstColumn'>
                            <div className='itemBlock'>
                                <p className='titleStyle'><Link className='linkStyle' to='/backlog'>{this.props.title}</Link></p>
                                <div className='inputBlock'>
                                    <ul className='listItemStyle'>
                                        {taskList}
                                    </ul>
                                    <div className='inputBlock'>
                                        <div style={{margin: '0 auto', display: this.state.inputNone}}>
                                            {this.state.input}
                                        </div>
                                        <div>
                                            {this.state.button}
                                            <div className='disableButton'
                                                style={{ display: 'none' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ExternalClickInit>
                    <div>
                        <Ready title='Ready'
                            buttonInit={this.state.buttonInit}
                            tasks={taskList}
                            listInit={this.state.inputValue}
                            taskColumn={this.state.taskColumn}
                            deleteTask={this.deleteTask}
                            clearActiveTasks={this.clearActiveTasks}
                            getFinishedTasks={this.getFinishedTasks}
                            quantityTasks={this.state.activeTasks} />
                    </div>
                </div>
                <div className='border'>
                    <div className='borderContent'>
                        <div className='tasksCounter'>
                            <p>Active tasks: {this.state.activeTasks}</p>
                            <p>Finished tasks: {this.state.finishedTasks}</p>
                        </div>
                        <p>Kanban board by Vladimir, 2020.</p>
                    </div>
                </div>
            </Router>
        )
    }

}

export default Backlog