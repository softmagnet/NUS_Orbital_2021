import { Grid, makeStyles, CircularProgress, Typography, Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import AdminCard from '../components/cards/AdminCard';
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'
import PageHeader from '../components/PageHeader';
import AllInboxRoundedIcon from '@material-ui/icons/AllInboxRounded';
import { useHistory, Link }  from 'react-router-dom'

import Masonry from 'react-masonry-css';

import './css/Bookmarks.css'

const useStyles = makeStyles((theme) => {
    return {
        page: {
            marginTop: theme.spacing(3),
        },
        homeResults: {
            height: '100%',
            width: '80%',            
            margin: 'auto auto',
            padding: theme.spacing(5)
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

export default function MyPosts({ selected, setSelected }) {
    console.log("render myposts")
    const classes = useStyles();
    const { currentUser, currentUserData } = useAuth()
    const [posts, setPosts] = useState([]);
    const [render, setRender] = useState(false)
    const history = useHistory()
    const breakpointColumnsObj = {
        default: 2,
        850: 1
    }
    
    //sends query to backend when first mounting
    useEffect(async () => {
        console.log("inside useEffect of mypost")
        if (!currentUser) {
            history.push('/login')
        } 

        if (selected !== 2) {
            setSelected(2)
        }

        async function fetch() {
            let renderList = []
            for (const post of currentUserData.posts) {
                const postData =  await db.collection("posts").doc(post).get().then(res => res.data())
                    renderList.push({...postData, id: post})
            }
            setPosts(renderList)
        }
        await fetch()
        setRender(true)
    }, [currentUserData])

    const renderContent = () => {
        if (!render) {
            return <CircularProgress className={classes.loading}/>
        }
        return (
            <div>
                <div className={classes.page}>
                    <PageHeader 
                        title="My Posts"
                        icon={<AllInboxRoundedIcon fontSize="large"/>}
                    />
                    { posts.length === 0 &&
                        <div align="center">        
                            <Typography variant="h2" style={{marginTop: 100, marginBottom: 10, fontSize: 40}}>
                                No posts
                            </Typography>
                            <Typography variant="h6">
                                You can create post 
                                <Link to="/newpost" className={classes.link}>
                                    <b>
                                    here
                                    </b>
                                </Link>
                            </Typography>
                        </div>
                    }       
                    <Container>
                        <div className="container">
                        <Masonry
                                breakpointCols={breakpointColumnsObj}
                                className="my-masonry-grid"
                                columnClassName="my-masonry-grid_column"
                                >
                                {posts.map((data, index) => {
                                    return (
                                    <Grid key={index} >
                                        <AdminCard data={data}/>
                                    </Grid>
                                )})} 
                        </Masonry> 
                        </div>
                    </Container>
                </div>
            </div>
        )
    }

    return renderContent()
}

