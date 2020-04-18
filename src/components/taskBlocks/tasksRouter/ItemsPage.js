import React from 'react';
import './BacklogPageStyle.css';
import button from '../../images/button.png';

class ItemsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taskInfo: null,
            taskColumnPos: null,
            displayStyle: null,
            showContentBtn: null
        }
    }

    showInfo(event) {

        const title = event.target.textContent;
        const taskInfo = <div className='descriptionContainer'>
            <div>
                <p className='titleStyle'>{title}</p>
                <div className='description'>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                    eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                    mollit anim id est laborum.</p>
                </div>
            </div>
            <div>
                <img className='removeInfoBtn' onClick={this.removeInfo.bind(this)} src={button} alt='button'></img>
            </div>
        </div>

        this.setState({
            taskInfo: taskInfo,
            taskColumnPos: '-303px',
        })
    }

    removeInfo() {
        this.setState({
            taskInfo: null,
            taskColumnPos: null
        })
    }

    showPage() {
        this.setState({
            displayStyle: null
        })
    }

    hidePage() {
        window.history.back();
    }

    render() {
        return (
            <>
                {this.state.showContentBtn}
                <div onClick={console.log('content test')} className='contentContayner' style={{ display: this.state.displayStyle, marginLeft: this.props.pagePosition, paddingTop: this.props.pagePadding }}>
                    {this.state.taskInfo}
                    <div className='titleBlock'>
                        <h2 className='title'>{this.props.title}</h2>
                        <div className='btnContayner'>
                            <img onClick={this.hidePage.bind(this)} className='removeInfoBtn' src={button} alt='button'></img>
                        </div>
                    </div>
                    <ul className='taskColumn' style={{ marginTop: this.state.taskColumnPos }}>
                        {this.props.taskColumn.map((item, index) => {
                            return <li className='task' onClick={this.showInfo.bind(this)} key={index}>{item}</li>
                        })}
                    </ul>
                </div>
            </>
        )
    }
}

export default ItemsPage
