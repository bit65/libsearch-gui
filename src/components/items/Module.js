import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
    item: {
        padding: 5
    }
});



class Module extends React.Component {
    
  render() {
    const { classes, module } = this.props;
    return (
        <ListItem className={classes.item}>
            <ListItemText primary={module["MODULE_NAME"]} />
        </ListItem>
    );
  }
}

Module.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Module);