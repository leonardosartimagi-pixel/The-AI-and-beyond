import { z } from 'zod';

const validationMessages = {
  it: {
    nameMin: 'Il nome deve avere almeno 2 caratteri',
    nameMax: 'Il nome è troppo lungo',
    emailInvalid: 'Inserisci un indirizzo email valido',
    messageMin: 'Il messaggio deve avere almeno 10 caratteri',
    messageMax: 'Il messaggio è troppo lungo',
    privacyRequired: 'Devi accettare la privacy policy',
  },
  en: {
    nameMin: 'Name must be at least 2 characters',
    nameMax: 'Name is too long',
    emailInvalid: 'Please enter a valid email address',
    messageMin: 'Message must be at least 10 characters',
    messageMax: 'Message is too long',
    privacyRequired: 'You must accept the privacy policy',
  },
} as const;

type SupportedLocale = keyof typeof validationMessages;

export function createContactFormSchema(locale: string = 'it') {
  const m =
    validationMessages[locale as SupportedLocale] ?? validationMessages.it;

  return z.object({
    name: z.string().min(2, m.nameMin).max(100, m.nameMax),
    email: z.string().email(m.emailInvalid),
    company: z.string().optional(),
    message: z.string().min(10, m.messageMin).max(1000, m.messageMax),
    privacy: z.boolean().refine((val) => val === true, {
      message: m.privacyRequired,
    }),
  });
}

// Default schema (Italian) for server-side API validation
export const contactFormSchema = createContactFormSchema('it');

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
