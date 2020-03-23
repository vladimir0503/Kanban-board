import React from 'react';
import Button from '../button/Button';
import Finished from './Finished';

class InProgress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            button: <Button onClick={this.createSelect.bind(this)} />,
            selectBox: null,
            buttonInit: false,
            transTasks: [],
            taskColumn: [],
            taskArr: []
        }
    }

    createSelect() {
        if (this.props.buttonInit === false) {
            return
        }

        const selectBox = <div
            className='taskStyle'
            onClick={this.addTask.bind(this)}>
        </div>;

        this.setState({
            selectBox: selectBox
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
            dropDownInit: false,
            buttonInit: true
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

        return (
            <div className='itemBlockContainer'>
                <div className='columnBlock followColumn'>
                    <div className='itemBlock'>
                        <p className='titleStyle'>{this.props.title}</p>
                        <div className='inputBlock'>
                            <div className='inputBlock'>
                                {taskColumn}
                                {this.state.selectBox}
                                {this.state.button}
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
                        buttonInit={this.state.buttonInit}
                        taskColumn={taskColumn} 
                        deleteTask={this.deleteTask}
                        getFinishedTasks={this.props.getFinishedTasks} />
                </div>
            </div>
        )
    }

}

export default InProgress