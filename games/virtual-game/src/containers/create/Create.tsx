import React from 'react';

import { v4 as uuidv4 } from 'uuid';

import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    height: '100vh',
  },
  paper: {
    minWidth: '500px',
  },
  title: {
    paddingBottom: theme.spacing(4),
  }
}));

export default function Create() {
  const classes = useStyles();

  const createRoom = () => {
    window.location.href = '/' + uuidv4();
  };

  return (
    <Container className={classes.container}>
      <Paper elevation={0} className={classes.paper}>
        <Typography variant="h2" color="inherit" className={classes.title}>
          Virtual Board Game
        </Typography>
        <Button onClick={createRoom} variant="contained" size="large" color="primary">
          Create Game Room
        </Button>
      </Paper>
    </Container>
  )
}

