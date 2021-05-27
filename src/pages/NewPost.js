import { makeStyles, Box } from '@material-ui/core';
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';
import Copyright from '../components/Copyright';
import PageHeader from '../components/PageHeader';
import PostDetails from './PostDetails';


const useStyles = makeStyles (theme => ({
  pageContent: {
    margin: theme.spacing(1),
    padding: theme.spacing(3),
  }
}));

function NewPost() {

  const classes = useStyles();
  console.log('rendering  newpost')
  return (
    <>
      <PageHeader 
          title="Create a New Post"
          subTitle="Please fill in the required details below"
          icon={<CreateTwoToneIcon fontSize="large"/>}
        />
      <div className={classes.pageContent}>
        <PostDetails />
      </div>
      <Box mt={5} align="center">
        <Copyright />
      </Box>
    </>      
  )
}
  
export default NewPost;
  