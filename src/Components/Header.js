import React from 'react';
import { Jumbotron } from 'react-bootstrap';

const header = () => {
	return (
        <div style={{backgroundColor: '#fcfcfe'}}>
		<Jumbotron fluid className='jumbo'style={{ height: 200, marginBottom: 0, backgroundColor: '#fcfcfe' }}>
		</Jumbotron>
        </div>
	);
};

export default header;
