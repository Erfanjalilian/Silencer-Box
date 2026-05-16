export type OrderStatus =
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface MockOrder {
  id: string;
  placedAt: string;
  totalToman: number;
  status: OrderStatus;
  itemsSummary: string;
}

export interface ReturnRequestDraft {
  orderId: string;
  reason: string;
}
