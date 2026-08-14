'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'

const serviceOptions = [
  'Sea Freight',
  'Air Freight',
  'Road Transport',
  'Customs Clearance',
  'Import Services',
  'Export Services',
  'Warehousing',
  'Door-to-Door Logistics',
  'Supply Chain Solutions',
]

type FormData = {
  name: string
  company: string
  email: string
  phone: string
  service: string
  origin: string
  destination: string
  cargo: string
  message: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

export function QuoteSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const [form, setForm] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    origin: '',
    destination: '',
    cargo: '',
    message: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})

  // ---------------------------------------------------------
  // Validation function
  // ---------------------------------------------------------
  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {}

    // Remove extra spaces from beginning/end
    const name = form.name.trim()
    const company = form.company.trim()
    const email = form.email.trim()
    const phone = form.phone.trim()
    const service = form.service.trim()
    const origin = form.origin.trim()
    const destination = form.destination.trim()
    const cargo = form.cargo.trim()
    const message = form.message.trim()

    // ---------------------------------------------------------
    // Full Name
    // ---------------------------------------------------------
    if (!name) {
      newErrors.name = 'Full name is required.'
    } else if (name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters.'
    } else if (name.length > 60) {
      newErrors.name = 'Name must be less than 60 characters.'
    } else if (!/^[a-zA-Z\s.'-]+$/.test(name)) {
      newErrors.name = 'Please enter a valid name.'
    }

    // ---------------------------------------------------------
    // Company
    // ---------------------------------------------------------
    if (company.length > 100) {
      newErrors.company = 'Company name is too long.'
    }

    // ---------------------------------------------------------
    // Email
    // ---------------------------------------------------------
    const emailRegex =
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

    if (!email) {
      newErrors.email = 'Email address is required.'
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address.'
    } else if (email.length > 120) {
      newErrors.email = 'Email address is too long.'
    }

    // ---------------------------------------------------------
    // Phone
    // ---------------------------------------------------------
    if (phone) {
      // Allows:
      // +919876543210
      // 919876543210
      // 9876543210
      // +91 9876543210
      // 09876543210
      const cleanPhone = phone.replace(/[\s()-]/g, '')

      if (!/^\+?\d{10,15}$/.test(cleanPhone)) {
        newErrors.phone =
          'Please enter a valid phone number.'
      }
    }

    // ---------------------------------------------------------
    // Service
    // ---------------------------------------------------------
    if (!service) {
      newErrors.service = 'Please select a service.'
    }

    // ---------------------------------------------------------
    // Origin
    // ---------------------------------------------------------
    if (!origin) {
      newErrors.origin = 'Origin is required.'
    } else if (origin.length < 2) {
      newErrors.origin =
        'Please enter a valid origin.'
    } else if (origin.length > 100) {
      newErrors.origin =
        'Origin must be less than 100 characters.'
    }

    // ---------------------------------------------------------
    // Destination
    // ---------------------------------------------------------
    if (!destination) {
      newErrors.destination =
        'Destination is required.'
    } else if (destination.length < 2) {
      newErrors.destination =
        'Please enter a valid destination.'
    } else if (destination.length > 100) {
      newErrors.destination =
        'Destination must be less than 100 characters.'
    }

    // ---------------------------------------------------------
    // Cargo
    // ---------------------------------------------------------
    if (!cargo) {
      newErrors.cargo =
        'Please enter a cargo description or HS code.'
    } else if (cargo.length < 2) {
      newErrors.cargo =
        'Cargo description is too short.'
    } else if (cargo.length > 200) {
      newErrors.cargo =
        'Cargo description must be less than 200 characters.'
    }

    // ---------------------------------------------------------
    // Additional Message
    // ---------------------------------------------------------
    if (message.length > 1000) {
      newErrors.message =
        'Additional requirements must be less than 1000 characters.'
    }

    return newErrors
  }

  // ---------------------------------------------------------
  // Update form field
  // ---------------------------------------------------------
  const updateField = (
    field: keyof FormData,
    value: string
  ) => {
    setForm(prev => ({
      ...prev,
      [field]: value,
    }))

    // Remove error when user starts correcting the field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }))
    }

    // Remove API error when user edits form
    if (apiError) {
      setApiError('')
    }
  }

  // ---------------------------------------------------------
  // Submit form
  // ---------------------------------------------------------
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    // Clear previous API error
    setApiError('')

    // Validate all fields
    const validationErrors = validateForm()

    setErrors(validationErrors)

    // Stop submission if validation fails
    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setLoading(true)

    try {
      const payload = {
        ...form,

        // Trim values before sending to backend
        name: form.name.trim(),
        company: form.company.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        service: form.service.trim(),
        origin: form.origin.trim(),
        destination: form.destination.trim(),
        cargo: form.cargo.trim(),
        message: form.message.trim(),

        // Backend-friendly names
        serviceType: form.service.trim(),
        cargoType: form.cargo.trim(),
        additionalInfo: form.message.trim(),
      }

      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL

      // Make sure API URL exists
      if (!apiUrl) {
        throw new Error(
          'API URL is not configured.'
        )
      }

      const res = await fetch(
        `${apiUrl}/api/quotes`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      )

      // Try to read backend response
      let data = null

      try {
        data = await res.json()
      } catch {
        // Backend may return an empty response
      }

      // API returned an error
      if (!res.ok) {
        throw new Error(
          data?.message ||
            'Unable to submit your quote request. Please try again.'
        )
      }

      // Success
      setSubmitted(true)

    } catch (error) {
      console.error(
        'Quote submission error:',
        error
      )

      setApiError(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  // ---------------------------------------------------------
  // Common input classes
  // ---------------------------------------------------------
  const inputClass =
    'w-full bg-brand-dark-3 border border-white/10 text-white placeholder-white/20 px-4 py-3 text-sm font-body focus:outline-none focus:border-brand-red transition-colors'

  // ---------------------------------------------------------
  // Error input class
  // ---------------------------------------------------------
  const getInputClass = (
    field: keyof FormData
  ) => {
    return `${inputClass} ${
      errors[field]
        ? 'border-red-500 focus:border-red-500'
        : ''
    }`
  }

  // ---------------------------------------------------------
  // Error message component
  // ---------------------------------------------------------
  const ErrorMessage = ({
    field,
  }: {
    field: keyof FormData
  }) => {
    if (!errors[field]) return null

    return (
      <p className="flex items-center gap-1 mt-1.5 text-red-400 text-xs">
        <AlertCircle size={12} />
        {errors[field]}
      </p>
    )
  }

  return (
    <section
      ref={ref}
      id="quote"
      className="section-padding bg-brand-dark relative overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Red vertical line */}
      <div className="absolute left-0 top-0 w-px h-full bg-brand-red" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* =================================================
              LEFT SIDE
          ================================================= */}
          <div>
            <motion.p
              className="eyebrow mb-4"
              initial={{ opacity: 0 }}
              animate={
                inView
                  ? { opacity: 1 }
                  : {}
              }
            >
              Get Started
            </motion.p>

            <motion.h2
              className="font-display font-black text-[clamp(2.5rem,4vw,3.8rem)] uppercase leading-[0.95] text-white mb-6"
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={
                inView
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {}
              }
              transition={{
                delay: 0.1,
              }}
            >
              Request a
              <br />
              <span className="text-brand-red">
                Quote
              </span>
            </motion.h2>

            <motion.p
              className="text-white/50 leading-relaxed mb-8"
              initial={{ opacity: 0 }}
              animate={
                inView
                  ? { opacity: 1 }
                  : {}
              }
              transition={{
                delay: 0.2,
              }}
            >
              Tell us about your shipment and
              we'll get back within with a
              competitive rate and logistics plan.
            </motion.p>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={
                inView
                  ? { opacity: 1 }
                  : {}
              }
              transition={{
                delay: 0.3,
              }}
            >
              {[
                {
                  title:
                    'Response within 2 hours',
                  desc:
                    'Fastest quote turnaround in the industry',
                },
                {
                  title: 'No obligation',
                  desc:
                    'Free quote with zero commitment required',
                },
                {
                  title:
                    'All-inclusive pricing',
                  desc:
                    'Origin charges, freight, destination, customs',
                },
              ].map(item => (
                <div
                  key={item.title}
                  className="flex items-start gap-3"
                >
                  <CheckCircle
                    size={16}
                    className="text-brand-red mt-0.5 shrink-0"
                  />

                  <div>
                    <p className="text-white font-medium text-sm">
                      {item.title}
                    </p>

                    <p className="text-white/40 text-xs">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* =================================================
              RIGHT SIDE — FORM
          ================================================= */}
          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            animate={
              inView
                ? {
                    opacity: 1,
                    x: 0,
                  }
                : {}
            }
            transition={{
              duration: 0.7,
              delay: 0.2,
            }}
          >

            {/* =================================================
                SUCCESS MESSAGE
            ================================================= */}
            {submitted ? (
              <div className="glass border border-brand-red/30 p-12 text-center">

                <CheckCircle
                  size={48}
                  className="text-brand-red mx-auto mb-4"
                />

                <h3 className="font-display font-bold text-white text-2xl uppercase mb-2">
                  Quote Received!
                </h3>

                <p className="text-white/50">
                  Our team will contact you
                  within 2 business hours.
                </p>

              </div>
            ) : (

              /* =================================================
                 FORM
              ================================================= */
              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-4"
              >

                {/* API Error */}
                {apiError && (
                  <div className="flex items-start gap-3 border border-red-500/30 bg-red-500/10 p-4 text-red-400 text-sm">
                    <AlertCircle
                      size={18}
                      className="shrink-0 mt-0.5"
                    />

                    <p>{apiError}</p>
                  </div>
                )}

                {/* =================================================
                    NAME + COMPANY
                ================================================= */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div>
                    <input
                      required
                      type="text"
                      maxLength={60}
                      placeholder="Full Name *"
                      value={form.name}
                      onChange={e =>
                        updateField(
                          'name',
                          e.target.value
                        )
                      }
                      className={getInputClass(
                        'name'
                      )}
                    />

                    <ErrorMessage field="name" />
                  </div>

                  <div>
                    <input
                      type="text"
                      maxLength={100}
                      placeholder="Company"
                      value={form.company}
                      onChange={e =>
                        updateField(
                          'company',
                          e.target.value
                        )
                      }
                      className={getInputClass(
                        'company'
                      )}
                    />

                    <ErrorMessage field="company" />
                  </div>

                </div>

                {/* =================================================
                    EMAIL + PHONE
                ================================================= */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div>
                    <input
                      required
                      type="email"
                      maxLength={120}
                      placeholder="Email Address *"
                      value={form.email}
                      onChange={e =>
                        updateField(
                          'email',
                          e.target.value
                        )
                      }
                      className={getInputClass(
                        'email'
                      )}
                    />

                    <ErrorMessage field="email" />
                  </div>

                  <div>
                    <input
                      type="tel"
                      maxLength={20}
                      placeholder="Phone Number"
                      value={form.phone}
                      onChange={e =>
                        updateField(
                          'phone',
                          e.target.value
                        )
                      }
                      className={getInputClass(
                        'phone'
                      )}
                    />

                    <ErrorMessage field="phone" />
                  </div>

                </div>

                {/* =================================================
                    SERVICE
                ================================================= */}
                <div>
                  <select
                    required
                    value={form.service}
                    onChange={e =>
                      updateField(
                        'service',
                        e.target.value
                      )
                    }
                    className={`${getInputClass(
                      'service'
                    )} appearance-none`}
                  >
                    <option value="">
                      Select Service *
                    </option>

                    {serviceOptions.map(
                      service => (
                        <option
                          key={service}
                          value={service}
                        >
                          {service}
                        </option>
                      )
                    )}
                  </select>

                  <ErrorMessage field="service" />
                </div>

                {/* =================================================
                    ORIGIN + DESTINATION
                ================================================= */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <div>
                    <input
                      type="text"
                      maxLength={100}
                      placeholder="Origin Port / City *"
                      value={form.origin}
                      onChange={e =>
                        updateField(
                          'origin',
                          e.target.value
                        )
                      }
                      className={getInputClass(
                        'origin'
                      )}
                    />

                    <ErrorMessage field="origin" />
                  </div>

                  <div>
                    <input
                      type="text"
                      maxLength={100}
                      placeholder="Destination *"
                      value={form.destination}
                      onChange={e =>
                        updateField(
                          'destination',
                          e.target.value
                        )
                      }
                      className={getInputClass(
                        'destination'
                      )}
                    />

                    <ErrorMessage
                      field="destination"
                    />
                  </div>

                </div>

                {/* =================================================
                    CARGO
                ================================================= */}
                <div>
                  <input
                    type="text"
                    maxLength={200}
                    placeholder="Cargo Description / HS Code *"
                    value={form.cargo}
                    onChange={e =>
                      updateField(
                        'cargo',
                        e.target.value
                      )
                    }
                    className={getInputClass(
                      'cargo'
                    )}
                  />

                  <ErrorMessage field="cargo" />
                </div>

                {/* =================================================
                    ADDITIONAL REQUIREMENTS
                ================================================= */}
                <div>
                  <textarea
                    rows={4}
                    maxLength={1000}
                    placeholder="Additional Requirements"
                    value={form.message}
                    onChange={e =>
                      updateField(
                        'message',
                        e.target.value
                      )
                    }
                    className={getInputClass(
                      'message'
                    )}
                  />

                  <div className="flex justify-between items-center mt-1.5">
                    <ErrorMessage field="message" />

                    {/* <span className="text-white/20 text-xs ml-auto">
                      {form.message.length}/1000
                    </span> */}
                  </div>
                </div>

                {/* =================================================
                    SUBMIT BUTTON
                ================================================= */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading
                    ? 'Submitting...'
                    : 'Submit Quote Request'}

                  {!loading && (
                    <Send size={14} />
                  )}
                </button>

              </form>
            )}

          </motion.div>
        </div>
      </div>
    </section>
  )
}