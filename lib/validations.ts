import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Il nome deve avere almeno 2 caratteri')
    .max(100, 'Il nome è troppo lungo'),
  email: z
    .string()
    .email('Inserisci un indirizzo email valido'),
  company: z.string().optional(),
  message: z
    .string()
    .min(10, 'Il messaggio deve avere almeno 10 caratteri')
    .max(1000, 'Il messaggio è troppo lungo'),
  privacy: z.literal(true, {
    errorMap: () => ({ message: 'Devi accettare la privacy policy' }),
  }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
