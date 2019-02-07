import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'

import permission_data from './Permissions.const'

const styles = theme => ({
    item: {
        padding: 5
    },
    icon: {
        margin: theme.spacing.unit * 2,
      },
});



class Permission extends React.Component {

    constructor(props) {
        super(props)
    }

    get_permissions(key) {
        if (key in permission_data)
        {
            return permission_data[key]
        }

        return {
            "desc": key,
            "icon": faQuestion
        }
    }
    render() {
        const { classes, lib } = this.props;
        const permission = this.get_permissions(lib["PERMISSION_NAME"])

        return (
            <ListItem className={classes.item}>
                <ListItemIcon>
                    <FontAwesomeIcon icon={permission.icon} />
                    {/* <FontAwesomeIcon icon={['fas', 'vibrate']} /> */}
                </ListItemIcon>
                <ListItemText primary={permission.desc} />
            </ListItem>
        );
    }
}

Permission.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Permission);