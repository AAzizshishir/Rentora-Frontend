import { bannerService } from "@/services/banner.service";
import {
  BannerInput,
  CreateBannerInput,
} from "@/types/banner.type";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useGetAllBanners = () => {
  return useQuery({
    queryKey: ["banner"],
    queryFn: () => bannerService.getAll(),
  });
};

export const useGetBanner = (bannerId: string) => {
  return useQuery({
    queryKey: ["banner", bannerId],
    queryFn: () => bannerService.getById(bannerId),
    enabled: Boolean(bannerId),
  });
};

export const useCreateBanner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBannerInput) => bannerService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banner"] });
      toast.success("Banner created successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message ?? "Something went wrong");
    },
  });
};

export const useUpdateBanner = (bannerId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: BannerInput) =>
      bannerService.update(bannerId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banner"] });
      toast.success("Banner updated successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message ?? "Something went wrong");
    },
  });
};

export const useDeleteBanner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bannerId: string) => bannerService.delete(bannerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banner"] });
      toast.success("Banner deleted successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message ?? "Something went wrong");
    },
  });
};
