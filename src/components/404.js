import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFound = () => (
    <p>The page you are looking for doesn't seem to exist. <NavLink to='/'>Go Back</NavLink></p>
)

export default NotFound;