'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'

type FormData = {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

type FormErrors = {
  name?: string
  email?: string
  phone?: string
  subject?: string
  message?: string
}

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState('')

  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})

  // -----------------------------------------
  // Input styles
  // -----------------------------------------

  const inputClass =
    'w-full bg-brand-dark-3 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm focus:outline-none focus:border-brand-red transition-colors'

  const errorInputClass =
    'w-full bg-brand-dark-3 border border-red-500 text-white placeholder-white/20 px-4 py-3 text-sm focus:outline-none focus:border-red-500 transition-colors'

  // -----------------------------------------
  // Validate form
  // -----------------------------------------

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {}

    // -----------------------------------------
    // Name validation
    // -----------------------------------------

    const name = form.name.trim()

    if (!name) {
      newErrors.name = 'Name is required.'
    } else if (name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters.'
    } else if (name.length > 50) {
      newErrors.name = 'Name must not exceed 50 characters.'
    } else if (!/^[a-zA-Z\s.'-]+$/.test(name)) {
      newErrors.name =
        'Name can contain only letters, spaces, dots and hyphens.'
    }

    // -----------------------------------------
    // Email validation
    // -----------------------------------------

    const email = form.email.trim()

    if (!email) {
      newErrors.email = 'Email is required.'
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
    ) {
      newErrors.email = 'Please enter a valid email address.'
    }

    // -----------------------------------------
    // Phone validation
    // Supports Indian + international numbers
    // -----------------------------------------

    const phone = form.phone.trim()

    if (phone) {
      // Remove spaces, hyphens and brackets
      const cleanPhone = phone.replace(/[\s\-()]/g, '')

      // Optional + followed by 7-15 digits
      if (!/^\+?\d{7,15}$/.test(cleanPhone)) {
        newErrors.phone =
          'Please enter a valid international phone number.'
      }
    }

    // -----------------------------------------
    // Subject validation
    // -----------------------------------------

    const subject = form.subject.trim()

    if (!subject) {
      newErrors.subject = 'Subject is required.'
    } else if (subject.length < 3) {
      newErrors.subject =
        'Subject must be at least 3 characters.'
    } else if (subject.length > 100) {
      newErrors.subject =
        'Subject must not exceed 100 characters.'
    }

    // -----------------------------------------
    // Message validation
    // -----------------------------------------

    const message = form.message.trim()

    if (!message) {
      newErrors.message = 'Message is required.'
    } else if (message.length < 10) {
      newErrors.message =
        'Message must be at least 10 characters.'
    } else if (message.length > 1000) {
      newErrors.message =
        'Message must not exceed 1000 characters.'
    }

    return newErrors
  }

  // -----------------------------------------
  // Handle input change
  // -----------------------------------------

  const handleChange = (
    field: keyof FormData,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }))

    // Clear error when user starts editing
    if (errors[field]) {
      setErrors((previous) => ({
        ...previous,
        [field]: undefined,
      }))
    }

    // Clear API error when user edits form
    if (apiError) {
      setApiError('')
    }
  }

  // -----------------------------------------
  // Handle submit
  // -----------------------------------------

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    setApiError('')

    // Validate frontend form
    const validationErrors = validateForm()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setIsSubmitting(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contact`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: form.name.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
            subject: form.subject.trim(),
            message: form.message.trim(),
          }),
        }
      )

      if (!response.ok) {
        throw new Error('Failed to send message.')
      }

      // Success
      setSubmitted(true)

      // Clear form
      setForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      })
    } catch (error) {
      console.error('Contact form error:', error)

      setApiError(
        'Something went wrong while sending your message. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* =========================================
          HERO SECTION
      ========================================== */}

      <section className="relative pt-32 pb-20 bg-brand-dark overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30" />

        <div className="container-custom relative z-10">
          <motion.p
            className="eyebrow mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Get In Touch
          </motion.p>

          <motion.h1
            className="font-display font-black text-[clamp(3rem,7vw,6rem)] uppercase leading-[0.9] text-white"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Talk to a
            <br />

            <span className="text-brand-red">
              Logistics Expert
            </span>
          </motion.h1>
        </div>
      </section>

      {/* =========================================
          CONTACT SECTION
      ========================================== */}

      <section className="section-padding bg-brand-dark-2">
        <div className="container-custom">

          {/* =========================================
              FORM
          ========================================== */}

          <div>
            {submitted ? (
              /* =====================================
                 SUCCESS MESSAGE
              ====================================== */

              <div className="glass border border-brand-red/30 p-12 text-center">

                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-brand-red/30">
                  <Send
                    size={22}
                    className="text-brand-red"
                  />
                </div>

                <p className="font-display font-bold text-white text-2xl uppercase mb-2">
                  Message Sent!
                </p>

                <p className="text-white/50">
                  Thank you for contacting us. We'll respond within
                  24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-4"
              >

                <p className="eyebrow mb-4">
                  Send a Message
                </p>

                {/* =====================================
                    API ERROR
                ====================================== */}

                {apiError && (
                  <div className="border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {apiError}
                  </div>
                )}

                {/* =====================================
                    NAME + EMAIL
                ====================================== */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {/* Name */}

                  <div>
                    <input
                      type="text"
                      placeholder="Your Name *"
                      value={form.name}
                      onChange={(e) =>
                        handleChange(
                          'name',
                          e.target.value
                        )
                      }
                      maxLength={50}
                      className={
                        errors.name
                          ? errorInputClass
                          : inputClass
                      }
                    />

                    {errors.name && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}

                  <div>
                    <input
                      type="email"
                      placeholder="Email *"
                      value={form.email}
                      onChange={(e) =>
                        handleChange(
                          'email',
                          e.target.value
                        )
                      }
                      maxLength={100}
                      className={
                        errors.email
                          ? errorInputClass
                          : inputClass
                      }
                    />

                    {errors.email && (
                      <p className="mt-1 text-xs text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* =====================================
                    PHONE
                ====================================== */}

                <div>
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={(e) =>
                      handleChange(
                        'phone',
                        e.target.value
                      )
                    }
                    maxLength={20}
                    className={
                      errors.phone
                        ? errorInputClass
                        : inputClass
                    }
                  />

                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* =====================================
                    SUBJECT
                ====================================== */}

                <div>
                  <input
                    type="text"
                    placeholder="Subject *"
                    value={form.subject}
                    onChange={(e) =>
                      handleChange(
                        'subject',
                        e.target.value
                      )
                    }
                    maxLength={100}
                    className={
                      errors.subject
                        ? errorInputClass
                        : inputClass
                    }
                  />

                  {errors.subject && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* =====================================
                    MESSAGE
                ====================================== */}

                <div>
                  <textarea
                    rows={5}
                    placeholder="Your Message *"
                    value={form.message}
                    onChange={(e) =>
                      handleChange(
                        'message',
                        e.target.value
                      )
                    }
                    maxLength={1000}
                    className={
                      errors.message
                        ? errorInputClass
                        : inputClass
                    }
                  />

                  <div className="flex justify-between mt-1">

                    {errors.message ? (
                      <p className="text-xs text-red-400">
                        {errors.message}
                      </p>
                    ) : (
                      <span />
                    )}

                    <p className="text-[10px] text-white/30">
                      {form.message.length}/1000
                    </p>
                  </div>
                </div>

                {/* =====================================
                    SUBMIT BUTTON
                ====================================== */}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <Send size={14} />
                    </>
                  )}
                </button>

              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}