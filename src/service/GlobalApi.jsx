import axios from "axios";

const BASE_URL = "https://places.googleapis.com/v1/places:searchText";

export const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=600&maxWidthPx=600&key=" +
  import.meta.env.VITE_GOOGLE_MAP_API_KEY;

const config = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    "X-Goog-FieldMask": ["places.photos", "places.displayName", "places.id"],
  },
};

const photoCache = new Map();

export const GetPlaceDetails = (data) => {
  const key = data.textQuery;
  if (photoCache.has(key)) return Promise.resolve(photoCache.get(key));
  return axios.post(BASE_URL, data, config).then((res) => {
    photoCache.set(key, res);
    return res;
  });
};
