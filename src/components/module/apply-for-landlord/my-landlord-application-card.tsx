"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetMyLandlordApplication } from "@/hooks/useApplyForLandlord";

const MyLandlordApplicationCard = () => {
  const { data, isLoading, isError } = useGetMyLandlordApplication();

  if (isLoading) {
    return (
      <p className="text-sm text-muted-foreground">Loading applications...</p>
    );
  }

  if (isError) {
    return (
      <p className="text-sm text-destructive">
        Could not load your landlord applications. Please try again.
      </p>
    );
  }

  const application = data?.data;

  if (!application) {
    return (
      <Card className="bg-transparent max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-6">
        <CardContent className="py-8 text-center text-sm text-muted-foreground">
          You haven&apos;t submitted a landlord application yet.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-transparent max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-4">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <CardTitle className="text-lg font-semibold">
          {application.property_name}
        </CardTitle>
        <Badge
          variant={
            application.status === "rejected" ? "destructive" : "default"
          }
          className="uppercase py-3"
        >
          {application.status}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="flex flex-col justify-between gap-1 border-b pb-3 sm:flex-row sm:gap-4">
          <span className="text-muted-foreground">Location</span>
          <span className="sm:text-right">
            {application.property_address}, {application.property_city}
          </span>
        </div>
        <div className="flex flex-col justify-between gap-1 border-b pb-3 sm:flex-row sm:gap-4">
          <span className="text-muted-foreground">Phone</span>
          <span className="sm:text-right">{application.phone}</span>
        </div>
        <div className="flex flex-col justify-between gap-1 border-b pb-3 sm:flex-row sm:gap-4">
          <span className="text-muted-foreground">Submitted</span>
          <time dateTime={application.created_at} className="sm:text-right">
            {new Date(application.created_at).toLocaleString()}
          </time>
        </div>
        {application.message && (
          <div className="flex flex-col justify-between gap-1 border-b pb-3 sm:flex-row sm:gap-4">
            <span className="text-muted-foreground">Message</span>
            <span className="sm:max-w-2xl sm:text-right">
              {application.message}
            </span>
          </div>
        )}
        {application.rejection_reason && (
          <div className="flex flex-col justify-between gap-1 sm:flex-row sm:gap-4">
            <span className="text-muted-foreground">Rejection reason</span>
            <span className="sm:max-w-2xl sm:text-right">
              {application.rejection_reason}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MyLandlordApplicationCard;
