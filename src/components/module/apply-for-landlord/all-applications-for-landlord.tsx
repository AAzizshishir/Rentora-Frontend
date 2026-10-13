"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useApproveLandlordApplication,
  useGetAllApplicationsForLandlord,
  useRejectLandlordApplication,
} from "@/hooks/useApplyForLandlord";

const AllApplicationsForLandlord = () => {
  const { data, isLoading, isError } = useGetAllApplicationsForLandlord();
  const approveApplication = useApproveLandlordApplication();
  const rejectApplication = useRejectLandlordApplication();
  const [rejectingApplicationId, setRejectingApplicationId] = useState<
    string | null
  >(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const closeRejectDialog = () => {
    setRejectingApplicationId(null);
    setRejectionReason("");
  };

  const handleReject = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!rejectingApplicationId || !rejectionReason.trim()) return;

    rejectApplication.mutate(
      {
        id: rejectingApplicationId,
        payload: { reason: rejectionReason.trim() },
      },
      { onSuccess: closeRejectDialog },
    );
  };

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading applications...</p>;
  }

  if (isError) {
    return (
      <p className="text-sm text-destructive">
        Could not load landlord applications. Please try again.
      </p>
    );
  }

  const applications = data?.data ?? [];

  if (applications.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-sm text-muted-foreground">
          No landlord applications have been submitted.
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="grid gap-4 lg:grid-cols-2">
        {applications.map((application) => (
          <Card key={application.id} className="bg-transparent">
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div className="space-y-1">
                <CardTitle>{application.property_name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Applied by {application.applicant.name}
                </p>
              </div>
              <Badge
                variant={
                  application.status === "rejected"
                    ? "destructive"
                    : application.status === "approved"
                      ? "default"
                      : "secondary"
                }
                className="shrink-0 capitalize"
              >
                {application.status}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex flex-col justify-between gap-1 border-b pb-3 sm:flex-row sm:gap-4">
                <span className="text-muted-foreground">Applicant email</span>
                <span className="break-all sm:text-right">
                  {application.applicant.email}
                </span>
              </div>
              <div className="flex flex-col justify-between gap-1 border-b pb-3 sm:flex-row sm:gap-4">
                <span className="text-muted-foreground">Phone</span>
                <span className="sm:text-right">{application.phone}</span>
              </div>
              <div className="flex flex-col justify-between gap-1 border-b pb-3 sm:flex-row sm:gap-4">
                <span className="text-muted-foreground">Property location</span>
                <span className="sm:text-right">
                  {application.property_address}, {application.property_city}
                </span>
              </div>
              <div className="flex flex-col justify-between gap-1 border-b pb-3 sm:flex-row sm:gap-4">
                <span className="text-muted-foreground">Submitted</span>
                <time
                  dateTime={application.created_at}
                  className="sm:text-right"
                >
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
                <div className="flex flex-col justify-between gap-1 border-b pb-3 sm:flex-row sm:gap-4">
                  <span className="text-muted-foreground">Rejection reason</span>
                  <span className="sm:max-w-2xl sm:text-right">
                    {application.rejection_reason}
                  </span>
                </div>
              )}
              {application.status === "pending" && (
                <div className="flex justify-end gap-2 pt-1">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={approveApplication.isPending}
                    onClick={() => setRejectingApplicationId(application.id)}
                  >
                    Reject
                  </Button>
                  <Button
                    type="button"
                    disabled={approveApplication.isPending}
                    onClick={() => approveApplication.mutate(application.id)}
                  >
                    {approveApplication.isPending ? "Approving..." : "Approve"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog
        open={rejectingApplicationId !== null}
        onOpenChange={(open) => {
          if (!open && !rejectApplication.isPending) closeRejectDialog();
        }}
      >
        <DialogContent>
          <form onSubmit={handleReject} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Reject landlord application</DialogTitle>
              <DialogDescription>
                Enter a reason for rejecting this application. The applicant
                will be able to see it.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <Label htmlFor="rejection-reason">Rejection reason</Label>
              <Textarea
                id="rejection-reason"
                value={rejectionReason}
                onChange={(event) => setRejectionReason(event.target.value)}
                placeholder="Explain why the application is being rejected."
                required
                minLength={5}
                maxLength={1000}
                disabled={rejectApplication.isPending}
              />
              {rejectionReason.trim().length > 0 &&
                rejectionReason.trim().length < 5 && (
                  <p className="text-sm text-destructive">
                    Rejection reason must be at least 5 characters.
                  </p>
                )}
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={rejectApplication.isPending}
                onClick={closeRejectDialog}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="destructive"
                disabled={
                  rejectApplication.isPending ||
                  rejectionReason.trim().length < 5 ||
                  rejectionReason.trim().length > 1000
                }
              >
                {rejectApplication.isPending ? "Rejecting..." : "Confirm reject"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AllApplicationsForLandlord;
