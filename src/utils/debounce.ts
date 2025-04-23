// export function debounce<T extends (...args: any[]) => any>(
//   fn: T,
//   delay: number
// ): (...args: Parameters<T>) => void {
//   let timeoutId: ReturnType<typeof setTimeout>;

//   return function (...args: Parameters<T>) {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => fn(...args), delay);
//   };
// }

/**
 * Створює debounced версію переданої функції, яка відкладає виклик
 * оригінальної функції до закінчення вказаного часу очікування
 * після останнього виклику.
 *
 * @param fn Функція, яку потрібно дебаунсити
 * @param delay Час затримки у мілісекундах
 * @returns Дебаунс-функція, яка приймає ті ж аргументи, що й оригінальна
 */
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function (...args: Parameters<T>): void {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = undefined;
    }, delay);
  };
}
