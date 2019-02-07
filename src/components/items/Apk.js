import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import LibraryList from './LibraryList'
import PermissionList from './PermissionList';
import MetaDataList from './MetaDataList';
import ResourceList from './ResourceList';
import ModuleList from './ModuleList';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  card: {
    maxWidth: "80%",
    marginLeft: "100px",
    marginTop: "30px"
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});



class ApkCard extends React.Component {
  state = { expanded: false, value: 0};

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, app, full } = this.props;
    const { value } = this.state;
    console.log(app)
    if (full) {
      return (
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar} src={"data:image/jpeg;base64," + app["INDEX_APK_IMG_64"]}>
              </Avatar>
            }
            title={app.INDEX_APK_NAME}
            subheader={app["INDEX_APK_CLASS"]}
          />
          
          <CardContent>
            <Typography component="div">

              <Tabs value={value} onChange={this.handleChange}>
                <Tab label="General" />
                <Tab label="Meta Data" />
                <Tab label="..." />
              </Tabs>

              {value === 0 && 
                <Grid container spacing={24}>
                  <Grid item m={6} xs={6}>
                    
                    <LibraryList app={app["INDEX_APK_CLASS"]}/>
                  </Grid>
                  <Grid item m={6} xs={6}>
                    <PermissionList app={app["INDEX_APK_CLASS"]}/>
                  </Grid>
                </Grid>}

                {value === 1 && 
                <Grid container spacing={24}>
                  <Grid item m={6} xs={6}>
                      <MetaDataList app={app["INDEX_APK_CLASS"]}/>
                    </Grid>
                  <Grid item  m={6} xs={6}>
                    {/* <ResourceList app={app["INDEX_APK_CLASS"]}/> */}
                  </Grid>
                </Grid>}

                {/* {value === 2 && 
                  <ModuleList app={app["INDEX_APK_CLASS"]}/>
                } */}
              
              
            </Typography>
          </CardContent>
        </Card>
      );
    }
    else
    {
      return (
        <ListItem className={classes.item}>
              <Avatar aria-label="Recipe" className={classes.avatar} src={"data:image/jpeg;base64," + app["INDEX_APK_IMG_64"]}>
              </Avatar>
             
            <ListItemText primary={<a href={"/?SearchModule=\""+ app["INDEX_APK_NAME"] + "\"&TypeFilter=[\"" + "APP" + "\"]"}>
                    {app["INDEX_APK_NAME"]}
                </a>} secondary={app["INDEX_APK_CLASS"]} />
        </ListItem>
      )
    }
  }
}

ApkCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ApkCard);