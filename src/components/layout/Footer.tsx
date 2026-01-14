import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-border border-t py-16">
      <div className="container-editorial">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-6">
            <Link href="/" className="mb-4 inline-block">
              <span className="font-mono text-sm tracking-wider uppercase">
                Nope<span className="text-primary">→</span>Web
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm text-sm">
              The bilingual platform for mastering modern full-stack
              development. From &quot;I don&apos;t know where to start&quot; to
              building production apps.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <span className="label-mono mb-4 block">Navigation</span>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#features"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#roadmap"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-3">
            <span className="label-mono mb-4 block">Legal</span>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-border mt-16 border-t pt-8">
          <p className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
            © {new Date().getFullYear()} KamkmGamer
          </p>
        </div>
      </div>
    </footer>
  );
}
