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
  status: RideStatus;
  statusHistory: Array<{
    updateStatus: string;
    timestamp: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export enum RideStatus {
  requested = "requested",
  accepted = "accepted",
  picked_up = "picked_up",
  in_transit = "in_transit",
  completed = "completed",
  canceled = "canceled",
  paid = "paid",
}
