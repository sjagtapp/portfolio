import { Hero } from "@/sections/Hero";
import { SkillsMarquee } from "@/sections/SkillsMarquee";
import { Services } from "@/sections/Services";
import { Work } from "@/sections/Work";
import { Process } from "@/sections/Process";
import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { projects } from "@/data/projects";
import { findImage } from "@/lib/assets";

/**
 * Home: Intro → Tech strip → Services → Work → Process → About → Contact.
 * Images are looked up on the server, so each one
 * appears as soon as its file is added to /public.
 */
export default function HomePage() {
  const work = projects.map((p) => ({ ...p, screenshot: findImage(`/images/work/${p.slug}`) }));

  return (
    <>
      <Hero photo={findImage("/images/profile")} />
      <SkillsMarquee />
      <Services />
      <Work items={work} />
      <Process />
      <About />
      <Contact />
    </>
  );
}
