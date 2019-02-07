import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {ReactiveList, ReactiveComponent} from '@appbaseio/reactivesearch';
import Module from './Module'
import {Treebeard, decorators} from 'react-treebeard';

import {treestyle} from './ModuleListStyle.js'

// const _ = require('deepdash')(require('lodash'));

const styles = theme => ({

});

decorators.Header = ({style, node}) => {

    return (
        <div style={style.base}>
            <div style={style.title}>
                {node.name} <b>{node.library}</b>
            </div>
        </div>
    );
};

const dotTree = (input, libraries) => {
    var output = [];
    
    for (var i = 0; i < input.length; i++) {
        var chain = input[i].split(".");
        var currentNode = output;
        var fullNode = "";
        for (var j = 0; j < chain.length; j++) {
            var wantedNode = chain[j];
            var lastNode = currentNode;

            for (var k = 0; k < currentNode.length; k++) {
                if (currentNode[k].name == wantedNode) {
                    currentNode = currentNode[k].children;
                    break;
                }
            }
            // If we couldn't find an item in this list of children
            // that has the right name, create one:
            if (lastNode == currentNode) {
                let toggled = true;
                if (j >= 1){
                    toggled = true;
                }
                let lib = null;
                let check = (fullNode + "." + wantedNode).substr(1);
                if (check in libraries)
                {
                    
                    lib = libraries[check];
                    toggled = false;
                }
                
                var newNode = currentNode[k] = {name: wantedNode, children: [], "toggled": toggled, "library": lib, "module": check};
                currentNode = newNode.children;
            }
            fullNode = fullNode + "." + wantedNode
        }
    }
    return output;
}

class ModuleWrapper extends React.Component {
        constructor(props){
            super(props);
            this.state = {cursor: undefined};
            this.onToggle = this.onToggle.bind(this);
            this.init = true

             // const {stateData, cursor} = this.state;
             this.data = {"name":"root", "toggled": true, children: []}           
             
        }

        componentWillUpdate(props) {
            if (this.init &&
                // checking for when component gets the aggregation results
                props.aggregations
                && props.aggregations.modules
                && props.aggregations.modules.buckets.length
            ) {
                let input = props.aggregations.modules.buckets.map(m => m.key);
                let lib_modules = {};
                props.aggregations.lib_modules.buckets.map(m => {
                    lib_modules[m.key] = m.libraries["buckets"][0].key;
                });

                // console.log(lib_modules)
                this.data.children = dotTree(input, lib_modules);
                this.init = false
            }
          }
        

        onToggle(node, toggled){

            const {cursor} = this.state;

            if (cursor) {
                cursor.active = false;
            }

            node.active = true;
            if (node.children) {
                node.toggled = toggled;
            }

            this.setState({cursor: node});
        }
        
        render() {
            
            return (<div>
                <Treebeard
                    data={this.data}
                    style={treestyle}
                    onToggle={this.onToggle}
                />
            </div>)
        }
}

class ModuleList extends React.Component {
  render() {
    const { classes, app } = this.props;
    return (
        <ReactiveComponent
            componentId={"lib_"+app}
            dataField="TYPE.keyword"
            sortBy="desc"
            pagination={false}
            showResultStats={false}
            loader="Loading Modules"
            onNoResults="No modules found"
            // renderData={(res) => <Module key={res._id} module={res}/>}
            defaultQuery={() => ({
                "query": {
                    "bool": {
                        "must": [
                            {"term": {"ASSET.keyword": app}}
                        ]
                    }   
                },
                "size": 0,
                "aggs": {
                  "modules": {
                    "terms": {
                      "field": "MODULE_NAME.keyword",
                      "size": 10000
                    }
                  },
                  "lib_modules": {
                    "terms": {
                      "field": "LIBRARY_FULL_ARTIFACT.keyword",
                      "size": 1000
                    },
                    "aggs": {
                      "libraries": {
                        "terms": {
                          "field": "LIBRARY_NAME.keyword",
                          "size": 1000
                        }
                        
                      }
                    }
                  }
                }
                
            })}
        >
            <ModuleWrapper />
        </ReactiveComponent>
    );
  }
}

ModuleList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ModuleList);