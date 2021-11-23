import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import ShowGraph from './ShowGraph';
import moment from 'moment';
import '../assets/css/AQIIndexTab.css';
import AQICategory from './AQICategory';
import { foundAQIColor } from '../utils/Utility'; 

const AQIIndexTab = () => {

    const WS_CITY_AQI_URL = process.env.REACT_APP_WS_CITY_AQI_URL;
    //console.log("WS_CITY_AQI_URL = ", WS_CITY_AQI_URL);
    const cityAQIArray = useMemo(() => [], []);
    const MAX_AQI_POINTS_PER_GRAPH = 4;

    const ref = useRef(null);
    const refClose = useRef(null);
    const [selectedRow, setSelectedRow] = useState({});
    const [showGraphStatus, setShowGraphStatus] = useState(false);
    const [socketUrl, setSocketUrl] = useState(WS_CITY_AQI_URL);
    const [items, setItems] = useState([]);
    const [wsStatusText, setWsStatusText] = useState('Close Connection');

    const {
        lastMessage,
        readyState,
    } = useWebSocket(socketUrl);

    const pushToAQIArray = useCallback((dataArray) => {
        for (let dataObject of dataArray) {
            let foundObj = cityAQIArray.find(x => x.city === dataObject.city);
            if(foundObj){
                //already this city exists in cityAQI array, so just update
                foundObj.prevaqi = parseFloat(foundObj?.aqi).toFixed(2);
                foundObj.aqi = parseFloat(dataObject?.aqi).toFixed(2);
                foundObj.lastUpdatedAt = moment().format('DD/MM/YYYY hh:mm:ss');
                //save last 5 aqi value for graph
                if(foundObj.aqiValList.length > MAX_AQI_POINTS_PER_GRAPH){
                    foundObj.aqiValList.pop();
                } else{
                    foundObj.aqiValList.unshift(foundObj.aqi);
                }

                //save last 5 aqi value update time history for graph
                if(foundObj.aqiValTimeList.length > MAX_AQI_POINTS_PER_GRAPH){
                    foundObj.aqiValTimeList.pop();
                } else{
                    foundObj.aqiValTimeList.unshift(foundObj.lastUpdatedAt);
                }
            } else{
                //console.log("push val here..!!");
                dataObject.aqi = parseFloat(dataObject?.aqi).toFixed(2);
                dataObject.lastUpdatedAt = "---";
                dataObject.aqiValList = [];
                dataObject.aqiValTimeList = [];
                cityAQIArray.push(dataObject);
            }
        }
    },[cityAQIArray]);

    useEffect(() => {
        if (lastMessage !== null) {
        let data = JSON.parse(lastMessage.data);
        pushToAQIArray(data);
        setItems(cityAQIArray);
        }
    } , [lastMessage, pushToAQIArray, cityAQIArray]);

    const handleRowClick = (listValue) => {
        setShowGraphStatus(true);
        setSelectedRow(listValue);
        ref.current.click();
    }

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    const handleClickSocketChangeStatus = useCallback((connStatus) => {
        //console.log("connStatus here -> ", connStatus);
        if(connStatus === "Open"){
            setSocketUrl(null);
            setWsStatusText("Open Connection")
        } else {
            setSocketUrl(WS_CITY_AQI_URL);
            setWsStatusText("Close Connection")
        } 
    }, []);
        
  return (
    <div>
        <>
            <div style={{width: '100%', display:'flex', height:'25%', textAlign:'center', marginTop: '5px'}}>
                <div style={{width: '80%'}}> 
                    <span style={{float: 'right'}}><small>The WebSocket is currently {connectionStatus}</small></span>
                </div>
                <div style={{width: '20%', float: 'right',
                             marginRight:'5px', marginLeft:'5px'
                             }}>
                    <button style={{ background:'white', color:'black',
                             border: '2px solid #008CBA', borderRadius:'8px'}}
                             onClick={() => handleClickSocketChangeStatus(connectionStatus)}>
                        <span style={{float: 'right'}}><small>{ wsStatusText }</small></span>
                    </button>
                </div>
            </div>
        </>
        <div style={{fontSize:'1.5rem', textAlign:'center', marginTop : '5px'}}>
            <AQICategory />
            <br/>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-toggle="modal" data-target="#showGraphModel">
            </button>
            <div className="modal fade" id="showGraphModel" tabIndex="-1" role="dialog" aria-labelledby="showGraphModelTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="graphModalLongTitle">AQI Graph</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p> Displaying Last {selectedRow?.aqiValList?.length} AQI for {selectedRow.city}</p>
                                { showGraphStatus && <ShowGraph selectedRowData={selectedRow}/>}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" 
                                data-dismiss="modal" ref={refClose}
                                onClick={() => { setShowGraphStatus(false); }}
                                >Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            <table className="table table-bordered table-hover">
                <thead>
                    <tr className="font-link center-bold table-primary">
                    <th scope="col">City</th>
                    <th scope="col">Current AQI</th>
                    <th scope="col">Last Updated</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(( listValue, index ) => {
                            return (
                                <tr key={index} className="font-link" 
                                        onClick={() => { 
                                            handleRowClick(listValue)
                                    }}>
                                    <td>{listValue?.city}</td>
                                    <td style={{color: foundAQIColor(listValue.aqi)}}>{listValue?.aqi}</td>
                                    <td>{listValue?.lastUpdatedAt}</td>
                                </tr>
                            );
                            })}
                </tbody>
        </table>
        </div>
    </div>
    );
};

export default AQIIndexTab;