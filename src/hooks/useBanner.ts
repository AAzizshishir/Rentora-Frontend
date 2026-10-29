import { bannerService } from "@/services/banner.service";
import { useQuery } from "@tanstack/react-query";

export const useGetAllBanners = () => {
  return useQuery({
    queryKey: ["banner"],
    queryFn: () => bannerService.getAll(),
  });
};
