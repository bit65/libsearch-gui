import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {ReactiveList} from '@appbaseio/reactivesearch';
import Resource from './Resource'

const styles = theme => ({

});



class ResourceList extends React.Component {
  render() {
    const { classes, app } = this.props;
    return (
        <ReactiveList
            componentId={"resource_"+app}
            dataField="TYPE.keyword"
            sortBy="desc"
            size={200}
            pagination={false}
            showResultStats={false}
            loader="Loading MetaData"
            onNoResults="No metadata found"
            renderData={(res) => <Resource key={res._id} res={res}/>}
            defaultQuery={() => ({
                query: {
                    "bool": {
                        "must": [
                            {"term": {"TYPE.keyword": 'RESOURCE'}},
                            {"term": {"ASSET.keyword": app}}
                        ]
                    }
                    
                }
            })}
            />
    );
  }
}

ResourceList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ResourceList);