import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const { title, description, image } = await req.json();

    const existingCollection = await prisma.collection.findUnique({
      where: { title },
    });

    if (existingCollection) {
      return new NextResponse("Collection already exists", { status: 400 });
    }

    if (!title || !image) {
      return new NextResponse("Title and image are required", { status: 400 });
    }

    const newCollection = await prisma.collection.create({
      data: {
        title,
        description,
        image,
      },
    });

    return NextResponse.json(newCollection, { status: 200 });
  } catch (err) {
    console.log("[collections_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const GET = async () => {
    try {
      const collections = await prisma.collection.findMany({
        orderBy: { createdAt: "desc" },
        include:{
          products: {
            include:{
              product: true
            }
          }
        },
      });

    // تحويل هيكل النتيجة إذا كنت ترغب بإعادة شكل المجموعات داخل كل منتج كقائمة بسيطة
    const formattedCollections = collections.map((collection) => ({
      ...collection,
      products: collection.products.map((pc) => pc.product),
    }));
  
      return NextResponse.json(formattedCollections, { status: 200 });
    } catch (err) {
      console.log("[collections_GET]", err);
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  };
  
  export const dynamic = "force-dynamic";