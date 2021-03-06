import { Tooltip, Zoom, makeStyles, Typography, Chip, Modal, IconButton } from '@material-ui/core';
import React from 'react'
import EditIcon from '@material-ui/icons/Edit';

import EditSkills from './modals/EditSkills'

const useStyles = makeStyles((theme) => {
    return {
        root: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            '& > *': {
              margin: theme.spacing(0.5),
            },
        },
        title: {
            paddingBottom: '10px',
            borderBottom: '2px solid #4C4556',
            margin: '20px auto'
        }
    }
});


export default function Skills({ userData, enableEdit }) {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false)
    }

    const skillList = userData.skills.map((skill, index) => {
        return <Chip style={{backgroundColor: '#d9bda5'}}  key={index} label={skill} />
    })

    const toRender = (
        <div className={classes.root}>
            {skillList}
        </div>
    )

    const renderEdit = () => {
        if (enableEdit) {
            return (
                <Tooltip title="Edit Skills" placement="right" TransitionComponent={Zoom} TransitionProps={{ timeout: 300 }}>
                    <IconButton onClick={() => setOpen(true)}>
                        <EditIcon  color="primary"/>
                    </IconButton>
                </Tooltip>
            )
        }
    }


    return (
        <div style={{marginBottom: '30px'}}> 
            <Typography className={classes.title} color="primary" variant="h4">
                Skills
                {renderEdit()}
            </Typography> 
            <Modal
                open={open}
                onClose={null}
            >   
                <div>
                    <EditSkills skills={userData.skills} handleClose={handleClose} open={open}/>
                </div>
            </Modal>
            {toRender}
        </div>
    )
}
