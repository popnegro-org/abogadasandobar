import React, { useEffect, useState } from 'react';
import { CheckCircle, Send } from 'lucide-react';

import { ActiveTab, ContactFormData } from '../types';
import { PageHero } from './PageHero';
import { ASSETS } from '../data/lawyerData';
import { submitFormspree } from '../lib/formspree';
import { trackEvent } from '../lib/analytics';

interface ContactSectionProps {
  setActiveTab?: (tab: ActiveTab) => void;
  initialPracticeArea?: string;
}

type ClientType = 'particular' | 'empresa';

type ConsultationMode =
  | 'presencial'
  | 'videollamada'
  | 'telefonica';

type FormErrorField =
  | 'fullName'
  | 'email'
  | 'phone'
  | 'message';

type FormErrors = Partial<Record<FormErrorField, string>>;

const INITIAL_PRACTICE_AREA =
  'Otra Consulta Penal / Corporativa';

const EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ContactSection: React.FC<ContactSectionProps> = ({
  setActiveTab = () => { },
  initialPracticeArea,
}) => {
  const [clientType, setClientType] =
    useState<ClientType>('particular');

  const [formData, setFormData] =
    useState<ContactFormData>({
      clientType: 'particular',
      fullName: '',
      email: '',
      phone: '',
      practiceArea:
        initialPracticeArea ||
        INITIAL_PRACTICE_AREA,
      urgency: 'ordinaria',
      message: '',
      acceptedPrivacy: true,
    });

  const [consultationMode, setConsultationMode] =
    useState<ConsultationMode>('telefonica');

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [submittedCode, setSubmittedCode] =
    useState<string | null>(null);

  const [submitError, setSubmitError] =
    useState<string | null>(null);

  const [errors, setErrors] =
    useState<FormErrors>({});

  const [isUrgent, setIsUrgent] =
    useState(false);

  /*
   * ============================================================
   * SYNC INITIAL PRACTICE AREA
   * ============================================================
   */

  useEffect(() => {
    if (!initialPracticeArea) return;

    setFormData((prev) => ({
      ...prev,
      practiceArea: initialPracticeArea,
    }));
  }, [initialPracticeArea]);

  /*
   * ============================================================
   * CLIENT TYPE
   * ============================================================
   */

  const handleClientTypeChange = (
    type: ClientType,
  ) => {
    setClientType(type);

    setFormData((prev) => ({
      ...prev,
      clientType: type,
      email:
        type === 'particular'
          ? ''
          : prev.email,
    }));

    setErrors({});
    setSubmitError(null);
  };

  /*
   * ============================================================
   * FIELD VALIDATION
   * ============================================================
   */

  const getFieldError = (
    field: FormErrorField,
    values: ContactFormData = formData,
    currentClientType: ClientType = clientType,
  ): string => {
    switch (field) {
      case 'fullName':
        if (!values.fullName.trim()) {
          return currentClientType ===
            'particular'
            ? 'Por favor ingrese su nombre completo.'
            : 'Por favor ingrese el nombre de la empresa.';
        }

        return '';

      case 'email':
        if (currentClientType !== 'empresa') {
          return '';
        }

        if (!values.email.trim()) {
          return 'Por favor ingrese un correo electrónico.';
        }

        if (
          !EMAIL_REGEX.test(
            values.email.trim(),
          )
        ) {
          return 'Por favor ingrese un correo electrónico válido.';
        }

        return '';

      case 'phone': {
        const normalizedPhone =
          values.phone.replace(/[^\d]/g, '');

        if (!values.phone.trim()) {
          return 'Por favor ingrese un teléfono (WhatsApp).';
        }

        if (normalizedPhone.length < 8) {
          return 'El número de teléfono parece ser demasiado corto.';
        }

        return '';
      }

      case 'message':
        if (!values.message.trim()) {
          return 'Por favor describa brevemente el motivo de su consulta.';
        }

        return '';

      default:
        return '';
    }
  };

  /*
   * ============================================================
   * VALIDATE SINGLE FIELD
   * ============================================================
   */

  const validateField = (
    field: FormErrorField,
  ) => {
    const error = getFieldError(field);

    setErrors((prev) => {
      const next = { ...prev };

      if (error) {
        next[field] = error;
      } else {
        delete next[field];
      }

      return next;
    });

    return error;
  };

  /*
   * ============================================================
   * VALIDATE COMPLETE FORM
   * ============================================================
   */

  const validateForm = (): FormErrors => {
    const fields: FormErrorField[] = [
      'fullName',
      'email',
      'phone',
      'message',
    ];

    const newErrors: FormErrors = {};

    fields.forEach((field) => {
      const error = getFieldError(field);

      if (error) {
        newErrors[field] = error;
      }
    });

    return newErrors;
  };

  /*
   * ============================================================
   * CLEAR FIELD ERROR
   * ============================================================
   */

  const clearFieldError = (
    field: FormErrorField,
  ) => {
    if (!errors[field]) return;

    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  /*
   * ============================================================
   * FORM SUBMIT
   * ============================================================
   */

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (isSubmitting) return;

    const newErrors = validateForm();

    setErrors(newErrors);
    setSubmitError(null);

    if (
      Object.keys(newErrors).length > 0
    ) {
      const firstErrorKey =
        Object.keys(
          newErrors,
        )[0] as FormErrorField;

      const errorElement =
        document.querySelector(
          `[name="${firstErrorKey}"]`,
        ) as HTMLElement | null;

      errorElement?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });

      errorElement?.focus();

      return;
    }

    setIsSubmitting(true);

    const urgency = isUrgent
      ? 'detencion_inmediata'
      : 'ordinaria';

    const result = await submitFormspree({
      _subject: `Nueva consulta — ${formData.fullName}`,
      clientType,
      fullName:
        formData.fullName.trim(),
      email:
        formData.email.trim() ||
        undefined,
      phone:
        formData.phone.trim(),
      practiceArea:
        formData.practiceArea,
      consultationMode,
      urgency,
      message:
        formData.message.trim(),
    });

    setIsSubmitting(false);

    if (!result.ok) {
      setSubmitError(
        result.error ||
        'No fue posible enviar la consulta. Inténtelo nuevamente.',
      );

      return;
    }

    // Count a lead only after Formspree confirms successful receipt.
    trackEvent('contact_form_success', {
      form_name: 'contact_consultation',
      submission_method: 'formspree',
    });

    setFormData((prev) => ({
      ...prev,
      urgency,
    }));

    setSubmittedCode(
      `EXP-${Math.floor(
        100000 +
        Math.random() * 900000,
      )}`,
    );
  };

  /*
   * ============================================================
   * RESET FORM
   * ============================================================
   */

  const handleReset = () => {
    setSubmittedCode(null);
    setSubmitError(null);

    setFormData({
      clientType,
      fullName: '',
      email: '',
      phone: '',
      practiceArea:
        INITIAL_PRACTICE_AREA,
      urgency: 'ordinaria',
      message: '',
      acceptedPrivacy: true,
    });

    setConsultationMode('telefonica');
    setErrors({});
    setIsUrgent(false);
  };

  /*
   * ============================================================
   * SHARED STYLES
   * ============================================================
   */

  const inputBaseClasses =
    'w-full border-b bg-transparent px-0 py-3 text-base font-light text-[#302D28] placeholder-[#302D28]/30 transition-colors focus:border-[#7F203D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7F203D] focus-visible:ring-offset-2 sm:text-lg';

  const labelClasses =
    'text-xs font-bold uppercase tracking-widest text-[#302D28]';

  /*
   * ============================================================
   * RENDER
   * ============================================================
   */

  return (
    <div
      id="contact-section"
      className="w-full"
    >
      {/* ========================================================
          PAGE HERO
      ======================================================== */}

      <PageHero
        title="Contacto letrado | Evaluación de Caso"
        subtitle="Utilice este canal para una evaluación técnica de su caso bajo estricto secreto profesional."
        breadcrumbLabel="Contacto"
        backgroundImage={ASSETS.heroContact}
        setActiveTab={setActiveTab}
      />

      {/* ========================================================
          CONTACT CONTENT
      ======================================================== */}

      <section aria-labelledby="contact-form-title" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl">

          {/* ====================================================
              SUCCESS STATE
          ==================================================== */}

          <h2
            id="contact-form-title"
            className={`${submittedCode ? 'sr-only' : 'mb-10 font-serif text-3xl font-bold text-[#302D28] sm:mb-12 sm:text-4xl'}`}
          >
            Formulario de Consulta Confidencial
          </h2>

          {submittedCode ? (
            <section
              id="contact-success-state"
              className="animate-in fade-in space-y-8 py-12 text-center duration-700"
              role="status"
              aria-live="polite"
              aria-labelledby="contact-success-title"
            >
              <div
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#A3B09F]/20"
                aria-hidden="true"
              >
                <CheckCircle className="h-10 w-10 text-[#302D28]" />
              </div>

              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-widest text-[#7F203D]">
                  Solicitud recibida
                </p>

                <h2
                  id="contact-success-title"
                  className="font-serif text-3xl font-bold text-[#302D28] sm:text-4xl"
                >
                  Hemos recibido su consulta
                </h2>

                <p className="mx-auto max-w-xl text-base font-light leading-relaxed text-[#302D28]/80 sm:text-lg">
                  Su mensaje fue enviado correctamente.
                  Nos pondremos en contacto para coordinar
                  los próximos pasos.
                </p>

                <p className="text-xs text-[#302D28]/60">
                  Referencia: {submittedCode}
                </p>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-bold uppercase tracking-widest text-[#302D28]/60 transition-colors hover:text-[#302D28] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7F203D] focus-visible:ring-offset-2"
              >
                Volver al formulario
              </button>
            </section>
          ) : (
            <>
              {/* ==================================================
                  CLIENT TYPE
              ================================================== */}

              <div
                className="mb-12 flex border-b border-[#302D28]/20 sm:mb-16"
                role="tablist"
                aria-label="Tipo de consulta"
              >
                {(
                  [
                    'particular',
                    'empresa',
                  ] as const
                ).map((type) => {
                  const isActive =
                    clientType === type;

                  return (
                    <button
                      key={type}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls="contact-form-content"
                      onClick={() =>
                        handleClientTypeChange(
                          type,
                        )
                      }
                      className={`flex-1 cursor-pointer pb-4 text-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7F203D] focus-visible:ring-offset-2 sm:pb-5 ${isActive
                        ? 'border-b-2 border-[#7F203D]'
                        : 'opacity-50 hover:opacity-80'
                        }`}
                    >
                      <span
                        className={`block text-xs font-bold uppercase tracking-widest sm:text-sm ${isActive
                          ? 'text-[#7F203D]'
                          : 'text-[#302D28]'
                          }`}
                      >
                        {type ===
                          'particular'
                          ? 'Particular'
                          : 'Empresa y Directivos'}
                      </span>

                      <span className="mt-1 block text-[10px] font-light text-[#302D28]/60 sm:text-xs">
                        {type ===
                          'particular'
                          ? 'Defensa Penal & Asistencia Directa'
                          : 'Empresas, Directivos & Compliance'}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div id="contact-form-content">

                {/* ==================================================
                    PRACTICE AREA
                ================================================== */}

                <section
                  id="selected-practice-area"
                  className="mb-10 rounded-md border border-[#7F203D]/20 bg-[#7F203D]/5 px-5 py-4 sm:px-6 sm:py-5"
                  role="status"
                  aria-live="polite"
                  aria-labelledby="practice-area-title"
                >
                  <p
                    id="practice-area-title"
                    className="text-[10px] font-bold uppercase tracking-widest text-[#7F203D] sm:text-xs"
                  >
                    Área de consulta
                  </p>

                  <p className="mt-1 font-serif text-base font-bold text-[#302D28] sm:text-lg">
                    {formData.practiceArea}
                  </p>

                  <p className="mt-1 text-xs font-light text-[#302D28]/60 sm:text-sm">
                    Esta área se enviará asociada a su consulta.
                  </p>

                  <input
                    type="hidden"
                    name="practiceArea"
                    value={
                      formData.practiceArea
                    }
                  />
                </section>

                {/* ==================================================
                    FORM
                ================================================== */}

                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="animate-in space-y-10 fade-in duration-700 sm:space-y-12"
                >
                  <div className="space-y-8 sm:space-y-10">

                    {/* ============================================
                        FULL NAME / COMPANY
                    ============================================= */}

                    <div className="space-y-2">
                      <label
                        htmlFor="contact-full-name"
                        className={labelClasses}
                      >
                        {clientType ===
                          'particular'
                          ? 'Nombre completo'
                          : 'Empresa / Razón Social'}
                      </label>

                      <input
                        id="contact-full-name"
                        name="fullName"
                        type="text"
                        autoComplete={
                          clientType ===
                            'particular'
                            ? 'name'
                            : 'organization'
                        }
                        value={
                          formData.fullName
                        }
                        onChange={(event) => {
                          setFormData(
                            (prev) => ({
                              ...prev,
                              fullName:
                                event.target
                                  .value,
                            }),
                          );

                          clearFieldError(
                            'fullName',
                          );
                        }}
                        onBlur={() =>
                          validateField(
                            'fullName',
                          )
                        }
                        aria-invalid={Boolean(
                          errors.fullName,
                        )}
                        aria-describedby={
                          errors.fullName
                            ? 'contact-full-name-error'
                            : undefined
                        }
                        className={`${inputBaseClasses} ${errors.fullName
                          ? 'border-red-500'
                          : 'border-[#302D28]/25'
                          }`}
                        placeholder={
                          clientType ===
                            'particular'
                            ? 'Ej. Juan Pérez'
                            : 'Ej. Corporación ABC'
                        }
                      />

                      {errors.fullName && (
                        <p
                          id="contact-full-name-error"
                          className="pt-1 text-xs text-red-600"
                          role="alert"
                        >
                          {
                            errors.fullName
                          }
                        </p>
                      )}
                    </div>

                    {/* ============================================
                        PHONE + EMAIL
                    ============================================= */}

                    <div
                      className={`grid grid-cols-1 gap-8 md:gap-12 ${clientType ===
                        'empresa'
                        ? 'md:grid-cols-2'
                        : ''
                        }`}
                    >
                      <div className="space-y-2">
                        <label
                          htmlFor="contact-phone"
                          className={labelClasses}
                        >
                          WhatsApp / Teléfono
                        </label>

                        <input
                          id="contact-phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          inputMode="tel"
                          value={
                            formData.phone
                          }
                          onChange={(event) => {
                            const value =
                              event.target.value.replace(
                                /[^\d\s+-]/g,
                                '',
                              );

                            setFormData(
                              (prev) => ({
                                ...prev,
                                phone: value,
                              }),
                            );

                            clearFieldError(
                              'phone',
                            );
                          }}
                          onBlur={() =>
                            validateField(
                              'phone',
                            )
                          }
                          aria-invalid={Boolean(
                            errors.phone,
                          )}
                          aria-describedby={
                            errors.phone
                              ? 'contact-phone-error'
                              : undefined
                          }
                          className={`${inputBaseClasses} ${errors.phone
                            ? 'border-red-500'
                            : 'border-[#302D28]/25'
                            }`}
                          placeholder="+54 9 261 512-3456"
                        />

                        {errors.phone && (
                          <p
                            id="contact-phone-error"
                            className="pt-1 text-xs text-red-600"
                            role="alert"
                          >
                            {
                              errors.phone
                            }
                          </p>
                        )}
                      </div>

                      {clientType ===
                        'empresa' && (
                          <div className="space-y-2">
                            <label
                              htmlFor="contact-email"
                              className={labelClasses}
                            >
                              Correo Electrónico Corporativo
                            </label>

                            <input
                              id="contact-email"
                              name="email"
                              type="email"
                              autoComplete="email"
                              value={
                                formData.email
                              }
                              onChange={(
                                event,
                              ) => {
                                setFormData(
                                  (prev) => ({
                                    ...prev,
                                    email:
                                      event.target
                                        .value,
                                  }),
                                );

                                clearFieldError(
                                  'email',
                                );
                              }}
                              onBlur={() =>
                                validateField(
                                  'email',
                                )
                              }
                              aria-invalid={Boolean(
                                errors.email,
                              )}
                              aria-describedby={
                                errors.email
                                  ? 'contact-email-error'
                                  : undefined
                              }
                              className={`${inputBaseClasses} ${errors.email
                                ? 'border-red-500'
                                : 'border-[#302D28]/25'
                                }`}
                              placeholder="nombre@empresa.com"
                            />

                            {errors.email && (
                              <p
                                id="contact-email-error"
                                className="pt-1 text-xs text-red-600"
                                role="alert"
                              >
                                {
                                  errors.email
                                }
                              </p>
                            )}
                          </div>
                        )}
                    </div>

                    {/* ============================================
                        CONSULTATION MODE
                    ============================================= */}

                    <fieldset className="space-y-3">
                      <legend
                        className={
                          labelClasses
                        }
                      >
                        Modalidad de consulta
                      </legend>

                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                        {(
                          [
                            [
                              'presencial',
                              'Presencial',
                            ],
                            [
                              'videollamada',
                              'Videollamada',
                            ],
                            [
                              'telefonica',
                              'Telefónica',
                            ],
                          ] as const
                        ).map(
                          ([
                            value,
                            label,
                          ]) => {
                            const isActive =
                              consultationMode ===
                              value;

                            return (
                              <button
                                key={value}
                                type="button"
                                aria-pressed={
                                  isActive
                                }
                                onClick={() =>
                                  setConsultationMode(
                                    value,
                                  )
                                }
                                className={`cursor-pointer border px-3 py-3 text-xs font-bold uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7F203D] focus-visible:ring-offset-2 ${isActive
                                  ? 'border-[#7F203D] bg-[#7F203D]/10 text-[#7F203D]'
                                  : 'border-[#302D28]/20 text-[#302D28]/70 hover:border-[#7F203D]/50'
                                  }`}
                              >
                                {label}
                              </button>
                            );
                          },
                        )}
                      </div>
                    </fieldset>

                    {/* ============================================
                        MESSAGE
                    ============================================= */}

                    <div className="space-y-2">
                      <label
                        htmlFor="contact-message"
                        className={labelClasses}
                      >
                        Motivo de consulta
                      </label>

                      <textarea
                        id="contact-message"
                        name="message"
                        rows={4}
                        value={
                          formData.message
                        }
                        onChange={(event) => {
                          setFormData(
                            (prev) => ({
                              ...prev,
                              message:
                                event.target
                                  .value,
                            }),
                          );

                          clearFieldError(
                            'message',
                          );
                        }}
                        onBlur={() =>
                          validateField(
                            'message',
                          )
                        }
                        aria-invalid={Boolean(
                          errors.message,
                        )}
                        aria-describedby={
                          errors.message
                            ? 'contact-message-error'
                            : undefined
                        }
                        className={`${inputBaseClasses} resize-none leading-relaxed ${errors.message
                          ? 'border-red-500'
                          : 'border-[#302D28]/25'
                          }`}
                        placeholder="Describa brevemente los hechos o la situación procesal..."
                      />

                      {errors.message && (
                        <p
                          id="contact-message-error"
                          className="pt-1 text-xs text-red-600"
                          role="alert"
                        >
                          {
                            errors.message
                          }
                        </p>
                      )}
                    </div>

                    {/* ============================================
                        URGENT ASSISTANCE
                    ============================================= */}

                    {clientType ===
                      'particular' && (
                        <div className="flex items-center gap-3.5 pt-2">
                          <input
                            id="urgent-checkbox"
                            name="urgent"
                            type="checkbox"
                            checked={
                              isUrgent
                            }
                            onChange={(event) =>
                              setIsUrgent(
                                event.target
                                  .checked,
                              )
                            }
                            className="h-5 w-5 cursor-pointer rounded border-gray-300 text-[#7F203D] focus-visible:ring-2 focus-visible:ring-[#7F203D] focus-visible:ring-offset-2"
                          />

                          <label
                            htmlFor="urgent-checkbox"
                            className="cursor-pointer select-none text-sm font-light text-[#302D28]/80"
                          >
                            Necesito asistencia penal urgente
                            (citación judicial inminente o
                            detención)
                          </label>
                        </div>
                      )}
                  </div>

                  {/* ================================================
                      SUBMIT ERROR
                  ================================================= */}

                  {submitError && (
                    <p
                      className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                      role="alert"
                    >
                      {submitError}
                    </p>
                  )}

                  {/* ================================================
                      SUBMIT
                  ================================================= */}

                  <div className="pt-4 text-center">
                    <button
                      type="submit"
                      disabled={
                        isSubmitting
                      }
                      className="w-full inline-flex cursor-pointer items-center justify-center gap-4 bg-[#302D28] px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-[#181614] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#302D28] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <span
                            className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"
                            aria-hidden="true"
                          />

                          <span>
                            Enviando…
                          </span>
                        </>
                      ) : (
                        <>
                          <span>
                            Solicitar consulta
                          </span>

                          <Send
                            className="h-4 w-4"
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};