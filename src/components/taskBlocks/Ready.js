import React from 'react';
import Button from '../button/Button';
import InProgress from './InProgress'

class Ready extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            button: <Button onClick={this.createSelect.bind(this)} />,
            selectBox: null,
            buttonInit: false,
            transTasks: [],
            taskColumn: []
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
            selectBox: selectBox,
        });
    }

    addTask() {
        if (this.state.dropDownInit === true) {
            return
        }
        this.setState({
            dropDownInit: true,
            transTasks: [...this.state.transTasks, this.props.tasks]
        })
    }

    selectTask(event) {

        const index = this.state.transTasks.indexOf(event.target);

        console.log(index);
    
        const task = event.target.textContent;

        this.setState({
            taskColumn: [...this.state.taskColumn, task],
            transTasks: [],
            selectBox: null,
            dropDownInit: false,
            buttonInit: true,
        })

    }

    test() {
        console.log('test');
    }

    render() {

        const dropDown = this.state.transTasks.map((item, index) => {
            return <div onClick={this.selectTask.bind(this)} key={index}>{item}</div>;
        })

        const taskColumn = this.props.taskColumn.map((item, index) => {
            return <li className='taskStyle taskStyleBlock' key={index}><span
                className='taskText'>{item}</span></li>;
        })

        return (
            <div className='itemBlockContainer'>
                <div>
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
                    <InProgress title='In Progress'
                        buttonInit={this.state.buttonInit}
                        taskColumn={taskColumn} />
                </div>
            </div>
        )
    }

}

export default Ready