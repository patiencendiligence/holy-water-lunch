
import { LunchType } from "@/components/common/types";
import { useQuery } from "react-query";

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
  return (type ? lunchData?.data?.filter((i: LunchType) => i?.type === type) : lunchData?.data);
}

export const useLunchList = (type?: string) => {
  const {
    data,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['GetLunchList', type],
    queryFn: () => fetchList(type),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5, // 5분간 fresh 상태 유지 (재요청 안함)
    cacheTime: 1000 * 60 * 30, // 30분간 캐시 유지
    refetchOnWindowFocus: false, // 윈도우 포커스시 자동 재요청 안함
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
