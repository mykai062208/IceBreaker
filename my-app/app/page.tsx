const EVENTS = [
  "SessionStart",
  "UserPromptSubmit",
  "PreToolUse",
  "PostToolUse",
  "Notification",
  "SubagentStop",
  "PreCompact",
  "Stop",
  "SessionEnd",
];

const FEATURES = [
  {
    tag: "GUARD",
    title: "Block the scary stuff",
    body: "Stop rm -rf, force pushes, and edits to .env before they happen. A PreToolUse hook exits non-zero and the agent never gets the chance.",
    color: "bg-flame",
  },
  {
    tag: "POLISH",
    title: "Format on every write",
    body: "Run Prettier, Black, or gofmt after each edit. Your diffs stay clean without spending a single token asking for it.",
    color: "bg-lime",
  },
  {
    tag: "PING",
    title: "Know when it needs you",
    body: "Get a desktop or phone notification the moment the agent is blocked or done, so you can stop watching the terminal.",
    color: "bg-sky",
  },
  {
    tag: "LOG",
    title: "Keep an audit trail",
    body: "Append every tool call to a file or ship it to your observability stack. Replay exactly what the agent did and when.",
    color: "bg-violet",
  },
];

const HOOKS = [
  {
    name: "block-destructive-bash",
    event: "PreToolUse",
    desc: "Rejects rm -rf, git push --force, and DROP TABLE.",
    color: "bg-flame",
  },
  {
    name: "auto-format",
    event: "PostToolUse",
    desc: "Runs your project formatter on every edited file.",
    color: "bg-lime",
  },
  {
    name: "notify-on-stop",
    event: "Stop",
    desc: "Sends a desktop notification when the agent finishes.",
    color: "bg-sky",
  },
  {
    name: "protect-secrets",
    event: "PreToolUse",
    desc: "Denies reads and writes to .env and credential files.",
    color: "bg-violet",
  },
  {
    name: "inject-git-context",
    event: "SessionStart",
    desc: "Loads branch, recent commits, and open TODOs up front.",
    color: "bg-lime",
  },
  {
    name: "tool-call-ledger",
    event: "PostToolUse",
    desc: "Writes a JSONL log of every tool call with timings.",
    color: "bg-flame",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Find",
    body: "Browse hooks by event, language, or what they protect. Every listing shows the exact script and what it can touch.",
  },
  {
    n: "02",
    title: "Install",
    body: "One command merges the hook into your settings.json. No copy-pasting JSON, no clobbered config.",
  },
  {
    n: "03",
    title: "Trust",
    body: "Read the source before it runs. Pin a version, diff updates, and roll back with a single command.",
  },
];

const FAQS = [
  {
    q: "What exactly is a hook?",
    a: "A hook is a shell command that Claude Code runs at a set point in its lifecycle, such as before a tool call, after a file edit, or when the agent stops. Because it is ordinary code, it runs every time instead of depending on the model remembering an instruction.",
  },
  {
    q: "How does a hook block an action?",
    a: "A PreToolUse hook receives the pending tool call as JSON on stdin. If it exits with code 2, the call is blocked and the hook's stderr is fed back to the agent so it can adjust.",
  },
  {
    q: "Are hooks safe to install?",
    a: "Hooks run with your user permissions, so treat them like any script you download. Read the source before installing, pin a version, and review diffs before updating.",
  },
  {
    q: "Where do installed hooks live?",
    a: "In your Claude Code settings: .claude/settings.json for a single project, or ~/.claude/settings.json for every project. Installing a hook merges an entry into that file, so you can always edit or remove it by hand.",
  },
  {
    q: "Can I write and share my own?",
    a: "Yes. A hook is a script plus a small manifest naming the event and matcher it listens to. Publish it so others can browse, read, and install it.",
  },
];

