import React from 'react';

const Footer = () => (
    <footer className='site-footer'>
        <p className='copy'>&copy; Copyright Brandon Blackwell {new Date().getFullYear()}</p>
        <p>All data was provided by <a href='https://developer.pubg.com/'>PUBG Corp.</a> in no way am I affiliated or work with this company.</p>
    </footer>
)

export default Footer;