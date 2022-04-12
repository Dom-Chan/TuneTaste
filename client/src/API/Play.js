export const play_track = ({ device, playObject, access_token }) => {
  fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device}`, {
    method: "PUT",
    body: JSON.stringify({ uris: [playObject] }),
    headers: {
      Authorization: "Bearer " + access_token,
    },
  }).then((res) => {
    if (res.status === 404) {
      window.alert("OPEN SPOTIFY and refresh page");
    }
  });
};

export const play_playlist = ({ device, playlist, access_token }) => {
  fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device}`, {
    method: "PUT",
    body: JSON.stringify({
      context_uri: `spotify:playlist:${playlist.id}`,
      offset: { uri: playlist.tracks.items[0].track.uri },
    }),
    headers: { Authorization: "Bearer " + access_token },
  }).then((res) => {
    if (res.status === 404) {
      window.alert("OPEN SPOTIFY and refresh page");
    }
  });
};

export const play_artist = async ({
  device,
  review,
  country,
  access_token,
}) => {
  try {
    const fetch_artistAlbum = await fetch(
      `https://api.spotify.com/v1/artists/${review.itemId}/albums?include_groups=album,single&market=${country}`,
      { headers: { Authorization: "Bearer " + access_token } }
    );
    const artist_albums = await fetch_artistAlbum.json();
    const latest_album = await fetch(
      `https://api.spotify.com/v1/albums/${artist_albums.items[0].id}`,
      {
        headers: { Authorization: "Bearer " + access_token },
      }
    );
    const album = await latest_album.json();
    const album_track = await fetch(
      `https://api.spotify.com/v1/me/player/play?device_id=${device}`,
      {
        method: "PUT",
        body: JSON.stringify({
          context_uri: album.uri,
          offset: { uri: album.tracks.items[0].uri },
        }),
        headers: { Authorization: "Bearer " + access_token },
      }
    )
    return album.tracks.items[0].id
  } catch (error) {
    console.log(error);
  }
};

export const play_album = ({device, album, access_token}) => {
  fetch(`https://api.spotify.com/v1/me/player/play?device_id=${device}`, {
          method: "PUT",
          body: JSON.stringify({
            context_uri: album.uri,
            offset: { uri: album.tracks.items[0].uri },
          }),
          headers: { Authorization: "Bearer " + access_token },
        }).then((res) => {
          if (res.status === 404) {
            window.alert("OPEN SPOTIFY and refresh page");
          }
        });
}
