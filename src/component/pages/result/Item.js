import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { detailModal, resultDetail } from '../../../store';
import { resultMeta } from '../../utils/Common';
import { Parser } from 'html-to-react';
// import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

var htmlToReactParser = new Parser();


const useStyles = makeStyles((theme) => ({
    author: {
        textAlign: 'center',
        fontWeight: 500,
        fontSize: 14,
        // background: '#D5D5D5',
        background: theme.palette.background.itemHeading,
    }
}));

export const Item = ({ item, searchValue }) => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const { category, factor } = useSelector((state) => ({
        category: state.filters.category,
        factor: state.filters.factor
    }));

    const handleClick = (source) => {
        const params = { 'tab': category, 'qtype': factor, 'term': searchValue };
        switch (category) {
            case "books"://Urdu books
                params['collection_id'] = source.collection_id;
                params['page_no'] = source.page_no;
                params['vno_for_search'] = source.vno_for_search;
                params['page_no'] = source.page_no;
                break;
            case "engBooks":
            case "arabicBooks":
                params['collection_id'] = source.collection_id;
                params['page_no'] = source.page_no;
                params['book_name'] = source.book_name;
                break;
            case "alfazal":
            case "ror":
                params['year'] = source.year;
                params['month'] = source.month;
                params['page_no'] = source.page_no;
                break;
            case "holyQuran":
                params['chapter'] = source.chapter;
                params['verse'] = source.verse;
                break;
        }
        console.log(params)
        dispatch(resultDetail(params))
        dispatch(detailModal(true))
    }

    return (
        <div onClick={() => handleClick(item._source)} key={item._id}>
            {(item._index !== 'holy_quran') && <p
                className={(item._source.lang === "urdu" ? "urdu-text" : "") || (item._source.lang === "ar" ? "arabic-text" : "")}>
                {htmlToReactParser.parse(item.highlight.text[0])}
            </p>}
            {(item._index === 'holy_quran') && Object.entries(item.highlight).map(highlightArr => {
                const highlightKey = highlightArr[0]
                const lang = (highlightKey == 'arabic' || highlightKey == 'arabic_no_diacritics') ? 'arabic' : item._source[highlightKey + '_lang'];
                const author = (highlightKey == 'arabic' || highlightKey == 'arabic_no_diacritics') ? '' : item._source[highlightKey + '_info'];
                return (<span key={item._id + highlightKey}>
                    {author && <Typography className={classes.author}>{author}</Typography>}
                    <p
                        style={{ marginTop: 5, marginBottom: 5 }}
                        className={(lang === "urdu" ? "urdu-text" : "") || (lang === "arabic" ? "arabic-text" : "")}>
                        {htmlToReactParser.parse(highlightArr[1][0])}
                    </p>
                </span>)
            })}
            <Typography style={{ fontWeight: 700, fontSize: 15, marginTop: 7 }}>{resultMeta(item._source, item._index)}</Typography>
        </div>
    )
};
