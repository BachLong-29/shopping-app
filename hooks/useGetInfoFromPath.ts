import { usePathname } from "next/navigation";

export const useGetInfoFromPath = () => {
  const pathName = usePathname();
  const [, , userId, module, param] = pathName.split("/");
  // const match = pathName.match(/\/my-task\/([^/]+)\/[^/]+/);
  return { userId, module, param };
};
