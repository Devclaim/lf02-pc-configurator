import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
	<div className="App">
	  <header className="App-header">
		<img src={logo} className="App-logo" alt="logo" />
		<p>
			pc-configurator
		</p>
		<p>
			Features
		</p>
		<p>
			Konfiguration eines Dekstop-PCs
		</p>
		<p>
			Nicht Kompatible Komponenten ausblenden
		</p>
		<p>
			Automatische Errechnung des Gesamtpreises
		</p>
		<p>
			Filterfunktion für Komponenten
		</p>
	  </header>
	</div>
  );
}

export default App;
