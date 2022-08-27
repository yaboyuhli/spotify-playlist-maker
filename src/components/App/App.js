import "./App.css";
import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import Playlist from "../Playlist/Playlist";
import SearchResults from "../SearchResults/SearchResults";
import Spotify from "../../util/Spotify";

//https://developer.spotify.com/documentation/general/guides/authorization/implicit-grant/

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: "My Playlist",
      playlistTracks: []
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  // method to check track ID. if track matches do nothing if not add track to playlist
  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find((addedTrack) => addedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({ playlistTracks: tracks });
  }
  // check track ID if it is same as track clicked to remove, pop track out of playlist
  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find((savedTrack) => savedTrack.id === track.id)) {
      tracks.pop(track);
      this.setState({ playlistTracks: tracks });
    }
  }

  // update playlist name
  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map((track) => track.uri);
   //console.log(this.state.playlistTracks);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: "New Name",
        playlistTracks: [],
      });
    });
  }

  //updates state of searchResults with values resolved from Spotify.search()
  search(term) {
    Spotify.search(term).then((searchResults) => {
      this.setState({ searchResults: searchResults });
   //  console.log(term);
      //console.log(searchResults);
      
    });
  }

  render() {
    return (
      <div>
        <h1>
          Sp<span className="highlight">oti</span>fy
          Pl<span className="highlight">ay</span>list
          M<span className="highlight">ak</span>er 
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
