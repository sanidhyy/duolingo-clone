import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_API_SECRET_KEY, {
  apiVersion: "2026-08-26.dahlia",
  typescript: true,
});
