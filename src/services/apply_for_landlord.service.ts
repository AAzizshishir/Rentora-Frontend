import { api } from "@/lib/axios/http-client";
import type {
  AllLandlordApplicationsResponse,
  CreateLandlordApplicationInput,
  MyLandlordApplicationResponse,
  RejectLandlordApplicationInput,
} from "@/types/landlordApplication.type";

export const applyForLandlordService = {
  getMyApplicationForLandlord:
    async (): Promise<MyLandlordApplicationResponse> => {
      const { data } = await api.get<MyLandlordApplicationResponse>(
        "/landlord-applications/me",
      );
      return data;
    },

  createApplicationForLandlord: async (
    payload: CreateLandlordApplicationInput,
  ) => {
    const { data } = await api.post("/landlord-applications", payload);
    return data;
  },

  getAllApplicationsForLandlord: async () => {
    const { data } = await api.get<AllLandlordApplicationsResponse>(
      "/admin/landlord-applications",
    );
    return data;
  },

  approveLandlordApplication: async (id: string) => {
    const { data } = await api.patch(
      `/admin/landlord-applications/${id}/approve`,
    );
    return data;
  },

  rejectLandlordApplication: async ({
    id,
    payload,
  }: {
    id: string;
    payload: RejectLandlordApplicationInput;
  }) => {
    const { data } = await api.patch(
      `/admin/landlord-applications/${id}/reject`,
      payload,
    );
    return data;
  },
};
