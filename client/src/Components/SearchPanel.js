import React, { useState, useEffect } from "react";
import useProps from "../Context/PropContex";
import styles from "../Styles/Searchpanel.module.css";
import { Link } from "react-router-dom";
import Track from "./Track";
import Card from "./Card";

function SearchPanel() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const { access_token } = useProps();
  const linkStyle = { textDecoration: "none" };
  useEffect(() => {
    let isCancelled = false;
    if (!search) return;

    fetch(
      `https://api.spotify.com/v1/search?q=${search}&type=track,artist,album,playlist&limit=5`,
      {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      }
    )
      .then((fetch_response) => fetch_response.json())
      .then((search) => {
        if (isCancelled) return;
        setAlbums(search.albums);
        var art_arr = [search.artists.items[0], search.artists.items[1]];
        setArtists(art_arr);
        setPlaylists(search.playlists);
        setTracks(search.tracks);
        console.log(search)
      });

    return () => {
      isCancelled = true;
    };
  }, [search]);

  return (
    <div className={styles.searchpanel}>
      <div className={styles.navpanel}>
        <input
          type="search"
          className={styles.search}
          placeholder="Search for songs, playlists, artists, etc"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className={styles.results}>
        <div className={styles.track_results}>
          {tracks.items !== undefined &&
            tracks.items.map((track) => (
              <Track item={track} key={track.id} id={track.id} type="track" />
            ))}
        </div>
        <div className={styles.artist_results}>
          {artists.total > 0 && <p className={styles.artist_tag}>ARTISTS</p>}
          <div className={styles.artist2_results}>
            {artists.id !== undefined &&
              artists.map((artist) => (
                <Link
                  to={`artist/${artist.id}`}
                  key={artist.id}
                  style={linkStyle}
                >
                  <Card type="artist" card_value={artist} />
                </Link>
              ))}
          </div>
        </div>
        <div className={styles.playlist_results}>
          {(playlists.items !== undefined && playlists.items.length > 0) && (
            <p className={styles.artist_tag}>PLAYLISTS</p>
          )}
          <div className={styles.artist2_results}>
            {playlists.items !== undefined &&
              playlists.items.map((playlist) => (
                <Link
                  to={`playlist/${playlist.id}`}
                  key={playlist.id}
                  style={linkStyle}
                >
                  <Card type="playlist" card_value={playlist} />
                </Link>
              ))}
          </div>
        </div>
        <div className={styles.playlist_results}>
          {(albums.items !== undefined && albums.items.length > 0) && (
            <p className={styles.artist_tag}>ALBUMS</p>
          )}
          <div className={styles.artist2_results}>
            {albums.items !== undefined &&
              albums.items.map((album) => (
                <Link
                  to={`album/${album.id}`}
                  key={album.id}
                  style={linkStyle}
                >
                  <Card type="album" card_value={album} />
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPanel;
