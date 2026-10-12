import { api } from "@/lib/axios/http-client";

export const applyForLandlordService = {
  getMyApplicationForLandlord: async () => {
    const { data } = await api.get("/landlord-applications/me");
    return data;
  },
};
