type OrderNotification = {
  id: string;
  type: "order";
  productName: string;
  price: string;
  status: string;
  time: string;
  read: boolean;
};

type TrendingNotification = {
  id: string;
  type: "trending";
  productName: string;
  saves: number;
  time: string;
  read: boolean;
};

type RestockNotification = {
  id: string;
  type: "restock";
  productName: string;
  size: string;
  time: string;
  read: boolean;
};

export type NotificationTypes = {
  orders: OrderNotification[];
  trending: TrendingNotification[];
  restock: RestockNotification[];
};

// type Status = "placed" | "accepted" | "shipped" | "delivered" | "cancelled";