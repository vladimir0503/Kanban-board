import React from 'react';
import '../taskBlocks/Style.css'
import './Button.css'

const Button = ({ onClick }) => {
    return (
        <button
            className='buttonStyle'
            onClick={onClick}>
            <span className='buttonText'>+ Add card</span>
        </button>
    )
}

export default Button