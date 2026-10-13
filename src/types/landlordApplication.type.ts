export interface CreateLandlordApplicationInput {
  property_name: string;
  property_city: string;
  property_address: string;
  phone: string;
  message: string;
}

export interface LandlordApplication {
  created_at: string;
  message: string | null;
  phone: string;
  property_address: string;
  property_city: string;
  property_name: string;
  rejection_reason: string | null;
  status: "pending" | "approved" | "rejected";
}

export interface AdminLandlordApplication extends LandlordApplication {
  id: string;
  applicant_id: string;
  applicant: {
    id: string;
    name: string;
    email: string;
  };
  updated_at: string;
  reviewed_at: string | null;
  reviewed_by_id: string | null;
}

export interface AllLandlordApplicationsResponse {
  data: AdminLandlordApplication[];
}

export interface RejectLandlordApplicationInput {
  reason: string;
}

export interface MyLandlordApplicationResponse {
  data: LandlordApplication | null;
}
