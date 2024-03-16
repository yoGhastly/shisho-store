import { OrderSearch } from "@/app/domain/SearchOrder";
import { SupabaseOrderRepository } from "@/app/orders/create-order";
import { Order } from "@/app/types";
import { NextRequest } from "next/server";

const searchOrder = new OrderSearch(new SupabaseOrderRepository());

export async function POST(request: NextRequest) {
  const { orderId }: { orderId: Pick<Order, "id"> } = await request.json();
  try {
    await searchOrder.search(orderId);
    return Response.json({
      message: "Order created and confirmation email sent successfully",
    });
  } catch (error: any) {
    console.error("Error creating order or sending email:", error);
    return new Response(`Internal Server Error: ${error.message}`, {
      status: 500,
    });
  }
}
