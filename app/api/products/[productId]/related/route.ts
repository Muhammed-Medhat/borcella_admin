import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
): Promise<NextResponse> => {
  try {
    // استرجاع المنتج بناءً على المعرف
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(params.productId), // تحويل الـ productId إلى عدد صحيح
      },
    });

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }

    // استرجاع المنتجات المرتبطة بالمنتج الحالي بناءً على الفئة أو المجموعات
    const relatedProducts = await prisma.product.findMany({
      where: {
        AND: [
          {
            OR: [
              { category: product.category }, // البحث في الفئة
              {
                collections: {
                  some: {
                    collection: {
                      products: {
                        some: {
                          productId: product.id, // ربط المنتجات مع المجموعات
                        },
                      },
                    },
                  },
                },
              },
            ],
          },
          {
            NOT: {
              id: product.id, // استبعاد المنتج الحالي من النتيجة
            },
          },
        ],
      },
    });

    if (!relatedProducts || relatedProducts.length === 0) {
      return new NextResponse(
        JSON.stringify({ message: "No related products found" }),
        { status: 404 }
      );
    }

    // إرجاع المنتجات المرتبطة
    return NextResponse.json(relatedProducts, { status: 200 });
  } catch (err) {
    console.log("[related_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  } finally {
    // إغلاق الاتصال بـ Prisma بعد الاستعلام
    await prisma.$disconnect();
  }
};

export const dynamic = "force-dynamic";
