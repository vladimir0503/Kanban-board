import React from 'react';
import Button from '../button/Button';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ItemsPage from './tasksRouter/ItemsPage';
import selectBtn from '../images/selectBtn.png';
import styled, { keyframes } from 'styled-components';
import { fadeInDown } from 'react-animations';

const AnimElem = styled.div`animation: 0.5s ${keyframes`${fadeInDown}`} 1`;

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
            },
            wrapper: null
        }

        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.hideDropdown = this.hideDropdown.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    createSelect() {
        if (this.props.quantityTasks === 0) {
            this.setState({
                disableButton: null
            })
            return
        }

        const selectBox = <AnimElem><div
            className='taskStyle'
            style={{ cursor: 'pointer' }}
            onClick={this.addTask.bind(this)}>
            <img className='selectBtn' src={selectBtn} alt='selectBtn'></img>
        </div></AnimElem>;

        this.setState({
            disableButton: 'none',
            selectBox: selectBox,
            button: <Button onClick={this.createSelect.bind(this)} />,
            wrapper: this.setWrapperRef = this.setWrapperRef.bind(this)
        });
    }

    addTask() {
        this.setState({
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

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            console.log('EXTERNAL CLICK INIT!')
            this.hideDropdown();
            this.setState({
                wrapper: null
            })
        }
    }

    hideDropdown = () => {
        this.setState({
            transTasks: [],
            selectBox: null
        })
    }

    render() {

        const dropDown = this.state.transTasks.map((item, index) => {
            return <AnimElem><div onClick={this.selectTask.bind(this)} key={item}>{item}</div></AnimElem>;
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
                    <div ref={this.state.wrapper}>
                        <div className='itemBlock'>
                            <p className='titleStyle'><Link className='linkStyle' to='/finished'>{this.props.title}</Link></p>
                            <div className='inputBlock'>
                                <div className='inputBlock'>
                                    {taskColumn}
                                    <div>
                                        {this.state.selectBox}
                                    </div>
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
                                <div className='dropDown'>{dropDown}</div>
                            </ul>
                        </div>
                    </div>
                </div>
            </Router>
        )
    }

}

export default Finished