import React from 'react';
import Photo from './photo';

const PhotoList = ({ photoList }) => {
    return (
        <div>
            {
                photoList.map((photo) => {
                    return (
                        <Photo
                            farm={photo.farm}
                            server={photo.server}
                            id={photo.id}
                            secret={photo.secret}
                        />
                    );
                })
            }
        </div>
    );
}
export default PhotoList;