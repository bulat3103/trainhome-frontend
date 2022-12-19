import React from "react";
import './Button.css';

const STYLES = [
    'btn--primary',
    'btn--outline',
    'btn--green',
    'btn--red'
]

const SIZES = [
    'btn--medium',
    'btn--large',
    'btn--wide'
]

export const Button = ({
    children,
    type,
    onClick,
    onSubmit,
    buttonStyle,
    buttonSize
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0]
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]
    return (
        <button className={`btn ${checkButtonStyle} ${checkButtonSize}`} onClick={onClick} onSubmit={onSubmit} type={type}>
            {children}
        </button>
    )
}