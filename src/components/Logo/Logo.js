import React from 'react';
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';
import Emoji from './emoji';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
            <div className="Tilt-inner pa3">
                <Emoji symbol="👽" label="alien"/>
                <br/>
                <img style={{paddingTop: '5px'}} alt='logo' src={brain}/>
            </div>
            </Tilt>
        </div>
    );
}

export default Logo;
