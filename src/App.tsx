import React from 'react';
import './App.css';
import { Configurator } from './AppElements/Configurator';

function App() {
  return (
	<div className="App">
	  <header className="App-header">
			<p className='font-bold'>
				LF02N8 pc-configurator
			</p>
		</header>
		<Configurator></Configurator>
	</div>
  );
}

export default App;
