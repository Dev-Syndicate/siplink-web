import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Clock,
  Cpu,
  GraduationCap,
  Headset,
  HeartHandshake,
  Mail,
  MapPin,
  Network,
  Rocket,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

import { ClosingCta } from "@/components/site/closing-cta";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { careerDepartments, careerPillars } from "@/lib/company";
import { offices, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers — Build the Future of Business Communication | SipLink",
  description:
    "Join SipLink. Explore career opportunities in cloud communications, VoIP engineering, network operations, customer success, and enterprise sales.",
};

export default function CareersPage() {
  const operatingOffices = offices.filter((o) => o.kind === "operating");

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background via-muted/20 to-background py-16 sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-1/4 size-[500px] rounded-full bg-brand-to/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 left-1/4 size-[400px] rounded-full bg-brand-from/10 blur-3xl"
        />

        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="secondary"
              className="mb-4 gap-1.5 px-3 py-1 font-mono text-xs tracking-wider uppercase"
            >
              <Briefcase className="size-3.5 text-primary" />
              Careers at SipLink
            </Badge>

            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Build the Future of Business Communication
            </h1>

            <p className="mt-6 text-lg text-pretty text-muted-foreground sm:text-xl">
              At {site.name}, we are engineering technology that helps businesses
              connect faster and communicate better every day. We are looking for
              curious, driven, and collaborative people who want to solve real-world
              telecom challenges and help shape modern cloud voice.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-full shadow-md shadow-primary/20">
                <Link href="#functional-areas">
                  Explore Functional Areas
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link href="/about">Learn About Our Culture</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With SipLink */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">
            Why Join Us
          </span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Why work with SipLink?
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            We foster an environment that prizes ownership, high technical standards,
            and continuous personal development.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {careerPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Card key={pillar.title} className="border-border/80 bg-card">
                <CardHeader>
                  <span className="mb-3 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </span>
                  <CardTitle className="text-xl font-semibold">
                    {pillar.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed text-pretty">
                    {pillar.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Life at SipLink */}
      <section className="border-t border-border bg-muted/30 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">
                Culture & Values
              </span>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                Life at SipLink
              </h2>
              <div className="mt-6 space-y-4 text-pretty text-muted-foreground">
                <p>
                  We believe great products come from great teams. We encourage
                  ownership, honest collaboration, continuous learning, and an
                  unrelenting customer-first mindset.
                </p>
                <p>
                  Whether you are a seasoned telecom engineer, a passionate cloud
                  developer, or beginning your career in technology operations, we
                  look for people who are ready to learn, contribute, and make a
                  genuine difference.
                </p>
                <p>
                  Our collaborative teams operate across key technology hubs in India
                  with global reach, offering high exposure to real-world cloud
                  telephony, carrier interconnections, and enterprise integrations.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <CheckCircle2 className="size-4 text-primary" />
                  Ownership & Autonomy
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <CheckCircle2 className="size-4 text-primary" />
                  Continuous Learning
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <CheckCircle2 className="size-4 text-primary" />
                  Customer-First Mindset
                </div>
              </div>
            </div>

            {/* Operating Locations */}
            <div className="rounded-2xl border border-border/80 bg-card p-8 shadow-sm">
              <h3 className="text-xl font-semibold tracking-tight">
                Our Operating Centers
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                SipLink operates modern technology, operations, and support offices
                in India with corporate representation in the United States.
              </p>

              <div className="mt-6 space-y-4">
                {operatingOffices.map((office) => (
                  <div
                    key={office.city}
                    className="flex items-start gap-4 rounded-xl border border-border/60 bg-muted/30 p-4"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <MapPin className="size-4" />
                    </span>
                    <div>
                      <div className="font-semibold text-foreground">
                        {office.city} Office
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {office.address[1]} · {office.address[2]}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Functional Areas / What We Build */}
      <section
        id="functional-areas"
        className="scroll-mt-20 mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28"
      >
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-xs font-semibold tracking-widest text-primary uppercase">
            Teams & Disciplines
          </span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Our functional areas
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Explore the specialized disciplines across SipLink where our teams
            collaborate to power business communication.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {careerDepartments.map((dept) => {
            const Icon = dept.icon;
            return (
              <Card
                key={dept.name}
                className="flex flex-col justify-between border-border/80 bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-md"
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <CardTitle className="text-xl font-semibold">
                      {dept.name}
                    </CardTitle>
                  </div>
                  <CardDescription className="mt-2 text-sm leading-relaxed text-pretty">
                    {dept.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="border-t border-border/60 pt-4">
                  <div className="text-xs font-semibold tracking-wider text-foreground uppercase">
                    Core Focus & Skillsets:
                  </div>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {dept.disciplines.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 text-xs text-muted-foreground"
                      >
                        <CheckCircle2 className="size-3.5 text-primary shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* How to Apply Section */}
        <div className="mt-16 rounded-2xl border border-border/80 bg-card p-8 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <Badge variant="secondary" className="mb-3 font-mono text-xs">
                General Application
              </Badge>
              <h3 className="text-2xl font-semibold tracking-tight">
                Interested in joining the SipLink team?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                We are always excited to connect with talented people passionate
                about cloud communications, network engineering, and customer
                advocacy. Send your resume along with a brief note describing your
                background and the area you are excited about.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Mail className="size-3.5 text-primary" />
                  careers@siplink.in
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="size-3.5 text-primary" />
                  Reviewed by our internal talent team
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:justify-end">
              <Button asChild size="lg">
                <a href={`mailto:careers@siplink.in?subject=Career%20Inquiry%20-%20SipLink`}>
                  Submit Your Resume
                  <ArrowRight className="size-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <ClosingCta
        heading="Help us shape the future of cloud voice"
        body="Join a collaborative telecom and technology team focused on solving real-world communication challenges."
        action="Contact Our Team"
        href="/contact"
        secondary={{ label: "About SipLink", href: "/about" }}
      />
    </>
  );
}
