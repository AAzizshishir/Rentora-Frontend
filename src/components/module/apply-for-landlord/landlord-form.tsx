"use client";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const landlordApplicationSchema = z.object({
  property_name: z.string().trim().min(1, "Property name is required"),
  property_city: z.string().trim().min(1, "City is required"),
  property_address: z.string().trim().min(1, "Property address is required"),
  phone: z
    .string()
    .trim()
    .regex(/^\+8801[3-9]\d{8}$/, {
      message:
        "Phone number must be +88 followed by a valid 11-digit Bangladesh mobile number",
    }),
  message: z.string().trim().max(1000),
});

const ApplyLandlordForm = () => {
  const form = useForm({
    defaultValues: {
      property_name: "",
      property_city: "",
      property_address: "",
      phone: "",
      message: "",
    },
    validators: {
      onSubmit: landlordApplicationSchema,
    },
    onSubmit: async ({ value }) => {
      console.log("Form submitted with values:", value);
    },
  });

  return (
    <Card className="bg-transparent max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <CardHeader>
        <CardTitle>Apply for a landlord account</CardTitle>
        <CardDescription>
          Share your property and contact details to apply.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="apply-for-landlord-form"
          onSubmit={(event) => {
            event.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field name="property_name">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <Label htmlFor={field.name}>Property name</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      placeholder="e.g. Mautaca"
                      required
                      aria-invalid={isInvalid}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="property_city">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <Label htmlFor={field.name}>City</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      placeholder="e.g. Feni"
                      required
                      aria-invalid={isInvalid}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="property_address">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <Label htmlFor={field.name}>Property address</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      placeholder="Street address, city"
                      required
                      aria-invalid={isInvalid}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="phone">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <Label htmlFor={field.name}>Phone number</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="tel"
                      autoComplete="tel"
                      value={field.state.value}
                      placeholder="+8801712345655"
                      required
                      aria-invalid={isInvalid}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="message">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <Label htmlFor={field.name}>Message (optional)</Label>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      placeholder="Tell us about your landlord account application."
                      aria-invalid={isInvalid}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <Button type="submit">Submit application</Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
};

export default ApplyLandlordForm;
