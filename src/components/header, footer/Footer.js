import React from 'react';
import './Footer.css'

class Footer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTasks: '<N>',
            finishedTasks: '<M>',
            name: '<NAME>',
            year: '<YEAR>'
        }
    }

    test() {
        console.log(this.props.backlogTasks);
    }

    render() {
        return (
            <div className='footerStyle'>
                <div className='contentContainer'>
                    <div className='tasksBlockStyle'>
                        <p>Active tasks: {this.state.activeTasks}</p>
                        <p>Finished tasks: {this.state.finishedTasks}</p>
                    </div>
                    <p>Kanban board by {this.state.name}, {this.state.year}</p>
                </div>
                <button onClick= {this.test.bind(this)} >test</button>
            </div>
        )
    }
}

export default Footer