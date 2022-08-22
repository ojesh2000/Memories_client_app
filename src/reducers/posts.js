import {  CREATE , UPDATE  , DELETE , LIKE , FETCH_ALL  } from "../constants/actionTypes.js";
//posts is the state
const reducer = (posts = [] , action) => {
  switch(action.type) {
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...posts , action.payload];//adds payload to the posts array 
    case UPDATE:
    case LIKE:
      return posts.map((post) => post._id === action.payload._id ? action.payload : post);//map returns an array. We will update the post and return the array
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
}

export default reducer;