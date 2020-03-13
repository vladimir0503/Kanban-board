import React from 'react';
import Button from '../../button/Button'



class Ready extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            button: <Button onClick={this.createSelect.bind(this)} />,
            selectBox: null,
            backlogTasks: [],
            tasks: [],
            dropDownInit: this.props.listInit,
            taskClassName: ''
        }
    }

    test() {
        console.log('test')
    }

    createSelect() {
        if (this.props.listInit === false) {
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
        this.setState({
            backlogTasks: [...this.state.backlogTasks, this.props.tasks]
        })
    }

    render() {
        const dropDown = this.state.backlogTasks.map((item, index) => {
            return <div className='dropDown' key={index}>{item}</div>;
        })

        const readyTasks = this.props.readyTasks.map((item, index) => {
            return <div className='dropDown' key={index}>{item}</div>;
        })

        return (
            <>
                <div className='itemBlock'>
                    <p className='titleStyle'>{this.props.title}</p>
                    <div className='inputBlock'>
                        <div className='inputBlock'>
                            {this.state.selectBox}
                            {readyTasks}
                            {this.state.button}
                        </div>
                    </div>
                </div>
                <div>
                    <ul className='listItemStyle'>
                        {dropDown}
                    </ul>
                </div>
            </>
        )
    }

}

export default Ready