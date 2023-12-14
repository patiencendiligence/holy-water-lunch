
import { Lunch } from "@/components/common/types";
import { useMemo } from "react";
import { dehydrate, useQuery } from "react-query";

const fetchList = async (type?: string) => {
  const lunchData = await (
    await fetch("/api/getList", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
  ).json();

  console.log(lunchData, ' :::Data');
  return (type ? lunchData?.data?.filter((i: Lunch) => i?.type === type) : lunchData?.data);
}

export const useLunchList = (type?: string) => {
  const {
    data,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['GetLunchList'],
    queryFn: () => fetchList(type),
    keepPreviousData: true,
    onError: ({
      data: {
        error: { code, userMessage, message },
      },
    }) => {
      throw new Error(`${message}(${userMessage})[${code}]`);
    },
  });

  console.log(`isLoading: ${isLoading},  isFetching: ${isFetching}`);

  return {
    data,
    isLoading,
    isFetching
  };
}
