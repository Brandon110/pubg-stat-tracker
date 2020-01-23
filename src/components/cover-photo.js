import React from 'react';

const CoverPhoto = ({ children }) => (
    <div className='cover-photo'>
        <div className='img-overlay'></div>
        <h2>PlayersUnknown's Battlegrounds</h2>
        {children}
    </div>
)

export default CoverPhoto;