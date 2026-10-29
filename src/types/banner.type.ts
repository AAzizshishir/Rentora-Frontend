export interface IGetBanner {
  id: string;
  imageUrl: string;
  imagePublicId: string;
  altText: string;
  title: string;
  subtitle: string;
  ctaText: string | null;
  ctaLink: string | null;
  placement: string;
  sortOrder: number;
  isActive: boolean;
  startsAt: string | null;
  endsAt: string | null;
  createdById: string;
  updatedById: string | null;
  createdAt: string;
  updatedAt: string;
}
