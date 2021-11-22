import React from 'react';

const AQICategory = () => {
    return (
        <div style={{width: '100%', display:'flex', height:'80px', textAlign:'center'}}>
        <div style={{width: '16%', float: 'left', background: '#55a84f'}}>  <small>Good<br/>(0-50) </small></div>
        <div style={{background: '#a3c853', width: '16%'}}> <small>Satisfactory <br/>(51-100) </small></div>
        <div style={{background: '#fff833', width: '16%'}}> <small>Moderate <br/>(101-200) </small></div>
        <div style={{background: '#f29c33', width: '16%'}}> <small>Poor <br/>(201-300)</small> </div>
        <div style={{background: '#e93f33', width: '20%'}}> <small>Very Poor<br/>(301-400) </small></div>
        <div style={{background: '#af2d24', width: '16%'}}> <small>Severe <br/>(400-500) </small> </div>
      </div>
    )
}

export default AQICategory