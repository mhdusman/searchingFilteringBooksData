import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { resultMeta } from '../../utils/Common';
import { Dialog } from '../../design';
import { detailModal, detailData } from '../../../store';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Parser } from 'html-to-react';

var htmlToReactParser = new Parser();

const useStyles = makeStyles(theme => ({
  contentBackground: {
    background: theme.palette.background.blockColor,
  },
  textColor: {
    color: theme.palette.font.bodyColor,
  },
  author: {
    textAlign: 'center',
    fontWeight: 500,
    fontSize: 14,
    // background: '#D5D5D5',
    background: theme.palette.background.itemHeading,
  },
}));

export const Detail = ({ detail, isOpen }) => {
  const classes = useStyles();
  const dispatch = useDispatch()

  return (<>
    {detail ? <Dialog
      title={<>
        <span className={classes.textColor}>{resultMeta(detail[0]._source, detail[0]._index)}</span>
        <Button
          variant="contained"
          href={detail[1]._source.url}
          target="_blank"
          style={{ float: 'right' }}
          rel="noopener noreferrer">Open page in book</Button>
      </>}
      titlePosition="bottom"
      isOpen={isOpen}
      handleClose={() => {
        dispatch(detailModal(false))
        dispatch(detailData(null))
      }}
      contentStyle={{ marginTop: '40px' }}
      content={<>
        {detail.map(item => {
          const highlightArr = item.highlight ? Object.keys(item.highlight) : [];
          return (
            <Box boxShadow={3} p={1} key={item._id} className={classes.contentBackground + ' ' + classes.textColor}>
              {item._index !== 'holy_quran' && <>
                <p className={(item._source.lang === "urdu" ? "urdu-text" : "") || (item._source.lang === "ar" ? "arabic-text" : "")}>
                  {htmlToReactParser.parse((item.highlight) ? item.highlight['text'] : item._source.text)}
                </p>
                <span>{resultMeta(item._source, item._index)}</span>
              </>}
              {item._index === 'holy_quran' && <>
                {Object.entries(item._source).map(sourceArr => {
                  const sourceKey = sourceArr[0];
                  if (!sourceKey.includes('_info') && !sourceKey.includes('_lang') && sourceKey !== 'chapter' && sourceKey !== 'verse' && sourceKey !== 'url') {
                    const lang = (sourceKey == 'arabic' || sourceKey == 'arabic_no_diacritics') ? 'arabic' : item._source[sourceKey + '_lang'];
                    const author = (sourceKey == 'arabic' || sourceKey == 'arabic_no_diacritics') ? '' : item._source[sourceKey + '_info'];

                    return <span key={item._id + sourceKey}>
                      {(sourceArr[1] && author) && <Typography className={classes.author}>{author}</Typography>}
                      <p
                        style={{ marginTop: 5, marginBottom: 5 }}
                        className={(lang === "urdu" ? "urdu-text" : "") || (lang === "arabic" ? "arabic-text" : "")}>
                        {htmlToReactParser.parse((item.highlight && highlightArr.includes(sourceKey)) ?
                          item.highlight[sourceKey] : sourceArr[1])}
                      </p>
                    </span>
                  }
                })}
              </>}
            </Box>
          )
        })}
      </>}
    /> : <Dialog content={<CircularProgress color="secondary" />} isOpen={isOpen} />}
  </>)
};