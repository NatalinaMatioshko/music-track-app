import { apiClient } from "./client";

export const getGenres = async () => {
  const { data } = await apiClient.get("/genres");
  return data;
};
