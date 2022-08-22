import React, { useEffect } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import moment from 'moment'; 

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import useStyles from "./styles"
import {  useDispatch  } from 'react-redux';
import { deletePost  , likePost  } from '../../../actions/posts';
import {  useLocation  } from 'react-router-dom'

const Post = ({  post , setCurrentId   }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const location = useLocation();

  useEffect(() => {
    
  } , [location]);

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
       <div className={classes.overlay}>
        <Typography variant="h6">{  post.name  }</Typography>
        <Typography variant="body2">{  moment(post.createdAt).fromNow()  }</Typography>
       </div>
       {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
      <div className={classes.overlay2}>
        <Button onClick={() => setCurrentId(post._id)} style={{ color: 'white' }} size="small">
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div>
      )}
       <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
       </div>
        <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
       <CardContent>
        <Typography variant="body2" color="textSecondary" gutterBottom>{post.message}</Typography>
       </CardContent>

       <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" onClick={() => {dispatch(likePost(post._id))}}>
          <ThumbUpIcon fontSize="small" /> 
          <div style={{marginLeft:"10%" , marginTop: "2%"}}>{post.likes.length}</div>
        </Button>
         {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
        <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
          <DeleteIcon fontSize="small" /> 
        </Button>
        )}
       </CardActions>
    </Card>
  )
}

export default Post