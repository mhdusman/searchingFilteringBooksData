import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  displayBlock: {
    display: 'block'
  }
}));

const Accordion = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.blockColor,
    '& span': { 'color': theme.palette.font.bodyColor },
    // border: '1px solid rgba(0, 0, 0, .125)',
    // boxShadow: 'none',
    // '&:not(:last-child)': {
    //   borderBottom: 0,
    // },
    // '&:before': {
    //   display: 'none',
    // },
    // '&$expanded': {
    //   margin: 'auto',
    // },
  },
  expanded: {},
}))(MuiAccordion);

export const CustomAccordion = ({ header, body, preBody, defaultExpanded }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion defaultExpanded={defaultExpanded}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{header}</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.displayBlock}>
          <div>{preBody}</div>
          <div className="accordian-content">{body}</div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
