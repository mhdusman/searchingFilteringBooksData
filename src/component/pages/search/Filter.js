import React from 'react';
import { useSelector } from 'react-redux';
import { Dialog } from '../../design';
import { Collection } from '../entity/Collection';
import { Year } from '../entity/Year';
import { OtherCollection } from '../entity/OtherCollection';
import { Author } from '../entity/Author';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { getCategoryText } from '../../utils/Common';

const useStyles = makeStyles(theme => ({
    blockBackground: {
        background: theme.palette.background.blockColor,
    },
    textColor: {
        color: theme.palette.font.bodyColor,
    },
    root: {
        '& p': {
            // color: '#212121',
            fontWeight: 500,
            marginLeft: 12,
            fontSize: 16
        }
    }
}));

export const Filter = (props) => {

    const classes = useStyles();
    const { data, handleSubmit, closeModal } = props
    console.log('__filter__')
    console.log(data)
    const { isOpen, category } = useSelector(state => ({
        isOpen: state.filters.isOpen,
        category: state.filters.category
    }))

    const categoryText = getCategoryText(category);

    return (
        <Dialog
            isOpen={isOpen}
            title={<span className={classes.textColor}>{categoryText}</span>}
            titlePosition="top"
            handleClose={closeModal}
            content={data ? (<div className={classes.textColor}>
                {(category === 'books' || category === 'engBooks' || category === 'arabicBooks') &&
                    <div className={classes.root}>
                        <Box border={1} borderColor="grey.500" className={classes.blockBackground} style={{ paddingTop: 1 }}  >
                            <p>Authors</p>
                            <Author data={data} />
                        </Box>
                        <Box border={1} borderColor="grey.500" className={classes.blockBackground} style={{ paddingTop: 1, paddingBottom: 1 }}>
                            <p>Collections</p>
                            <Collection collsByAuthors={data.collsByAuthors} />
                        </Box>
                        {data.otherColls && <Box border={1} borderColor="grey.500" className={classes.blockBackground} style={{ paddingTop: 1 }}>
                            <p>Others Collections</p>
                            <OtherCollection otherColls={data.otherColls} />
                        </Box>}
                    </div>}
                {(category === 'ror' || category === 'alfazal') &&
                    <div className={classes.root}>
                        <Box border={1} borderColor="grey.500" className={classes.blockBackground} style={{ paddingTop: 1 }}>
                            <p>Years</p>
                            {/* className={classes.root} */}
                            <Year years={data.years} />
                        </Box>
                    </div>}
                <div style={{ marginTop: 15 }}>
                    <Grid container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item xs={8} sm={8} md={3} lg={3} xl={3}>
                            <Button variant="contained" onClick={handleSubmit}>Apply and Search</Button>
                        </Grid>
                    </Grid>
                </div>
            </div>) : (<CircularProgress color="primary" />)}
        />)
};