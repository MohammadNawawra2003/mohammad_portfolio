"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, Send } from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/validations";
import { profile } from "@/data/profile";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(values: ContactInput) {
    setStatus("submitting");
    setServerError(null);
    try {
      // Static host — compose the message and hand off to the visitor's mail client.
      const subject = encodeURIComponent(`Portfolio enquiry from ${values.name}`);
      const body = encodeURIComponent(`${values.message}\n\nFrom ${values.name} (${values.email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;

      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      {/* honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px]"
        {...register("company")}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="name" label="Name" error={errors.name?.message}>
          <Input
            placeholder="Your name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            autoComplete="name"
            {...register("name")}
          />
        </Field>
        <Field name="email" label="Email" error={errors.email?.message}>
          <Input
            type="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            autoComplete="email"
            {...register("email")}
          />
        </Field>
      </div>

      <Field name="message" label="Message" error={errors.message?.message}>
        <Textarea
          placeholder="Tell me about your project or opportunity…"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          {...register("message")}
        />
      </Field>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={status === "submitting"} className="min-w-[160px]">
          <AnimatePresence mode="wait" initial={false}>
            {status === "submitting" ? (
              <motion.span key="loading" className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" /> Sending…
              </motion.span>
            ) : status === "success" ? (
              <motion.span key="done" className="flex items-center gap-2">
                <Check className="size-4" /> Sent
              </motion.span>
            ) : (
              <motion.span key="idle" className="flex items-center gap-2">
                <Send className="size-4" /> Send message
              </motion.span>
            )}
          </AnimatePresence>
        </Button>

        <p aria-live="polite" className="text-sm">
          {status === "success" ? (
            <span className="text-success">Thanks, I&apos;ll be in touch soon.</span>
          ) : status === "error" ? (
            <span className="text-danger">{serverError}</span>
          ) : null}
        </p>
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  error,
  children,
}: {
  name: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-text">{label}</span>
      {children}
      {error ? (
        <span id={`${name}-error`} role="alert" className="text-xs text-danger">
          {error}
        </span>
      ) : null}
    </label>
  );
}
