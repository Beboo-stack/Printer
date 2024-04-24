import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(req) {
    const body = await req.json();

    try {
        const data = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: ['peteralber735@gmail.com'],
            subject: 'Hello world',
            react: EmailTemplate({
                firstName: body.name || "empty",
                email: body.email || "empty",
                phone: body.phone || "empty",
                message: body.message || "empty"

            }),
        });

        return Response.json(data);
    } catch (error) {
        return Response.json({ error });
    }
}
