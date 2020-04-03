import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Style.css'

export default class ExternalClickInit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            wrapper: this.setWrapperRef = this.setWrapperRef.bind(this)
        }

        this.handleClickOutside = this.handleClickOutside.bind(this);
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

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            console.log(this.props.test)
            this.props.hideDropdown();
        }
    }

    render() {
        return <div className='ExternalClickInit' ref={this.state.wrapper}>{this.props.children}</div>;
    }
}

ExternalClickInit.propTypes = {
    children: PropTypes.element.isRequired,
};

