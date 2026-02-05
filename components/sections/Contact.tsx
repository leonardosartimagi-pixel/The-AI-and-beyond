'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useReducedMotion } from '@/hooks';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { contactFormSchema, type ContactFormData } from '@/lib/validations';
import { TechGridOverlay, SectionDecorations } from '@/components/effects';

interface ContactProps {
  className?: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function Contact({ className = '' }: ContactProps) {
  const t = useTranslations('contact');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      company: '',
      message: '',
      privacy: false as unknown as true,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setFormStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || t('error'));
      }

      setFormStatus('success');
      reset();
    } catch (error) {
      setFormStatus('error');
      setErrorMessage(
        error instanceof Error
          ? error.message
          : t('error')
      );
    }
  };

  const headingVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  const shakeAnimation = {
    x: prefersReducedMotion ? 0 : [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 },
  };

  const isFormDisabled = formStatus === 'submitting' || formStatus === 'success';

  return (
    <section
      ref={sectionRef}
      id="contatti"
      className={`relative overflow-hidden bg-white dark:bg-gray-950 py-24 lg:py-32 ${className}`}
      aria-label={t('label')}
    >
      {/* Tech grid overlay for consistency */}
      <TechGridOverlay opacity={0.02} />

      {/* Decorative neural connections */}
      <SectionDecorations decorations={['flowing2']} opacity={0.4} />

      {/* Decorative gradient blurs */}
      <div
        className="pointer-events-none absolute left-0 top-1/4 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-accent/5 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 bottom-1/4 translate-x-1/2 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          {/* Section Header */}
          <motion.div
            variants={headingVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="text-center"
          >
            <span className="inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
              {t('label')}
            </span>
            <h2 className="mt-6 font-heading text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
              {t('title')} <span className="text-accent">{t('titleAccent')}</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {t('description')}
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            variants={formVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="mt-12"
          >
            <AnimatePresence mode="wait">
              {formStatus === 'success' ? (
                <SuccessMessage key="success" prefersReducedMotion={prefersReducedMotion} t={t} />
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                  animate={formStatus === 'error' && !prefersReducedMotion ? shakeAnimation : {}}
                  noValidate
                  aria-label={t('label')}
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Input
                      label={`${t('form.name')} *`}
                      placeholder={t('form.namePlaceholder')}
                      error={errors.name?.message}
                      disabled={isFormDisabled}
                      aria-required="true"
                      {...register('name')}
                    />
                    <Input
                      type="email"
                      label={`${t('form.email')} *`}
                      placeholder={t('form.emailPlaceholder')}
                      error={errors.email?.message}
                      disabled={isFormDisabled}
                      aria-required="true"
                      {...register('email')}
                    />
                  </div>

                  <Input
                    label={t('form.company')}
                    placeholder={t('form.companyPlaceholder')}
                    error={errors.company?.message}
                    disabled={isFormDisabled}
                    {...register('company')}
                  />

                  <Textarea
                    label={`${t('form.message')} *`}
                    placeholder={t('form.messagePlaceholder')}
                    error={errors.message?.message}
                    disabled={isFormDisabled}
                    autoResize
                    aria-required="true"
                    {...register('message')}
                  />

                  <Checkbox
                    label={
                      <>
                        {t('form.privacy')}{' '}
                        <a
                          href="/privacy"
                          className="text-accent underline hover:text-accent-dark transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {t('form.privacyLink')}
                        </a>{' '}
                        *
                      </>
                    }
                    error={errors.privacy?.message}
                    disabled={isFormDisabled}
                    aria-required="true"
                    {...register('privacy')}
                  />

                  {/* Error message */}
                  <AnimatePresence>
                    {formStatus === 'error' && errorMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="rounded-lg border border-red-200 bg-red-50 p-4"
                        role="alert"
                      >
                        <p className="text-sm text-red-600">{errorMessage}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    isLoading={formStatus === 'submitting'}
                    disabled={isFormDisabled || !isValid}
                  >
                    {formStatus === 'submitting' ? t('form.submitting') : t('form.submit')}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Alternative contact */}
          <motion.div
            variants={headingVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="mt-12 text-center"
          >
            <p className="text-gray-600">
              <a
                href="mailto:info@theaiandbeyond.com"
                className="font-medium text-accent hover:text-accent-dark transition-colors"
              >
                info@theaiandbeyond.com
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface SuccessMessageProps {
  prefersReducedMotion: boolean;
  t: ReturnType<typeof useTranslations<'contact'>>;
}

function SuccessMessage({ prefersReducedMotion, t }: SuccessMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
      className="flex flex-col items-center justify-center rounded-2xl border border-green-200 bg-green-50 p-8 text-center"
      role="status"
      aria-live="polite"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 15,
          delay: prefersReducedMotion ? 0 : 0.2,
        }}
        className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
      >
        <CheckIcon className="h-8 w-8 text-green-600" />
      </motion.div>
      <h3 className="font-heading text-xl font-semibold text-green-800">
        {t('success.title')}
      </h3>
      <p className="mt-2 text-green-700">
        {t('success.description')}
      </p>
    </motion.div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <motion.path
        d="M5 13l4 4L19 7"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      />
    </svg>
  );
}
