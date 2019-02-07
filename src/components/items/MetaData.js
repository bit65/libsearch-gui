import React from 'react';
import PropTypes from 'prop-types';
import {ReactiveList} from '@appbaseio/reactivesearch';

import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import ApkList from './ApkList'

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



class MetaData extends React.Component {
  render() {
    const { classes, meta, full} = this.props;
    
    if (full)
    {
        let r = Math.random().toString(36).substring(7);

        return (<Card className={classes.card}>
          <CardHeader
            title={meta["META_NAME"]}
            subheader={meta["META_VALUE"]}
          />
          
          <CardContent>
            <Typography component="div">
                

                <ListItemText primary={<a href={"/?SearchModule=\""+ meta["ASSET"] + "\"&TypeFilter=[\"" + "APP" + "\"]"}>
                    {meta["ASSET"]}
                </a>} />
                          
            </Typography>
          </CardContent>
        </Card>)
    }

    return (
        <ListItem className={classes.item}>
            <ListItemText primary={meta["META_NAME"]} secondary={meta["META_VALUE"]} />
        </ListItem>
    );
  }
}

MetaData.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MetaData);