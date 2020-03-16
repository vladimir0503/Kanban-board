import React from 'react';
import Button from '../button/Button'; 

class Finished extends React.Component {
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
            selectBox: selectBox
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
        const task = event.target.textContent;

        this.setState({
            taskColumn: [...this.state.taskColumn, task],
            transTasks: [],
            selectBox: null,
            dropDownInit: false
        })
    }

    render() {

        const dropDown = this.state.transTasks.map((item, index) => {
            return <div onClick={this.selectTask.bind(this)} className='dropDown' key={index}>{item}</div>;
        })

        const taskColumn = this.state.taskColumn.map((item, index) => {
            return <li className='taskStyle taskStyleBlock' key={index}><span 
            className='taskText'>{item}</span></li>;
        })

        return (
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
                        {dropDown}
                    </ul>
                </div>
            </div>
        )
    }

}

export default Finished