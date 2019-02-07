import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {ReactiveList} from '@appbaseio/reactivesearch';
import Permission from './Permission'

const styles = theme => ({

});



class PermissionList extends React.Component {
  render() {
    const { classes, app } = this.props;
    return (
        <ReactiveList
            componentId={"permission_"+app}
            dataField="TYPE.keyword"
            sortBy="desc"
            size={200}
            pagination={false}
            showResultStats={false}
            loader="Loading Permissions"
            onNoResults="No permissions found"
            renderData={(res) => <Permission key={res._id} lib={res}/>}
            defaultQuery={() => ({
                query: {
                    "bool": {
                        "must": [
                            {"term": {"TYPE.keyword": 'PERMISSION'}},
                            {"term": {"ASSET.keyword": app}}
                        ]
                    }
                    
                }
            })}
            />
    );
  }
}

PermissionList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PermissionList);