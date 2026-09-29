const PropertyDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  console.log(id);
  return <div>Property Details Page</div>;
};

export default PropertyDetailsPage;
