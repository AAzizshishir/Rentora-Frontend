import { Unit } from "@/types/unit.type";
import Link from "next/link";
import PropertySection from "./property-section";
import { formatCurrency } from "@/constants/property.constant";

type Props = {
  units: Unit[];
  /** Build the link to a unit's own details page */
  getUnitHref?: (unit: Unit) => string;
  /** Use this instead if details open in a modal/drawer */
  onViewDetails?: (unit: Unit) => void;
};

const COLUMNS = [
  "Unit",
  "Rooms",
  "Baths",
  "Balconies",
  "Floor",
  "Price",
  "Actions",
];

const detailsClass =
  "text-xs font-medium tracking-widest underline underline-offset-4 transition-colors hover:text-primary";

const PropertyUnits = ({ units, getUnitHref, onViewDetails }: Props) => {
  // only vacant units are shown here, lowest floor first
  const vacant = units
    .filter((u) => u.status === "vacant")
    .sort(
      (a, b) => a.floor - b.floor || a.unit_number.localeCompare(b.unit_number),
    );

  return (
    <PropertySection
      title="Available units"
      description={
        vacant.length
          ? `${vacant.length} vacant ${vacant.length === 1 ? "unit" : "units"} ready to move in`
          : undefined
      }
    >
      {vacant.length === 0 ? (
        <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
          No vacant units right now. Check back soon.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-160 border-collapse text-center">
            <thead>
              <tr className="border-b border-primary/30">
                {COLUMNS.map((col, i) => (
                  <th
                    key={i}
                    scope="col"
                    className="px-3 pb-4 text-sm font-medium tracking-widest text-foreground md:text-base"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {vacant.map((unit) => (
                <tr key={unit.id} className="border-b border-primary/30">
                  <td className="px-3 py-5 text-sm font-medium">
                    {unit.unit_number}
                  </td>
                  <td className="px-3 py-5 text-sm text-muted-foreground">
                    {unit.bedrooms}
                  </td>
                  <td className="px-3 py-5 text-sm text-muted-foreground">
                    {unit.bathrooms}
                  </td>
                  <td className="px-3 py-5 text-sm text-muted-foreground">
                    {unit.balconies}
                  </td>
                  <td className="px-3 py-5 text-sm text-muted-foreground">
                    {unit.floor}
                  </td>
                  <td className="whitespace-nowrap px-3 py-5 text-sm font-medium">
                    {formatCurrency(unit.monthly_rent)}
                    <span className="text-xs font-normal text-muted-foreground">
                      {" "}
                      /mo
                    </span>
                  </td>
                  <td className="px-3 py-5">
                    {getUnitHref ? (
                      <Link href={getUnitHref(unit)} className={detailsClass}>
                        View details
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onViewDetails?.(unit)}
                        className={detailsClass}
                      >
                        View details
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PropertySection>
  );
};

export default PropertyUnits;
