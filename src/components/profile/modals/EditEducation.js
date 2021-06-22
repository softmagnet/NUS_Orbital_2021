import { Button, Grid, InputLabel, makeStyles, Paper } from '@material-ui/core'
import React from 'react'
import firebase from "firebase/app"
import Controls from "../../Controls"
import { useForm, Form } from '../../useForm'
import { eduYearEnd, eduYearStart } from '../../Selections'
import { useAuth } from '../../../contexts/AuthContext'
import { db } from '../../../firebase'

const useStyles = makeStyles(() => {
    return {
        flex: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        root: {
            padding: '50px',
            position: 'absolute',
            width: "70%",
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
        }

    }
});


export default function EditEducation({ handleClose, open }) {
    const classes = useStyles()
    
    const initialFValues = {       
        institution: '',
        from: '',
        to: ''
    }

    const { currentUser, setCurrentUserData } = useAuth() 

    const {
        values,
        handleInputChange
    } = useForm(initialFValues);

    const handleSubmit = async (e) => {
        e.preventDefault()

        //update db
        await db.collection('users').doc(currentUser.uid).update({
            education: firebase.firestore.FieldValue.arrayUnion(values)
        })


        await db.collection('users').doc(currentUser.uid).get().then(res => {
            setCurrentUserData(res.data())
        })
        
        //update local => causes infiniteloop when creating duplicate
        
        // setCurrentUserData({
        //     ...currentUserData,
        //     education: [
        //         ...currentUserData.education,
        //         values
        //     ]
        // })
        
        handleClose()

    }

    return (
        <Paper className={classes.root}>
            <Form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} >
                        <InputLabel align="left" style={{marginLeft: '10px'}}> 
                            Institution
                        </InputLabel>
                        <Controls.Input
                            style={{paddingRight: '10px'}}
                            fullWidth
                            name={"institution"}
                            value={values.institution}
                            variant="outlined"
                            onChange={handleInputChange}
                        />
                    </Grid>
                    
                    <Grid item xs={6} sm={3}>
                        <InputLabel align="left" style={{marginLeft: '10px'}}> 
                            From
                        </InputLabel>
                        <Controls.Select
                            name={"from"}
                            value={values.from}
                            variant="outlined"
                            onChange={handleInputChange}
                            options={eduYearStart()}
                        />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <InputLabel align="left" style={{marginLeft: '10px'}}> 
                            To
                        </InputLabel>
                        <Controls.Select
                            name={"to"}
                            value={values.to}
                            variant="outlined"
                            onChange={handleInputChange}
                            options={eduYearEnd()}
                        />
                    </Grid>
                </Grid>
                <br />
                <div align="center">
                    <Button
                        variant="contained"
                        color="primary"
                        style={{marginRight: '10px', width: '100px'}}
                        type="submit"
                    >
                        add
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        style={{ width: '100px'}}
                        onClick={handleClose}
                    >
                        cancel
                    </Button>
                </div>       
            </Form>            
        </Paper>
    )
}
