import React from 'react';
import './App.css';
import { Configurator } from './AppElements/Configurator';
import { RatingContainer } from './AppElements/RatingContainer';

function App() {
  return (
	<div className="App">
	  	<header className="App-header flex-col">
			<p className='font-bold'>
				LF06 Team 22 Chatbot
			</p>
			<span className='text-2xl'>
				built with IBM watsonx
			</span>
		</header>
		<Configurator></Configurator>
		<div className="App-header flex gap-5">
			<p className='font-bold'>
				Rate this App:
			</p>
			<RatingContainer></RatingContainer>
		</div>
	</div>
  );
}

export default App;
