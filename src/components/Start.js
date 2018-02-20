import React from 'react';

const Start = (props) => {
	
	return(
		<div className={props.status} onClick={props.setId}>{props.current}</div>
	);
}

export default Start;