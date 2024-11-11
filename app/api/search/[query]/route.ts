import prisma from "@/lib/db"; // تأكد من تعديل المسار ليناسب إعدادات Prisma لديك
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: { query: string }}) => {
  try {
    // الاتصال بقاعدة البيانات (لا حاجة لدالة connect مع Prisma)
    const query = params.query;

    const searchedProducts = await prisma.product.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { category: { contains: query, mode: "insensitive" } },
          { tags: { has: query } } // `has` يعمل مثل `$in`، ولكن للبحث في مصفوفات.
        ]
      }
    });

    return NextResponse.json(searchedProducts, { status: 200 });
  } catch (err) {
    console.log("[search_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";