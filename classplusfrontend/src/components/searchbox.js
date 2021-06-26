import React from 'react';


const SearchBox = ({ onSearchChange, suggestions }) => {
    return (
        <div style={{ overflow: 'hidden', top: '0', position: 'sticky', textAlign: 'center', width: '100%', height: '200px', backgroundColor: '#000000' }}>
            <h1 style={{ color: '#ffffff' }}>Search Photos</h1>
            <input style={{ height: '50px', width: '700px', marginTop: '4' }}
                type='search'
                placeholder='Search here'
                onChange={onSearchChange}
            />
            <select
                placeholder='History'
                style={{ zIndex: '1', color: '#000000', height: '50px', width: '100px', marginTop: '4' }}
            >
                <option>History</option>
                {
                    suggestions.map(x =>{
                        return <option>{x}</option>
                    })
                }
            </select>

        </div>

    );
}
export default SearchBox;