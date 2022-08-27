import React from "react";
import "./SearchResults.css";
// import App from "../App";
import TrackList from "../TrackList/TrackList";

export class SearchResults extends React.Component {
  render() {
    return (
      <div className="SearchResults">
        <div className="Results"><h2>Results</h2></div>
        <TrackList 
        tracks={this.props.searchResults}
        onAdd={this.props.onAdd}
        isRemoval={false}
         />
      </div>
    );
  }
}

export default SearchResults;
