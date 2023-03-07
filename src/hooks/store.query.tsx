import { useQuery } from "react-query";

export const useLunchList = () => {
  return useQuery(
    ["GetLunchList"],
    async () => {
      const lunchData = await (
        await fetch("/api/getList", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
      ).json();
      return lunchData;
    },
    {
      keepPreviousData: true,
      refetchOnMount: "always",
      onError: ({
        data: {
          error: { code, userMessage, message },
        },
      }) => {
        throw new Error(`${message}(${userMessage})[${code}]`);
      },
    }
  );
};
