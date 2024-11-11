import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";



interface Params {
  customerId: string;
}

export const GET = async (
  req: NextRequest,
  { params }: { params: Params }
): Promise<NextResponse> => {
  try {
    // استرجاع الطلبات باستخدام Prisma
    const orders = await prisma.order.findMany({
      where: {
        customerClerkId: params.customerId,
      },
      include: {
        products: {
          include: {
            product: true, // ربط الـ products بكل منتج داخل الطلب
          },
        },
      },
    });

    // إرجاع النتيجة كـ JSON
    return NextResponse.json(orders, { status: 200 });
  } catch (err) {
    // تسجيل الأخطاء
    console.log("[customerId_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  } finally {
    // التأكد من إغلاق الاتصال بـ Prisma
    await prisma.$disconnect();
  }
};

// تحديد سلوك الصفحات (force dynamic)
export const dynamic = "force-dynamic";