import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    // استخدام Prisma للبحث عن المجموعة مع المنتجات المرتبطة
    const collection = await prisma.collection.findUnique({
      where: { id: Number(params.collectionId) }, // تحويل collectionId إلى عدد صحيح
      include: { products: {
        include:{
          product:true
        }
      } }, // يشمل المنتجات المرتبطة بالمجموعة
    });

    if (!collection) {
      return new NextResponse(
        JSON.stringify({ message: "Collection not found" }),
        { status: 404 }
      );
    }
    const collectionsFormate ={
      ...collection,
      products:collection.products.map((pc)=>pc.product)
    }

    return NextResponse.json(collectionsFormate, { status: 200 });
  } catch (err) {
    console.log("[collectionId_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};
export const POST = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { title, description, image } = await req.json();

    if (!title || !image) {
      return new NextResponse("Title and image are required", { status: 400 });
    }

    // استخدام Prisma للبحث عن المجموعة
    let collection = await prisma.collection.findUnique({
      where: { id: Number(params.collectionId) }, // تأكد من تحويل collectionId إلى عدد صحيح
    });

    if (!collection) {
      return new NextResponse("Collection not found", { status: 404 });
    }

    // تحديث المجموعة باستخدام Prisma
    collection = await prisma.collection.update({
      where: { id: Number(params.collectionId) },
      data: { title, description, image },
    });

    return NextResponse.json(collection, { status: 200 });
  } catch (err) {
    console.log("[collectionId_POST]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const collectionId = parseInt(params.collectionId); // تحويل collectionId إلى عدد صحيح
    console.log(collectionId);

    // حذف العلاقات بين المنتجات والمجموعة من جدول ProductCollection
    await prisma.productCollection.deleteMany({
      where: { collectionId },
    });

    // حذف المجموعة من قاعدة البيانات
    await prisma.collection.delete({
      where: { id: collectionId },
    });

    return new NextResponse("Collection is deleted", { status: 200 });
  } catch (err) {
    console.log("[collectionId_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
