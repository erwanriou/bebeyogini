import { combineReducers } from 'redux'
import { localizeReducer } from 'react-localize-redux'
import { activeReducer } from 'redux-active'
import { reducer as formReducer } from 'redux-form'
import authReducer from './authReducer'
import postReducer from './postReducer'
import errorReducer from './errorReducer'

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  posts: postReducer,
  form: formReducer,
  localize: localizeReducer,
  isActive: activeReducer,
})
