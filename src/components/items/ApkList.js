import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {ReactiveList, ReactiveComponent} from '@appbaseio/reactivesearch';
import Apk from './Apk'

const styles = theme => ({

});


class ListWrapper extends React.Component {

    render() {

        if (this.props.aggregations && this.props.aggregations.apps)
        {
            let r = Math.random().toString(36).substring(7);

            let app_search = this.props.aggregations.apps.buckets.map(a=>(
                {"term": {"INDEX_APK_CLASS.keyword": a.key}}
            ));

            return (
                <ReactiveList
                    componentId={"apk_list_" + r}
                    dataField="TYPE.keyword"
                    sortBy="desc"
                    size={200}
                    pagination={false}
                    showResultStats={false}
                    loader="Loading APKs"
                    onNoResults="No apks found"
                    renderData={(res) => <Apk key={res._id} app={res}/>}
                    defaultQuery={() => ({
                        query: {
                            "bool": {
                                "must": [
                                    {
                                        "term": {"TYPE.keyword": "INDEX_APK"}
                                    },
                                    {
                                        "bool": {
                                            "should": app_search
                                        }
                                    }
                                ]
                            }
                        }
                    })}
                    />
            )
        }

        return <div>No apps found</div>
        
    }
}


class ApkList extends React.Component {
  render() {
    const { classes, app, lib } = this.props;
    let query_must = [];

    let componentId = "none"

    if (lib != undefined) {
        componentId = lib
        query_must.push({"term": {"LIBRARY_FULL_ARTIFACT.keyword": lib}});
    } else if (app != undefined) {
        componentId = app
        query_must.push({"term": {"INDEX_APK_CLASS.keyword": app}});
    }


    return (
        <ReactiveComponent
            componentId={"apklist_"+componentId}
            defaultQuery={() => ({
                "query": {
                    "bool": {
                        "must": query_must
                    }   
                },
                "size": 0,
                "aggs": {
                  "apps": {
                    "terms": {
                      "field": "ASSET.keyword",
                      "size": 10000
                    }
                  }
                }
            })}
        >
            <ListWrapper />
        </ReactiveComponent>

        
    )
  }
}

ApkList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ApkList);