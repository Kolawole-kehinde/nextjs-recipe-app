// Mock data for orders
const mockOrders = {
  inProgress: [
    {
      id: "ORD-001",
      customer: "Alice Johnson",
      items: 3,
      total: "$299.99",
      status: "Processing",
      date: "2024-01-15",
      statusColor: "bg-accent text-accent-foreground",
    },
    {
      id: "ORD-002",
      customer: "Bob Smith",
      items: 1,
      total: "$89.99",
      status: "Shipped",
      date: "2024-01-14",
      statusColor: "bg-primary text-primary-foreground",
    },
    {
      id: "ORD-003",
      customer: "Carol Davis",
      items: 2,
      total: "$159.99",
      status: "Preparing",
      date: "2024-01-13",
      statusColor: "bg-secondary text-secondary-foreground",
    },
  ],
  delivered: [
    {
      id: "ORD-004",
      customer: "David Wilson",
      items: 4,
      total: "$449.99",
      status: "Delivered",
      date: "2024-01-10",
      statusColor: "bg-green-600 text-white",
    },
    {
      id: "ORD-005",
      customer: "Eva Brown",
      items: 2,
      total: "$199.99",
      status: "Delivered",
      date: "2024-01-09",
      statusColor: "bg-green-600 text-white",
    },
  ],
  cancelled: [
    {
      id: "ORD-006",
      customer: "Frank Miller",
      items: 1,
      total: "$79.99",
      status: "Cancelled",
      date: "2024-01-08",
      statusColor: "bg-destructive text-destructive-foreground",
      reason: "Customer request",
    },
  ],
}
