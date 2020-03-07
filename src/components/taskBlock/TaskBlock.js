import React from 'react';
import Input from '../input/Input'
import './Style.css'
import Button from '../button/Button';

class TaskBlock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        }
    }

    createTask() {
        this.state.tasks.push(<Input />)
        this.setState({
            tasks: this.state.tasks
        });
    }

    render() {

        const taskList = this.state.tasks.map((item, index) => {
            return <li className='listStyle' key={index}>{item}</li>;
        })

        return (
            <div className='taskBlockStyle'>
                <p className='titleStyle'>{this.props.title}</p>
                <div className='inputBlock'>
                    <ul className='listItemStyle'>
                        {taskList}
                    </ul>
                    <Button onClick={this.createTask.bind(this)} />
                </div>
            </div>
        )
    }

}

export default TaskBlock