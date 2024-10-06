import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import axios from "axios";
import { useSelector } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { Layout } from './Layout';
import { Parser } from 'html-to-react';
import { LinearProgressWithLabel } from '../component/design/';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

var htmlToReactParser = new Parser();

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export const ExportPDF = (props) => {

  const [progress, setProgress] = React.useState(0);
  const [socketId, setSocketId] = useState('');
  const [msgArr, setMsgArr] = useState([]);
  const { match: { params: { uniqueId } } } = props;
  const classes = useStyles();

  const { searchParam } = useSelector((state) => ({
    searchParam: state.search.searchParam
  }));

  useEffect(() => {

    const socket = io('http://localhost:3300/')
    
    socket.on("connect", () => {
      console.log(socket.connected); // true
    });
    
    socket.on('socketId', socketId => {
      console.log('____socketId');
      console.log(socketId);
      setSocketId(socketId)
    })

    socket.on('receiveMessage', msg => {
      console.log('____receiveMessage');
      console.log(msg);
      setProgress(msg.progress)
      setMsgArr((msgArr) => [...msgArr, msg])
    })

    return () => {
      socket.removeAllListeners();
    }
  }, [])

  useEffect(() => {

    if (socketId) {
      searchParam.socketId = socketId
      axios.post('http://localhost:3300/exportPDF/' + uniqueId, searchParam)
    }
  }, [socketId, uniqueId, searchParam])


  return <Layout>
    <div className={classes.root}>
      {searchParam.term && <Grid item xs={12} style={{ marginTop: '10px', marginRight: '10px', marginLeft: '10px' }}>
        Search Term: {`"${searchParam.term}"`}
      </Grid>}
      <Grid item xs={12} style={{ marginTop: '10px', marginRight: '10px', marginLeft: '10px' }}>
        <Paper className={classes.paper}>
          {(progress == 100) ? null : <CircularProgress size={20} />}
          <LinearProgressWithLabel value={progress} />
        </Paper>
      </Grid>

      {msgArr.map((obj, index) => (
        <div key={index}>
          <Alert severity={obj.status}>{htmlToReactParser.parse(obj.msg)}</Alert>
        </div>
      ))}
    </div>
  </Layout>
}