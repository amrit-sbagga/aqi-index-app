import React from 'react';

const AQICategory = () => {
    return (
        <div style={{width: '100%', display:'flex', height:'20%', textAlign:'center', overflow:'hidden'}}>
          <div style={{width: '16%', float: 'left', background: '#55a84f'}}>  <span><small>Good<br/>(0-50) </small></span></div>
          <div style={{background: '#a3c853', width: '16%'}}> <span><small>Satisfactory <br/>(51-100) </small></span></div>
          <div style={{background: '#fff833', width: '16%'}}> <span><small>Moderate <br/>(101-200) </small></span></div>
          <div style={{background: '#f29c33', width: '16%'}}> <span><small>Poor <br/>(201-300)</small></span></div>
          <div style={{background: '#e93f33', width: '20%'}}> <span><small>Very Poor<br/>(301-400) </small></span></div>
          <div style={{background: '#af2d24', width: '16%'}}> <span><small>Severe <br/>(400-500) </small></span></div>
        </div>
    )
}

export default AQICategory