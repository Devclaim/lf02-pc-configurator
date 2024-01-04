import React from 'react';
import './App.css';
import { Configurator } from './AppElements/Configurator';
import ZoomableImage from './AppElements/ZoomableImage';
import diagram_adv1 from './diagram_adv1.png';
import diagram_adv2 from './diagram_adv2.png';
import diagramBase from './diagram-base.png';
import useCaseDiagram from './PC-KonfiguratorUseCaseDiagramm.png'

function App() {
  return (
	<div className="App">
	  	<header className="App-header">
			<p className='font-bold'>
				LF02N8 pc-configurator
			</p>
			<span className='text-2xl'>
				Built with React+TypeScript
			</span>
		</header>
		<Configurator></Configurator>
		<div className="App-header">
			<p className='font-bold'>
				Extras
			</p>
		</div>
	</div>
  );
}

export default App;
