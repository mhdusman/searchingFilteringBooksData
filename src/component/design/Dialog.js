import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';


const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);


const useStyles = makeStyles(theme => ({
  contentBackground: {
    background: theme.palette.background.bodyColor,
  }
}));

export const CustomDialog = ({ isOpen, content, title, titlePosition, handleClose, contentStyle }) => {

  const classes = useStyles();
  return (
    <div>
      <Dialog open={isOpen}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={'md'}
        aria-labelledby="customized-dialog-title"
        //  PaperProps={{
        //   style: {
        //     backgroundColor: '#424242'
        //   },
        // }}
        // PaperProps={{ classes: {root: classes.contentBackground } }}
        classes={{ paper: classes.contentBackground }}
      >
        {titlePosition === "top" &&
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            {title}
          </DialogTitle>
        }
        <DialogContent style={contentStyle}>
          <div>
            {content}
          </div>
        </DialogContent>
        {titlePosition === "bottom" &&
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            {title}
          </DialogTitle>
        }
      </Dialog>
    </div>
  );
}