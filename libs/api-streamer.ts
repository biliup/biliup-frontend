// Fetcher implementation.
// The extra argument will be passed via the `arg` property of the 2nd parameter.
// In the example below, `arg` will be `'my_token'`
export async function sendRequest(url: string, { arg }: any) {
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(arg)
    }).then(res => res.json())
  }

export const fetcher = (...args: [ RequestInfo | URL, RequestInit | undefined]) => fetch(...args).then((res) => res.json())

export function getStreamers() {

}