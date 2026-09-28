import { ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[70vh] flex-col items-start justify-center pt-28 pb-20">
      <p className="font-mono text-[13px] text-accent-ink">
        <span className="text-ink-subtle">{"//"}</span> error 404
      </p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">This page doesn&apos;t exist</h1>
      <p className="mt-4 max-w-md text-lg text-ink-muted">It may have moved, or the link was mistyped.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href="/">
          <Home size={16} aria-hidden="true" /> Back to home
        </Button>
        <Button href="/#contact" variant="secondary">
          Contact me <ArrowRight size={16} aria-hidden="true" />
        </Button>
      </div>
    </section>
  );
}
