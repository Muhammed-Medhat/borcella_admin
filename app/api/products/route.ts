import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const {
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    } = await req.json();

    if (!title || !description || !media || !category || !price || !expense) {
      return new NextResponse("Not enough data to create a product", {
        status: 400,
      });
    }

    const newProduct = await prisma.product.create({
      data: {
        title,
        description,
        media,
        category,
        tags,
        sizes,
        colors,
        price,
        expense,
      },
    });

    if (collections) {
      for (const collectionId of collections) {
        await prisma.productCollection.create({
          data: {
            productId: newProduct.id,
            collectionId: Number(collectionId),
          },
        });
      }
    }

    return NextResponse.json(newProduct, { status: 200 });
  } catch (err) {
    console.log("[products_POST]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const GET = async () => {
  try {
    // جلب المنتجات مع البيانات المرفقة من العلاقات
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        collections: {
          include: {
            collection: true, // إحضار تفاصيل المجموعات المرتبطة عبر العلاقة
          },
        },
      },
    });

    // تحويل هيكل النتيجة إذا كنت ترغب بإعادة شكل المجموعات داخل كل منتج كقائمة بسيطة
    const formattedProducts = products.map((product) => ({
      ...product,
      collections: product.collections.map((pc) => pc.collection),
    }));

    return NextResponse.json(formattedProducts, { status: 200 });
  } catch (err) {
    console.error("[products_GET]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
