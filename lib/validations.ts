import { z } from 'zod';

// Contact Form Schema
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

// Chat Message Schema
const chatMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().max(500),
});

// Chat Request Schema
export const chatRequestSchema = z.object({
  message: z
    .string()
    .min(1, 'Message is required')
    .max(500, 'Message is too long'),
  sessionId: z
    .string()
    .regex(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
      'Invalid session ID'
    ),
  conversationHistory: z
    .array(chatMessageSchema)
    .max(20, 'Conversation history too long'),
  locale: z.enum(['it', 'en']).optional().default('it'),
});

export type ChatRequestData = z.infer<typeof chatRequestSchema>;
export type ChatMessage = z.infer<typeof chatMessageSchema>;
