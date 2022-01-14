import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const Header = ({title}) => {
    return (
        <header className="header">
            <h1 style={headingStyle}>{title}</h1>
            <Button />
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker'
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}

const headingStyle = {
    color: 'green'
}

export default Header
