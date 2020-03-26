import React from 'react';
import Button from '../button/Button';
import Finished from './Finished';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ItemsPage from './tasksRouter/ItemsPage'

class InProgress extends React.Component {
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
                margin: '-686px',
                padding: '1px',
            }
        }
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
            onClick={this.addTask.bind(this)}>
        </div>;

        this.setState({
            disableButton: 'none',
            selectBox: selectBox,
            button: <Button onClick={this.createSelect.bind(this)} />
        });
    }

    addTask() {
        if (this.state.dropDownInit === true) {
            return
        }
        this.setState({
            dropDownInit: true,
            transTasks: React.Children.toArray([...this.state.transTasks, this.props.taskColumn])
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
    }

    deleteTask = (value) => {
        const newArr = this.state.taskColumn.splice(value, 1);

        this.setState({
            taskArr: [...this.state.taskColumn, newArr]
        })
    }

    render() {

        const dropDown = this.state.transTasks.map((item, index) => {
            return <div onClick={this.selectTask.bind(this)} key={index} index={index} >{item}</div>;
        })

        const taskColumn = this.state.taskColumn.map((item, index) => {
            return <li className='taskStyle taskStyleBlock' key={index} index={index}><span
                className='taskText'>{item}</span></li>;
        })

        const InProgress = () => <ItemsPage
            title='In Progress'
            taskColumn={this.state.taskColumn}
            pagePosition={this.state.pagePosition.margin}
            pagePadding={this.state.pagePosition.padding} />

        return (
            <Router>
            <Route path='/inProgress' component={InProgress} />
                <div className='itemBlockContainer'>
                    <div className='columnBlock followColumn'>
                        <div className='itemBlock'>
                        <p className='titleStyle'><Link className='linkStyle' to='/inProgress'>{this.props.title}</Link></p>
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
                    <div>
                        <Finished title='Finished'
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

export default InProgress