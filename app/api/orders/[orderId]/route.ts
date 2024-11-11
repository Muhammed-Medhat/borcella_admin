import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { orderId: string } }
) => {
  try {
    // البحث عن الطلب باستخدام المعرف مع تضمين المنتجات وبيانات العميل
    const orderDetails = await prisma.order.findUnique({
      where: { id: parseInt(params.orderId) },
      include: {
        products: {
          include: {
            product: true, // جلب تفاصيل المنتج المرتبط بكل طلب
          },
        },
        shippingAddress: true,
        customer: true,
      },
    });

    if (!orderDetails) {
      return new NextResponse(JSON.stringify({ message: "Order Not Found" }), {
        status: 404,
      });
    }

    const productsWithTitle = orderDetails.products.map((product) => ({
      ...product,
      productTitle: product.product.title,
      id:product.id
    })); // Just to search in OrderItemColumns

    return NextResponse.json(
      {
        orderDetails,
        products: productsWithTitle,
        customer: orderDetails.customer,
      },
      { status: 200 }
    );
  } catch (err) {
    console.log("[orderId_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
