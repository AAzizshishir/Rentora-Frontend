import { api } from "@/lib/axios/http-client";
import {
  BannerInput,
  CreateBannerInput,
} from "@/types/banner.type";

const toFormData = (payload: BannerInput) => {
  const formData = new FormData();

  if (payload.image) {
    formData.append("image", payload.image);
  }
  formData.append("altText", payload.altText);
  formData.append("title", payload.title);
  formData.append("subtitle", payload.subtitle);
  formData.append("ctaText", payload.ctaText);
  formData.append("ctaLink", payload.ctaLink);

  return formData;
};

export const bannerService = {
  getAll: async () => {
    const { data } = await api.get("/banner");
    return data;
  },

  getById: async (bannerId: string) => {
    const { data } = await api.get(`/banner/${bannerId}`);
    return data;
  },

  create: async (payload: CreateBannerInput) => {
    const { data } = await api.post("/banner", toFormData(payload));
    return data;
  },

  update: async (bannerId: string, payload: BannerInput) => {
    const { data } = await api.put(
      `/banner/${bannerId}`,
      toFormData(payload),
    );
    return data;
  },

  delete: async (bannerId: string) => {
    const { data } = await api.delete(`/banner/${bannerId}`);
    return data;
  },
};
