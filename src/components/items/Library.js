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
import {cloneDeep} from 'lodash'

// import Link from 'react-router'

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

class Library extends React.Component {
  render() {
    const { classes, lib, full } = this.props;

    Object.keys(lib).forEach(function (key) {
        if (key.startsWith("INDEX_"))
        {
            
            let newkey = key.replace(/^INDEX_/,'');
            lib[newkey] = cloneDeep(lib[key])
            delete lib[key]
        }
    });

    if (full)
    {
        return <Card className={classes.card}>
          <CardHeader
            title={
                <a href={"/?SearchModule=\""+lib["LIBRARY_NAME"]+"\""}>
                    {lib["LIBRARY_NAME"]}
                </a>
            }
            subheader=""
          />
          
          <CardContent>
            <Typography component="div">
                {lib["LIBRARY_DESCRIPTION"]}
              <ApkList lib={lib["LIBRARY_FULL_ARTIFACT"]}/>
            </Typography>
          </CardContent>
        </Card>
    }

    return (
        <ListItem className={classes.item}>
            <ListItemText primary={
                 <a href={"/?SearchModule=\""+lib["LIBRARY_NAME"]+ "\"&TypeFilter=[\"" + "LIB" + "\"]"}>
                    {lib["LIBRARY_NAME"]}
                </a>
            } secondary="Version xxx" />
        </ListItem>
    );
  }
}

Library.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Library);