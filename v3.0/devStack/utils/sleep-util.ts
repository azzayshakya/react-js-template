/**
 * Asynchronous function to simulate a delay.
 *
 * @param {number} [ms=2000] - The number of milliseconds to delay. Default is 2000ms.
 * @returns {Promise<void>} - A promise that resolves after the specified delay.
 */
export function sleep(ms: number = 2000): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  