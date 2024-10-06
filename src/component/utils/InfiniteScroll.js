import { React, useRef, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  fontColor: {
    color: theme.palette.font.bodyColor,
  }
}));

const isBottom = (ref) => {
  if (!ref.current) {
    return false;
  }
  return ref.current.getBoundingClientRect().bottom <= window.innerHeight;
}

export const InfiniteScroll = ({ onBottomHit, isLoading, hasMoreData, result, children }) => {
  // loadOnMount,
  // const [initialLoad, setInitialLoad] = useState(false);
  const classes = useStyles();

  const contentRef = useRef(null);

  // useEffect(() => {
  //   if (loadOnMount && initialLoad) {
  //     onBottomHit();
  //     setInitialLoad(false);
  //   }
  // }, [onBottomHit, loadOnMount, initialLoad]);

  useEffect(() => {
    const onScroll = () => {
      if (!isLoading && hasMoreData && isBottom(contentRef)) {
        onBottomHit();
      }
    };
    document.addEventListener('scroll', onScroll);
    return () => document.removeEventListener('scroll', onScroll);
  }, [onBottomHit, isLoading, hasMoreData]);

  return <div ref={contentRef}>
    {children}
    {isLoading && <div style={{ overflow: 'hidden' }}><Grid container direction="column" alignItems="center" style={{ marginTop: 10 }} >
      <Grid item>
        <CircularProgress color="primary" />
      </Grid>
    </Grid></div>}
    {(!hasMoreData && result.length > 0) && <Box m={1} p={1} className={classes.fontColor}>No more record exist</Box>}
  </div>;
};