import { pricing, euro } from "@/lib/pricing";
import { href } from "../paths";
import type { ServicesDict } from "../nl/services";

const L = "en" as const;
const online = pricing.hosting.find((h) => h.id === "online")!;
const onderhoud = pricing.hosting.find((h) => h.id === "onderhoud")!;
const nlDomain = pricing.domains.table.find((d) => d.tld === ".nl")!;
const guaranteeLine = "No fix? No fee.";

/** Dienst-teksten: pijlers, lijsten, FAQ's, pakket- en tarieflabels. Getallen komen uit lib/pricing.ts. */
export const services: ServicesDict = {
  pijlers: [
    {
      id: "websites" as const,
      n: "01",
      title: "Websites",
      body: "A modern site that fits your business. You see a real demo of your own homepage first; only then do you decide.",
      price: `From ${euro(pricing.website.from)}`,
      href: href(L, "websites"),
    },
    {
      id: "hosting" as const,
      n: "02",
      title: "Hosting & domains",
      body: "Domain, hosting, email and one small change per month in one monthly fee. Cancel any time.",
      price: `From ${euro(online.monthly)} a month`,
      href: href(L, "hosting"),
    },
    {
      id: "hulp" as const,
      n: "03",
      title: "Help",
      body: "Computer, email, domain or website: I fix it and explain it. Usually remote, via screen sharing, wherever you are.",
      price: `${euro(pricing.hulp.quarter)} per 15 minutes · ${guaranteeLine}`,
      href: href(L, "hulp"),
    },
  ],

  werkwijze: [
    { n: "01", title: "Send me your site or tell me your idea", body: "A message, a link or a short description is enough." },
    {
      n: "02",
      title: "I build a concrete demo",
      body: "You get to see a real demo site, focused on your new homepage. No pitch or PowerPoint, but something you can click through yourself.",
    },
    {
      n: "03",
      title: "Then you decide",
      body: "Like it? Then we develop it together into a complete website. Not for you? Then you're not tied to anything. The demo stays free.",
    },
  ],

  zoWerkIk: [
    { title: "Yours, and it stays that way", body: "Your website and domain are registered in your name. No lock-in, no being stuck with me." },
    {
      title: "Clear pricing upfront",
      body: `Websites from ${euro(pricing.website.from)}, hosting from ${euro(online.monthly)} a month, maintenance ${euro(onderhoud.monthly)} a month, help ${euro(pricing.hulp.quarter)} per 15 minutes. All incl. VAT, no small print.`,
    },
    { title: "Cancel any time", body: "That includes the hosting. Your domain just runs to the end of the year it's registered for." },
    { title: "One message is enough", body: "No account manager, no ticket system. You message or call me, and I reply myself." },
  ],

  over: {
    title: "One person. Straight answers. No hassle.",
    body: "I'm Nathaniel, from Puttershoek in the Netherlands. I run HitzDigital on my own, for small businesses here and abroad. I build your website, keep it online and step in the moment your computer or email lets you down. Not a big agency working from templates, just one person you can message directly.",
    facts: ["One point of contact", "Everything agreed upfront", "Based in the Netherlands"],
    portraitAlt: "Nathaniel, founder of HitzDigital",
  },

  websiteOpties: [
    {
      title: "No decent site yet",
      body: "I build a modern website that's clean, fast and clear. A site that builds trust and fits your business, with copy and photos that are right.",
    },
    {
      title: "Your site is dated",
      body: "I give your current site a fresh look and a better structure. What works stays, what gets in the way goes. You don't have to start over.",
    },
  ],
  websiteInbegrepen: [
    "Designed for your phone, because that's where your customers look",
    "Fast, even on a slow connection",
    "Findable in Google for your service and your area",
    "Edit copy, photos and prices yourself",
    "Copy and photos taken care of, or you supply them",
    "Domain in your name",
    "Hosting with me or elsewhere, your choice",
  ],
  websiteFaq: [
    { q: "How long does it take?", a: "The demo of your homepage is usually ready within a week. The complete website then goes live in two to four weeks, depending on how quickly copy and photos come together." },
    { q: "What exactly is the demo?", a: "A real, working preview of your new homepage that you can open in your own browser. No sketch or PowerPoint. So you see what your site will look like before you decide anything." },
    { q: "What if I don't like the demo?", a: "Then it ends there, with no cost and no obligation. The demo is and stays free." },
    { q: "Do I have to write the copy myself?", a: "No. You're welcome to supply it, but I also write it for you based on a short conversation. You supply photos, or I source fitting imagery." },
    { q: "Can I edit the site myself?", a: "Yes. You change copy, photos, prices and opening hours yourself, without technical knowledge. Rather not? Then one small change per month is included in the maintenance plan." },
    { q: "Do you work with clients outside the Netherlands?", a: "Yes. I'm based in Puttershoek, near Rotterdam, and building a website works just as well remotely: we talk by video call, email or WhatsApp. On-site help is limited to my own region, the Hoeksche Waard." },
  ],
  websiteNote: "You hear the exact price after the free demo. Until then you're not tied to anything.",

  hostingAltijd: [
    "Servers in the Netherlands (EU)",
    "Daily backups",
    "SSL certificate (the padlock)",
    "Updates and security",
    "Monitoring: I notice when your site goes down",
    "Domain in your name",
    "Cancel any time",
  ],
  overstappen: [
    { n: "01", title: "You give me access", body: "To your current hosting or domain. Not sure where that is? We'll figure it out together." },
    { n: "02", title: "I move your site, domain and email", body: "At a time that suits you. You don't have to set anything up yourself." },
    { n: "03", title: "Nothing goes offline", body: "Only once everything runs and works with me does the domain switch over. Your email keeps arriving as usual." },
  ],
  hostingFaq: [
    { q: "What counts as a small change?", a: "Changing a text, photo, price or opening time. Something that's done within 15 minutes. A new page or design work falls outside it; I'm happy to do that, but at my standard rate. Unused time expires at the end of the month." },
    { q: "What if I want to stop?", a: "You cancel per month, with no notice period of months. Your domain runs until the end of the year it's registered for; after that you can renew it or take it to another provider. Your site and your domain are and remain yours." },
    { q: "Does my domain stay mine?", a: "Yes. I register it in your name and with your details. I manage it for you, but you're the owner. If you ever want to leave, you simply take the domain with you." },
    { q: "How fast do you respond to an outage?", a: "I get an alert myself when your site goes down and usually get straight on it. If you notice something odd, message or call me; you don't need to open a ticket." },
    { q: "Can I host my old WordPress site with you?", a: "Yes. Even if I didn't build the site, I can take over hosting, domain and email. I'll first take a quick look at whether the site is technically healthy." },
    { q: "Do I pay monthly or yearly?", a: "Whichever you prefer. Yearly is my preference: one invoice, done. If you cancel partway through, you get the remaining full months back. You pay by bank transfer, direct debit or iDEAL and always receive a proper invoice with VAT. All prices are incl. 21% VAT; VAT may differ for businesses outside the Netherlands." },
  ],
  /** Labels per pakket-id uit lib/pricing.ts. */
  plans: {
    online: {
      name: "Online",
      summary: "Hosting of your website only.",
      includes: ["SSL certificate", "Daily backups", "Updates", "Monitoring"],
      excludes: [`Domain name (separately, from ${euro(nlDomain.yearly)} a year)`, "Changes (at my standard rate)"],
      fairUse: undefined as string | undefined,
    },
    onderhoud: {
      name: "Maintenance",
      summary: "Hosting, your domain and one small change per month.",
      includes: ["Everything in Online", "Domain in your name", "1 small change per month (up to 15 minutes)", "Yearly check on speed and copy"],
      excludes: [] as string[],
      fairUse: "A small change is, for example, a text, photo, price or opening time. No new pages or design work. Unused time expires." as string | undefined,
    },
    webshop: {
      name: "Webshop",
      summary: "Your complete webshop online, managed and up to date.",
      includes: ["Domain in your name", "Shopify subscription included", "Payments with iDEAL and shipping integrations", "Theme and app updates", "1 small change per month (up to 15 minutes)"],
      excludes: [] as string[],
      fairUse: "A small change is, for example, a product, price, photo or text. No new pages or design work. Unused time expires." as string | undefined,
    },
  },
  mailbox: {
    name: "Business mailbox",
    summary: "On your own domain.",
    tiers: { one: "1 mailbox", multi: "2 to 5 mailboxes" },
    more: "More than 5 mailboxes on request.",
  },
  domains: {
    included: "The Maintenance plan includes a .nl domain.",
    other: "Other extensions, such as .com, on request.",
  },

  hulpHelp: [
    { title: "Email, domain and hosting", body: "Setting up business email, switching providers, DNS, an expired domain." },
    { title: "Your website, even if I didn't build it", body: "WordPress fixes, updates, a form that doesn't work, a slow site." },
    { title: "Google Business Profile, Maps and reviews", body: "Easy to find, with correct opening hours, photos and a link to your site." },
    { title: "Your workplace", body: "Setting up, cleaning up and speeding up your laptop or PC, backup and security." },
    { title: "Printers, wifi, phone and tablet", body: "Everything that needs to work together with your email and your site." },
    { title: "Office network with TP-Link Omada", body: "Wifi access points, guest network and management, neatly set up and explained." },
    { title: "Light hardware check and cleaning", body: "Dust out, ventilation checked, disk and memory tested. On-site only." },
    { title: "Recovering files", body: "Accidentally deleted, or a drive that's acting up? I recover what can be saved using software. Physically damaged drives I refer on." },
  ],
  hulpNiet: [
    "Building a PC from scratch or component-level repairs (screen, motherboard, power supply)",
    "Data recovery from physically broken drives",
    "Setting up point-of-sale systems and accounting software",
  ],
  hulpStappen: [
    { n: "01", title: "You call or message", body: "Tell me briefly what's going wrong. A photo of the screen already helps." },
    { n: "02", title: "I take a look right away", body: "Via screen sharing, usually started within fifteen minutes. Need me on-site in my region? Then I'll come by." },
    { n: "03", title: "You only pay for the time it takes", body: "Per 15 minutes, incl. VAT. And nothing if it doesn't work out." },
  ],
  hulpFaq: [
    { q: "Do you come on-site?", a: "Yes, in the Hoeksche Waard area (near Rotterdam), without call-out charges. Most problems are solved faster remotely, so I try that first. On-site I charge per half hour, with a minimum of one hour." },
    { q: "Do you help clients outside the Netherlands?", a: "Yes, remotely. Screen sharing works the same from London or Dublin as from Rotterdam. We agree a time that suits your time zone, and you pay the same rate." },
    { q: "How fast can you help?", a: "Remotely often the same day, sometimes straight away. On-site usually within a few working days." },
    { q: "How does remote help work?", a: "You open a link I send you, and I see your screen while we talk. You stay in control and can end it at any time. Nothing is left behind on your computer." },
    { q: "What if it doesn't work out?", a: "Then you pay nothing for that help. We agree upfront what the problem is; if I don't fix it, it costs you nothing. That doesn't apply to the check-ups, explanations and advice, or when the cause is beyond my reach and I've told you so." },
    { q: "Do you also help with my phone or tablet?", a: "Yes. Setting up email, transferring photos, setting up a new phone, tidying up and securing it: it's all part of it." },
    { q: "Do you help private individuals too?", a: `Yes, in the Hoeksche Waard area, at the same rate: ${euro(pricing.hulp.quarter)} per 15 minutes incl. VAT. Businesses come first when it's busy, but you're welcome.` },
  ],
  hulpTarief: {
    billing: "Remote per 15 minutes; on-site per half hour, minimum one hour.",
    travel: "No call-out charges in the Hoeksche Waard area.",
    cardValidity: "valid for 12 months",
    guarantee: {
      line: guaranteeLine,
      conditions: [
        "Applies per problem we name together upfront.",
        "Not for the check-ups, explanations and advice; I always deliver those.",
        "Not when the cause is beyond my reach (broken hardware, an outage at your provider) and I've told you so.",
      ],
    },
  },

  contactFaq: [
    { q: "What happens after my message?", a: "You'll hear back from me within one working day, by email or WhatsApp. For a website enquiry I ask a few short questions and get started on your free demo." },
    { q: "Do you come to me?", a: "For help, I come on-site in the Hoeksche Waard area if remote doesn't work. For a website conversation, a video call works just as well as a visit." },
    { q: "Is the demo really free?", a: "Yes. You get a real, working preview of your homepage. If you don't like it, it ends there, at no cost." },
  ],
};
