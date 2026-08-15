import { TERMS_SECTIONS, PRIVACY_SECTIONS, pick } from "../data/legal";
import { useLanguage } from "../i18n/LanguageContext";

// Renders one part of the legal text. Used by both the /Terms page and the
// modal, so there is only ever one copy of the wording in the app.
export default function LegalContent({ part = "terms", headingLevel = "h3" }) {
  const { lang } = useLanguage();
  const sections = part === "privacy" ? PRIVACY_SECTIONS : TERMS_SECTIONS;
  const Heading = headingLevel;

  return (
    <>
      {sections.map((section) => (
        <section className="legal-section" key={pick(section.title, lang)}>
          <Heading className="legal-section__title">
            {pick(section.title, lang)}
          </Heading>
          {section.lead && (
            <p className="legal-section__lead">{pick(section.lead, lang)}</p>
          )}
          <ul className="legal-section__list">
            {section.items.map((item) => (
              <li key={pick(item, lang)}>{pick(item, lang)}</li>
            ))}
          </ul>
          {section.note && (
            <p className="legal-section__note">{pick(section.note, lang)}</p>
          )}
        </section>
      ))}
    </>
  );
}
