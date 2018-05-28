// @flow

import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import createElectronStorage from 'redux-persist-electron-storage'
import thunkMiddleware from 'redux-thunk'

import rootReducer from './reducers/index'

const isDev = process.mainModule.filename.indexOf('app.asar') === -1
const persistConfig = {
  key: 'root',
  storage: createElectronStorage(),
  stateReconciler: autoMergeLevel2,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  const middlewares = [thunkMiddleware]

  if (isDev) {
    const { createLogger } = require('redux-logger')
    const logger = createLogger({ collapsed: true })
    middlewares.push(logger)
  }
  const store = createStore(persistedReducer, applyMiddleware(...middlewares))
  const persistor = persistStore(store)
  return { store, persistor }
}
