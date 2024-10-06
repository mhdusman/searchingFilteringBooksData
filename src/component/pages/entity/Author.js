import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useCollectionVolumeFilters } from './Hooks';
import { Checkbox } from '../../design';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    root: {
        fontWeight: 400,
        fontSize: 14
    }
}));

export const Author = (props) => {

    const classes = useStyles();
    const { data: { authors, collsByAuthors } } = props;
    const [stateFilter, setStateFilter] = useState('');
    useCollectionVolumeFilters(stateFilter);
    const filters = useSelector(state => state.filters.data);
    const [allSelect, setAllSelect] = useState(false);

    useEffect(() => {

        if (filters) {
            let isEqual = true;
            authors.map((row) => {
                if (isEqual === false) {
                    return;
                }
                const { authorName } = row;
                if (collsByAuthors[authorName]) {
                    const collectionIdArr = collsByAuthors[authorName].map((row) => row['collID'])
                    if (filters[authorName] && filters[authorName].collections &&
                        filters[authorName].collections.length === collectionIdArr.length) {
                        console.log(filters[authorName].collections.length === collectionIdArr.length)
                        // isEqual = true;
                    } else {
                        isEqual = false;
                    }
                    console.log(collectionIdArr);
                }
            })
            setAllSelect(isEqual);
        }
    }, [filters, authors, collsByAuthors]);

    const handleChangeAll = (e) => {
        setStateFilter({ checked: e.target.checked, collsByAuthors })
    }

    const handleChange = (e, authName) => {
        setStateFilter({ checked: e.target.checked, authName, collectionArr: collsByAuthors[authName] })
    }

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Checkbox
                    checked={allSelect}
                    label="Select all"
                    onChange={handleChangeAll} />
            </Grid>
            {authors.map((row, index) => {
                const { authorName } = row
                return (
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={index}>
                        <Checkbox
                            checked={filters[authorName] &&
                                filters[authorName].collections &&
                                filters[authorName].collections.length === collsByAuthors[row.authorName].length || false}
                            indeterminate={filters[authorName] &&
                                filters[authorName].collections &&
                                filters[authorName].collections.length !== collsByAuthors[row.authorName].length &&
                                filters[authorName].collections.length > 0 || (
                                    filters[authorName] && filters[authorName].volumes &&
                                    Object.entries(filters[authorName].volumes).filter(row => row[1].length > 0).length > 0) || false}
                            label={authorName}
                            onChange={(e) => handleChange(e, authorName)} />
                    </Grid>
                )
            })}
        </Grid>)
}