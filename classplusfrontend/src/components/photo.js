import React from 'react';

const Photo = ({ farm, server, id, secret }) => {
    return (
        <button style={{ border: 'none', backgroundColor: 'white', textAlign: 'center', display: 'inline-block', padding: '30px', marginLeft: '150px' }}>
            <div style={{ cursor: 'pointer' }}>
                <img onClick={()=>{}} style={{borderRadius: '3px'}} alt="photos" src={`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`}></img>
            </div>
        </button>
    )
}
export default Photo;
