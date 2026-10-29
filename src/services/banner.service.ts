import { api } from "@/lib/axios/http-client";

export const bannerService = {
  getAll: async () => {
    const { data } = await api.get("/banner");
    return data;
  },

  //   create: async (propertyId: string, payload: CreateUnitInput) => {
  //     const { data } = await api.post(`/unit/${propertyId}`, payload, {
  //       headers: { "Content-Type": "application/json" },
  //     });
  //     return data;
  //   },

  //   update: async (unitId: string, payload: Partial<Unit>) => {
  //     const { data } = await api.put(`/unit/${unitId}`, payload);
  //     return data;
  //   },

  //   delete: async (unitId: string) => {
  //     const { data } = await api.delete(`/unit/${unitId}`);
  //     return data;
  //   },
};
