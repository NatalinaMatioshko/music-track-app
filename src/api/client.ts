// import axios from "axios";

// const API_URL = "http://localhost:8000";

// export const apiClient = axios.create({
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // Add response interceptor for error handling
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // Handle error globally if needed
//     console.error("API Error:", error.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );

import axios from "axios";

// Використовуємо змінну середовища або дефолтне значення
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Розширений інтерцептор для глобальної обробки помилок
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Визначення типу помилки
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Unknown error occurred";
    const statusCode = error.response?.status;

    // Логування деталей помилки
    console.error(`API Error (${statusCode}):`, errorMessage);

    // Обробка специфічних статус-кодів
    if (statusCode === 401) {
      // Обробка помилки авторизації
      console.warn("Authentication required");
    } else if (statusCode === 404) {
      // Обробка "не знайдено"
      console.warn("Resource not found");
    } else if (statusCode >= 500) {
      // Обробка серверних помилок
      console.error("Server error occurred");
    }

    return Promise.reject({
      ...error,
      friendlyMessage: getErrorMessage(statusCode, errorMessage),
    });
  }
);

// Функція для отримання дружніх повідомлень про помилки
function getErrorMessage(
  statusCode: number | undefined,
  message: string
): string {
  switch (statusCode) {
    case 400:
      return "Invalid request data. Please check your input.";
    case 401:
      return "You need to be logged in to perform this action.";
    case 403:
      return "You don't have permission to perform this action.";
    case 404:
      return "The requested resource was not found.";
    case 409:
      return "This operation caused a conflict. Please try again.";
    case 413:
      return "The file you're trying to upload is too large.";
    case 429:
      return "Too many requests. Please try again later.";
    default:
      return statusCode && statusCode >= 500
        ? "A server error occurred. Please try again later."
        : message;
  }
}
