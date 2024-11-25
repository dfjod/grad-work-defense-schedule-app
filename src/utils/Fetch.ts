export default async function fetchData<T>(path: string): Promise<T> {
    const response = await fetch(`http://localhost:3030${path}`)

    if (!response.ok) {
        throw new Error(response.statusText)
    }

    return await response.json() as T
}
