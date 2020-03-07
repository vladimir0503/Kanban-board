import React from 'react';
import Button from '../button/Button';
import Input from '../input/Input'
import './Style.css'

class TaskBlock extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            tasks: []
        }
    }

    createTask = () => {
        this.setState({
            tasks: <Input />
        });
    }

    render() {
        return (
            <div className='taskBlockStyle'>
                <p className='titleStyle'>{this.props.title}</p>
                <div className='inputBlock'>
                    {this.state.tasks}
                    <Button onClick={this.createTask} />
                </div>
            </div>
        )
    }
}

export default TaskBlock