import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ ImageUrl, box }) => {
	//console.log(box);
	/*const boxStyle = {
		 position: 'absolute',
    boxShadow: '0 0 0 3px #149df2 inset',
    display: 'flex',
    borderColor: 'black',
    flexWrap: 'wrap',
    justifyContent: 'center',
    cursor: 'pointer',
    top: box.topRow, 
		right: box.rightCol,
		bottom: box.bottomRow,
		left: box.leftCol 
	}*/
	return (
		<div className = 'center'>
			<div className = 'absolute mt2'>
				<img id='inputImage' alt='' src={ImageUrl} width='500px' heigh='auto'/>
				<div 
					className = 'bounding-box' 
					style = {{
						top: box.topRow, 
						right: box.rightCol,
						bottom: box.bottomRow,
						left: box.leftCol 
					}}>
				</div>
			</div>
		</div>
	);
}

export default FaceRecognition;