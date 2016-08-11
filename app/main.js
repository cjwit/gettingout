import React from 'react'
import { render } from 'react-dom'
import Root from './containers/Root'

render(
	<Root />,
	document.getElementById('root')
)

/*
import configureStore from './configureStore.js'
import { fetchListingsIfNeeded } from './actions'

let store = configureStore()
let unsubscribe = store.subscribe(() =>
	console.log(store.getState())
)

console.log(store.getState())
store.dispatch(fetchListingsIfNeeded('Rochester NY'))

unsubscribe()
*/
