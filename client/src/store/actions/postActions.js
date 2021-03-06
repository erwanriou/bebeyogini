import axios from "axios"
import { POSTS_FETCHED, POST_FETCHED, GET_ERRORS } from "./types"
import { loading, clearLoading } from "./loadingActions"

export const fetchPosts = () => async dispatch => {
  dispatch(loading())
  try {
    const res = await axios.get("/api/posts")
    dispatch({
      type: POSTS_FETCHED,
      payload: res.data
    })
  } catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data
    })
  }
  dispatch(clearLoading())
}

export const fetchPost = title => async dispatch => {
  dispatch(loading())
  try {
    const res = await axios.get(`/api/posts/post/${title}`)
    dispatch({
      type: POST_FETCHED,
      payload: res.data
    })
  } catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data
    })
  }
  dispatch(clearLoading())
}

export const fetchEditPost = id => async dispatch => {
  dispatch(loading())
  try {
    const res = await axios.get(`/api/posts/edit/${id}`)
    dispatch({
      type: POST_FETCHED,
      payload: res.data
    })
  } catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data
    })
  }
  dispatch(clearLoading())
}

// DELETE POST BY ID
export const deletePost = id => async dispatch => {
  dispatch(loading())
  try {
    await axios.delete(`/api/posts/delete/${id}`)
    const res = await axios.get("/api/posts")
    dispatch({
      type: POSTS_FETCHED,
      payload: res.data
    })
  } catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data
    })
  }
}

export const sendPost = (values, file, history) => async dispatch => {
  dispatch(loading())
  if (file !== null) {
    const uploadConfig = await axios.get("/api/posts/upload")
    delete axios.defaults.headers.common["Authorization"]

    await axios.put(uploadConfig.data.url, file, {
      headers: {
        ContentType: file.type
      }
    })

    const token = localStorage.getItem("jwtToken")
    axios.defaults.headers.common["Authorization"] = token
    await axios.post("/api/posts/new", {
      ...values,
      imageUrl: uploadConfig.data.key
    })
  } else {
    await axios.post("/api/posts/new", {
      ...values
    })
  }
  dispatch(fetchPosts())
  history.push("/dashboard")
}
