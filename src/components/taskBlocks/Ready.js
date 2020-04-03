import React from 'react';
import Button from '../button/Button';
import InProgress from './InProgress';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ItemsPage from './tasksRouter/ItemsPage';
import selectBtn from '../images/selectBtn.png'

class Ready extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            button: <Button onClick={this.createSelect.bind(this)} />,
            selectBox: null,
            transTasks: [],
            taskColumn: [],
            taskArr: [],
            disableButton: null,
            pagePosition: {
                margin: '-383px',
                padding: '1px',
            },
            wrapper: null
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

    createSelect() {
        if (this.props.quantityTasks === 0) {
            this.setState({
                disableButton: null
            })
            return
        }

        const selectBox = <div
            className='taskStyle'
            style={{ cursor: 'pointer' }}
            onClick={this.addTask.bind(this)}>
            <img className='selectBtn' src={selectBtn} alt='selectBtn'></img>
        </div>;

        this.setState({
            disableButton: 'none',
            selectBox: selectBox,
            thereAreTasks: true,
            button: <Button onClick={this.createSelect.bind(this)} />,
            wrapper: this.setWrapperRef = this.setWrapperRef.bind(this)
        });
    }

    addTask() {
        this.setState({
            transTasks: React.Children.toArray([...this.state.transTasks, this.props.tasks])
        })
    }

    selectTask(event) {

        const index = event.target.getAttribute('index');
        const task = event.target.textContent;

        this.setState({
            taskColumn: [...this.state.taskColumn, task],
            transTasks: [],
            selectBox: null,
            dropDownInit: false
        })

        this.props.deleteTask(index);
        this.props.clearActiveTasks();
    }

    deleteTask = (value) => {
        const newArr = this.state.taskColumn.splice(value, 1);

        this.setState({
            taskArr: [...this.state.taskColumn, newArr]
        })
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            console.log('EXTERNAL CLICK INIT!')
            this.hideDropdown();
            this.setState({
                wrapper: null
            })
        }
    }

    hideDropdown() {
        this.setState({
            transTasks: [],
            selectBox: null
        })
    }

    render() {

        const dropDown = this.state.transTasks.map((item, index) => {
            return <div onClick={this.selectTask.bind(this)} key={index} index={index} >{item}</div>;
        })

        const taskColumn = this.state.taskColumn.map((item, index) => {
            return <li className='taskStyle' key={index} index={index}><span
                className='taskText'>{item}</span></li>;
        })

        const Ready = () => <ItemsPage
            title='Ready'
            taskColumn={this.state.taskColumn}
            pagePosition={this.state.pagePosition.margin}
            pagePadding={this.state.pagePosition.padding}
            taskDescrPos={this.state.pagePosition.taskDescrPos} />

        return (
            <Router>
                <Route path='/ready' component={Ready} />
                <div className='itemBlockContainer'>
                    <div className='columnBlock followColumn'>
                        <div ref={this.state.wrapper}>
                            <div className='itemBlock'>
                                <p className='titleStyle'><Link className='linkStyle' to='/ready' >{this.props.title}</Link></p>
                                <div className='inputBlock'>
                                    <div className='inputBlock'>
                                        {taskColumn}
                                        {this.state.selectBox}
                                        <div>
                                            {this.state.button}
                                            <div onClick={this.createSelect.bind(this)}
                                                className='disableButton'
                                                style={{ display: this.state.disableButton }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <ul className='listItemStyle'>
                                    <div className='dropDown'>{dropDown}</div>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div>
                        <InProgress title='In Progress'
                            taskColumn={taskColumn}
                            deleteTask={this.deleteTask}
                            getFinishedTasks={this.props.getFinishedTasks}
                            quantityTasks={taskColumn.length} />
                    </div>
                </div>
            </Router>
        )
    }

}

export default Ready