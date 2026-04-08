import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      error: "Fluxul direct de ticketing este dezactivat. Foloseste Stripe Checkout."
    },
    { status: 410 }
  );
}
