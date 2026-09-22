import { site } from "@/lib/site";
import { href } from "../paths";

const L = "en" as const;

/** Body van het privacybeleid. Versie en datum staan in `pages.privacy`. */
export function PrivacyBody() {
  return (
    <>
      <p>
        <strong>This is a translation for convenience.</strong> The{" "}
        <a href={href("nl", "privacy")}>Dutch version</a> is the binding one.
      </p>

      <p>
        HitzDigital builds and hosts websites for small businesses in the Netherlands and abroad, and helps with
        computer problems. That involves personal data: yours when you get in touch, and your visitors&rsquo; if I
        host your website. I handle it carefully and keep as little as possible. I follow the GDPR (the EU General
        Data Protection Regulation) and the Dutch implementing act.
      </p>

      <h2>Who is responsible for your data?</h2>
      <p>That depends on which data it is:</p>
      <ul>
        <li>
          <strong>For your own data</strong> (your name, email address, phone number, what you send me and your
          billing details once you become a client) I am responsible.
        </li>
        <li>
          <strong>For the data of your visitors and customers</strong> on a website I host for you, you are
          responsible. I process that data on your instructions. How that works is explained below under
          &ldquo;Websites I host for you&rdquo;.
        </li>
      </ul>

      <h2>What data do I keep about you?</h2>
      <p>Only what I really need in order to help you. Specifically:</p>
      <ul>
        <li>
          <strong>Who you are.</strong> Your name, email address and, if you give them, your phone number, company
          and town.
        </li>
        <li>
          <strong>What you need me for.</strong> A website, hosting, help or something else, plus your explanation
          and, if there is one, the link to your current website.
        </li>
        <li>
          <strong>Billing details.</strong> Only once you become a client: your name, address and what you bought.
        </li>
        <li>
          <strong>Technical data from this website.</strong> Anonymous visitor numbers and loading times, without
          cookies and without storing IP addresses. Dull, but useful for keeping the site fast and working.
        </li>
      </ul>
      <p>I don&rsquo;t ask for sensitive data, such as health or religious beliefs, and I don&rsquo;t want it.</p>

      <h2>Why do I use your data?</h2>
      <ul>
        <li>To answer your enquiry and get in touch with you.</li>
        <li>To make a demo, a quote or an appointment at your request.</li>
        <li>To carry out and invoice the job or the plan.</li>
        <li>To keep this website safe and fast. I do that with anonymous statistics.</li>
        <li>To meet my legal obligations, such as the retention period for the Dutch tax office.</li>
      </ul>
      <p>
        The legal basis for that is the agreement with you (or the steps leading up to it, at your request), my
        legitimate interest in being able to answer a question and run the site, and the law where it requires
        something of me. I don&rsquo;t use your data for advertising.
      </p>

      <h2>Who do I share your data with?</h2>
      <p>With as few parties as possible, and only where it&rsquo;s needed.</p>
      <p>
        <strong>The suppliers I use.</strong> These are the suppliers that work for me: the provider that hosts this
        website, the service that sends the contact form to me as an email, the provider that hosts my business email
        and my accounting package. I have agreements with all of them: they may only use your data to work for me, and
        they process it within the EU. Want to know exactly which suppliers those are? Send me an email at{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
      <p>
        <strong>WhatsApp.</strong> If you choose to reach me via WhatsApp, that conversation runs through WhatsApp
        (Meta Platforms Ireland) and WhatsApp&rsquo;s privacy policy applies to it.
      </p>
      <p>I never sell your data to third parties. Full stop.</p>

      <h2>How long do I keep your data?</h2>
      <p>No longer than necessary. What &ldquo;necessary&rdquo; means depends on the kind of data:</p>
      <ul>
        <li>
          <strong>Enquiries that don&rsquo;t become a job.</strong> 12 months at most, then I delete them.
        </li>
        <li>
          <strong>Client details.</strong> For as long as the job or the plan runs, plus the time needed to wrap
          everything up properly.
        </li>
        <li>
          <strong>Invoices and accounts.</strong> 7 years. That&rsquo;s a legal requirement.
        </li>
        <li>
          <strong>Our email exchange.</strong> For as long as it takes to help you properly, including when you
          come back later.
        </li>
      </ul>

      <h2>Websites I host for you</h2>
      <p>
        If I host your website, data about your visitors and customers passes through my systems too. Think of what
        someone fills in on your contact form, your business email and visitor statistics. You are the controller
        for that data; I am the processor and work on your instructions.
      </p>
      <p>What that means in practice:</p>
      <ul>
        <li>I only use that data to keep your site and email working. Nothing else.</li>
        <li>I don&rsquo;t share it with anyone, apart from the hosting provider your site runs on.</li>
        <li>The servers are in the Netherlands. Everything is sent encrypted and backed up daily.</li>
        <li>If you stop, or if you ask me to, I delete the data.</li>
      </ul>
      <p>
        Together with the <a href={href(L, "voorwaarden")}>terms and conditions</a>, these arrangements serve as the
        data processing agreement between us.
      </p>

      <h2>Where is your data stored?</h2>
      <p>In Europe, on well-secured servers. The websites I host are in the Netherlands.</p>

      <h2>How do I protect your data?</h2>
      <p>
        The connection to this website is encrypted (HTTPS). The contact form checks input on the server side and
        has a simple spam filter that records no personal data. Only I have access to the mailbox where enquiries
        arrive, and it&rsquo;s protected with a strong password and two-step verification.
      </p>
      <p>
        If something does go wrong with your data (a data breach), I report it within 72 hours to the Autoriteit
        Persoonsgegevens (the Dutch data protection authority) where that&rsquo;s required. And if it affects you,
        I let you know personally as well.
      </p>

      <h2>Are decisions about you made by computers alone?</h2>
      <p>No. I read and answer every enquiry myself. There&rsquo;s always a person involved: me.</p>

      <h2>Cookies</h2>
      <p>
        This website places no tracking or marketing cookies. The visitor statistics are cookieless and anonymous,
        so a cookie banner isn&rsquo;t needed. If you pick the light or dark appearance yourself, your browser
        remembers that locally. That choice never leaves your device.
      </p>

      <h2>Your privacy rights</h2>
      <p>It&rsquo;s your data. It&rsquo;s only right that you have a say over it. You can:</p>
      <ul>
        <li><strong>See</strong> what I have stored about you.</li>
        <li><strong>Correct</strong> anything that isn&rsquo;t right.</li>
        <li><strong>Ask me to delete</strong> what I hold about you (apart from what I have to keep by law).</li>
        <li><strong>Restrict</strong> what I may do with it.</li>
        <li><strong>Take it</strong> to another provider (data portability).</li>
        <li><strong>Object</strong> if there&rsquo;s something you disagree with.</li>
      </ul>
      <p>
        How do you do that? Send an email to <a href={`mailto:${site.email}`}>{site.email}</a>. You&rsquo;ll get a
        reply as soon as possible and within a month at the latest.
      </p>
      <p>
        I do want to be sure that you really are you. So I reply to the email address I know you by, and if in doubt
        I may ask an extra question. Not to be awkward, but to protect your data.
      </p>

      <h2>Questions or complaints?</h2>
      <p>
        Email me at <a href={`mailto:${site.email}`}>{site.email}</a>. I&rsquo;m happy to help.
      </p>
      <p>
        Think I&rsquo;m getting it wrong? Then you can always go to the Autoriteit Persoonsgegevens (the Dutch data
        protection authority), the regulator responsible for these rules. You&rsquo;ll find them at{" "}
        <a href="https://autoriteitpersoonsgegevens.nl" rel="noopener noreferrer" target="_blank">
          autoriteitpersoonsgegevens.nl
        </a>
        .
      </p>

      <h2>Changes to this policy</h2>
      <p>
        I may adjust this policy now and then, for instance when the law changes or when I add to my services. The
        date at the top shows when I last changed something. For important changes I give clients advance notice.
      </p>

      <h2>Who am I?</h2>
      <p>
        HitzDigital, a sole proprietorship owned by {site.founder}, based in {site.city}.
        {site.kvk ? ` Chamber of Commerce (KvK) number: ${site.kvk}.` : ""} Contact:{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </>
  );
}
