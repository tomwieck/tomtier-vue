<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const radioUrl =
  "https://stream.firstdozenradio.online/api/nowplaying/first_dozen";

let nowPlaying = ref("");

// const websocketUrl =
//   "wss://stream.firstdozenradio.online/api/live/nowplaying/websocket";

// let currentTime = 0;
// let socket = new WebSocket(websocketUrl);

// socket.onopen = function (e) {
//   socket.send(
//     JSON.stringify({
//       subs: {
//         "station:first_dozen": { recover: true },
//       },
//     })
//   );
// };

// Handle a now-playing event from a station. Update your now-playing data accordingly.
// function handleSseData(ssePayload: any, useTime = true) {
//   const jsonData = ssePayload.data;

//   if (useTime && "current_time" in jsonData) {
//     currentTime = jsonData.current_time;
//   }

//   nowPlaying = jsonData.np;
// }

// socket.onmessage = function (e) {
//   const jsonData = JSON.parse(e.data);
//   getNowPlayingData();

//   if ("connect" in jsonData) {
//     const connectData = jsonData.connect;

//     if ("data" in connectData) {
//       // Legacy SSE data
//       connectData.data.forEach((initialRow: any) => handleSseData(initialRow));
//     } else {
//       // New Centrifugo time format
//       if ("time" in connectData) {
//         currentTime = Math.floor(connectData.time / 1000);
//       }

//       // New Centrifugo cached NowPlaying initial push.
//       for (const subName in connectData.subs) {
//         const sub = connectData.subs[subName];
//         if ("publications" in sub && sub.publications.length > 0) {
//           sub.publications.forEach((initialRow: any) =>
//             handleSseData(initialRow, false)
//           );
//         }
//       }
//     }
//   } else if ("pub" in jsonData) {
//     handleSseData(jsonData.pub);
//   }
// };

const getNowPlayingData = () => {
  fetch(radioUrl, {
    headers: { "Content-type": "application/json" },
  })
    .then((res) => res.json())
    .then((response) => {
    //   console.log(response);
      const songTitle = response.now_playing.song.title;
      const songArtist = response.now_playing.song.artist;
      nowPlaying.value = `${songTitle} - ${songArtist}`;
    })
    .catch((error) => {
      console.log("Looks like there was a problem: \n", error);
    });
};

const interval = setInterval(function () {
  getNowPlayingData();
}, 10000);

onMounted(() => {
  getNowPlayingData();
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<template>
  <div class="now-playing">{{ nowPlaying }}</div>
</template>

<style></style>
