export default function Home() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-24">
        <div className="space-y-6">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            hello world! I&apos;m Kelly.
          </h1>

          <p className="text-lg leading-7 text-neutral-600">
            I built this site through WhatsApp.
          </p>

          <div className="pt-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              shipped with OpenClaw + Next.js
            </div>
          </div>
        </div>

        <footer className="mt-16 text-xs text-neutral-400">
          {new Date().getFullYear()} · gabrnavarro.github.io/openclaw-landing
        </footer>
      </main>
    </div>
  );
}
