import React from 'react';
import Button from '../button/Button';
import Ready from './Ready';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ItemsPage from './tasksRouter/ItemsPage';
import './ItemColumn.css';
import './Style.css';
import styled, { keyframes } from 'styled-components';
import { fadeInDown, shake } from 'react-animations';

const AnimElem = styled.div`animation: 0.5s ${keyframes`${fadeInDown}`} 1`;
const ErrAnim = styled.div`animation: 0.5s ${keyframes`${shake}`} 1`;

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
            inputNone: null,
            wrapper: null,
            submitBtn: null
        }

        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.hideDropdown = this.hideDropdown.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    selectTask(event) {

        const task = event.target.textContent;

        this.setState({
            taskColumn: [...this.state.taskColumn, task]
        })

    }

    createInput() {

        const input = <AnimElem><input
            autoComplete="off"
            autoFocus={true}
            id='input'
            className='taskStyle'
            onChange={this.addValue.bind(this)}
            onKeyPress={this.addTaskToEnter.bind(this)}>
        </input></AnimElem>;

        const submitBtn = <button onClick={this.addTask.bind(this)}
            className='submitBtn'><AnimElem><span className='btnText'>Submit</span></AnimElem></button>

        this.setState({
            buttonInit: true,
            input: input,
            listInit: false,
            clickInit: false,
            inputNone: null,
            submitBtn: submitBtn,
            wrapper: this.setWrapperRef = this.setWrapperRef.bind(this)
        });
    }

    addValue(event) {
        this.setState({
            inputValue: event.target.value,
        })
    }

    addTask() {

        const ErrInput = <ErrAnim><input
            style={{ boxShadow: '0px 0px 4px 3px red' }}
            autoComplete="off"
            autoFocus={true}
            id='input'
            className='taskStyle'
            onChange={this.addValue.bind(this)}
            onKeyPress={this.addTaskToEnter.bind(this)}>
            </input></ErrAnim>;

        if (this.state.inputValue === null) {
            this.setState({
                input: ErrInput
            })
            return
        }

        this.setState({
            input: null,
            inputValue: null,
            listInit: true,
            tasks: [...this.state.tasks, this.state.inputValue],
            button: <Button onClick={this.createInput.bind(this)} />,
            activeTasks: this.state.tasks.length + 1,
            clickInit: false,
            wrapper: null,
            submitBtn: null
        })

    }

    addTaskToEnter(event) {
        if (event.key === 'Enter') {
            this.addTask();
        }
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


    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.hideDropdown();
            this.setState({
                wrapper: null,
                submitBtn: null
            })
        }
    }

    hideDropdown() {
        if (this.state.input === null) {
            return
        }

        document.getElementById('input').value = '';
        this.setState({
            inputValue: null,
            inputNone: 'none'
        })
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
                    <div className='columnBlock firstColumn'>
                        <div className='itemBlock firstBlock'>
                            <p className='titleStyle'><Link className='linkStyle' to='/backlog' >{this.props.title}</Link></p>
                            <div className='inputBlock'>
                                <ul className='listItemStyle'>
                                    {taskList}
                                </ul>
                                <div ref={this.state.wrapper}>
                                    <div className='inputBlock'>
                                        <div style={{ margin: '0 auto', display: this.state.inputNone }}>
                                            {this.state.input}
                                        </div>
                                        <div>
                                            {this.state.button}
                                            {this.state.submitBtn}
                                            <div className='disableButton'
                                                style={{ display: 'none' }}></div>
                                        </div>
                                    </div>
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
                            getFinishedTasks={this.getFinishedTasks}
                            quantityTasks={this.state.activeTasks}
                            offExternalClick={this.offExternalClick} />
                    </div>
                    <div clasName='push'></div>
                </div>
                <div className='footer'>
                    <div className='footerContent'>
                        <div className='tasksCounter'>
                            <p>Active tasks: {this.state.activeTasks}</p>
                            <p>Finished tasks: {this.state.finishedTasks}</p>
                        </div>
                        <p className='kopyright'>Kanban board by Vladimir, 2020.</p>
                    </div>
                </div>
            </Router>
        )
    }

}

export default Backlog