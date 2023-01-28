import useSWR from "swr";
import useSWRMutation from 'swr/mutation';

import {addTemplate, fetcher, LiveStreamerEntity} from "../libs/api-streamer";


export default function useStreamers() {
  const { data, error, isLoading } = useSWR<LiveStreamerEntity[]>("/v1/streamers", fetcher);

  return {
    isLoading,
    streamers: data,
  };
}
