import { api } from "@/lib/axios/http-client";
import type {
  CreateLandlordApplicationInput,
  MyLandlordApplicationResponse,
} from "@/types/landlordApplication.type";

export const applyForLandlordService = {
  getMyApplicationForLandlord: async (): Promise<MyLandlordApplicationResponse> => {
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
};
