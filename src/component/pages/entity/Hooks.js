import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
    addCollection,
    removeCollection,
    addVolume,
    removeVolume,
} from '../../../store';


export function useCollectionVolumeFilters(data) {
    const dispatch = useDispatch();

    useEffect(() => {
        if (data) {

            const collectionAndVolume = ({ checked, authName, collectionArr }) => {
                const collectionIdArr = collectionArr.map((collectionObj) => {
                    const collectionId = collectionObj.collID;
                    if (collectionObj.volumes) {
                        const volumeIdArr = collectionObj.volumes.map(value => value.vol_no);
                        if (checked) {
                            dispatch(addVolume(authName, collectionId, volumeIdArr));
                        } else {
                            dispatch(removeVolume(authName, collectionId, volumeIdArr));
                        }
                    }
                    return collectionId
                })
                if (checked) {
                    dispatch(addCollection(authName, collectionIdArr))
                } else {
                    dispatch(removeCollection(authName, collectionIdArr))
                }
            }

            const author = ({ checked, collsByAuthors }) => {
                Object.entries(collsByAuthors).map((row) => {
                    const [authName, collectionArr] = row;
                    collectionAndVolume({ checked, authName, collectionArr })
                })
            }

            const { checked, authName, collectionArr, collsByAuthors } = data;

            if (collsByAuthors) {
                author({ checked, collsByAuthors });
            } else {
                collectionAndVolume({ checked, authName, collectionArr });
            }
        }
    }, [data, dispatch])
}


// const useStyles = makeStyles(theme => (styles(theme))); // here call styles function imported from styles.js
// const SideNav = ({ drawerState, toggleDrawer }) => {
//     const classes = useStyles();
//     return (
//         <Box className={classes.root}>
//             <Drawer className="drawer" anchor="left" open={drawerState} onClose={() => toggleDrawer(false)}>
//                 <NavList></NavList>
//             </Drawer>
//         </Box>
//     );
//     const styles = (theme) => {
//         return ({
//             root: {
//                 '& .drawer': {
//                     backgroundColor: 'red'
//                 }
//             }
//         });