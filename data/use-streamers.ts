import useSWR from "swr";

import {fetcher} from "../libs/api-streamer";

export default function useStreamers() {
  const { data, error, isLoading } = useSWR(process.env.NEXT_PUBLIC_API_SERVER + "/v1/streamers", fetcher);

  return {
    isLoading,
    streamers: data,
  };
}