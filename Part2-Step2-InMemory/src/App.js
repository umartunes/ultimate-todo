import React, { Component, Fragment } from 'react'

import './css/normalize.css'
import 'materialize-css/dist/css/materialize.min.css'
import './css/materialize-extra.css'
import './css/global.css'
import './css/custom.css'

// import M from 'materialize-css/dist/js/materialize.min.js'

import InitializeApp from './components/InitializeApp'
import Routes from './components/Routes'

class App extends Component {

	render() {

		return (
			<Fragment>

				<InitializeApp />
				<Routes />

			</Fragment>
		);
	}

}

export default App;
