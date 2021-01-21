// action creators
import jsonPlaceholder from "../apis/jsonPlaceholder";
import _ from 'lodash'

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  // our components will now just call THIS action creator
  // we need to make sure this still has an action that will get dispatched at the end of the day
  // we have to pass the result of calling the action creator into dispatch
  await dispatch(fetchPosts())  // Tip: redux thunk will pick up any function that we dispatch
  // note: await here is going to make sure we wait for this request to be completed before we move on and do anything else here

  // use lodash to manage pulling out userIds from posts
  const userIds = _.uniq(_.map(getState().posts, 'userId'))  // this will return an array with just the unique user IDs
  userIds.forEach(id => dispatch(fetchUser(id)))

}

export const fetchPosts = () => async dispatch => {
  console.log(`REQUESTING POSTS...`, )
  const response = await jsonPlaceholder.get('/posts')
  console.log(`\n\n POSTS RESPONSE: `, response)
  dispatch({type: 'FETCH_POSTS', payload: response.data})
}


// need to memoize the function
export const fetchUser = (id) => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`)
  dispatch({type: 'FETCH_USER', payload: response.data})
}



/*
export const fetchUser = (id) => dispatch => {
  _fetchUser(id, dispatch)
}

const _fetchUser = _.memoize(async (id, dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`)
  dispatch({type: 'FETCH_USER', payload: response.data})

})*/