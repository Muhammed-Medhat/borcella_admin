import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { customerId: string } }
) => {
  try {
    const orders = await prisma.order.findFirst({
      where: { customerClerkId: params.customerId },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
    const formateOrders = {
      ...orders,
      products: orders?.products.map((pc) => pc.product),
    };

    return NextResponse.json(formateOrders, { status: 200 });
  } catch (err) {
    console.log("[customerId_GET", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
