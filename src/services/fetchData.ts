/**
 * Fetch data from a URL
 * @param url URL to fetch data from
 * @param options Fetch options
 * @returns Promise with fetched data
 * @throws Error if fetch fails
 */

export default async function fetchData<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, options);

    // Wait some time
    await new Promise(resolve => setTimeout(resolve, 1000));

    if(!response.ok) {
      throw new Error(`${response.statusText} (${response.status})`);
    }

    const data = await response.json() as T;
    return data;
  } catch(error: any) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
}