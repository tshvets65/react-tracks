import React from "react";
import ReactPlayer from 'react-player'

const AudioPlayer = ({ url, mombileSize }) => (
    <div>
        <ReactPlayer url={url} height='30px' width={mombileSize ? '300px' : '500px'} controls={true} />
    </div>
)

export default AudioPlayer;
