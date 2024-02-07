import { NextApiRequest } from "next";

const colors: { [key: string]: string } = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
};

// Function to log colored output
function logColored(message: string, color: string): void {
  console.log(colors[color] + message + colors.reset);
}
export async function POST(req: NextApiRequest) {
  try {
    // Parse the request body to get the items to be added to the cart
    const { cartId, items } = req.body;

    const updatedCart = {
      id: cartId,
      items: items,
      updatedAt: new Date(),
    };

    // Respond with the updated cart object
    logColored("getCart route", "magenta")
    return Response.json({ cart: updatedCart });
  } catch (error) {
    console.error("Error adding items to cart:", error);
    return Response.json({ error: "Error adding items to cart" });
  }
}
