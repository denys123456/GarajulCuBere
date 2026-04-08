import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Webhook Stripe neconfigurat." }, { status: 400 });
  }

  try {
    const body = await request.text();
    const stripe = getStripe();
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      await prisma.$transaction(async (tx) => {
        const checkout = await tx.checkoutSession.findUnique({
          where: { stripeSessionId: session.id }
        });

        if (!checkout || checkout.status === "COMPLETED") {
          return;
        }

        await tx.checkoutSession.update({
          where: { stripeSessionId: session.id },
          data: {
            status: "COMPLETED",
            completedAt: new Date()
          }
        });

        for (let index = 0; index < checkout.quantity; index += 1) {
          await tx.ticket.create({
            data: {
              eventId: checkout.eventId,
              userId: checkout.userId,
              buyerName: checkout.buyerName,
              buyerEmail: checkout.buyerEmail,
              cnp: checkout.cnp,
              code: `GCB-${randomUUID().slice(0, 8).toUpperCase()}`
            }
          });
        }
      });
    }

    if (event.type === "checkout.session.expired") {
      const session = event.data.object as Stripe.Checkout.Session;

      await prisma.checkoutSession.updateMany({
        where: { stripeSessionId: session.id },
        data: {
          status: "CANCELED"
        }
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("stripe webhook failed", error);
    return NextResponse.json({ error: "Webhook Stripe invalid." }, { status: 400 });
  }
}
