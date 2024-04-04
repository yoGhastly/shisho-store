import { revalidatePath } from 'next/cache';
import Stripe from 'stripe';

const STRIPE_SECRET_KEY =
    'sk_test_51OfZDtKrqv6TAD3CJhDV05wPUkgg7625mrQpm2IDAN0eSfIl6JN0o0tgft2KBmIPBQfMNX2xYknXfraMxxsgLw5J009SBO2FUp';
const stripe = new Stripe(STRIPE_SECRET_KEY);

export async function GET() {
    try {
        const { data: products } = await stripe.products.list({
            limit: 300,
        });

        revalidatePath('/', 'page');

        return Response.json({
            products: products,
            success: true,
            status: 200,
        });
    } catch (error) {
        console.error(error);
        return Response.json({
            error: 'Error retrieving products',
            products: [],
            success: false,
            status: 500,
        });
    }
}
