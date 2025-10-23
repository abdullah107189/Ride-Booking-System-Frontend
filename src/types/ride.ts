// Types
export interface IRide {
  _id: string;
  rider: string;
  driver: string | null;
  pickupLocation: {
    location: {
      type: string;
      coordinates: [number, number];
    };
    address: string;
  };
  destinationLocation: {
    location: {
      type: string;
      coordinates: [number, number];
    };
    address: string;
  };
  status:
    | "requested"
    | "accepted"
    | "picked_up"
    | "in_transit"
    | "completed"
    | "canceled"
    | "paid";
  statusHistory: Array<{
    updateStatus: string;
    timestamp: string;
  }>;
  createdAt: string;
  updatedAt: string;
}
