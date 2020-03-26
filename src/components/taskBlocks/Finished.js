import React from 'react';
import Button from '../button/Button';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ItemsPage from './tasksRouter/ItemsPage'

class Finished extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            button: <Button onClick={this.createSelect.bind(this)} />,
            selectBox: null,
            buttonInit: false,
            transTasks: [],
            taskColumn: [],
            disableButton: null,
            finishedTasks: 0,
            pagePosition: {
                margin: '-987px',
                padding: '1px'
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
            transTasks: [...this.state.transTasks, this.props.taskColumn]
        })
    }

    selectTask(event) {

        const index = event.target.getAttribute('index');
        const task = event.target.textContent;

        this.setState({
            taskColumn: [...this.state.taskColumn, task],
            transTasks: [],
            selectBox: null,
            dropDownInit: false,
            buttonInit: true,
            finishedTasks: this.state.taskColumn.length + 1
        })

        this.props.deleteTask(index);
        this.props.getFinishedTasks(this.state.finishedTasks + 1);
    }

    render() {

        const dropDown = this.state.transTasks.map((item, index) => {
            return <div onClick={this.selectTask.bind(this)} className='dropDown' key={item}>{item}</div>;
        })

        const taskColumn = this.state.taskColumn.map((item, index) => {
            return <li className='taskStyle taskStyleBlock' key={item}><span
                className='taskText'>{item}</span></li>;
        })

        const Finished = () => <ItemsPage
            title='Finished'
            taskColumn={this.state.taskColumn}
            pagePosition={this.state.pagePosition.margin}
            pagePadding={this.state.pagePosition.padding} />

        return (
            <Router>
            <Route path='/finished' component={Finished} />
                <div className='columnBlock'>
                    <div className='itemBlock'>
                    <p className='titleStyle'><Link className='linkStyle' to='/finished'>{this.props.title}</Link></p>
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
                            {dropDown}
                        </ul>
                    </div>
                </div>
            </Router>
        )
    }

}

export default Finished