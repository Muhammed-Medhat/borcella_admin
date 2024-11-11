import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// export const GET = async (
//   req: NextRequest,
//   { params }: { params: { productId: string } }
// ) => {
//   try {
//     // استخدام Prisma للبحث عن المجموعة مع المنتجات المرتبطة
//     const product = await prisma.product.findUnique({
//       where: { id: Number(params.productId) }, // تحويل collectionId إلى عدد صحيح
//       include: { collections: true }, // يشمل المنتجات المرتبطة بالمجموعة
//     });

//     if (!product) {
//       return new NextResponse(
//         JSON.stringify({ message: "Product not found" }),
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(product, { status: 200 });
//   } catch (err) {
//     console.log("[productId_GET]", err);
//     return new NextResponse("Internal error", { status: 500 });
//   }
// };

export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    const productId = Number(params.productId);

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        collections: {
          include: {
            collection: true,
          },
        },
      },
    });

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }
    const productWithCollectionDetails = {
      ...product,
      collections: product.collections.map((pc) => pc.collection),
    };

    return new NextResponse(JSON.stringify(productWithCollectionDetails), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": `${process.env.ECOMMERCE_STORE_URL}`,
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (err) {
    console.log("[productId_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const productId = Number(params.productId);

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { collections: { select: { collectionId: true } } },
    });

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
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
      return new NextResponse("Not enough data to update the product", {
        status: 400,
      });
    }

    // const existingCollectionIds = product.collections.map(
    //   (col) => col.collectionId
    // );
    // const addedCollections = collections
    //   .filter(
    //     (collectionId: number) => !existingCollectionIds.includes(collectionId)
    //   )
    //   .map((collectionId: string) => parseInt(collectionId, 10));

    // const removedCollections = existingCollectionIds.filter(
    //   (collectionId) => !collections.includes(collectionId)
    // );

    // تحديث بيانات المنتج
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
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
      include: { collections: true },
    });

    await prisma.productCollection.deleteMany({
      where: {
        productId: Number(productId),
      },
    });

    if (collections) {
      for (const collectionId of collections) {
        await prisma.productCollection.create({
          data: {
            productId: updatedProduct.id,
            collectionId: Number(collectionId),
          },
        });
      }
    }

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (err) {
    console.log("[productId_POST]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // التأكد من وجود المنتج
    const product = await prisma.product.findUnique({
      where: { id: Number(params.productId) },
      include: {
        collections: true, // جلب معلومات المجموعات المرتبطة
      },
    });

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }

    // تحديث المجموعات المرتبطة وإزالة المنتج من كل منها
    await prisma.productCollection.deleteMany({
      where: { productId: product.id },
    });
    // حذف المنتج
    await prisma.product.delete({
      where: { id: Number(params.productId) },
    });

    return new NextResponse(JSON.stringify({ message: "Product deleted" }), {
      status: 200,
    });
  } catch (err) {
    console.log("[productId_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";

//Bowknot Hat
//Sun hat is made of straw material. It's lightweight, breathable, foldable and comfortable. There is a big bowknot on the sun hat is to add more fashion and can prevent harmful from sun rays to protect your face and neck. The straw hat can foldable is convenient to carry out for travel.
// Lightweight, comfortable and beautiful big straw sun hat is accessories tool for summer on outdoor.
//19.99
//8.5
//Hat
//beach hat
// wide hat
// red
// blue
// beige
// white
