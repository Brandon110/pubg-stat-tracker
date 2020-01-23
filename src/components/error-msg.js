import React from 'react';
import { NavLink } from 'react-router-dom';
 
const ErrorMsg = ({ errorMsg }) => (
    <p className='error'>
        {errorMsg} <NavLink to='/' role='button'>Go Back</NavLink>
    </p>
)

export default ErrorMsg;