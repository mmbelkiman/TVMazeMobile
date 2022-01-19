export const apiUpdatesShows = () => {
  return new Promise((resolve, reject) =>
    fetch("https://api.tvmaze.com/updates/shows?since=day")
      .then((response) => response.json())
      .then((json) => resolve(json))
      .catch(() => reject({ error: true }))
  );
};
