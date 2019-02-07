import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import {DataSearch, ReactiveList, MultiDataList} from '@appbaseio/reactivesearch'
import '../styles/MainSearch.scss';
import Apk from './items/Apk';
import Library from './items/Library'
import Elf from './items/Elf'
import Meta from './items/MetaData'
import Resource from './items/Resource'

const MainSearch = () => {
    
    return(
        <div>
            <DataSearch
                innerClass={{
                    title: 'text-title',
                    input: 'text-input',
                    list: 'text-list'
                }}
                componentId="SearchModule"
                fieldWeights={[10,8,3,2,1]}
                fuzziness={0}
                dataField={["INDEX_APK_NAME", "INDEX_LIBRARY_NAME", "META_NAME.simple", "RESOURCE_VALUE.simple", "ASSET"]}
                URLParams={true}
                react={{
                    and: ["TypeFilter"]
                  }}
            />

            <MultiDataList
            componentId="TypeFilter"
            dataField="TYPE.keyword"
            defaultValue={["LIB"]}
            URLParams={true}
            showSearch={false}
            data={
                [{
                label: "APP",
                value: "INDEX_APK"
                }, {
                label: "LIB",
                value: "INDEX_LIBRARY"
                }, {
                label: "META",
                value: "META"
                },
                {
                label: "RESOURCE",
                value: "RESOURCE"
                }]
            }
            />

            <ReactiveList
                    react={{
                        "and": ["SearchModule", "TypeFilter"]
                    }}
                    showResultStats={false}
                    componentId="AppList"
                    dataField="TYPE.keyword"
                    // defaultQuery={() => ({
                    //     query: {
                    //         term: {"TYPE.keyword": 'INDEX_APK'},
                    //     },
                    // })}
                    pagination={true}
                    paginationAt="bottom"
                    renderData={(res) => {

                        console.log(res.TYPE);
                        if (res.TYPE === "INDEX_APK")
                        {
                            return <Apk key={res._id} app={res} full={true} />
                        }
                        else if (res.TYPE === "INDEX_LIBRARY")
                        {
                            return <Library key={res._id} lib={res} full={true} />
                        }
                        else if (res.TYPE === "ELF") {
                            // return <Elf key={res._id} elf={res} full={true} />
                        }
                        else if (res.TYPE === "META") {
                            return <Meta key={res._id} meta={res} full={true} />
                        }
                        else if (res.TYPE === "RESOURCE") {
                            return <Resource key={res._id} res={res} full={true} />
                        }
                        
                        
                        return <div>{res.TYPE}</div>
                        // }

                        
                    }}
                />  
        </div>
    )
}
export default MainSearch;