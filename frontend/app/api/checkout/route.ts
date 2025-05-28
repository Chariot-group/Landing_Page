import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

if (!process.env.STRIPE_KEY) {
  throw new Error('STRIPE_KEY is not defined');
}

const stripe = new Stripe(process.env.STRIPE_KEY, {
  apiVersion: '2025-04-30.basil',
});

export async function POST(req: NextRequest) {
  try {
    const { priceId } = await req.json();

    // Validation des données entrantes
    if (!priceId) {
      return NextResponse.json({ error: 'Price ID is required' }, { status: 400 });
    }

    // Création de la session Stripe
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription', // Assurez-vous que le mode correspond à votre produit
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${req.nextUrl.origin}/success`,
      cancel_url: `${req.nextUrl.origin}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe Error:', error); // Log pour débogage
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
