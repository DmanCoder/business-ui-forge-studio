'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Cta from '@src/components/ui/Cta';
import Recaptcha from '@src/components/Shared/Recaptcha';

import { RESPONSE_TIME, NETLIFY_FORM_NAME } from '@src/config/site';
import {
  LEGENDS,
  LABELS,
  PLACEHOLDERS,
  PROJECT_TYPES,
  TIMELINES,
  BUDGETS,
  VALIDATION,
  CONSENT,
  SUBMIT,
} from '@src/content/start-project';

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const INPUT_CLASSES =
  'border-edge focus:border-blue focus:outline-blue w-full rounded-[0.2rem] border bg-white px-[1.4rem] py-[1.2rem] text-[1.5rem] focus:outline-2';

const LABEL_CLASSES = 'mb-[0.8rem] block text-[1.4rem] font-semibold';

const LEGEND_CLASSES = 'meta-label mb-[0.8rem]';

type FieldValues = {
  name: string;
  email: string;
  business: string;
  website: string;
  type: string;
  brief: string;
  users: string;
  timeline: string;
  budget: string;
  heard: string;
};

const INITIAL_VALUES: FieldValues = {
  name: '',
  email: '',
  business: '',
  website: '',
  type: '',
  brief: '',
  users: '',
  timeline: '',
  budget: '',
  heard: '',
};

type Errors = Partial<Record<'name' | 'email' | 'type' | 'brief' | 'consent', string>>;

const OptionalHint = () => <span className='text-muted font-normal'> {LABELS.optional}</span>;

const FieldError = ({ id, message }: { id: string; message?: string }) =>
  message ? (
    <p role='alert' id={id} className='text-error mt-[0.6rem] text-[1.35rem]'>
      {message}
    </p>
  ) : null;

type ChipGroupProps = {
  options: readonly string[];
  value: string;
  onChange: (_value: string) => void;
  labelledBy: string;
  describedBy?: string;
};