function Sticker({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-block border-2 border-ink px-2 py-0.5 text-xs font-bold uppercase tracking-wider ${className}`}
    >
      {children}
    </span>
  );
}

export default function Home() {
  return (
    <>
      {/* NAV */}
      <header className="border-b-[3px] border-ink bg-paper">
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4"
        >
          <a href="#top" className="flex items-center gap-2">
            <span
              aria-hidden
              className="grid h-9 w-9 place-items-center border-[3px] border-ink bg-lime font-display text-xl font-extrabold shadow-hard-sm"
            >
              H
            </span>
            <span className="font-display text-2xl font-extrabold tracking-tight">
              HooksHub
            </span>
          </a>
          <div className="hidden items-center gap-8 text-sm font-bold sm:flex">
            <a href="#features" className="underline-offset-4 hover:underline">
              Why hooks
            </a>
            <a href="#browse" className="underline-offset-4 hover:underline">
              Browse
            </a>
            <a href="#how" className="underline-offset-4 hover:underline">
              How it works
            </a>
            <a href="#faq" className="underline-offset-4 hover:underline">
              FAQ
            </a>
          </div>
          <a
            href="#install"
            className="hard press bg-ink px-4 py-2 text-sm font-bold text-paper shadow-hard-sm"
          >
            Get started
          </a>
        </nav>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-16 lg:grid-cols-[1.15fr_1fr] lg:pt-24">
          <div className="min-w-0">
            <Sticker className="-rotate-2 bg-lime">
              Hooks for Claude Code
            </Sticker>
            <h1 className="mt-6 font-display text-6xl font-extrabold leading-[0.92] tracking-tighter sm:text-7xl lg:text-[5.5rem]">
              Catch your agent{" "}
              <span className="relative inline-block">
                <span className="relative z-10">mid&#8209;swing.</span>
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-1 z-0 h-4 -rotate-1 bg-flame sm:h-6"
                />
              </span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed">
              HooksHub is the shared shelf of shell hooks that run before and
              after every tool call. Block the dangerous, automate the boring,
              and see everything your agent does.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#browse"
                className="hard press bg-lime px-6 py-3 text-base font-bold"
              >
                Browse hooks →
              </a>
              <a
                href="#install"
                className="hard press bg-paper px-6 py-3 text-base font-bold"
              >
                Install the CLI
              </a>
            </div>
          </div>

          {/* Terminal card */}
          <div className="relative min-w-0">
            <div
              aria-hidden
              className="absolute right-0 sm:-right-3 -top-5 z-10 rotate-6 border-[3px] border-ink bg-flame px-3 py-1 font-display text-lg font-extrabold shadow-hard-sm"
            >
              exit 2 = blocked
            </div>
            <div className="hard overflow-hidden bg-ink text-paper">
              <div className="flex items-center gap-2 border-b-[3px] border-paper/20 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-flame" />
                <span className="h-3 w-3 rounded-full bg-lime" />
                <span className="h-3 w-3 rounded-full bg-sky" />
                <span className="ml-3 text-xs text-paper/60">
                  .claude/settings.json
                </span>
              </div>
              <pre className="overflow-x-auto p-5 text-[13px] leading-relaxed sm:text-sm">
                <code>
                  <span className="text-paper/50">{"{"}</span>
                  {"\n  "}
                  <span className="text-sky">&quot;hooks&quot;</span>
                  {": {"}
                  {"\n    "}
                  <span className="text-lime">&quot;PreToolUse&quot;</span>
                  {": [{"}
                  {"\n      "}
                  <span className="text-sky">&quot;matcher&quot;</span>
                  {": "}
                  <span className="text-flame">&quot;Bash&quot;</span>
                  {","}
                  {"\n      "}
                  <span className="text-sky">&quot;hooks&quot;</span>
                  {": [{"}
                  {"\n        "}
                  <span className="text-sky">&quot;type&quot;</span>
                  {": "}
                  <span className="text-flame">&quot;command&quot;</span>
                  {","}
                  {"\n        "}
                  <span className="text-sky">&quot;command&quot;</span>
                  {": "}
                  <span className="text-flame">
                    &quot;hookshub run block-destructive-bash&quot;
                  </span>
                  {"\n      }]"}
                  {"\n    }]"}
                  {"\n  }"}
                  {"\n}"}
                  <span className="cursor ml-1 inline-block h-4 w-2 translate-y-0.5 bg-lime" />
                </code>
              </pre>
            </div>
          </div>
        </section>

        {/* EVENT MARQUEE */}
        <section
          aria-label="Supported hook events"
          className="overflow-hidden border-y-[3px] border-ink bg-lime py-4"
        >
          <div className="marquee-track flex w-max gap-10 whitespace-nowrap font-display text-2xl font-extrabold uppercase">
            {[...EVENTS, ...EVENTS].map((e, i) => (
              <span
                key={i}
                aria-hidden={i >= EVENTS.length}
                className="flex items-center gap-10"
              >
                {e}
                <span aria-hidden>✱</span>
              </span>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="mx-auto max-w-6xl px-5 py-24">
          <h2 className="max-w-2xl font-display text-5xl font-extrabold leading-none tracking-tighter sm:text-6xl">
            Prompts ask nicely. Hooks <em className="not-italic underline decoration-flame decoration-[6px] underline-offset-4">always run.</em>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed">
            A hook is a shell command tied to a moment in the agent&apos;s
            lifecycle. It is deterministic code, not a suggestion buried in a
            prompt.
          </p>
          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {FEATURES.map((f, i) => (
              <article
                key={f.tag}
                className={`hard bg-paper p-7 ${i % 2 ? "sm:translate-y-6" : ""}`}
              >
                <Sticker className={f.color}>{f.tag}</Sticker>
                <h3 className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight">
                  {f.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed">{f.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* BROWSE */}
        <section
          id="browse"
          className="border-y-[3px] border-ink bg-violet py-24"
        >
          <div className="mx-auto max-w-6xl px-5">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-5xl font-extrabold leading-none tracking-tighter text-paper sm:text-6xl">
                Fresh off the shelf
              </h2>
              <a
                href="#install"
                className="hard press bg-paper px-5 py-2 text-sm font-bold"
              >
                See all hooks →
              </a>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {HOOKS.map((h) => (
                <article key={h.name} className="hard press bg-paper p-5">
                  <Sticker className={h.color}>{h.event}</Sticker>
                  <h3 className="mt-4 break-words text-lg font-bold">
                    {h.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed">{h.desc}</p>
                  <code className="mt-4 block overflow-x-auto border-2 border-ink bg-ink px-3 py-2 text-xs text-lime">
                    hookshub add {h.name}
                  </code>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how" className="mx-auto max-w-6xl px-5 py-24">
          <h2 className="font-display text-5xl font-extrabold leading-none tracking-tighter sm:text-6xl">
            Three steps. No yak shaving.
          </h2>
          <ol className="mt-14 grid gap-8 md:grid-cols-3">
            {STEPS.map((s) => (
              <li key={s.n} className="relative border-t-[6px] border-ink pt-6">
                <span className="font-display text-7xl font-extrabold leading-none text-flame">
                  {s.n}
                </span>
                <h3 className="mt-3 font-display text-3xl font-extrabold tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          className="border-y-[3px] border-ink bg-sky py-24"
        >
          <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[1fr_1.6fr]">
            <div>
              <Sticker className="rotate-2 bg-paper">FAQ</Sticker>
              <h2 className="mt-5 font-display text-5xl font-extrabold leading-none tracking-tighter sm:text-6xl">
                Questions, answered.
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed">
                Short version: hooks are plain scripts you can read, run, and
                remove.
              </p>
            </div>
            <div className="min-w-0 space-y-5">
              {FAQS.map((f) => (
                <details key={f.q} className="hard group bg-paper">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-display text-xl font-extrabold tracking-tight marker:content-none [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span
                      aria-hidden
                      className="grid h-8 w-8 shrink-0 place-items-center border-[3px] border-ink bg-lime text-lg leading-none"
                    >
                      <span className="transition-transform group-open:rotate-45">
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="border-t-[3px] border-ink px-5 py-4 text-sm leading-relaxed">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* INSTALL / CTA */}
        <div className="h-24" aria-hidden />
        <section id="install" className="px-5 pb-24">
          <div className="hard mx-auto max-w-4xl bg-flame p-8 sm:p-14">
            <h2 className="font-display text-5xl font-extrabold leading-none tracking-tighter sm:text-6xl">
              Put a hook in it.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed">
              Install the CLI and add your first guard in under a minute.
            </p>
            <div className="mt-8 border-[3px] border-ink bg-ink p-4 text-sm text-paper sm:text-base">
              <p className="overflow-x-auto whitespace-nowrap">
                <span className="text-lime">$</span> npm i -g hookshub
              </p>
              <p className="mt-2 overflow-x-auto whitespace-nowrap">
                <span className="text-lime">$</span> hookshub add
                block-destructive-bash
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#browse"
                className="hard press bg-lime px-6 py-3 font-bold"
              >
                Browse hooks →
              </a>
              <a
                href="#features"
                className="hard press bg-paper px-6 py-3 font-bold"
              >
                Why hooks?
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t-[3px] border-ink bg-ink text-paper">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 text-sm">
          <span className="font-display text-xl font-extrabold">HooksHub</span>
          <span className="text-paper/60">
            Shell hooks run with your permissions. Read before you install.
          </span>
        </div>
      </footer>
    </>
  );
}
