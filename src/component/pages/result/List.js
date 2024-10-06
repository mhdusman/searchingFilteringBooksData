import React, { useEffect } from 'react';
import { Item } from './Item';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from "react-router-dom";
// import { Export } from '../general/Export';

import { makeStyles } from '@material-ui/core/styles';
import { InfiniteScroll } from '../../utils/InfiniteScroll';

const useStyles = makeStyles(theme => ({
    contentBackground: {
        background: theme.palette.background.blockColor,
    },
    fontColor: {
        color: theme.palette.font.bodyColor,
    }
}));

export const List = (props) => {

    const classes = useStyles();
    const history = useHistory();
    const { loading, message } = useSelector((state) => ({
        loading: state.search.loading,
        message: state.search.message,
    }));

    const { result, resultCount, loadOnScroll, searchValue } = props;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [message])

    return (
        <>
            {message ? <Box boxShadow={3} style={{ color: 'red' }} m={1} p={1} className={classes.contentBackground}>{message}</Box> : ''}
            {(result.length > 0) && <Box m={1} p={1} className={classes.fontColor}>
                <span><Button  variant="contained" color="primary" onClick={() => history.push('/exportPDF/' + uuidv4())} >Export PDF</Button> Results Found: {resultCount === 10000 ? '10000+' : resultCount}</span>
            </Box>}
            <InfiniteScroll
                hasMoreData={(result.length > 0) ? result.length <= resultCount : false}
                result={result}
                isLoading={loading}
                onBottomHit={loadOnScroll}
            // loadOnMount={true}
            >
                {result.map(item => {
                    return (
                        <Box boxShadow={3} m={1} p={1} key={item._id} className={classes.contentBackground + ' ' + classes.fontColor}>
                            <Item item={item} searchValue={searchValue} />
                        </Box>
                    )
                })}
            </InfiniteScroll>
        </>
    )
};
