import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addYear, removeYear } from '../../../store';
import { Checkbox } from '../../design';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    root: {
        '& label': {
            fontWeight: 400,
            fontSize: 14
        }
    }
}));

export const Year = (props) => {

    const classes = useStyles();
    const { years } = props;
    const filters = useSelector(state => state.filters.years);
    console.log(filters)
    const dispatch = useDispatch();

    const handleChangeAll = (e) => {
        if (e.target.checked) {
            dispatch(addYear(years))
        } else {
            dispatch(removeYear(years))
        }
    }

    const handleChange = (e, year) => {
        if (e.target.checked) {
            dispatch(addYear([year]))
        } else {
            dispatch(removeYear([year]))
        }
    }

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Checkbox
                        label={"Select all"}
                        checked={filters.length === years.length}
                        indeterminate={filters.length !== years.length && filters.length > 0}
                        onChange={handleChangeAll}
                    />
                </Grid>
                {years.map(year => {
                    return (
                        <Grid key={year} item xs={4} sm={4} md={3} lg={3} xl={3}>
                            <Checkbox
                                checked={filters.includes(year) || false}
                                onChange={(e) => handleChange(e, year)}
                                label={String(year)} />
                        </Grid>)
                })}
            </Grid>
        </div>
    )
}