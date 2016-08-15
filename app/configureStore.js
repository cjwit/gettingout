import thunkMiddleware from 'redux-thunk'
import { apiMiddleware } from 'redux-api-middleware'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'

const loggerMiddleware = createLogger()

export default function configureStore(preloadedState) {
	return createStore(
		reducer,
		applyMiddleware(
			thunkMiddleware,
			apiMiddleware,
			loggerMiddleware
		)
	)
}
