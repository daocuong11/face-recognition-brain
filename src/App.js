import React from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Signin from "./components/Signin/Signin"; 
import Register from "./components/Register/Register";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import './App.css';


const app = new Clarifai.App({
 apiKey: '227af81d19954996928388c97f05c078'
});

const particlesOptions = {
	particles: {
		number: {
			value: 70,
			density: {
				enable: true,
				value_area: 800
			}
		}
	}       	
};

class App extends React.Component {

	constructor() {
		super();
		this.state = {
			input: '',
			ImageUrl:'',
			box:'',
			route:'signin',
			isSignedIn: 'false'
		}
	}

	calculateFaceLocation = (data) => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputImage');
		const width = Number(image.width);
		const height = Number(image.height);
		// console.log(width,height);
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - (clarifaiFace.right_col * width),
			bottomRow: height - (clarifaiFace.bottom_row * height)
		}
	}

	displayFaceBox = (box) => {
		this.setState({box: box});
	}

	onInputChange = (event) => {
		// console.log(event.target.value);
		this.setState({ input: event.target.value });
	}

	onButtonSubmit = () => {
		console.log('click');
		// app.models.predict(
		// 	Clarifai.COLOR_MODEL,
		//     // URL
		//     "https://samples.clarifai.com/metro-north.jpg"
		// 	)
		// 	.then(function(response) {
		//     // do something with response
		//     console.log(response);
		// 	},
		// 	function(err) {
			
		// 	}
		// 	);
		this.setState({ ImageUrl: this.state.input })
		app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
		.then((response) => this.displayFaceBox(this.calculateFaceLocation(response)))
		.catch(err => console.log(err));
  	
	}

	onRouteChange = (route) => {
		// debugger;
		// if(route === 'signout') {
		// 	this.setState({isSignedIn: false })
		// } else if (route === 'home') {
		// 	this.setState({isSignedIn: true })
		// } 
		console.log(route);

		this.setState({route: route}); 
	}

	render() {
		return (
	    <div className="App">
	    	<Particles className='particles' params={particlesOptions} />
	      <Navigation isSignedIn = {this.state.isSignedIn} onRouteChange = { this.onRouteChange}/>
	      {	this.state.route === 'home'
	      	? <div>
			      	<Logo />
				     	<Rank />
				     	<ImageLinkForm 
				     		onInputChange = {this.onInputChange} 
				     		onButtonSubmit={this.onButtonSubmit} 
				     	/>
							<FaceRecognition box={ this.state.box } ImageUrl={ this.state.ImageUrl }
							/>
						</div> 
	      	: (
	      			this.state.route === 'signin'
	      			? <Signin onRouteChange = { this.onRouteChange } /> 
	      			: <Register onRouteChange = { this.onRouteChange } /> 
	      		)
	      }
	    </div>
  	);
	}
}

export default App;
