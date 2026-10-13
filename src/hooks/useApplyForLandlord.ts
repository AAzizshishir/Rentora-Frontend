import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { applyForLandlordService } from "@/services/apply_for_landlord.service";
import type {
  CreateLandlordApplicationInput,
  RejectLandlordApplicationInput,
} from "@/types/landlordApplication.type";

const MY_LANDLORD_APPLICATION_QUERY_KEY = ["my-landlord-applications"] as const;

const GET_ALL_LANDLORD_APPLICATIONS_QUERY_KEY = [
  "all-applications-for-landlord",
] as const;

export const useGetMyLandlordApplication = () => {
  return useQuery({
    queryKey: MY_LANDLORD_APPLICATION_QUERY_KEY,
    queryFn: applyForLandlordService.getMyApplicationForLandlord,
  });
};

export const useCreateLandlordApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateLandlordApplicationInput) =>
      applyForLandlordService.createApplicationForLandlord(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: MY_LANDLORD_APPLICATION_QUERY_KEY,
      });
      toast.success(
        "Your landlord application has been submitted successfully.",
      );
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message ?? "Something went wrong");
    },
  });
};

export const useGetAllApplicationsForLandlord = () => {
  return useQuery({
    queryKey: GET_ALL_LANDLORD_APPLICATIONS_QUERY_KEY,
    queryFn: applyForLandlordService.getAllApplicationsForLandlord,
  });
};

export const useApproveLandlordApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      applyForLandlordService.approveLandlordApplication(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GET_ALL_LANDLORD_APPLICATIONS_QUERY_KEY,
      });
      toast.success("Landlord application approved.");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message ?? "Something went wrong");
    },
  });
};

export const useRejectLandlordApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: RejectLandlordApplicationInput;
    }) => applyForLandlordService.rejectLandlordApplication({ id, payload }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GET_ALL_LANDLORD_APPLICATIONS_QUERY_KEY,
      });
      toast.success("Landlord application rejected.");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message ?? "Something went wrong");
    },
  });
};
