import * as api from "../api";
import {  CREATE , UPDATE  , DELETE , LIKE , FETCH_ALL  } from "../constants/actionTypes.js";

//Action Creators -> functions that return actions

//Action Creators may have to deal with data that require some time(fetching data from db)
//due to this getPosts returns an async function
//This is a property of redux-thunk
export const getPosts = () => async (dispatch) => {
  try{
    const {  data  } = await api.fetchPosts();
    dispatch({  type: FETCH_ALL , payload: data  });
  }
  catch(error){
    console.log(error);
  }
}

export const createPost = (post) => async (dispatch) => {
  try {
    const { data }  = await api.createPosts(post);
    dispatch({  type: CREATE , payload: data});
  } catch (error) {
    console.log(error);
  }
}

export const updatePost = (id , updatedpost) => async (dispatch) => {
  try {
    const {  data  } = await api.updatePost(id , updatedpost);

    dispatch({  type: UPDATE , payload: data  });
  } catch (error) {
    console.log(error);
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({  type: DELETE , payload: id});
  } catch (error) {
    console.log(error);
  }
} 

export const likePost = (id) => async (dispatch) => {
  try {
    const {  data  } = await api.likePost(id);

    dispatch({  type: LIKE , payload: data  });


  } catch (error) {
    console.log(error);
  }
}