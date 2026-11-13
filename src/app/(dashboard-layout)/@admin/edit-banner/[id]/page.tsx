import EditBanner from "@/components/module/banner/editBanner";

const EditBannerPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  return (
    <div>
      <EditBanner id={id} />
    </div>
  );
};

export default EditBannerPage;
