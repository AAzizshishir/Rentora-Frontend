"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDeleteBanner, useGetAllBanners } from "@/hooks/useBanner";
import { IGetBanner } from "@/types/banner.type";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

const formatDate = (date: string | null, fallback: string) =>
  date ? new Date(date).toLocaleDateString() : fallback;

const ManageBanner = () => {
  const { data, isLoading, isError } = useGetAllBanners();
  const { mutate: deleteBanner, isPending: isDeleting } = useDeleteBanner();

  if (isLoading) {
    return (
      <p className="py-8 text-center text-muted-foreground">
        Loading banners...
      </p>
    );
  }

  if (isError) {
    return (
      <p className="py-8 text-center text-destructive" role="alert">
        Error loading banners. Please try again.
      </p>
    );
  }

  const banners: IGetBanner[] = data?.data ?? [];

  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Manage Banners</h1>
        <p className="text-sm text-muted-foreground">
          View and manage the banners displayed across your site.
        </p>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Banner</TableHead>
              <TableHead>Placement</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Schedule</TableHead>
              <TableHead>Call to action</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {banners.length ? (
              banners.map((banner) => (
                <TableRow key={banner.id}>
                  <TableCell>
                    <div className="flex min-w-56 items-center gap-3">
                      <div
                        role="img"
                        aria-label={
                          banner.altText || banner.title || "Banner image"
                        }
                        className="size-14 shrink-0 rounded-md bg-muted bg-cover bg-center"
                        style={{
                          backgroundImage: banner.imageUrl
                            ? `url("${banner.imageUrl}")`
                            : undefined,
                        }}
                      />
                      <div className="min-w-0">
                        <p className="max-w-56 truncate font-medium">
                          {banner.title || "Untitled banner"}
                        </p>
                        <p className="max-w-56 truncate text-xs text-muted-foreground">
                          {banner.subtitle ||
                            banner.altText ||
                            "No description"}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{banner.placement.replaceAll("_", " ")}</TableCell>
                  <TableCell>
                    <span
                      className={
                        banner.isActive
                          ? "rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700"
                          : "rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                      }
                    >
                      {banner.isActive ? "Active" : "Inactive"}
                    </span>
                  </TableCell>
                  <TableCell>{banner.sortOrder}</TableCell>
                  <TableCell>
                    <div className="text-xs">
                      <p>
                        From: {formatDate(banner.startsAt, "No start date")}
                      </p>
                      <p>Until: {formatDate(banner.endsAt, "No end date")}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {banner.ctaText ? (
                      <div>
                        <p>{banner.ctaText}</p>
                        {banner.ctaLink && (
                          <p className="max-w-36 truncate text-xs text-muted-foreground">
                            {banner.ctaLink}
                          </p>
                        )}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">None</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Link href={`/edit-banner/${banner.id}`}>
                        <Button
                          type="button"
                          className="cursor-pointer"
                          variant="outline"
                          size="sm"
                        >
                          <Pencil aria-hidden="true" />
                          Edit
                        </Button>
                      </Link>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        disabled={isDeleting}
                        onClick={() => {
                          if (window.confirm("Delete this banner?")) {
                            deleteBanner(banner.id);
                          }
                        }}
                      >
                        <Trash2 aria-hidden="true" />
                        {isDeleting ? "Deleting..." : "Delete"}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-muted-foreground"
                >
                  No banners found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Button type="button" className="w-full">
        <Plus aria-hidden="true" />
        Add banner
      </Button>
    </section>
  );
};

export default ManageBanner;
