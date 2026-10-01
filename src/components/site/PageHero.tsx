import React from "react";
import { Container, Eyebrow, Heading, Lead } from "./primitives";
import { Reveal } from "./Reveal";

export function PageHero({ eyebrow, title, lead, children, size = "display-2" }: { eyebrow: string; title: string; lead?: string; children?: React.ReactNode; size?: "display-1" | "display-2" }) {
  return (
    <Container className="pb-[calc(var(--ks-section)*0.6)] pt-[calc(var(--ks-section)*0.7)]">
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
        <Heading as="h1" size={size} className="max-w-5xl">
          {title}
        </Heading>
        {lead && <Lead>{lead}</Lead>}
        {children}
      </Reveal>
    </Container>
  );
}
