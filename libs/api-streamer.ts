// Fetcher implementation.
// The extra argument will be passed via the `arg` property of the 2nd parameter.
// In the example below, `arg` will be `'my_token'`
export async function sendRequest(url: string, { arg }: any) {
  console.log(JSON.stringify(arg));
  
  const res =  await fetch(process.env.NEXT_PUBLIC_API_SERVER + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(arg)
  })
  
  if(res.headers.get('Content-Type') !== 'application/json') {
    throw new Error(await res.text());
  }
  const data =  await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
}

export const fetcher = (...args: [ RequestInfo | URL, RequestInit | undefined]) => fetch((process.env.NEXT_PUBLIC_API_SERVER ?? '') + args[0], args[1]).then((res) => res.json())


export interface StudioEntity {
	id: number;
	template_name: string;
	copyright: number;
	source: string;
	tid: number;
	cover: string;
	title: string;
	desc: string;
	dynamic: string;
	tag: string;
	dtime?: number;
	interactive: number;
	mission_id?: number;
	dolby: number;
	lossless_music: number;
	no_reprint?: number;
	up_selection_reply: boolean;
	up_close_reply: boolean;
	up_close_danmu: boolean;
	open_elec?: number;
}

export interface LiveStreamerEntity {
	id: number;
	url: string;
	remark: string;
	upload_id?: number;
	status: string;
}

export interface BiliType {
	id: number;
	children: BiliType[];
	name: string;
	desc: string;
}

export function getStreamers() {

}

export async function addTemplate(url: string, {arg}: any) {
  console.log(url, arg);
  
  sendRequest('/v1/upload/streamers', {arg})
}
