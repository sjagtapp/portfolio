/**
 * Fixed page backdrop: a faint grid that fades out toward the bottom, and
 * slow-drifting blue glows with a hint of warm light at one edge.
 * Pure CSS, so it costs nothing on the main thread.
 */
export function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_40%,transparent_100%)]" />
      <div className="animate-drift absolute -left-[10%] -top-[15%] h-[75vh] w-[75vh] rounded-full bg-[radial-gradient(circle,rgb(var(--glow)/0.28),rgb(var(--glow)/0.08)_45%,transparent_68%)]" />
      <div className="animate-drift absolute left-[18%] top-[22%] h-[30vh] w-[30vh] rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.06),transparent_65%)]" />
      <div className="animate-drift-reverse absolute -right-[20%] top-[35%] h-[85vh] w-[85vh] rounded-full bg-[radial-gradient(circle,rgb(var(--glow)/0.14),transparent_65%)]" />
    </div>
  );
}
