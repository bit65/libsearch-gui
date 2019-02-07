import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {ReactiveList} from '@appbaseio/reactivesearch';
import Library from './Library'

const styles = theme => ({

});



class LibraryList extends React.Component {
  render() {
    const { classes, app } = this.props;
    return (
        <ReactiveList
            componentId={"lib_"+app}
            dataField="TYPE.keyword"
            sortBy="desc"
            size={200}
            pagination={false}
            showResultStats={false}
            loader="Loading Libraries"
            onNoResults="No libraries found"
            renderData={(res) => <Library key={res._id} lib={res}/>}
            defaultQuery={() => ({
                query: {
                    "bool": {
                        "must": [
                            {"term": {"TYPE.keyword": 'LIBRARY'}},
                            {"term": {"ASSET.keyword": app}}
                        ]
                    }
                    
                }
            })}
            />
    );
  }
}

LibraryList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LibraryList);