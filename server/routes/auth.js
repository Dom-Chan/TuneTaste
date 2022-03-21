import express from "express";
import fetch from "node-fetch";

const clientID = "b971150d216b42729d802a1722b7308c";
const secretID = "c9a01f2b30ab4062af27c764ccb38ea3";
const redirectURI = "http://localhost:3000";
var buffIDs = Buffer.from(clientID + ":" + secretID);
const scopeList = [
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-private",
  "user-follow-modify",
  "user-follow-read",
  "user-library-modify",
  "user-library-read",
  "streaming",
  "playlist-modify-private",
  "playlist-read-private",
  "playlist-modify-public",
  "playlist-read-collaborative",
];
const scopePARAM = scopeList.join("%20");

const router = express.Router();

router.get("/", async (request, response) => {
  const fetch_response = await fetch(
    `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=code&redirect_uri=${redirectURI}&scope=${scopePARAM}`
  );

  response.send(fetch_response.url);
});

router.post("/:code", async (request, response) => {
  const fetch_response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: `grant_type=authorization_code&code=${request.params.code}&redirect_uri=${redirectURI}`,
    //btoa(clientID + ":" + secretID)
    headers: {
      Authorization: "Basic " + buffIDs.toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const data = await fetch_response.json();
  response.json(data);
});

router.post("/refresh/:refresh_token", async (request, response) => {
  const fetch_response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: `grant_type=refresh_token&refresh_token=${request.params.refresh_token}`,

    headers: {
      Authorization: "Basic " + buffIDs.toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const new_token = await fetch_response.json();
  //console.log("GOT NEW AC TOKEN " + new_token.access_token)
  response.json(new_token);
});

export default router;
