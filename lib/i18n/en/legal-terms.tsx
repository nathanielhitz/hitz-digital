import { liveHosting, pricing, euro } from "@/lib/pricing";
import { site } from "@/lib/site";
import { href } from "../paths";
import { services } from "./services";

const L = "en" as const;

/** Body van de algemene voorwaarden. Datum en losse regels staan in `pages.voorwaarden`. */
export function TermsBody() {
  const webshop = liveHosting.find((h) => h.id === "webshop");
  const mailbox = pricing.addons.find((a) => a.id === "mailbox")!;
  const tierPrice = (id: "one" | "multi") => mailbox.tiers.find((t) => t.id === id)!.monthly;
  const namen = liveHosting.map((h) => services.plans[h.id].name);
  const pakketten = namen.length > 1 ? `${namen.slice(0, -1).join(", ")} or ${namen.at(-1)}` : namen[0];
  return (
    <>
      <p>
        <strong>This is a translation for convenience.</strong> The Dutch version,{" "}
        <a href={href("nl", "voorwaarden")}>Algemene voorwaarden</a>, is the legally binding one.
      </p>

      <h2>In six sentences</h2>
      <ul>
        <li>A website starts with a free demo; only after that do we agree a price.</li>
        <li>Your website and your domain are in your name. They are and stay yours.</li>
        <li>You pay for hosting and maintenance monthly or yearly, and you can cancel any time.</li>
        <li>A small change is something that&apos;s done within 15 minutes; unused time expires.</li>
        <li>Help that doesn&apos;t work out, you don&apos;t pay for. That doesn&apos;t apply to check-ups, explanations and advice.</li>
        <li>All prices on the site are incl. 21% VAT; VAT may differ for businesses outside the Netherlands.</li>
      </ul>

      <h2>1. Who and what for</h2>
      <p>
        These terms apply to everything HitzDigital ({site.founder}, {site.city}
        {site.kvk ? `, Chamber of Commerce (KvK) ${site.kvk}` : ""}) does for you: building and revamping websites,
        hosting, domains and maintenance, and computer and website help. On-site help is available in the Hoeksche
        Waard area only; everything else I do remotely, for clients in the Netherlands and abroad. By hiring me or
        taking out a plan you agree to these terms. Anything we agree differently we put in writing (an
        email or a message counts as writing too).
      </p>

      <h2>2. Websites</h2>
      <h3>Demo</h3>
      <p>
        The demo of your homepage is free and comes with no obligations. If you don&apos;t like it, it ends there.
        The demo stays mine for as long as you don&apos;t buy it; I don&apos;t use it for anyone else.
      </p>
      <h3>Price and delivery</h3>
      <p>
        After the demo we agree a fixed price for the complete website (from {euro(pricing.website.from)} incl.
        VAT). That price is fixed, unless you want something extra while I&apos;m building; we discuss that first.
        You supply copy and photos, or I arrange them in consultation with you. The site is finished when it is
        live on your domain and you have approved it. You pay after delivery, within 14 days of the invoice.
      </p>
      <h3>Ownership</h3>
      <p>
        Once paid, the website is yours, including the copy and images made for you. Photos or fonts from third
        parties fall under their own licence. I may show the site as an example of my work, unless you tell me
        you&apos;d rather I didn&apos;t.
      </p>

      <h2>3. Hosting, domain and maintenance</h2>
      <h3>What you buy</h3>
      <p>
        You choose a plan ({pakketten}) and mailboxes if you want them. What each plan includes is on the hosting page; that description is part of these
        terms. Prices are per month and incl. 21% VAT.
      </p>
      <h3>Mailboxes</h3>
      <p>
        One business mailbox costs {euro(tierPrice("one"))} a month; two to five mailboxes together{" "}
        {euro(tierPrice("multi"))} a month. Each mailbox has {mailbox.quotaGb} GB of storage; if it fills
        up, we discuss clearing it out or adding storage. For more than five mailboxes we agree something separately.
      </p>
      <h3>Small changes</h3>
      <p>
        Maintenance{webshop ? " and Webshop" : ""} includes one small change per month (up to 15 minutes).
        A small change is, for example, adjusting a text, photo, price or opening time. New pages,
        design work or features fall outside it and I do those at {euro(pricing.hulp.quarter)} per 15 minutes, incl.
        VAT. Unused time expires at the end of the month and doesn&apos;t carry over.
      </p>
      <h3>Paying</h3>
      <p>
        You pay in advance, monthly or yearly; yearly is my preference, it saves us both
        paperwork. Payment goes by direct debit (SEPA mandate) or iDEAL, and you always get an
        invoice. If you pay yearly and cancel partway through, you get the remaining full months back.
        If payment still doesn&apos;t arrive after a reminder, I may take the site offline temporarily until it is paid; your
        data and your site are kept.
      </p>
      <h3>Cancelling</h3>
      <p>
        You can cancel any time, by email or message, up to the last day of the month; the plan then ends at the end
        of that month.
        Your domain is registered per year and runs until the end of that year; you can then renew it
        (separately, {euro(pricing.domains.table[0].yearly)} a year for .nl) or take it to another provider. I help
        with the move and give you an export of your website if you want one.
      </p>
      {webshop && (
        <>
          <h3>Webshop</h3>
          <p>
            With the Webshop plan your shop runs on Shopify. The Shopify subscription is part of the monthly
            price: I take it out and pay for it, and the account is in your name. If Shopify raises its rates, the
            monthly price may move with it; I tell you at least a month in advance. Whatever Shopify changes about
            its features is outside my control. If you cancel, the shop stays yours: I transfer the subscription to
            your own payment details or help you with an export.
          </p>
        </>
      )}
      <h3>Availability and backups</h3>
      <p>
        I do my best to keep your site online at all times and I make daily backups. I can&apos;t rule out outages at
        data centres, registrars or external services; I fix them as quickly as possible, but
        I don&apos;t guarantee a percentage of uptime. If there&apos;s a problem, message or call me.
      </p>

      <h2>4. Computer and website help</h2>
      <p>
        Help costs {euro(pricing.hulp.quarter)} per 15 minutes, incl. VAT. Remotely I charge per 15 minutes, on-site
        per half hour with a minimum of one hour. There&apos;s no call-out charge within the Hoeksche Waard area. A
        prepaid card of {pricing.hulp.card.quarters} blocks of 15 minutes costs {euro(pricing.hulp.card.price)} and is{" "}
        {services.hulpTarief.cardValidity}. The Computer check-up and Website check-up cost {euro(pricing.hulp.apk.computer)} each.
      </p>
      <h3>No fix, no fee</h3>
      <p>
        We agree up front what the problem is. If I don&apos;t fix it, you pay nothing for that help. This
        doesn&apos;t apply to the check-ups, explanations, training and advice (I always deliver those), and not when the cause lies
        beyond my reach (broken hardware or an outage at your provider, for instance), I have told you so
        and you still want me to keep looking.
      </p>
      <h3>Your data and devices</h3>
      <p>
        I work carefully and, where I can, make a backup first, but I can&apos;t guarantee that files on
        a faulty device survive. Make sure you have your own backup of anything you don&apos;t want to lose. Passwords
        you give me I use only for the help we agreed and keep no longer than necessary.
      </p>

      <h2>5. If you&apos;re a private individual</h2>
      <p>
        If you buy something from me at a distance as a private individual (a prepaid card via the site, for
        instance), you have 14 days to change your mind. If you ask me to start within those 14 days, you pay for
        the part already delivered. Help carried out straight away at your request falls outside this once it is finished.
      </p>

      <h2>6. Liability</h2>
      <p>
        I do my work carefully. If something does go wrong, my liability is limited to the amount
        you paid me for that service in the three months beforehand. I am not liable for
        consequential loss, such as lost revenue, or for problems caused by third-party services (hosting data centre,
        registrar, Shopify, email providers). This limit doesn&apos;t apply in cases of intent or gross negligence.
      </p>

      <h2>7. Privacy</h2>
      <p>
        How I handle personal data is set out in the <a href={href(L, "privacy")}>privacy policy</a>. If I host your website, I
        also process data about your customers (via your contact form, for instance). The arrangements in the
        privacy policy apply to that as the processing arrangements between us.
      </p>

      <h2>8. Changes and applicable law</h2>
      <p>
        I may adjust these terms. For plans that are running I give at least a month&apos;s notice;
        if you don&apos;t agree, you can simply cancel any time. Dutch law applies to our
        agreements.
      </p>

      <p className="mt-10 text-[13.5px] text-faint">
        Questions about these terms? Email <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </>
  );
}
