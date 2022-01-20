export interface Show {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: [];
  status: string;
  runtime: number;
  averageRuntime: number;
  premiered: string;
  ended: string;
  officialSite: string;
  schedule: schedule;
  rating: any;
  weight: number;
  network: any;
  webChannel: string;
  dvdCountry: string;
  externals: any;
  image: Image;
  medium: string;
  original: string;
  summary: string;
  updated: number;
  _links: any;
}
export interface schedule {
  time: string;
  days: Array<string>;
}

export interface Image {
  medium: string;
  original: string;
}

export interface Episode {
  id: number;
  url: string;
  name: string;
  season: number;
  number: number;
  type: string;
  airdate: string;
  airtime: string;
  airstamp: string;
  runtime: string;
  rating: any;
  image: any;
  summary: string;
  _links: any;
}

interface Search {
  score: number;
  show: Show;
}

export const apiShowsPage = (page: number): Promise<Array<Show>> => {
  return new Promise((resolve, reject) =>
    fetch(`https://api.tvmaze.com/shows?page=${page}`)
      .then((response) => response.json())
      .then((json) => resolve(json))
      .catch(() => reject({ error: true }))
  );
};

export const apiShows = (id: number): Promise<Show> => {
  return new Promise((resolve, reject) =>
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then((response) => response.json())
      .then((json) => resolve(json))
      .catch(() => reject({ error: true }))
  );
};

export const apiEpisodes = (id: number): Promise<Episode> => {
  return new Promise((resolve, reject) =>
    fetch(`https://api.tvmaze.com/shows/${id}/episodes`)
      .then((response) => response.json())
      .then((json) => resolve(json))
      .catch(() => reject({ error: true }))
  );
};

export const apiSearchShows = (value: string): Promise<Array<Search>> => {
  return new Promise((resolve, reject) =>
    fetch(`https://api.tvmaze.com/search/shows?q=${value}`)
      .then((response) => response.json())
      .then((json) => resolve(json))
      .catch(() => reject({ error: true }))
  );
};
