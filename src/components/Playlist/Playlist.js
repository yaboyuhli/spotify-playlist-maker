import React from "react";
import "./Playlist.css";
import TrackList from "../TrackList/TrackList";

export class Playlist extends React.Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
  }

  // update state of playlist named based on user input
  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input defaultValue={"New Playlist"} onChange={this.handleNameChange} />
        <TrackList
          tracks={this.props.playlistTracks}
          onRemove={this.props.onRemove}
          isRemoval={true}
          onSave = {this.props.onSave}
        />
        <button className="Playlist-save" onClick = {this.props.onSave}>SAVE TO SPOTIFY</button>
      </div>
    );
  }
}

export default Playlist;
