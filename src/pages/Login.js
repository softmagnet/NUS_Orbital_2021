import React, { useState } from 'react';
import { Button, Container, CssBaseline, FormControl, Typography, OutlinedInput, Grid, makeStyles } from '@material-ui/core';
import { useHistory, Link } from 'react-router-dom';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import { useAuth } from '../contexts/AuthContext';
import Alert from '@material-ui/lab/Alert';
import PageHeader from '../components/PageHeader';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    label: {
        textAlign: "left",
        marginLeft: "20px"
    },
    field: {
        background: "white",
        borderRadius: "4px",
        outline: "none",
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: "none",
        '&:hover':{
            textDecoration: "underline",
        }
    },
  }));

function Login() {

    const classes = useStyles()

    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [emailError, setEmailError] = useState(false)
    

    const onEmailChange = (e) => {        
        setEmail(e.target.value);
    }

    const onPasswordChange = (e) => {        
        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError(false)

        if (!email) {
            setError("You have not entered an email")
            return setEmailError(true)
        }
        
        try {
            setLoading(true)
            setError('')
            await login(email, password)
            history.push('/home')
        } catch (err) {
            if (err.message === "The email address is badly formatted.") {
                setEmailError(true)
                setError(err.message)
                return setLoading(false)
            }
            setError(err.message)
        }

        setLoading(false)
    }

    return (
        <Container style={{marginTop: '40px'}} component="main" maxWidth="xs">
            <CssBaseline />
            <PageHeader 
                title="Sign in"
                icon={<PersonRoundedIcon style={{ fontSize: 38 }}/>}
            />             
            {error && <Alert severity="error">{error}</Alert>}
            
                <form  className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography className={classes.label}>Email</Typography>
                            <FormControl className={classes.field} variant="outlined" required fullWidth>
                                <OutlinedInput error={emailError} className={classes.input} id="component-outlined" value={email} onChange={onEmailChange} />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className={classes.label}>Password</Typography>
                            <FormControl className={classes.field} variant="outlined" required fullWidth>
                                <OutlinedInput type="password" id="component-outlined" value={password} onChange={onPasswordChange} />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Button   
                        className={classes.submit}                 
                        type='submit'
                        color='primary'
                        variant='contained'
                        endIcon={<KeyboardArrowRightIcon />}
                        size='large'                                                                           
                        disabled={loading}
                        fullWidth
                    >
                        Login
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link className={classes.link} to='/forgotpassword'>
                                Forgot your password?
                            </Link>
                        </Grid>
                        <Grid item>                   
                            <Link className={classes.link} to='./register'>                         
                                Don't have an account? Sign up
                            </Link>
                        </Grid>
                     </Grid>
                </form>
        </Container>
    );
  }
  
  export default Login;
  