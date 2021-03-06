import { Grid, makeStyles, CircularProgress, Typography, Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import BookmarkedCard from '../components/cards/BookmarkedCard';
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import PageHeader from '../components/PageHeader';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import { useHistory, Link }  from 'react-router-dom'
import firebase from 'firebase/app';
import { UnbookmarkSnackBar } from '../components/SnackBar'

import Masonry from 'react-masonry-css';

import './css/Bookmarks.css'

const useStyles = makeStyles((theme) => {
    return {        
        page: {
            marginTop: theme.spacing(3),
        },
        loading: {
            position: 'absolute',
            left: '50%',
            top: '50%',
        },
        link: {
            marginLeft: '7px',
            textDecoration: 'none',
            color: 'black',
            fontSize: '23px'
        }
    }
});

export default function MyBookmarks({ selected, setSelected }) {
    console.log("render bookmarks")
    const classes = useStyles();
    const { currentUser, currentUserData } = useAuth()
    const [posts, setPosts] = useState([]);
    const [render, setRender] = useState(false)
    const [open , setOpen] = useState(false)
    const history = useHistory()
    const breakpointColumnsObj = {
        default: 2,
        850: 1
    }
    /*
        every deletions triggers another fetch action
        and for some reason mybookmarks is rendered three times
    */

    useEffect(async () => {
        if (!currentUser) {
            return history.push('/login')
        }
        if (selected !== 1) {
            setSelected(1)
        }
        
        async function fetch() {
            let renderList = []
            for (const post of currentUserData.bookmarks) {
                const postData =  await  db.collection("posts").doc(post).get().then(res => res.data())
                if (postData) {
                    renderList.push({...postData, id: post})
                } else {
                    await db.collection("users").doc(currentUser.uid).update({
                        bookmarks: firebase.firestore.FieldValue.arrayRemove(post)
                    })
                } 
            }
            setPosts(renderList)
        }
        await fetch()
        if (!render) {
            setRender(true)
        }
    }, [currentUser, currentUserData.bookmarks, history, render]) 

    const renderContent = () => {
        if (!render) {
            return <CircularProgress className={classes.loading}/>
        }
        return (
            <div className={classes.page}>
                <PageHeader 
                    title="My Bookmarks"
                    icon={<BookmarksIcon style={{fontSize: "28" }}/>}
                />
                { posts.length === 0 &&
                    <div align="center">        
                        <Typography variant="h2" style={{marginTop: 100, marginBottom: 10, fontSize: 40}}>
                            No bookmarked posts
                        </Typography>
                        <Typography variant="h6">
                            You can bookmark posts from the 
                            <Link to="/" className={classes.link}>
                                <b>
                                    explore page
                                </b>
                            </Link>
                            
                        </Typography>
                    </div>
                }
                <Container>
                <div className="container" >
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column">
                        {posts.map((data, index) => {
                                return ( 
                                <Grid key={index}>
                                    <BookmarkedCard data={data} setOpen={setOpen}/>
                                </Grid>
                            )})}
                    </Masonry>  
                </div>
                </Container>
                <UnbookmarkSnackBar open={open} setOpen={setOpen}/>
            </div>
        )
    }

    return renderContent()
}

