import React from 'react';
import Backlog from './taskBlocks/Backlog';
import './MainStyle.css';

class Main extends React.Component {

    render() {
        return (
            <>
                <div className='commonContainer'>
                    <Backlog title='Backlog' />
                </div>
            </>
        )
    }
}

export default Main

