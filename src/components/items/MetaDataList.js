import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {ReactiveList} from '@appbaseio/reactivesearch';
import MetaData from './MetaData'

const styles = theme => ({

});



class MetaDataList extends React.Component {
  render() {
    const { classes, app } = this.props;
    return (
        <ReactiveList
            componentId={"metadata_"+app}
            dataField="TYPE.keyword"
            sortBy="desc"
            size={200}
            pagination={false}
            showResultStats={false}
            loader="Loading MetaData"
            onNoResults="No metadata found"
            renderData={(res) => <MetaData key={res._id} meta={res}/>}
            defaultQuery={() => ({
                query: {
                    "bool": {
                        "must": [
                            {"term": {"TYPE.keyword": 'META'}},
                            {"term": {"ASSET.keyword": app}}
                        ]
                    }
                    
                }
            })}
            />
    );
  }
}

MetaDataList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MetaDataList);