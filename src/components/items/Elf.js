import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ApkList from './ApkList'
import classnames from 'classnames';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    item: {
        padding: 5
    },
    card: {
      maxWidth: "80%",
      marginLeft: "100px",
      marginTop: "30px"
    }
});

class Elf extends React.Component {
  render() {
    const { classes, elf, full } = this.props;
    if (full)
    {
        return <Card className={classes.card}>
          <CardHeader
            title={elf["ELF_FUNCTION"]}
            subheader={elf["FILE"]}
          />
          
          <CardContent>
            <Typography component="div">
              {/* <ApkList app={elf["INDEX_APK_CLASS"]}/> */}
            </Typography>
          </CardContent>

          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton aria-label="Add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="Share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
    }

    return (
        <ListItem className={classes.item}>
            <ListItemText primary={elf["ELF_FUNCTION"]} secondary={elf["FILE"]} />
        </ListItem>
    );
  }
}

Elf.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Elf);