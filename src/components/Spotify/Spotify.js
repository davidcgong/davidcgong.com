import React, { Component } from 'react';
import { SpotifyApiContext, Artist, UserTop } from 'react-spotify-api';
import TextScroll from 'react-textscroll';

const Spotify = () => {

    // const movingText = []
    // return (
    //     <SpotifyApiContext.Provider value={token}>
    //         <div>
    //             <TextScroll 
    //                 mode='horizontal'
    //                 text={movingText}
    //                 speed={10000}
    //             />
    //         </div>
    //     <UserTop type={"tracks"}>
    //             {(artist, loading, error) =>
                    
    //                 artist ? (
    //                     <div>
    //                         <h1>{artist.items[2].artists[0].name}</h1>
    //                         <p>{artist.items[2].name}</p>
    //                         <ul>
    //                             {/* {artist.genres.map(genre => (
    //                                 <li key={genre}>{genre}</li>
    //                             ))} */}
    //                         </ul>
    //                     </div>
    //                 ) : null
    //             }
    //     </UserTop>
    //     </SpotifyApiContext.Provider>
    // );
    
};

export default Spotify;