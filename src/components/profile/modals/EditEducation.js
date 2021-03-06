
import { Button, FormHelperText, Typography, Grid, IconButton, InputLabel, makeStyles, Paper, withStyles, Select, MenuItem } from '@material-ui/core'
import React, {useState} from 'react'

import firebase from "firebase/app"
import Controls from "../../Controls"
import { useForm, Form } from '../../useForm'
import { eduYearEnd, eduYearStart } from '../../Selections'
import { useAuth } from '../../../contexts/AuthContext'
import { db } from '../../../firebase'


import MuiTextField from "@material-ui/core/TextField";



function getYears() {
    const options = []
    for (let i = 2000; i < 2025; i++) {
        options.push(
            <MenuItem value={i}>{i}</MenuItem>
        )
    }
    return options
}

function getYearsEnd() {
    const options = []
    for (let i = 2028; i > 2000; i--) {
        options.push(
            <MenuItem value={i}>{i}</MenuItem>
        )
    }
    return options
}



const useStyles = makeStyles((theme) => {

    return {
        flex: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        root: {
            padding: '30px',
            position: 'absolute',
            width: "500px",
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#f6eee3',
            overflowY: 'auto'
        }

    }
});

const TextField = withStyles({
    root: {
        margin: "0px",
    },
})(MuiTextField);

export default function EditEducation({ info, index, handleClose }) {
    const classes = useStyles()
    
    const initialFValues = info

   
    const { currentUser, currentUserData, setCurrentUserData } = useAuth() 
    const [loading, setLoading] = useState(false)


    const {
        values,
        handleInputChange,
        setErrors,
        errors
    } = useForm(initialFValues);

    const validate = () => {
        let temp = {}
        temp.institution = values.institution ? "" : "This field is required"
        temp.from = values.from ? "" : "This field is required"
        temp.to = values.to ? "" : "This field is required"
        setErrors({
          ...temp
        })
    
        return Object.values(temp).every(x => x === "");
      }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validate()) {
            return 
        }

        setLoading(true)

        let { education } = currentUserData
        education[index] = values


        //update db
        await db.collection('users').doc(currentUser.uid).update({
            education
        })


        setCurrentUserData({
          ...currentUserData,
          education
      })
        
        setLoading(false)
        handleClose()

    }

    

    

    return (
        <Paper className={classes.root}>
                <Typography align="center" variant="h4" style={{marginBottom: '15px'}}>
                    Edit Education
                </Typography>
                <div id="container">
                    <div id="institution">
                        <InputLabel align="left"> 
                            <Typography color={ errors.institution ? "secondary" : ""}>
                            Institution
                            </Typography>
                        </InputLabel>
                        <TextField 
                            fullWidth
                            name={"institution"}
                            value={values.institution}
                            onChange={handleInputChange}
                            variant="filled"
                            error={errors.institution}
                            helperText={errors.institution}
                        />
                    </div>
                    <br />
                    <div id="years" style={{display: 'flex'}}>
                    <div id="start" style={{flex: 1}}>
                        <InputLabel align="left" > 
                            <Typography
                                color={ errors.from ? "secondary" : ""}
                            >
                                From
                            </Typography>
                            
                        </InputLabel>
                        <Select
                            fullWidth
                            name={"from"}
                            value={values.from}
                            variant="filled"
                            onChange={handleInputChange}
                            error={errors.from}
                        >
                            {getYears()}

                        </Select>
                        <FormHelperText style={{marginLeft: '10px'}}>
                            <Typography
                                color={ errors.from ? "secondary" : ""}
                                style={{
                                    fontSize: '12px'
                                }}
                            >
                                {errors.from}
                            </Typography>
                        </FormHelperText>
                    </div>
                    <div style={{flex: '0.2'}}></div>
                    <div id="end" style={{flex: 1}}>
                        <InputLabel align="left" > 
                            <Typography
                                color={ errors.to ? "secondary" : ""}
                            >
                                To
                            </Typography>
                        </InputLabel>
                        <Select
                            fullWidth
                            name={"to"}
                            value={values.to}
                            variant="filled"
                            onChange={handleInputChange}
                            error={errors.to}
                        >
                            {getYearsEnd()}
                        </Select>
                        <FormHelperText style={{marginLeft: '10px'}}>
                            <Typography
                                color={ errors.to ? "secondary" : ""}
                                style={{
                                    fontSize: '12px'
                                }}
                            >
                                {errors.to}
                            </Typography>
                        </FormHelperText>
                        
                    </div>
                    </div>
                    <br />
                    

                </div>
            
                <br />
                <div align="center">
                    <Button
                        disabled={loading}
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                        style={{marginRight: '10px', width: '100px'}}
                        type="submit"
                    >
                        save
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
        </Paper>
    )
}