/** Single-select chip group: click a selected chip again to deselect it. */
const ChipGroup = React.forwardRef<HTMLDivElement, ChipGroupProps>(
  ({ options, value, onChange, labelledBy, describedBy }, ref) => (
    <div
      ref={ref}
      role='group'
      className='flex flex-wrap gap-[0.8rem]'
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
    >
      {options.map((option) => {
        const selected = option === value;
        return (
          <button
            key={option}
            type='button'
            aria-pressed={selected}
            onClick={() => onChange(selected ? '' : option)}
            className={`min-h-[4.4rem] cursor-pointer rounded-[0.2rem] border px-[1.5rem] py-[1rem] text-[1.4rem] ${
              selected
                ? 'bg-ink border-ink font-semibold text-white'
                : 'border-edge text-ink hover:border-ink bg-white font-medium'
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  )
);
ChipGroup.displayName = 'ChipGroup';

const StartProjectForm: React.FC = () => {
  const router = useRouter();

  const [values, setValues] = React.useState<FieldValues>(INITIAL_VALUES);
  const [consent, setConsent] = React.useState(false);
  const [botField, setBotField] = React.useState('');
  const [errors, setErrors] = React.useState<Errors>({});
  const [recaptchaToken, setRecaptchaToken] = React.useState('');
  const [recaptchaError, setRecaptchaError] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState('');

  const nameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const typeGroupRef = React.useRef<HTMLDivElement>(null);
  const briefRef = React.useRef<HTMLTextAreaElement>(null);
  const consentRef = React.useRef<HTMLInputElement>(null);

  const setField = (field: keyof FieldValues) => (value: string) =>
    setValues((prev) => ({ ...prev, [field]: value }));

  const handleInput =
    (field: keyof FieldValues) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setField(field)(event.target.value);

  const validate = (): Errors => {
    const next: Errors = {};
    if (!values.name.trim()) next.name = VALIDATION.name;
    if (!EMAIL_REGEX.test(values.email.trim())) next.email = VALIDATION.email;
    if (!values.type) next.type = VALIDATION.type;
    if (!values.brief.trim()) next.brief = VALIDATION.brief;
    if (!consent) next.consent = VALIDATION.consent;
    return next;
  };

  const focusFirstError = (next: Errors) => {
    if (next.name) {
      nameRef.current?.focus();
    } else if (next.email) {
      emailRef.current?.focus();
    } else if (next.type) {
      typeGroupRef.current?.querySelector('button')?.focus();
    } else if (next.brief) {
      briefRef.current?.focus();
    } else if (next.consent) {
      consentRef.current?.focus();
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError('');
    setRecaptchaError('');

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      focusFirstError(nextErrors);
      return;
    }

    setSubmitting(true);

    try {
      // Step 1: verify reCAPTCHA when the site key is configured.
      if (RECAPTCHA_SITE_KEY) {
        if (!recaptchaToken) {
          setRecaptchaError(SUBMIT.recaptchaError);
          setSubmitting(false);
          return;
        }

        const verification = await fetch('/api/verify-recaptcha', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: recaptchaToken }),
        });

        if (!verification.ok) {
          setRecaptchaError(SUBMIT.recaptchaFailed);
          setSubmitting(false);
          return;
        }
      }

      // Step 2: post the enquiry to Netlify Forms via the static registration file.
      const body = new URLSearchParams({
        'form-name': NETLIFY_FORM_NAME,
        ...values,
        consent: 'yes',
        'bot-field': botField,
      });

      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      if (!response.ok) throw new Error(`Form submission failed: ${response.status}`);

      router.push('/thank-you');
    } catch {
      setSubmitError(SUBMIT.submitError);
      setSubmitting(false);
    }
  };

  return (
    <form
      name={NETLIFY_FORM_NAME}
      onSubmit={handleSubmit}
      noValidate
      className='flex flex-col gap-[4rem]'
    >
      <p className='text-muted text-[1.35rem]'>Fields marked * are required.</p>

      {/* Netlify honeypot */}
      <p className='sr-only' aria-hidden='true'>
        <label>
          Do not fill this out if you are human:{' '}
          <input
            type='text'
            name='bot-field'
            tabIndex={-1}
            autoComplete='off'
            value={botField}
            onChange={(event) => setBotField(event.target.value)}
          />
        </label>
      </p>

      {/* About you */}
      <fieldset className='flex flex-col gap-[1.8rem] border-0 p-0'>
        <legend className={LEGEND_CLASSES}>
          <span className='tnum text-blue mr-[1rem]'>01</span>
          {LEGENDS.aboutYou}
        </legend>

        <div>
          <label htmlFor='sp-name' className={LABEL_CLASSES}>
            {LABELS.name} *
          </label>
          <input
            ref={nameRef}
            id='sp-name'
            name='name'
            type='text'
            autoComplete='name'
            required
            value={values.name}
            onChange={handleInput('name')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'sp-name-error' : undefined}
            className={INPUT_CLASSES}
          />
          <FieldError id='sp-name-error' message={errors.name} />
        </div>

        <div>
          <label htmlFor='sp-email' className={LABEL_CLASSES}>
            {LABELS.email} *
          </label>
          <input
            ref={emailRef}
            id='sp-email'
            name='email'
            type='email'
            autoComplete='email'
            required
            value={values.email}
            onChange={handleInput('email')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'sp-email-error' : undefined}
            className={INPUT_CLASSES}
          />
          <FieldError id='sp-email-error' message={errors.email} />
        </div>

        <div>
          <label htmlFor='sp-business' className={LABEL_CLASSES}>
            {LABELS.business}
            <OptionalHint />
          </label>
          <input
            id='sp-business'
            name='business'
            type='text'
            autoComplete='organization'
            value={values.business}
            onChange={handleInput('business')}
            className={INPUT_CLASSES}
          />
        </div>

        <div>
          <label htmlFor='sp-website' className={LABEL_CLASSES}>
            {LABELS.website}
            <OptionalHint />
          </label>
          <input
            id='sp-website'
            name='website'
            type='url'
            autoComplete='url'
            placeholder={PLACEHOLDERS.website}
            value={values.website}
            onChange={handleInput('website')}
            className={INPUT_CLASSES}
          />
        </div>
      </fieldset>

      {/* Your project */}
      <fieldset className='border-edge flex flex-col gap-[1.8rem] border-0 border-t p-0 pt-[3.2rem]'>
        <legend className={`${LEGEND_CLASSES} float-left w-full`}>
          <span className='tnum text-blue mr-[1rem]'>02</span>
          {LEGENDS.yourProject}
        </legend>

        <div>
          <p id='sp-type-label' className={LABEL_CLASSES}>
            {LABELS.type} *
          </p>
          <input type='hidden' name='type' value={values.type} />
          <ChipGroup
            ref={typeGroupRef}
            options={PROJECT_TYPES}
            value={values.type}
            onChange={setField('type')}
            labelledBy='sp-type-label'
            describedBy={errors.type ? 'sp-type-error' : undefined}
          />
          <FieldError id='sp-type-error' message={errors.type} />
        </div>

        <div>
          <label htmlFor='sp-brief' className={LABEL_CLASSES}>
            {LABELS.brief} *
          </label>
          <p id='sp-brief-hint' className='text-muted mb-[0.8rem] text-[1.35rem] leading-[1.55]'>
            {LABELS.briefHint}
          </p>
          <textarea
            ref={briefRef}
            id='sp-brief'
            name='brief'
            rows={6}
            required
            placeholder={PLACEHOLDERS.brief}
            value={values.brief}
            onChange={handleInput('brief')}
            aria-invalid={Boolean(errors.brief)}
            aria-describedby={errors.brief ? 'sp-brief-hint sp-brief-error' : 'sp-brief-hint'}
            className={INPUT_CLASSES}
          />
          <FieldError id='sp-brief-error' message={errors.brief} />
        </div>

        <div>
          <label htmlFor='sp-users' className={LABEL_CLASSES}>
            {LABELS.users}
            <OptionalHint />
          </label>
          <input
            id='sp-users'
            name='users'
            type='text'
            value={values.users}
            onChange={handleInput('users')}
            className={INPUT_CLASSES}
          />
        </div>
      </fieldset>

      {/* Timing and budget */}
      <fieldset className='border-edge flex flex-col gap-[1.8rem] border-0 border-t p-0 pt-[3.2rem]'>
        <legend className={`${LEGEND_CLASSES} float-left w-full`}>
          <span className='tnum text-blue mr-[1rem]'>03</span>
          {LEGENDS.timingAndBudget}
        </legend>

        <div>
          <p id='sp-timeline-label' className={LABEL_CLASSES}>
            {LABELS.timeline}
            <OptionalHint />
          </p>
          <input type='hidden' name='timeline' value={values.timeline} />
          <ChipGroup
            options={TIMELINES}
            value={values.timeline}
            onChange={setField('timeline')}
            labelledBy='sp-timeline-label'
          />
        </div>

        <div>
          <p id='sp-budget-label' className={LABEL_CLASSES}>
            {LABELS.budget}
            <span className='text-muted font-normal'> {LABELS.budgetHint}</span>
            <OptionalHint />
          </p>
          <input type='hidden' name='budget' value={values.budget} />
          <ChipGroup
            options={BUDGETS}
            value={values.budget}
            onChange={setField('budget')}
            labelledBy='sp-budget-label'
          />
        </div>

        <div>
          <label htmlFor='sp-heard' className={LABEL_CLASSES}>
            {LABELS.heard}
            <OptionalHint />
          </label>
          <input
            id='sp-heard'
            name='heard'
            type='text'
            value={values.heard}
            onChange={handleInput('heard')}
            className={INPUT_CLASSES}
          />
        </div>
      </fieldset>

      {/* Consent */}
      <div className='border-edge border-t pt-[3.2rem]'>
        <label
          htmlFor='sp-consent'
          className='flex items-start gap-[1.2rem] text-[1.45rem] leading-[1.55]'
        >
          <input
            ref={consentRef}
            id='sp-consent'
            name='consent'
            type='checkbox'
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? 'sp-consent-error' : undefined}
            className='mt-[0.3rem] h-[1.6rem] w-[1.6rem]'
          />
          <span>
            {CONSENT.before}
            <Link href={CONSENT.linkHref} className='text-blue hover:text-ink font-semibold'>
              {CONSENT.linkLabel}
            </Link>
            {CONSENT.after}
          </span>
        </label>
        <FieldError id='sp-consent-error' message={errors.consent} />
      </div>

      {/* reCAPTCHA — only rendered when a site key is configured. */}
      {RECAPTCHA_SITE_KEY && <Recaptcha onChange={setRecaptchaToken} error={recaptchaError} />}

      {/* Submit */}
      <div className='flex flex-wrap items-center gap-[1.8rem]'>
        <Cta type='submit' withArrow disabled={submitting}>
          {submitting ? SUBMIT.sending : SUBMIT.label}
        </Cta>
        <span className='text-muted text-[1.4rem]'>Response within {RESPONSE_TIME}</span>
      </div>
      {submitError && (
        <p role='alert' className='text-error mt-[-1.6rem] text-[1.35rem]'>
          {submitError}
        </p>
      )}
    </form>
  );
};

export default StartProjectForm;
