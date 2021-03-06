import React from 'react';
import {  Tooltip, Zoom, IconButton, makeStyles, Modal, Typography } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddEducation from './modals/AddEducation'
import EducationBlock from './EducationBlock'

const useStyles = makeStyles((theme) => {
    return {
        title: {
            paddingBottom: '10px',
            borderBottom: '2px solid #4C4556',
            margin: '20px auto'
        }
    }
});

function Education({ userData, enableEdit }) {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);

    const educationList = userData.education.map((edu, index) => {
        return (
            <div key={index}>
                <EducationBlock index={index} institution={edu.institution} from={edu.from} to={edu.to} enableEdit={enableEdit}/>
            </div>
        )
    })

    const handleClose = () => {
        setOpen(false)
    }

    const renderAdd = () => {
        if (enableEdit) {
            return (
                <div align="center">
                    <Tooltip title="Add education" TransitionComponent={Zoom} TransitionProps={{ timeout: 300 }}>
                        <IconButton onClick={() => setOpen(true)} size="medium">
                            <AddCircleOutlineIcon color="primary" fontSize="large" />
                        </IconButton> 
                    </Tooltip>
                </div>
            )
        }
    }

    return (
        <div style={{marginBottom: '50px'}}>
                <Typography className={classes.title} color="primary" variant="h4">
                    Education
                </Typography>
                <Modal
                    open={open}
                    onClose={null}
                >
                    <div>
                        <AddEducation handleClose={handleClose} open={open}/>
                    </div>
                </Modal>
                {educationList}
                {renderAdd()}
        </div>
    );
  }
  
  export default Education;
  