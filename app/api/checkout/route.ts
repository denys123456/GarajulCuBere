import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { isValidRomanianCNP } from "@/lib/cnp";
import { getStoredEventById } from "@/lib/events-store";
import { prisma } from "@/lib/prisma";
import { getBaseUrl, getStripe } from "@/lib/stripe";

const schema = z.object({
  eventId: z.string().min(1),
  quantity: z.coerce.number().int().min(1).max(10).default(1),
  fullName: z.string().min(3),
  email: z.string().email(),
  cnp: z.string().regex(/^\d{13}$/)
});

export async function POST(request: Request) {
  try {
    const user = await requireUser();
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Completeaza toate datele pentru checkout." }, { status: 400 });
    }

    if (!isValidRomanianCNP(parsed.data.cnp)) {
      return NextResponse.json({ error: "Introdu un CNP valid." }, { status: 400 });
    }

    const event = await getStoredEventById(parsed.data.eventId);

    if (!event) {
      return NextResponse.json({ error: "Evenimentul nu exista." }, { status: 404 });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Stripe nu este configurat pe server." }, { status: 500 });
    }

    const baseUrl = getBaseUrl();

    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "ron",
            product_data: {
              name: event.title
            },
            unit_amount: event.price * 100
          },
          quantity: parsed.data.quantity
        }
      ],
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cancel`,
      metadata: {
        eventId: event.id,
        userId: user.id,
        buyerName: parsed.data.fullName,
        buyerEmail: parsed.data.email,
        cnp: parsed.data.cnp,
        quantity: String(parsed.data.quantity)
      }
    });

    await prisma.checkoutSession.upsert({
      where: { stripeSessionId: session.id },
      update: {
        buyerName: parsed.data.fullName,
        buyerEmail: parsed.data.email,
        cnp: parsed.data.cnp,
        quantity: parsed.data.quantity,
        eventId: event.id,
        userId: user.id
      },
      create: {
        stripeSessionId: session.id,
        buyerName: parsed.data.fullName,
        buyerEmail: parsed.data.email,
        cnp: parsed.data.cnp,
        quantity: parsed.data.quantity,
        eventId: event.id,
        userId: user.id
      }
    });

    if (!session.url) {
      return NextResponse.json({ error: "Stripe nu a returnat URL-ul de checkout." }, { status: 500 });
    }

    return NextResponse.json({ ok: true, url: session.url });
  } catch (error) {
    console.error("checkout failed", error);
    return NextResponse.json({ error: "Nu s-a putut initializa plata Stripe." }, { status: 500 });
  }
}
