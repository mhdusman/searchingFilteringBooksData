import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Factor, Category, Filter, List, Detail } from '../component/pages';
import { search, toggleModal } from '../store';
import { RemoteRequest } from '../component/utils/RemoteRequest';
import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
// import Button from '@material-ui/core/Button';
import { Button } from '../component/design';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { RESULT } from '../store/type';
import {Layout} from './Layout'

const useStyles = makeStyles((theme) => ({
    searchBackground: {
        // background: theme.palette.background.blockColor,
        '& label': {
            color: theme.palette.font.bodyColor
        },
        '& input': {
            color: theme.palette.font.bodyColor
        },
        borderBottom: '1px solid ' + theme.palette.font.bodyColor
    },
    SearchIcon: {
        '& svg': {
            color: theme.palette.font.bodyColor
        }
    },
    margin: {
        margin: theme.spacing(1),
    },
    inputText: {
        width: 480,
    },
    // inputText: {
    //     width: 680,
    // },
    inputTextSM: {
        width: 300,
    },
    // root: {
    //     '& span': {
    //         color: '#212121',
    //         fontWeight: 400,
    //         fontSize: 14
    //     }
    // }
}));

export const Search = () => {

    const classes = useStyles();
    const matches = useMediaQuery(theme => theme.breakpoints.up('md'));
    const [data, setData] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const dispatch = useDispatch();

    const {
        // loading,
        result, resultCount, offset, detail, detailModel, category, filters, isOpen
    } = useSelector((state) => ({
        // search
        // loading: state.search.loading,
        // result
        result: state.search.result,
        resultCount: state.search.resultCount,
        offset: state.search.offset,
        // resultDetails
        detail: state.search.detail,
        detailModel: state.search.detailModel,
        message: state.search.message,
        // filters
        category: state.filters.category,
        filters: state.filters,
        isOpen: state.filters.isOpen,
    }));

    console.log(searchValue);
    const handleSubmit = () => {
        dispatch({ type: RESULT, payload: { hits: [], total: 0 } });
        dispatch(search(searchValue, filters));
        if (isOpen)
            dispatch(toggleModal(false))
    }

    const loadOnScroll = () => {
        dispatch(search(searchValue, filters, offset))
    }

    const entered = (e) => {
        if (e.keyCode === 13) {
            handleSubmit()
        }
    }

    const openModal = () => {
        dispatch(toggleModal(true));
        RemoteRequest(category).then(res => {
            console.log(res)
            setData(res)
        })
    }

    const closeModal = () => {
        dispatch(toggleModal(false))
        setData(null)
    }

    // const tabTitle = tab => {
    //     switch (tab) {
    //         case 'books':
    //             return 'Jamati Books'
    //         case 'ror':
    //             return 'Review of Religions'
    //         case 'alfazal':
    //             return 'Al-Fazal'
    //     }
    // }

    // if (result.length) {
    //     window.onscroll = () => loadOnScroll(document.querySelector('.result-list') ? document.querySelector('.result-list').lastChild : null);
    // }

    return (
        <Layout>
            <Grid container
                direction="column"
                // justify="center"
                alignItems="center"
                spacing={1}
            // className={classes.root}
            >
                {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>className={classes.searchBackground} */}
                <div className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end" >
                        <Grid item className={classes.SearchIcon}>
                            <SearchIcon />
                        </Grid>
                        <Grid item>
                            <TextField
                                onKeyDown={entered}
                                onChange={(e) => setSearchValue(e.target.value)}
                                id="input-with-icon-grid"
                                label="Search"
                                // style={{borderBottom: '1px solid #FFF', color:'#FFF'}}
                                // className={classes.inputText} 
                                className={`${classes.searchBackground} ${(matches) ? classes.inputText : classes.inputTextSM}`}
                            />
                        </Grid>
                    </Grid>
                </div>
                {/* </Grid> */}
                {/* <Grid item xs={2} sm={2} md={2}>
                        <Paper >xs=12 sm=6dfdsfsfsd fdgdgfdgdg</Paper>
                </Grid> */}
                <Grid item xs={10} sm={10} md={6} lg={6} xl={6}>
                    <Factor />
                </Grid>
                <Grid item xs={10} sm={10} md={6} lg={6} xl={6}>
                    <Category />
                </Grid>
                <Grid item xs={10} sm={10} md={6} lg={6} xl={6}>
                    <Button
                        variant="contained"
                        onClick={openModal}
                        disabled={category ? false : true}
                    >Advanced Filters</Button>
                </Grid>
                <Grid item xs={10} sm={10} md={6} lg={6} xl={6}>
                    {/* id="search-btn" */}
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                    >Search</Button>
                </Grid>
            </Grid>
            <List
                // tab={filters.tab}
                resultCount={resultCount}
                result={result}
                searchValue={searchValue}
                loadOnScroll={loadOnScroll}
            />
            <Detail
                detail={detail}
                isOpen={detailModel}
            />
            <Filter
                data={data}
                handleSubmit={handleSubmit}
                closeModal={closeModal}
            />
        </Layout>
    )
};