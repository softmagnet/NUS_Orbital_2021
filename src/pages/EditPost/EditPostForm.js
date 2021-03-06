import { useForm } from '../../components/useForm'
import { PartA } from './PartA'
import { PartB } from './PartB'
import { PartC } from './PartC'
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';
import PageHeader from '../../components/PageHeader';
import { makeStyles, Stepper, CircularProgress, Step, StepLabel } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext'
import { useHistory }  from 'react-router-dom'
import { db } from '../../firebase'
import { convertFromRaw, EditorState } from 'draft-js'


const useStyles = makeStyles((theme) => ({
  root: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  layout: {
    //borderRadius: "10px",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
    background: "inherit"
  },
  loading: {
    position: 'absolute',
    left: '50%',
    top: '50%',
  },
}))

const steps = ['Basic Information', 'Additional Information', 'Description']

export const EditPostForm = ({ data }) => {

  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const { currentUser } = useAuth()
  const history = useHistory()
  const [docRef, setDocRef] = useState(null)
  const [render, setRender] = useState(false)
  const uid = data.imageuid
  const contentState = convertFromRaw(data.description)
  const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState))

  useEffect(() => {
    if (currentUser) {
        const fetched = db.collection('posts').doc(data.id)
        setDocRef(fetched)
        fetched.get().then(doc => {
            const author = doc.data().author
            //if user is not author redirect to homepage
            if (author !== currentUser.uid) {
                alert("You can only edit your own posts")
                history.push('/home')   
            } else {
                setRender(true)
            }
        })
    //if no user is logged in redirect to homepage
    } else {
        alert("You can only edit your own posts")
        history.push('/home')
    }
  }, [currentUser, data.id, history])

  const initialFValues = {
    type: data.type,
    category: data.category,
    title: data.title,
    skills: data.skills,
    education: data.education, 
    location: data.location,
    start: data.start.toDate(),
    end: data.end.toDate(),  
    current: data.current,
    total: data.total,
    description: data.description
  }

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange
  } = useForm(initialFValues)

  const props = { values, setValues, errors, setErrors, handleInputChange, setActiveStep, docRef, editorState, setEditorState, uid }

  function getStepContent(step) {
    switch(step) {
      case 0:
        return <PartA {...props}/>
      case 1:
        return <PartB {...props}/>
      case 2: 
        return <PartC {...props}/>
      default:
        return "Invalid Part"
    }
  }

  const renderContent = () => {
    if (!render) {
        return <CircularProgress className={classes.loading}/>
    }
    return (
      <main className={classes.root}>
        <div className={classes.layout}>
        { activeStep === 0 &&
          <PageHeader 
            title="Edit Your Post"
            subTitle="Change the fields below as required"
            icon={<CreateTwoToneIcon fontSize="large"/>}
          />
        }
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {getStepContent(activeStep)}
        </div>
      </main>  
    )
  }
  return renderContent()
}

  