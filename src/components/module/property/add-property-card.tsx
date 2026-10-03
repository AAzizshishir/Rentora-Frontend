"use client";

import { useCreateProperty } from "@/hooks/useProperties";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { useForm } from "@tanstack/react-form";
import {
  CreatePropertyFormInput,
  CreatePropertyInput,
  createPropertySchema,
} from "@/validations/property.validation";
import { Field, FieldError, FieldGroup } from "../../ui/field";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { PropertyType } from "@/types/property.type";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
// import { FACILITIES, NEARBY_PLACE_TYPES } from "@/constants/property.constant";
import { Plus, Trash2 } from "lucide-react";
import { FACILITIES, NEARBY_PLACE_TYPES } from "@/constants/property.constant";

const AddPropertyCard = () => {
  const { mutate, isPending } = useCreateProperty();
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: "",
      address: "",
      city: "",
      type: "apartment",
      total_units: "",
      description: "",
      facilities: [],
      nearby_places: [],
    } as CreatePropertyFormInput,
    validators: {
      onSubmit: createPropertySchema,
    },
    onSubmit: async ({ value }) => {
      const data = createPropertySchema.parse(value);
      console.log(data);
      mutate(data, {
        onSuccess: () => router.push("/property"),
      });
    },
  });
  return (
    <Card className="bg-transparent">
      <CardHeader>
        <CardTitle className="text-lg text-center">Add new property</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          id="add-property-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* Name */}
            <form.Field name="name">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <Label>Property Name</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      placeholder="Enter Property Name"
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Address */}
            <form.Field name="address">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <Label>Property Address</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      placeholder="Enter Property Address"
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* City + Type */}
            <div className="grid grid-cols-2 gap-3">
              <form.Field name="city">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <Label>City</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        placeholder="Enter City Name"
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <form.Field name="type">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <Label>Property Type</Label>
                      <select
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) =>
                          field.handleChange(e.target.value as PropertyType)
                        }
                        className="border border-gray-300 rounded-md p-2 w-full text-sm bg-white text-black 
             dark:bg-[#001524] dark:text-white"
                      >
                        <option value="apartment">Apartment</option>
                        <option value="house">House</option>
                        <option value="commercial">Commercial</option>
                      </select>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </div>

            {/* Total Units */}
            <form.Field name="total_units">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <Label>Total Units</Label>
                    <Input
                      type="number"
                      value={field.state.value}
                      placeholder="Enter Total Unit"
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Description */}
            <form.Field name="description">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <Label>Description</Label>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      placeholder="Describe your property... (optional)"
                      className="resize-none"
                      rows={2}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            {/* Facilities */}
            <form.Field name="facilities">
              {(field) => (
                <Field>
                  <Label>Facilities</Label>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {FACILITIES.map((facility) => {
                      const checked = field.state.value.includes(
                        facility.value,
                      );
                      return (
                        <label
                          key={facility.value}
                          className="flex items-center gap-2 text-sm cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() =>
                              field.handleChange(
                                checked
                                  ? field.state.value.filter(
                                      (v) => v !== facility.value,
                                    )
                                  : [...field.state.value, facility.value],
                              )
                            }
                          />
                          {facility.label}
                        </label>
                      );
                    })}
                  </div>
                </Field>
              )}
            </form.Field>

            {/* Nearby places */}
            <form.Field name="nearby_places" mode="array">
              {(field) => (
                <Field>
                  <div className="flex items-center justify-between">
                    <Label>Nearby Places</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        field.pushValue({
                          type: "school",
                          name: "",
                          distance_km: "",
                        })
                      }
                    >
                      <Plus className="h-4 w-4 mr-1" /> Add place
                    </Button>
                  </div>

                  {field.state.value.map((_, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-[1fr_1.5fr_1fr_auto] gap-2 items-start"
                    >
                      <form.Field name={`nearby_places[${i}].type`}>
                        {(sub) => (
                          <select
                            value={sub.state.value}
                            onChange={(e) =>
                              sub.handleChange(e.target.value as any)
                            }
                            className="border border-gray-300 rounded-md p-2 w-full text-sm bg-white text-black dark:bg-[#001524] dark:text-white"
                          >
                            {NEARBY_PLACE_TYPES.map((t) => (
                              <option key={t.value} value={t.value}>
                                {t.label}
                              </option>
                            ))}
                          </select>
                        )}
                      </form.Field>

                      <form.Field name={`nearby_places[${i}].name`}>
                        {(sub) => (
                          <div>
                            <Input
                              value={sub.state.value}
                              placeholder="Place name"
                              onChange={(e) => sub.handleChange(e.target.value)}
                            />
                            {sub.state.meta.isTouched &&
                              !sub.state.meta.isValid && (
                                <FieldError errors={sub.state.meta.errors} />
                              )}
                          </div>
                        )}
                      </form.Field>

                      <form.Field name={`nearby_places[${i}].distance_km`}>
                        {(sub) => (
                          <Input
                            type="number"
                            step="0.1"
                            min={0}
                            value={sub.state.value}
                            placeholder="km"
                            onChange={(e) => sub.handleChange(e.target.value)}
                          />
                        )}
                      </form.Field>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => field.removeValue(i)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </Field>
              )}
            </form.Field>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Button
          form="add-property-form"
          type="submit"
          className="w-full font-medium cursor-pointer"
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Add property"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddPropertyCard;
