"use client";

import { FormEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type ListingFilterOption = {
  label: string;
  value: string;
};

export type ListingFilterField = {
  label: string;
  name: string;
  type: "text" | "number" | "select";
  options?: ListingFilterOption[];
};

type ListingQueryFiltersProps = {
  fields: ListingFilterField[];
  searchPlaceholder: string;
};

const ListingQueryFilters = ({
  fields,
  searchPlaceholder,
}: ListingQueryFiltersProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentParams = searchParams.toString();

  const updateUrl = (params: URLSearchParams) => {
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const applyFilters = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const params = new URLSearchParams(currentParams);

    params.delete("searchTerm");
    fields.forEach(({ name }) => params.delete(name));
    params.set("page", "1");

    const searchTerm = String(formData.get("searchTerm") ?? "").trim();
    if (searchTerm) params.set("searchTerm", searchTerm);

    fields.forEach(({ name }) => {
      const value = String(formData.get(name) ?? "").trim();
      if (value) params.set(name, value);
    });

    updateUrl(params);
  };

  const clearFilters = () => {
    const params = new URLSearchParams(currentParams);
    params.delete("searchTerm");
    fields.forEach(({ name }) => params.delete(name));
    params.delete("page");
    updateUrl(params);
  };

  return (
    <form
      key={currentParams}
      onSubmit={applyFilters}
      className="mx-auto grid max-w-7xl grid-cols-1 gap-4 rounded-xl border bg-card p-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      <div className="flex flex-col gap-2 sm:col-span-2">
        <Label htmlFor="searchTerm">Search</Label>
        <Input
          id="searchTerm"
          name="searchTerm"
          type="search"
          defaultValue={searchParams.get("searchTerm") ?? ""}
          placeholder={searchPlaceholder}
        />
      </div>

      {fields.map((field) => (
        <div key={field.name} className="flex flex-col gap-2">
          <Label htmlFor={field.name}>{field.label}</Label>
          {field.type === "select" ? (
            <select
              id={field.name}
              name={field.name}
              defaultValue={searchParams.get(field.name) ?? ""}
              className="h-8 w-full rounded-lg border border-input bg-background px-2.5 text-sm"
            >
              <option value="">Any</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <Input
              id={field.name}
              name={field.name}
              type={field.type}
              defaultValue={searchParams.get(field.name) ?? ""}
            />
          )}
        </div>
      ))}

      <div className="flex items-end gap-2 sm:col-span-2 lg:col-span-4">
        <Button type="submit">Apply filters</Button>
        <Button type="button" variant="outline" onClick={clearFilters}>
          Clear filters
        </Button>
      </div>
    </form>
  );
};

export default ListingQueryFilters;
