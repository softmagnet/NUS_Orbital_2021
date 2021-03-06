import React, { useState } from "react";
import {
    makeStyles,
    IconButton,
    Tooltip,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Dialog,
    Button
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { db, storage } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import "firebase/firestore";
import firebase from "firebase/app";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Card from './Card'

const useStyles = makeStyles((theme) => {
    return {
        delete: {
            "&:hover": {
                color: theme.palette.secondary.main,
            },
        },
    };
});

export default function AdminCard({ data }) {

    const { id, timestamp, imageuid, images } = data;
    const classes = useStyles();
    const { currentUser, currentUserData, setCurrentUserData } = useAuth();
    const history = useHistory()
    const userRef = currentUser
        ? db.collection("users").doc(currentUser.uid)
        : null;
    const [confirmDialog, setConfirmDialog] = useState(false);
    const [deleting, setDeleting] = useState(false)
    const timeStamp = timestamp.toDate()

    const handleDelete = async () => {

        setDeleting(true)

        const posts = [...currentUserData.posts]
        const index = posts.indexOf(id);
        if (images.length > 0) {
            for (const image of images) {
                await storage.ref(`images/${imageuid}/${image}`).delete()
            }
        }
        
        await db.collection("posts").doc(id).delete();
        await userRef
            .update({
                posts: firebase.firestore.FieldValue.arrayRemove(id),
            })
            .then(() => {
                posts.splice(index, 1);
                console.log("setting currentUserData")
                setCurrentUserData({
                    ...currentUserData,
                    posts,
                });
            });

        setDeleting(false)
        setConfirmDialog(false)
        history.push('/home/myposts')
    };

    function action() {
        return (
            <div>
                <IconButton 
                    color="primary"
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        history.push(`/editpost/${id}`)
                    }}
                >
                    <Tooltip title="Edit Post">
                        <EditIcon style={{ fontSize: 24 }} />
                    </Tooltip>
                </IconButton>
                <IconButton
                    className={classes.delete}
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setConfirmDialog(true)
                    }}
                >
                    <Tooltip title="Delete Post">
                        <DeleteIcon style={{ fontSize: 24 }} />
                    </Tooltip>
                </IconButton>
                <Dialog
                open={confirmDialog}
                onClose={() => setConfirmDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Confirm delete"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this post?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button 
                            disabled={deleting} 
                            color="primary"
                            onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                handleDelete()
                            }} 
                        >
                            Yes
                        </Button>
                        <Button
                            onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                setConfirmDialog(false)
                            }}
                            color="primary"
                        >
                            No
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            
        )
    }

    return (
        <Card data={data} action={action()} timeStamp={timeStamp} />
    );
}