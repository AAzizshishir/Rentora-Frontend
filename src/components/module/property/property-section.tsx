import type { ReactNode } from "react";

type Props = {
  title: string;
  description?: string;
  children: ReactNode;
};

const PropertySection = ({ title, description, children }: Props) => (
  <section className="space-y-4">
    <div>
      <h2 className="text-xl font-semibold tracking-tight md:text-2xl text-primary">
        {title}
      </h2>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      )}
    </div>
    {children}
  </section>
);

export default PropertySection;
