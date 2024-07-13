(async function () {
  function getYouTubeVideoID(url) {
    const urlParams = new URLSearchParams(new URL(url).search);
    return urlParams.get('v');
  }

  async function fetchYouTubeVideoData(videoID) {
    //const apiKey = process.env.NEXT_PUBLIC_PIMLICO_API_KEY;
    const apiKey = 'AIzaSyCUFduShicPzAVxOexi5B7drdMMvFuysC8'
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoID}&part=snippet,statistics&key=${apiKey}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error('check the network');
      const data = await response.json();
      if (data.items.length === 0) throw new Error('video unknown');

      const videoData = data.items[0];
      const title = videoData.snippet.title;
      const artistName = videoData.snippet.channelTitle;
      const tags = videoData.snippet.tags || [];
      const platformId = 0; // 0 for youtube
      console.log('videoData:', videoData);
      return {
        title,
        artistName,
        platformId,
        platformLink: `https://www.youtube.com/watch?v=${videoID}`
      };
    } catch (error) {
      console.error('Error fetching video data:', error);
      return null;
    }
  }

  const videoID = getYouTubeVideoID(window.location.href);
  if (videoID) {
    const videoData = await fetchYouTubeVideoData(videoID);
    if (videoData) {
      const queryParams = new URLSearchParams(videoData).toString();
      const externalUrl = `http:localhost:3000/fill?${queryParams}`;
      window.location.href = externalUrl;
    } else {
      alert('failed.');
    }
  } else {
    alert('only on yt bruh');
  }
})();
