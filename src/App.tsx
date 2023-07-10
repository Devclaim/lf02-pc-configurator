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
		<div className='bg-gray-600 min-h-[150vh] flex flex-col gap-10 sm:py-10'>
			<ZoomableImage
				src={diagramBase}
				descr="UML Diagram Simplified"
			/>
			<ZoomableImage
				src={diagram_adv1}
				descr='UML Diagram +Filters'
			/>
			<ZoomableImage
				src={diagram_adv2}
				descr='UML Diagram +Filters +CompatibilityFunc'
			/>
			<ZoomableImage
				src={useCaseDiagram}
				descr='Use Case Diagram'
			/>
		</div>
	</div>
  );
}

export default App;
