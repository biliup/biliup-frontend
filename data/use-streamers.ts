import useSWR from "swr";
import useSWRMutation from 'swr/mutation';

import {addTemplate, fetcher} from "../libs/api-streamer";


export default function useStreamers() {
  const { data, error, isLoading } = useSWR("/v1/streamers", fetcher);

  return {
    isLoading,
    streamers: data,
  };
}