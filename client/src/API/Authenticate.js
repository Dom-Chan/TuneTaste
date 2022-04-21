import React from "react";
import { useState, useEffect } from "react";
import useProps from "../Context/PropContex";

export default function Authenticate() {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [expiresIn, setExpiresIn] = useState("");
  const { device } = useProps()
  
  useEffect(() => {
    fetch("http://localhost:5000/authorize")
      .then((response_url) => response_url.text())
      .then((url_text) => {
        let code = new URLSearchParams(window.location.search).has("code");
        if (!code) {
          window.location = url_text;
        }
      })
      .then(() => {
        let code = new URLSearchParams(window.location.search).get("code");

        window.history.pushState({}, null, "/");

        return fetch(`http://localhost:5000/authorize/${code}`, {
          method: "POST",
        });
      })
      .then((respnse_tokens) => respnse_tokens.json())
      .then((tokens) => {
        setAccessToken(tokens.access_token);
        console.log("token acquired!");
        setRefreshToken(tokens.refresh_token);
        setExpiresIn(tokens.expires_in);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (!refreshToken || !expiresIn) {
      console.log("retrieving token ...");
      return;
    }

    

    if (accessToken) {
      console.log("refreshing token ...");
      const interval = setInterval(() => {
        return fetch(
          `http://localhost:5000/authorize/refresh/${refreshToken}`,
          {
            method: "POST",
          }
        )
          .then((fetch_response) => fetch_response.json())
          .then((new_tokens) => {
            setAccessToken(new_tokens.access_token);
            setExpiresIn(new_tokens.expires_in);
          })
          .catch((err) => console.log(err));
        return () => clearInterval(interval);
      }, (expiresIn - 240) * 1000);
    }
  }, [refreshToken, expiresIn]);

  return accessToken;
}

