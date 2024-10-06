import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Checkbox } from '../../design';
import { Volume } from './Volume';
import { useCollectionVolumeFilters } from './Hooks';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    root: {
        fontWeight: 400,
        fontSize: 14,
    }
}));

export const OtherCollection = (props) => {

    const classes = useStyles();
    const { otherColls } = props;
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
        <Grid container className={classes.root}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                <Checkbox
                    label="Select all"
                    checked={filters['otherColls'] &&
                        filters['otherColls'].collections &&
                        filters['otherColls'].collections.length === otherColls.length || false}
                    onChange={(e) => handleChangeAll(e, 'otherColls', otherColls)} />
            </Grid>
            {otherColls.map((obj, index) => {
                const { collID, collName, volumes } = obj;
                return (
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={index}>
                        <Checkbox
                            checked={filters['otherColls'] && filters['otherColls'].collections &&
                                filters['otherColls'].collections.includes(collID) || false}
                            label={collName.replaceAll('_', ' ')}
                            onChange={(e) => handleChange(e, 'otherColls', obj)}
                        />
                        <Volume
                            collectionId={collID}
                            authName={'otherColls'}
                            volumes={volumes}
                        />
                    </Grid>)
            })}
        </Grid>)
}