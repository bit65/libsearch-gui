import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

const styles = theme => ({
    item: {
        padding: 5
    },
    card: {
        maxWidth: "80%",
        marginLeft: "100px",
        marginTop: "30px"
    },
});



class Resource extends React.Component {
  render() {
    const { classes, res, full } = this.props;

    if (full)
    {
        return <Card className={classes.card}>
          <CardHeader
            title={res["RESOURCE_KEY"]}
            subheader={res["RESOURCE_VALUE"]}
          />
          
          <CardContent>
                App {res["ASSET"]}
          </CardContent>
        </Card>
    }

    return (
        <ListItem className={classes.item}>
            <ListItemText primary={res["RESOURCE_KEY"]} secondary={res["RESOURCE_VALUE"]} />
        </ListItem>
    );
  }
}

Resource.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Resource);