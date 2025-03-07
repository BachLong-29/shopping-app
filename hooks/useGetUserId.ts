import { usePathname } from "next/navigation";

export const useGetUserId = () => {
  const pathname = usePathname();
  const match = pathname.match(/\/my-task\/([^/]+)\/[^/]+/);
  return match ? match[1] : undefined;
};
