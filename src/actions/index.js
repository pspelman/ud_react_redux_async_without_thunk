// action creators
import _ from 'lodash'
import jsonPlaceholder from "../apis/jsonPlaceholder";


export const fetchPosts = () => async dispatch => {
  console.log(`REQUESTING POSTS...`, )
  const response = await jsonPlaceholder.get('/posts')
  console.log(`\n\n POSTS RESPONSE: `, response)
  dispatch({type: 'FETCH_POSTS', payload: response.data})
}


// need to memoize the function
export const fetchUser = (id) => dispatch => {
  _fetchUser(id, dispatch)
}

const _fetchUser = _.memoize(async (id, dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`)
  dispatch({type: 'FETCH_USER', payload: response.data})

})