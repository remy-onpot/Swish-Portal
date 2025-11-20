// src/data/shipments.js

export const mockShipments = [
  {
    id: "SWISH-12345",
    status: "In Transit",
    origin: "London, UK",
    destination: "Accra, Ghana",
    estimatedDelivery: "Nov 24, 2025",
    currentLocation: "Lagos Hub, Nigeria",
    history: [
      { date: "Nov 20", time: "08:00", event: "Departed Facility", location: "London" },
      { date: "Nov 21", time: "14:30", event: "Arrived at Hub", location: "Lagos" },
    ]
  },
  {
    id: "SWISH-889",
    status: "Delivered",
    origin: "New York, USA",
    destination: "Berlin, Germany",
    estimatedDelivery: "Delivered",
    currentLocation: "Customer's Porch",
    history: [
      { date: "Nov 18", time: "09:00", event: "Out for Delivery", location: "Berlin" },
      { date: "Nov 18", time: "11:15", event: "Delivered", location: "Berlin" },
    ]
  },
  {
    id: "SWISH-TEST",
    status: "Pending",
    origin: "Unknown",
    destination: "Unknown",
    estimatedDelivery: "Pending",
    currentLocation: "Warehouse",
    history: []
  }
];