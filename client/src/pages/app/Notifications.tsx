import { HeartIcon, Package, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { type NotificationTypes } from "../../types/notifications";

const Notifications = () => {
  const [notifications, setNotifications] = useState<NotificationTypes>({
    orders: [
      {
        id: "order-1",
        type: "order",
        productName: "Linen Wrap Dress (M)",
        price: "$129.00",
        status: "placed",
        time: "2 hours ago",
        read: false,
      },
      {
        id: "order-2",
        type: "order",
        productName: "Linen Wrap Dress (M)",
        price: "$129.00",
        status: "shipped",
        time: "1 hour ago",
        read: true,
      },
      {
        id: "order-3",
        type: "order",
        productName: "Linen Wrap Dress (M)",
        price: "$129.00",
        status: "accepted",
        time: "30 seconds ago",
        read: false,
      },
      {
        id: "order-3",
        type: "order",
        productName: "Linen Wrap Dress (M)",
        price: "$129.00",
        status: "placed",
        time: "2 hours ago",
        read: false,
      },
    ],

    trending: [
      {
        id: "trending-1",
        type: "trending",
        productName: "Oversized Wool Coat",
        saves: 200,
        time: "2 hours ago",
        read: false,
      },
    ],

    restock: [
      {
        id: "restock-1",
        type: "restock",
        productName: "White Poplin Shirt",
        size: "S",
        time: "1 day ago",
        read: false,
      },
      {
        id: "restock-4",
        type: "restock",
        productName: "White Poplin Shirt",
        size: "S",
        time: "1 day ago",
        read: false,
      },
    ],
  });
  const markAsRead = (id: string) => {
    setNotifications((prev) => ({
      orders: prev.orders.map((item) =>
        item.id === id ? { ...item, read: true } : item,
      ),
      trending: prev.trending.map((item) =>
        item.id === id ? { ...item, read: true } : item,
      ),
      restock: prev.restock.map((item) =>
        item.id === id ? { ...item, read: true } : item,
      ),
    }));
  };

  const renderNotifications = () => {
    if (notifications !== null) {
      return Object.entries(notifications).map(([category, items]) => {
        return (
          <div key={category} className="flex flex-col gap-10 mt-10 ">
            {items.map((item) => {
              if (item.type === "trending") {
                return (
                  <div
                    key={item.id}
                    className="flex items-center relative gap-4 cursor-pointer md:w-3/4 w-full"
                    onClick={() => markAsRead(item.id)}
                  >
                    <div className="bg-rose-50 flex justify-center items-center rounded-full size-15">
                      <HeartIcon className="text-rose-500" />
                    </div>

                    <div>
                      <h3 className="font-sans text-subtitleText  font-semibold ">
                        Product trending
                      </h3>

                      <p className="w-11/12 lg:w-full leading-7">
                        {item.productName} reached {item.saves} saves
                      </p>
                    </div>
                    {!item.read && (
                      <div className="bg-blue-800 size-2 rounded-full absolute right-0"></div>
                    )}
                  </div>
                );
              }

              if (item.type === "restock") {
                return (
                  <div
                    key={item.id}
                    className="flex relative gap-4  w-full md:w-3/4"
                    onClick={() => markAsRead(item.id)}
                  >
                    <div className="bg-gray-100 flex justify-center items-center rounded-full size-15">
                      <Package className="text-gray-500" />
                    </div>

                    <div>
                      <h3 className="font-sans text-subtitleText  font-semibold ">
                        Restock reminder
                      </h3>

                      <p className="w-11/12 lg:w-full leading-7">
                        {item.productName} - Size {item.size} is out of stock
                      </p>
                    </div>
                    {!item.read && (
                      <div className="bg-blue-800 size-2 rounded-full absolute right-0"></div>
                    )}
                  </div>
                );
              }

              if (item.type === "order") {
                return (
                  <div
                    key={item.id}
                    className="flex relative gap-4  w-full md:w-3/4"
                    onClick={() => markAsRead(item.id)}
                  >
                    <div className="bg-blue-50 flex justify-center items-center rounded-full size-15 ">
                      <ShoppingBag className="text-blue-500" />
                    </div>

                    <div>
                      <h3 className="font-sans font-semibold text-subtitleText">
                        New Order
                      </h3>

                      <p className="w-11/12 lg:w-full leading-7">
                        {item.id} - {item.productName} º ${item.price}
                      </p>
                    </div>

                    {!item.read && (
                      <div className="bg-blue-800 size-2 rounded-full absolute right-0"></div>
                    )}
                  </div>
                );
              }

              return null;
            })}
          </div>
        );
      });
    } else {
      return <div className="text-foreground">No Notifications</div>;
    }
  };

  return (
    <section className="section-spacing text-foreground">
      <h2 className="md:pb-5">Notifications</h2>
      <div className="h-screen no-scrollbar overflow-y-scroll pb-70  md:pb-60">
        {renderNotifications()}
      </div>
    </section>
  );
};

export default Notifications;
