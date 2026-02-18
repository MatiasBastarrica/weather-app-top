export async function getGif(desc) {
  let url = `https://api.giphy.com/v1/gifs/translate?api_key=Ch5rqGEHlKhitIHbuoLPSmvNQ3OrOE4a&s=${desc}&rating=g`;
  let gifUrl;
  await fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      gifUrl = response.data.images.fixed_height.url;
    })
    .catch((error) => console.error(error));

  return gifUrl;
}
