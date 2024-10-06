import axios from 'axios';
// import Cookies from 'js-cookie';
import { backendUrl, filtersMetadataPath } from '../../config/BackendUrl';


export const RemoteRequest = async (tab) => {
    const res = await axios.get(backendUrl + filtersMetadataPath + 'fetch-filters/', {
        params: { tab },
        // headers: {Authorization: `Bearer ${Cookies.get('token')}`}
    })
    return {
        authors: res.data["authors"],
        collsByAuthors: res.data["colls_by_author"],
        otherColls: res.data["other_colls"],
        years: res.data["years"],
    }
}
