"use client";

import { FormSkeleton } from "@/components/shared/form-skeleton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useGetBanner, useUpdateBanner } from "@/hooks/useBanner";
import { IGetBanner } from "@/types/banner.type";
import { useForm } from "@tanstack/react-form";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditBanner = ({ id }: { id: string }) => {
  const router = useRouter();
  const { data, isLoading, isError } = useGetBanner(id);
  const { mutate, isPending } = useUpdateBanner(id);
  const [image, setImage] = useState<File>();
  const banner = data?.data as IGetBanner | undefined;

  const form = useForm({
    defaultValues: {
      altText: "",
      title: "",
      subtitle: "",
      ctaText: "",
      ctaLink: "",
    },
    onSubmit: async ({ value }) => {
      mutate({ ...value, image }, { onSuccess: () => router.back() });
    },
  });

  useEffect(() => {
    if (!banner) return;

    form.reset({
      altText: banner.altText ?? "",
      title: banner.title ?? "",
      subtitle: banner.subtitle ?? "",
      ctaText: banner.ctaText ?? "",
      ctaLink: banner.ctaLink ?? "",
    });
  }, [banner, form]);

  if (isLoading) return <FormSkeleton />;

  if (isError || !banner) {
    return (
      <p className="py-8 text-center text-destructive" role="alert">
        Error loading banner. Please try again.
      </p>
    );
  }

  return (
    <div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.back()}
        className="mb-2 gap-1 text-muted-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>

      <Card className="bg-transparent">
        <CardHeader>
          <CardTitle className="text-base">Edit banner</CardTitle>
        </CardHeader>

        <CardContent>
          <form
            id="edit-banner-form"
            onSubmit={(event) => {
              event.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <Field>
                <Label htmlFor="banner-image">Image</Label>
                <div
                  role="img"
                  aria-label={banner.altText || banner.title || "Banner image"}
                  className="h-40 w-full rounded-md bg-muted bg-cover bg-center"
                  style={{
                    backgroundImage: banner.imageUrl
                      ? `url("${banner.imageUrl}")`
                      : undefined,
                  }}
                />
                <Input
                  id="banner-image"
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    setImage(event.target.files?.[0] ?? undefined)
                  }
                />
                {image && (
                  <p className="text-xs text-muted-foreground">
                    Selected: {image.name}
                  </p>
                )}
              </Field>

              <form.Field name="altText">
                {(field) => (
                  <Field>
                    <Label htmlFor={field.name}>Alt text</Label>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                    />
                  </Field>
                )}
              </form.Field>

              <form.Field name="title">
                {(field) => (
                  <Field>
                    <Label htmlFor={field.name}>Title</Label>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                    />
                  </Field>
                )}
              </form.Field>

              <form.Field name="subtitle">
                {(field) => (
                  <Field>
                    <Label htmlFor={field.name}>Subtitle</Label>
                    <Textarea
                      id={field.name}
                      value={field.state.value}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                    />
                  </Field>
                )}
              </form.Field>

              <div className="grid gap-3 sm:grid-cols-2">
                <form.Field name="ctaText">
                  {(field) => (
                    <Field>
                      <Label htmlFor={field.name}>CTA text</Label>
                      <Input
                        id={field.name}
                        value={field.state.value}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                      />
                    </Field>
                  )}
                </form.Field>

                <form.Field name="ctaLink">
                  {(field) => (
                    <Field>
                      <Label htmlFor={field.name}>CTA link</Label>
                      <Input
                        id={field.name}
                        type="text"
                        value={field.state.value}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                      />
                    </Field>
                  )}
                </form.Field>
              </div>
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter>
          <Button
            form="edit-banner-form"
            type="submit"
            className="w-full cursor-pointer disabled:cursor-not-allowed"
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save changes"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default EditBanner;
