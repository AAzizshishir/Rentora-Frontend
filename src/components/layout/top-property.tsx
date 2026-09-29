import PublicPropertyCard from "../module/property/public-property-card";

const TopProperty = async () => {
  return (
    <section>
      <h2 className="text-center text-2xl text-[#ff9638] my-8">
        Find Your Dream Place
      </h2>
      <div>
        <PublicPropertyCard />
      </div>
    </section>
  );
};

export default TopProperty;
