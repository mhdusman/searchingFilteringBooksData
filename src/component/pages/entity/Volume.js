import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCollection, removeCollection, addVolume, removeVolume } from '../../../store';
import { Checkbox } from '../../design';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

export const Volume = (props) => {

    const { collectionId, authName, volumes } = props;
    const filters = useSelector((state) => state.filters.data);
    const dispatch = useDispatch();

    const handleChange = (e, volumeId) => {
        if (e.target.checked) {
            dispatch(addVolume(authName, collectionId, [volumeId]))
            if (filters[authName] && filters[authName].volumes &&
                filters[authName].volumes[collectionId] &&
                (volumes.length === filters[authName].volumes[collectionId].length + 1)) {
                dispatch(addCollection(authName, [collectionId]))
            }
        } else {
            dispatch(removeVolume(authName, collectionId, [volumeId]))
            dispatch(removeCollection(authName, [collectionId]))
        }
    }

    return (<>
        {volumes ? (
            <Box border={1} borderColor="grey.500">
                <Grid container>
                    {volumes.map(row => {
                        const { vol_no, year } = row
                        return <Grid item xs={12} sm={6} md={6} lg={6} xl={6} key={vol_no}>
                            <Checkbox
                                key={vol_no}
                                checked={filters[authName] && filters[authName].volumes &&
                                    filters[authName].volumes[collectionId] &&
                                    filters[authName].volumes[collectionId].includes(vol_no) ||
                                    filters[authName] && filters[authName].collections &&
                                    filters[authName].collections.includes(collectionId) || false}
                                label={(year) ? "Volume " + vol_no + " (" + year + ")" : "Volume " + vol_no}
                                onChange={(e) => handleChange(e, vol_no)}
                            />
                        </Grid>
                    })}
                </Grid>
            </Box>) : null}
    </>
    )
};