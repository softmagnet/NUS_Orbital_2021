import React from 'react';
import { Zoom, IconButton, Tooltip, InputLabel, makeStyles, Modal, TextField, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import EditBasicInfo from './modals/EditBasicInfo'
import HelpIcon from '@material-ui/icons/Help';


const useStyles = makeStyles((theme) => {
    return {
        flex: {
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between'
        },
        sectionHeader: {
            borderBottom: '2px solid #4C4556',
            margin: '20px 0px',
            
        },
        
    }
});

function cutDate(str) {
    const commaIndex = str.indexOf(',')
    return str.substring(0, commaIndex)


}

function BasicInfo({ userData, enableEdit }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false)
    }

    const dob = userData.basicInfo.dateOfBirth
        ? cutDate(userData.basicInfo.dateOfBirth.toDate().toLocaleString())
        : ""

    

    const renderEdit = () => {
        if (enableEdit) {
            return (
                <Tooltip title="Edit basic info" placement="right" TransitionComponent={Zoom} TransitionProps={{ timeout: 300 }}>
                    <IconButton onClick={() => setOpen(true)}>            
                        <EditIcon color="primary"/>
                    </IconButton>
                </Tooltip>
            )
        }
    }

    const { showEmail } = userData.basicInfo  

    function renderEmail() {
        if (enableEdit) {
            return (
                <div style={{flex: '2'}}>
                    <div className={classes.flex} style={{alignItems: 'flex-end'}}>
                        <div style={{flex: 4}}>
                        <InputLabel>Email</InputLabel> 
                            <TextField  value={userData.email}   InputProps={{readOnly: true}} fullWidth />   
                        </div>
                        <div style={{flex: 3}}>
                                {!showEmail && (
                                    <Tooltip title="Your email is hidden and is only visible to you, you can change your setting by clicking on edit" placement="bottom">
                                        <HelpIcon style={{height: '30px', width: '30px'}}/>
                                    </Tooltip>
                                )}
                        </div>
                    </div>
                </div>
            )
        }
        return (
            <div style={{flex: '2'}}>
                <div className={classes.flex} style={{alignItems: 'flex-end'}}>
                    <div style={{flex: 4}}>
                    <InputLabel>Email</InputLabel> 
                        <TextField  value={showEmail ? userData.email : ""}   InputProps={{readOnly: true}} fullWidth />   
                    </div>
                    <div style={{flex: 3}}>
                        {!showEmail && (
                            <Tooltip title="This user's email has been hidden" placement="bottom">
                                <HelpIcon style={{height: '30px', width: '30px'}} />
                            </Tooltip>
                        )}
                    
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div style={{marginBottom: '50px'}}>
                <Typography className={classes.sectionHeader} color="primary" variant="h4">
                    Basic Info
                    {renderEdit()}
                </Typography>

                <Modal
                    open={open}
                    onClose={null}
                >   
                    <div style={{overflowY: "scroll"}}>
                        <EditBasicInfo email={userData.email} basicInfo={userData.basicInfo} handleClose={handleClose} open={open}/>
                    </div>
                </Modal>
        
                <form  align="left" noValidate autoComplete="off" onSubmit={null}>
                    <div className={classes.flex}>
                        <div style={{flex: '1'}}>
                            
                            <InputLabel>First Name</InputLabel>     
                            <TextField  value={userData.basicInfo.firstName}  InputProps={{readOnly: true}}/>
                        </div>
                        <div style={{flex: '1'}}>
                            <InputLabel>Last Name</InputLabel> 
                            <TextField  value={userData.basicInfo.lastName}  InputProps={{readOnly: true}}/>   
                        </div>                        
                        <div style={{flex: '1'}}>
                            <InputLabel>Gender</InputLabel> 
                            <TextField  value={userData.basicInfo.gender}  InputProps={{readOnly: true}}/>   
                        </div>              
                    </div>
                    <br />
                    <div className={classes.flex}>
                        <div style={{flex: '1'}}>
                            <InputLabel>Date of Birth</InputLabel> 
                            <TextField  value={dob}  InputProps={{readOnly: true}} />   
                        </div>
                    {renderEmail()}
                            
                            
                                      
                    </div>
                    <br />
                    <div style={{display: 'flex', justifyContent: 'left'}}>
                        <div style={{flex: '1'}}>
                            <div>
                            <InputLabel>Location</InputLabel> 
                            <TextField  value={userData.basicInfo.location}   InputProps={{readOnly: true}} />   
                            </div>                                
                            
                        </div>
                        <div style={{flex: '1'}}>
                            <div>
                            <InputLabel>Nationality</InputLabel> 
                            <TextField   value={userData.basicInfo.nationality}    InputProps={{readOnly: true}} />   
                            </div>        
                        </div>
                        <div style={{flex: '1'}}></div>
                    </div>

                    <br />
                    <br />           
                    <InputLabel style={{marginBottom: '10px'}}>About me</InputLabel> 
                    <TextField
                        id="outlined-read-only-input"
                        value={userData.basicInfo.bio}
                        multiline
                        rows="4"
                        fullWidth                    
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="outlined"
                    />
                    

                </form>
               
            
        </div>
    );
  }
  
  export default BasicInfo;
  