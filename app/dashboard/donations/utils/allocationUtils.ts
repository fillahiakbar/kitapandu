export interface DonationAllocation {
  donation_allocation_id: string;
  donation_id: string;
  title: string;
  amount: number;
  percent: number;
  created_at: string;
  updated_at: string;
}

export interface AllocationForm {
  title: string;
  amount: number;
  percent: number;
}
