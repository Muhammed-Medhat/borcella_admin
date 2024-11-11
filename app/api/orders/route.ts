import { NextResponse } from "next/server";
import { format } from "date-fns";
import prisma from "@/lib/db";

export const GET = async () => {
  try {
    // جلب الطلبات وترتيبها حسب تاريخ الإنشاء من الأحدث للأقدم مع العلاقات المطلوبة
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        customer: true,  // جلب بيانات العميل
        products: {
          include:{
            product:true
          }
        },  // جلب المنتجات المرتبطة بالطلب
      },
    });

    // تجهيز تفاصيل الطلبات للشكل المطلوب
    const orderDetails = orders.map((order) => ({
      id: order.id,
      customer: order.customer?.name || "Unknown", // عرض اسم العميل أو "غير معروف" إذا كان فارغًا
      products: order.products.length, // عدد المنتجات في الطلب
      totalAmount: order.totalAmount, // المبلغ الإجمالي
      createdAt: format(order.createdAt, "MMM do, yyyy"), // تنسيق التاريخ
    }));
    // const orderDetails = orders.map((order) => ({
    //   ...order,
    //   createdAt: format(order.createdAt, "MMM do, yyyy"), 
    //   products: order.products.map((product)=>  product.product)
    // }));

    return NextResponse.json(orderDetails, { status: 200 });
  } catch (err) {
    console.log("[orders_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";