import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export const POST = async (req: NextRequest) => {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("Stripe-Signature") as string;

    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.log("[webhooks_POST]",session);
      

      const customerInfo = {
        clerkId: session?.client_reference_id,
        name: session?.customer_details?.name,
        email: session?.customer_details?.email,
      };

      const shippingAddress = {
        street: session?.shipping_details?.address?.line1 || "N/A",
        city: session?.shipping_details?.address?.city || "N/A",
        state: session?.shipping_details?.address?.state || "N/A",
        postalCode: session?.shipping_details?.address?.postal_code || "N/A",
        country: session?.shipping_details?.address?.country || "N/A",
      };

      const retrieveSession = await stripe.checkout.sessions.retrieve(
        session.id,
        { expand: ["line_items.data.price.product"] }
      );
      console.log(retrieveSession);
      

      const lineItems = retrieveSession?.line_items?.data;

      const orderItems = lineItems?.map((item: any) => {
        return {
          product: {
            connect: {
              id: parseInt(item.price.product.metadata.productId) // استخدام connect مع الـ ID للمنتج
            }
          },
          // productId:parseInt(item.price.product.metadata.productId), // شغاله عادي السطر دا بس اللي فرقها احسن عشان بيعمل فحص عشان يبقي متاكد ان المنتج موجود في جدول المنتجات عن طريق ال id
          color: item.price.product.metadata.color || "N/A",
          size: item.price.product.metadata.size || "N/A",
          quantity: item.quantity,
        };
      });

      // البحث عن العميل بناءً على `clerkId`
      const existingCustomer = await prisma.customer.findUnique({
        where: { clerkId: customerInfo.clerkId! },
      });

      if (existingCustomer) {
        // إذا كان العميل موجودًا، ننشئ الطلب مع ربطه بالعميل
        await prisma.order.create({
          data: {
            customerClerkId: existingCustomer.clerkId!,
            shippingAddress: {
              create: shippingAddress,
            },
            shippingRate: session?.shipping_cost?.shipping_rate?.toString() || "N/A",
            totalAmount: session.amount_total ? session.amount_total / 100 : 0,
            products: {
              create: orderItems,
            },
          },
        });
      } else {
        // إذا لم يكن العميل موجودًا، ننشئ العميل مع الطلب الأول
        await prisma.customer.create({
          data: {
            clerkId: customerInfo.clerkId!,
            name: customerInfo.name,
            email: customerInfo.email,
            orders: {
              create: [
                {
                  shippingAddress: {
                    create: shippingAddress,
                  },
                  shippingRate: session?.shipping_cost?.shipping_rate?.toString() || "N/A",
                  totalAmount: session.amount_total ? session.amount_total / 100 : 0,
                  products: {
                    create: orderItems,
                  },
                },
              ],
            },
          },
        });
      }
    }

    return new NextResponse("Order created", { status: 200 });
  } catch (err) {
    console.log("[webhooks_POST]", err);
    return new NextResponse("Failed to create the order", { status: 500 });
  }
};