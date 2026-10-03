import PublicPropertyDetailsCard from "@/components/module/property/public-property-details-card";

const PropertyDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <div>
      <PublicPropertyDetailsCard propertyId={id} />
    </div>
  );
};

export default PropertyDetailsPage;
