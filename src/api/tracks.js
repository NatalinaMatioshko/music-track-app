// API функції для роботи з треками

// Отримати всі треки з можливістю фільтрації та сортування
export const getTracks = async (
  page = 1,
  limit = 10,
  search = "",
  sort = "",
  genre = "",
  artist = ""
) => {
  try {
    const queryParams = new URLSearchParams({
      page,
      limit,
      ...(search && { search }),
      ...(sort && { sort }),
      ...(genre && { genre }),
      ...(artist && { artist }),
    });

    const response = await fetch(`/api/tracks?${queryParams}`);

    if (!response.ok) {
      throw new Error("Failed to fetch tracks");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching tracks:", error);
    throw error;
  }
};

// Отримати один трек за ID
export const getTrack = async (id) => {
  try {
    const response = await fetch(`/api/tracks/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch track with id ${id}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching track ${id}:`, error);
    throw error;
  }
};

// Створити новий трек
export const createTrack = async (trackData) => {
  try {
    const response = await fetch("/api/tracks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trackData),
    });

    if (!response.ok) {
      throw new Error("Failed to create track");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating track:", error);
    throw error;
  }
};

// Оновити існуючий трек
export const updateTrack = async (id, trackData) => {
  try {
    const response = await fetch(`/api/tracks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trackData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update track with id ${id}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error updating track ${id}:`, error);
    throw error;
  }
};

// Видалити трек
export const deleteTrack = async (id) => {
  try {
    const response = await fetch(`/api/tracks/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete track with id ${id}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error deleting track ${id}:`, error);
    throw error;
  }
};

// Завантажити аудіо файл для треку
export const uploadTrackFile = async (id, file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`/api/tracks/${id}/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload file for track ${id}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error uploading file for track ${id}:`, error);
    throw error;
  }
};

// Видалити аудіо файл з треку
export const deleteTrackFile = async (id) => {
  try {
    const response = await fetch(`/api/tracks/${id}/file`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete file for track ${id}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error deleting file for track ${id}:`, error);
    throw error;
  }
};

// Отримати список всіх жанрів
export const getGenres = async () => {
  try {
    const response = await fetch("/api/genres");

    if (!response.ok) {
      throw new Error("Failed to fetch genres");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error;
  }
};
