export async function fetchData<T>(): Promise<T>{
    await new Promise((resolve)=> setTimeout(resolve, 3000))
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        cache: 'no-cache' // SSG
    });
    const data: T = await response.json();

    return data;
    
}