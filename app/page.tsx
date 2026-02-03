import Image from "next/image";

function Icon({ id, className }: { id: string; className?: string }) {
  return (
    <svg className={className} aria-hidden>
      <use href={`/openclaw-landing/icons.svg#${id}`} />
    </svg>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-700 shadow-sm fade-up delay-2">
      {children}
    </span>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-neutral-950">
      {/* Apple-ish background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-zinc-50" />
        <div className="absolute left-1/2 top-[-240px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-200/35 blur-3xl" />
        <div className="absolute left-[20%] top-[240px] h-[420px] w-[420px] rounded-full bg-emerald-200/25 blur-3xl" />
      </div>

      <main className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-20">
        {/* Top bar */}
        <div className="flex items-center justify-between fade-up delay-1">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-200 bg-white shadow-sm">
              <Icon id="icon-spark" className="h-5 w-5 text-neutral-900" />
            </div>
            <div className="text-sm font-medium text-neutral-900">openclaw-landing</div>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <Pill>
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              built through WhatsApp
            </Pill>
            <Pill>
              <Icon id="icon-server" className="h-4 w-4 text-neutral-900" />
              reliability first
            </Pill>
          </div>
        </div>

        {/* Hero */}
        <section className="mt-14 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-6 fade-up delay-2">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Kelly Navarro
              <span className="block text-2xl font-medium tracking-tight text-neutral-600 sm:text-3xl">
                Site Reliability Engineer
              </span>
            </h1>

            <p className="max-w-xl text-lg leading-7 text-neutral-600">
              SRE with 7+ years running large-scale game and web infrastructure across AWS, GCP,
              and Azure. I build automation, observability, and incident-ready systems for
              world-class launches.
            </p>

            <div className="flex flex-wrap gap-2 text-sm text-neutral-600">
              <span className="rounded-full border border-neutral-200 bg-white px-3 py-1 shadow-sm">
                Sony (Concord)
              </span>
              <span className="rounded-full border border-neutral-200 bg-white px-3 py-1 shadow-sm">
                PAYDAY 3
              </span>
              <span className="rounded-full border border-neutral-200 bg-white px-3 py-1 shadow-sm">
                Freelancer.com
              </span>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <Pill>
                <Icon id="icon-controller" className="h-4 w-4 text-neutral-900" />
                game-infra mindset
              </Pill>
              <Pill>
                <span className="font-mono text-[11px] text-neutral-500">99.99%</span>
                <span className="text-neutral-700">uptime</span>
              </Pill>
              <Pill>
                <span className="font-mono text-[11px] text-neutral-500">1M</span>
                <span className="text-neutral-700">CCU-ready</span>
              </Pill>
              <Pill>
                <span className="font-mono text-[11px] text-neutral-500">MTTR</span>
                <span className="text-neutral-700">&lt; 10m</span>
              </Pill>
              <Pill>
                <span className="text-neutral-700">CKA</span>
                <span className="text-neutral-500">(2022)</span>
              </Pill>
            </div>

            <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:items-center">
              <a
                className="inline-flex h-11 items-center justify-center rounded-full bg-neutral-900 px-5 text-sm font-medium text-white shadow-sm transition hover:bg-neutral-800"
                href="#work"
              >
                See highlights
              </a>
              <a
                className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-200 bg-white px-5 text-sm font-medium text-neutral-900 shadow-sm transition hover:bg-neutral-50"
                href="#contact"
              >
                Say hi
              </a>
            </div>

            <ul className="space-y-2 text-sm leading-6 text-neutral-600">
              <li>Led SRE teams shipping global multiplayer infrastructure (up to 1M CCU capacity).</li>
              <li>Launch readiness + incident response for PAYDAY 3 (220k peak CCU at launch).</li>
              <li>Built multi-cloud billing pipelines (GCP/Azure) cutting reconciliation time by 80%.</li>
            </ul>
          </div>

          {/* Avatar */}
          <div className="lg:justify-self-end fade-up delay-3">
            <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
              <div className="absolute inset-0 bg-gradient-to-b from-white/70 to-transparent" />
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-medium text-neutral-500">avatar (animoji-ish)</div>
                  <div className="text-xs text-neutral-400">v2</div>
                </div>
                <div className="mt-4">
                  <Image
                    src="/openclaw-landing/avatar-animoji.svg"
                    alt="Animoji-style avatar"
                    width={640}
                    height={640}
                    priority
                    className="h-auto w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Work cards */}
        <section id="work" className="mt-16 fade-up delay-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm card-hover">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Icon id="icon-server" className="h-5 w-5 text-neutral-900" />
                Reliability
              </div>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                SLOs, runbooks, chaos drills, and incident response under real launch pressure.
              </p>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm card-hover">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Icon id="icon-controller" className="h-5 w-5 text-neutral-900" />
                Performance
              </div>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Load testing (K6), dashboards (Prometheus/Grafana), and cost/perf wins across clouds.
              </p>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm card-hover">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Icon id="icon-spark" className="h-5 w-5 text-neutral-900" />
                Shipping
              </div>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Automation-first delivery: Terraform/Helm/ArgoCD + GitHub Actions/Jenkins.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mt-16 fade-up delay-5">
          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold tracking-tight">Contact</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
              For now this is a static page. Next step: add links (GitHub, LinkedIn), a projects
              section, and maybe a tiny “patch notes” feed.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Pill>
                <span className="text-neutral-500">site:</span>
                <span className="text-neutral-900">gabrnavarro.github.io/openclaw-landing</span>
              </Pill>
              <Pill>
                <span className="text-neutral-500">stack:</span>
                <span className="text-neutral-900">Next.js (static export)</span>
              </Pill>
            </div>
          </div>
        </section>

        <footer className="mt-14 pb-4 text-xs text-neutral-400">
          {new Date().getFullYear()} · built with OpenClaw · apple-ish, game-ish
        </footer>
      </main>
    </div>
  );
}
