import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Accordion, Checkbox } from '../../design';
import { Volume } from './Volume';
import { useCollectionVolumeFilters } from './Hooks';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => {
    const common = {
        fontSize: 14,
        color: theme.palette.font.bodyColor,
    };
    return {
        body: {
            fontWeight: 400,
            ...common
        }, header: {
            fontWeight: 500,
            ...common
        }
    }
});

export const Collection = (props) => {

    const classes = useStyles();

    const { collsByAuthors } = props;
    const [stateFilter, setStateFilter] = useState('');
    useCollectionVolumeFilters(stateFilter);
    const filters = useSelector(state => state.filters.data);

    const handleChangeAll = (e, authName, collectionArr) => {
        setStateFilter({ checked: e.target.checked, authName, collectionArr })
    }

    const handleChange = (e, authName, collectionObj) => {
        setStateFilter({ checked: e.target.checked, authName, collectionArr: [collectionObj] })
    }


    return (
        <>
            {Object.entries(collsByAuthors).map((row, index) => {
                const [authName, collectionArr] = row
                return (
                    <Box border={1} borderColor="grey.500" m={1} key={index} >
                        <Accordion
                            defaultExpanded={false}
                            header={<span className={classes.header}>{authName}</span>}
                            preBody={
                                <Checkbox
                                    label={<span className={classes.body}>Select all</span>}
                                    checked={filters[authName] &&
                                        filters[authName].collections &&
                                        filters[authName].collections.length === collectionArr.length || false}
                                    indeterminate={(filters[authName] &&
                                        filters[authName].collections &&
                                        filters[authName].collections.length !== collectionArr.length &&
                                        filters[authName].collections.length > 0) || (
                                            filters[authName] && filters[authName].volumes &&
                                            Object.entries(filters[authName].volumes).filter(row => row[1].length > 0).length > 0) || false}
                                    onChange={(e) => handleChangeAll(e, authName, collectionArr)} />}
                            body={
                                <Grid container className={classes.body}>
                                    {collectionArr.map((collectionObj, index) => {
                                        const { collID, collName, volumes } = collectionObj;
                                        return (
                                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={index}>
                                                <Checkbox
                                                    checked={filters[authName] && filters[authName].collections &&
                                                        filters[authName].collections.includes(collID) || false}
                                                    indeterminate={filters[authName] && filters[authName].volumes &&
                                                        filters[authName].volumes[collID] &&
                                                        filters[authName].volumes[collID].length !== volumes.length &&
                                                        filters[authName].volumes[collID].length > 0 || false}
                                                    label={collName.replaceAll('_', ' ')}
                                                    onChange={(e) => handleChange(e, authName, collectionObj)}
                                                />
                                                <Volume
                                                    collectionId={collID}
                                                    authName={authName}
                                                    volumes={volumes}
                                                />
                                            </Grid>)
                                    })}
                                </Grid>
                            }
                        />
                    </Box>)
            })}
        </>)
}