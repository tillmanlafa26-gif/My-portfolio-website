import { resumeProfile as r } from "@/components/resume-data";

export default function Portfolio() {
  return (
    <main style={{ padding: "8rem 8vw", background: "#e8e5df", minHeight: "100vh", color: "#161616" }}>
      <h1>{r.name}</h1>
      <p>{r.summary}</p>
      <h2>Professional Experience</h2>
      {r.experience.map(([role, detail]) => <section key={role}><h3>{role}</h3><p>{detail}</p></section>)}
      <h2>Technical Certifications</h2>
      <p>{r.certifications.join(" · ")}</p>
      <a href={`mailto:${r.email}`}>{r.email}</a><br />
      <a href="tel:+19106275473">{r.phone}</a>
    </main>
  );
}
