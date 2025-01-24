import { AddressSchemaType } from "@/schema/address.schema";
import { ProductSchemaType } from "@/schema/product.schema";

interface ViewProducts {
  _id: ProductSchemaType;
  quantity: number;
}

interface Order {
  _id: string;
  userId: string;
  products: string | ViewProducts[];
  addressId: string | AddressSchemaType;
  orderStatus:
    | "pending"
    | "confirmed"
    | "inprocess"
    | "inshipping"
    | "delivered"
    | "rejected";
  paymentMethod: string;
  paymentStatus: string;
  totalAmount: number;
  orderDate: Date;
  orderUpdateDate: Date;
  paymentId: string;
  payerId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CaptureOrder {
  paymentId: string;
  payerId: string;
  orderId: string;
}
