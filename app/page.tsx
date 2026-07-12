/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useRef } from 'react'

const BODY_HTML = `

  <!-- fixed nav -->
  <nav class="hd-nav" data-screen-label="Nav" style="position:fixed;top:0;left:0;right:0;z-index:50;transition:background .35s,border-color .35s,backdrop-filter .35s;border-bottom:1px solid transparent">
    <div style="display:flex;align-items:center;justify-content:space-between;padding:20px clamp(20px,5vw,64px);max-width:1280px;margin:0 auto">
      <div style="font-family:'General Sans',sans-serif;font-weight:600;font-size:20px;letter-spacing:-0.02em">hitz<span style="color:var(--accent)">.</span></div>
      <div class="hd-navlinks" style="display:flex;align-items:center;gap:32px;font-size:14px;color:var(--muted)">
        <a href="#werk" style="color:inherit;text-decoration:none" style-hover="color:var(--text)">Werk</a>
        <a href="#diensten" style="color:inherit;text-decoration:none" style-hover="color:var(--text)">Diensten</a>
        <a href="#werkwijze" style="color:inherit;text-decoration:none" style-hover="color:var(--text)">Werkwijze</a>
        <a href="#over" style="color:inherit;text-decoration:none" style-hover="color:var(--text)">Over</a>
        <a href="mailto:info@hitzdigital.nl" style="display:inline-flex;align-items:center;gap:8px;padding:9px 17px;border-radius:100px;border:1px solid var(--line);color:var(--text);text-decoration:none;font-weight:500;transition:border-color .25s,background .25s" style-hover="border-color:color-mix(in srgb,var(--accent) 55%,transparent);background:color-mix(in srgb,var(--accent) 12%,transparent)">Stuur je website</a>
      </div>
      <button class="hd-burger" aria-label="Menu openen" aria-expanded="false" style="display:none;flex-direction:column;gap:5px;width:44px;height:44px;align-items:center;justify-content:center;background:none;border:0;cursor:pointer;padding:0">
        <span style="display:block;width:22px;height:2px;background:var(--text);border-radius:2px"></span>
        <span style="display:block;width:22px;height:2px;background:var(--text);border-radius:2px"></span>
      </button>
    </div>
    <div class="hd-menu" role="dialog" aria-modal="true" aria-label="Menu" style="position:fixed;inset:0;z-index:60;background:rgba(7,7,6,0.97);backdrop-filter:blur(12px);display:flex;flex-direction:column;padding:22px clamp(20px,7vw,40px) 44px;opacity:0;visibility:hidden;pointer-events:none">
      <div style="display:flex;align-items:center;justify-content:space-between">
        <span style="font-family:'General Sans',sans-serif;font-weight:600;font-size:20px;letter-spacing:-0.02em">hitz<span style="color:var(--accent)">.</span></span>
        <button class="hd-menu-close" aria-label="Menu sluiten" style="width:44px;height:44px;background:none;border:0;color:var(--text);font-size:30px;line-height:1;cursor:pointer">×</button>
      </div>
      <div style="display:flex;flex-direction:column;gap:2px;margin:auto 0">
        <a class="hd-menu-link" href="#werk" style="font-family:'General Sans',sans-serif;font-weight:600;font-size:clamp(30px,9vw,42px);letter-spacing:-0.025em;color:var(--text);text-decoration:none;padding:10px 0" style-hover="color:var(--accent)">Werk</a>
        <a class="hd-menu-link" href="#diensten" style="font-family:'General Sans',sans-serif;font-weight:600;font-size:clamp(30px,9vw,42px);letter-spacing:-0.025em;color:var(--text);text-decoration:none;padding:10px 0" style-hover="color:var(--accent)">Diensten</a>
        <a class="hd-menu-link" href="#werkwijze" style="font-family:'General Sans',sans-serif;font-weight:600;font-size:clamp(30px,9vw,42px);letter-spacing:-0.025em;color:var(--text);text-decoration:none;padding:10px 0" style-hover="color:var(--accent)">Werkwijze</a>
        <a class="hd-menu-link" href="#over" style="font-family:'General Sans',sans-serif;font-weight:600;font-size:clamp(30px,9vw,42px);letter-spacing:-0.025em;color:var(--text);text-decoration:none;padding:10px 0" style-hover="color:var(--accent)">Over</a>
      </div>
      <a class="hd-menu-link" href="mailto:info@hitzdigital.nl" style="display:flex;align-items:center;justify-content:center;gap:9px;padding:16px 26px;border-radius:100px;background:linear-gradient(135deg,var(--accent-br) 0%,var(--accent) 48%,var(--accent-dp) 100%);color:#07140e;text-decoration:none;font-weight:600;font-size:16px">Stuur je website</a>
    </div>
  </nav>

  <!-- scroll experience: laptop intro (pinned) -->
  <div class="hd-exp" style="position:relative;height:360vh">
    <div class="hd-sticky" style="position:sticky;top:0;height:100vh;overflow:hidden;background:radial-gradient(120% 90% at 70% 24%,#13120d 0%,#0b0a08 48%,#070706 100%)">

      <div class="hd-glow" style="position:absolute;right:6%;top:8%;width:46vw;height:46vw;max-width:760px;max-height:760px;border-radius:50%;background:radial-gradient(circle,color-mix(in srgb,var(--accent) 15%,transparent) 0%,color-mix(in srgb,var(--accent) 4%,transparent) 40%,transparent 70%);filter:blur(32px);pointer-events:none"></div>
      <div class="hd-glow-cool" style="position:absolute;right:34%;bottom:4%;width:30vw;height:30vw;max-width:440px;max-height:440px;border-radius:50%;background:radial-gradient(circle,rgba(118,138,168,0.06) 0%,transparent 66%);filter:blur(30px);pointer-events:none"></div>
      <div class="hd-vignette" style="position:absolute;inset:0;pointer-events:none;background:radial-gradient(130% 100% at 50% 42%,transparent 50%,rgba(0,0,0,0.62) 100%)"></div>
      <div class="hd-grain" style="position:absolute;inset:0;pointer-events:none;opacity:0.045;mix-blend-mode:overlay;background-image:url('data:image/svg+xml;utf8,&lt;svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22&gt;&lt;filter id=%22n%22&gt;&lt;feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22/&gt;&lt;/filter&gt;&lt;rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/&gt;&lt;/svg&gt;')"></div>

      <!-- hero copy -->
      <div class="hd-copy" data-screen-label="Hero copy" style="position:absolute;left:clamp(20px,5vw,64px);top:50%;z-index:5;max-width:540px;transform:translateY(-50%);will-change:transform,opacity">
        <div class="hd-kicker" style="display:inline-flex;align-items:center;gap:10px;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:var(--muted);margin-bottom:26px">
          <span style="width:7px;height:7px;border-radius:50%;background:var(--accent);box-shadow:0 0 9px color-mix(in srgb,var(--accent) 60%,transparent)"></span>
          Eerst zien. Dan beslissen.
        </div>
        <h1 class="hd-h1" style="font-family:'General Sans',sans-serif;font-weight:600;font-size:clamp(38px,5vw,66px);line-height:1.02;letter-spacing:-0.035em;margin-bottom:24px">
          <span style="font-weight:300">Websites die </span><em style="font-style:normal;font-weight:600;color:var(--accent)">professioneler</em><span style="font-weight:300"> voelen.</span>
        </h1>
        <p class="hd-sub" style="font-size:clamp(16px,1.25vw,18.5px);line-height:1.6;color:var(--muted);max-width:470px;margin-bottom:36px">Moderne websites en redesigns voor ondernemers. Je ziet eerst een concrete preview, daarna beslis je pas.</p>
        <div class="hd-cta" style="display:flex;flex-wrap:wrap;gap:14px;margin-bottom:26px">
          <a href="#diensten" class="hd-btn-primary" style="display:inline-flex;align-items:center;gap:10px;padding:15px 26px;border-radius:100px;background:linear-gradient(135deg,var(--accent-br) 0%,var(--accent) 48%,var(--accent-dp) 100%);color:#07140e;text-decoration:none;font-weight:600;font-size:15px;box-shadow:0 12px 32px -16px rgba(0,0,0,0.7),0 6px 20px -12px color-mix(in srgb,var(--accent) 36%,transparent),inset 0 1px 0 rgba(255,255,255,0.16);transition:transform .25s,box-shadow .25s,filter .25s" style-hover="transform:translateY(-2px);box-shadow:0 16px 40px -16px rgba(0,0,0,0.7),0 10px 26px -12px color-mix(in srgb,var(--accent) 48%,transparent),inset 0 1px 0 rgba(255,255,255,0.22);filter:brightness(1.04)" style-active="transform:translateY(0);filter:brightness(0.98)">Bekijk wat mogelijk is
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>
          </a>
          <a href="mailto:info@hitzdigital.nl" class="hd-btn-ghost" style="display:inline-flex;align-items:center;gap:9px;padding:15px 24px;border-radius:100px;border:1px solid var(--line);color:var(--text);text-decoration:none;font-weight:500;font-size:15px;transition:border-color .25s,background .25s,transform .25s" style-hover="border-color:color-mix(in srgb,var(--accent) 55%,transparent);background:color-mix(in srgb,var(--accent) 9%,transparent);transform:translateY(-2px)" style-active="transform:translateY(0)">Stuur je website</a>
        </div>
        <div class="hd-trust" style="display:flex;align-items:center;gap:16px;font-size:13.5px;color:var(--faint)">
          <span>Gratis preview</span><span style="opacity:.5">·</span><span>Geen verplichtingen</span><span style="opacity:.5">·</span><span>Persoonlijk contact</span>
        </div>
      </div>

      <div class="hd-cue" style="position:absolute;left:50%;bottom:26px;z-index:6;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:9px;font-size:10.5px;letter-spacing:0.22em;text-transform:uppercase;color:var(--faint);pointer-events:none">
        Scroll
        <span style="width:1px;height:34px;background:linear-gradient(180deg,var(--accent),transparent)"></span>
      </div>

      <!-- 3D scene -->
      <div class="hd-scene" style="position:absolute;inset:0;z-index:3;perspective:1700px;perspective-origin:58% 44%">
        <div class="hd-floor" style="position:absolute;left:50%;bottom:9%;width:60%;height:64px;transform:translateX(-50%);background:radial-gradient(ellipse at center,rgba(0,0,0,0.6) 0%,transparent 72%);filter:blur(18px);pointer-events:none"></div>

        <div class="hd-stage3d" style="position:absolute;left:50%;top:50%;width:640px;height:520px;margin-left:-320px;margin-top:-260px;transform-style:preserve-3d;transform:scale(0.8) rotateX(8deg) rotateY(-16deg)">

          <svg class="hd-links" viewBox="0 0 640 520" width="640" height="520" style="position:absolute;left:0;top:0;transform:translateZ(34px);pointer-events:none;opacity:0;overflow:visible">
            <path class="hd-link" d="M320 250 L262 150 L196 44" fill="none" stroke="var(--accent)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"></path>
            <path class="hd-link" d="M320 250 L188 282 L74 300" fill="none" stroke="var(--accent)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"></path>
            <path class="hd-link" d="M320 250 L432 198 L520 150" fill="none" stroke="var(--accent)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"></path>
            <circle class="hd-node" cx="196" cy="44" r="3.5" fill="var(--accent)" opacity="0"></circle>
            <circle class="hd-node" cx="74" cy="300" r="3.5" fill="var(--accent)" opacity="0"></circle>
            <circle class="hd-node" cx="520" cy="150" r="3.5" fill="var(--accent)" opacity="0"></circle>
          </svg>

          <div class="hd-mac" style="position:absolute;left:0;top:24px;width:640px;transform-style:preserve-3d;will-change:transform">
            <div class="hd-lid" style="position:relative;width:640px;height:404px;border-radius:16px;transform-style:preserve-3d;transform-origin:center bottom;transform:rotateX(-6deg);background:linear-gradient(155deg,#2a2620 0%,#17140f 48%,#0d0b08 100%);box-shadow:inset 0 1px 0 color-mix(in srgb,var(--accent) 10%,transparent),0 0 0 1px rgba(255,255,255,0.06),0 40px 80px -36px rgba(0,0,0,0.9),0 26px 90px -30px color-mix(in srgb,var(--accent) 16%,transparent);padding:13px;backface-visibility:hidden">
              <div class="hd-cam" style="position:absolute;top:6px;left:50%;width:5px;height:5px;margin-left:-2.5px;border-radius:50%;background:#2a2620"></div>
              <div class="hd-display" style="position:relative;width:100%;height:100%;border-radius:7px;overflow:hidden;background:#080706;box-shadow:inset 0 0 0 1px rgba(0,0,0,0.8)">
                <div class="hd-backlight" style="position:absolute;inset:0;opacity:0;background:linear-gradient(160deg,#12110c 0%,#0a0908 100%)">
                  <div style="position:absolute;inset:0;background-image:linear-gradient(var(--line2) 1px,transparent 1px),linear-gradient(90deg,var(--line2) 1px,transparent 1px);background-size:34px 34px;opacity:.6"></div>
                </div>
                <div class="hd-wire-screen" style="position:absolute;inset:0;opacity:0;padding:14px">
                  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:13px">
                    <div style="width:54px;height:8px;border-radius:3px;background:rgba(244,241,236,0.16)"></div>
                    <div style="display:flex;gap:7px;align-items:center"><span style="width:26px;height:6px;border-radius:3px;background:rgba(244,241,236,0.1)"></span><span style="width:26px;height:6px;border-radius:3px;background:rgba(244,241,236,0.1)"></span><span style="width:40px;height:15px;border-radius:100px;border:1px dashed rgba(244,241,236,0.22)"></span></div>
                  </div>
                  <div style="height:150px;border:1px dashed rgba(244,241,236,0.2);border-radius:8px;position:relative;margin-bottom:13px"><div style="position:absolute;top:10px;left:12px;display:inline-flex;align-items:center;gap:6px;padding:4px 9px;border-radius:100px;background:rgba(18,16,14,0.72);border:1px solid var(--line);font-size:9px;color:var(--text)"><span style="width:4px;height:4px;border-radius:50%;background:var(--accent)"></span>Mobielvriendelijk</div>
                    <div style="position:absolute;left:14px;bottom:14px;width:46%;height:12px;border-radius:3px;background:rgba(244,241,236,0.18)"></div>
                    <div style="position:absolute;left:14px;bottom:34px;width:60%;height:12px;border-radius:3px;background:rgba(244,241,236,0.22)"></div>
                    <div style="position:absolute;right:16px;top:50%;transform:translateY(-50%);width:30px;height:30px;border:1px dashed rgba(244,241,236,0.22);border-radius:6px"></div>
                  </div>
                  <div style="display:flex;gap:12px;margin-bottom:12px">
                    <div style="flex:1;height:64px;border:1px dashed rgba(244,241,236,0.2);border-radius:7px"></div>
                    <div style="flex:1;height:64px;border:1px dashed rgba(244,241,236,0.2);border-radius:7px"></div>
                    <div style="flex:1;height:64px;border:1px dashed rgba(244,241,236,0.2);border-radius:7px"></div>
                  </div>
                  <div style="display:flex;gap:10px"><div style="width:96px;height:13px;border-radius:3px;background:rgba(244,241,236,0.16)"></div><div style="width:64px;height:13px;border-radius:3px;background:rgba(244,241,236,0.1)"></div></div>
                </div>
                <div class="hd-site" aria-hidden="true" role="presentation" style="position:absolute;inset:0;opacity:0">
                  <div style="position:absolute;inset:0;background:repeating-linear-gradient(135deg,#15130f 0,#15130f 9px,#100e0b 9px,#100e0b 18px)"></div>
                  <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(7,7,6,0.5) 0%,transparent 30%,rgba(7,7,6,0.8) 100%)"></div>
                  <div style="position:absolute;top:14px;left:18px;font-family:'General Sans',sans-serif;font-weight:600;font-size:13px;letter-spacing:0.06em;color:#F4F1EC">VOLMER TECHNIEK</div>
                  <div style="position:absolute;top:15px;right:18px;display:flex;align-items:center;gap:12px;font-size:10px;color:#a8a298"><span>Diensten</span><span>Werk</span><span>Contact</span><span style="padding:5px 10px;border:1px solid rgba(255,255,255,0.18);border-radius:100px;color:#F4F1EC">Bel direct</span></div>
                  <div style="position:absolute;left:24px;bottom:60px;right:24px">
                    <div style="font-family:'General Sans',sans-serif;font-weight:600;font-size:29px;line-height:1.04;letter-spacing:-0.02em;color:#F7F4EF;max-width:80%">On-site verspaning zonder stilstand.</div>
                    <div style="display:flex;gap:10px;margin-top:15px"><span style="padding:9px 16px;border-radius:100px;background:var(--accent);color:#07140e;font-weight:600;font-size:11px">Offerte aanvragen</span><span style="padding:9px 16px;border-radius:100px;border:1px solid rgba(255,255,255,0.2);color:#F4F1EC;font-size:11px">Bekijk diensten</span></div>
                  </div>
                </div>
                <div class="hd-screenglow" style="position:absolute;inset:0;pointer-events:none;opacity:0;background:radial-gradient(120% 80% at 30% 0%,color-mix(in srgb,var(--accent) 10%,transparent),transparent 60%)"></div>
              </div>
            </div>
            <div class="hd-deck" style="position:absolute;left:-12px;top:404px;width:664px;height:452px;border-radius:0 0 18px 18px;transform-origin:center top;transform:rotateX(74deg);background:linear-gradient(180deg,#1a1712 0%,#110f0c 60%,#0b0a08 100%);box-shadow:0 0 0 1px rgba(255,255,255,0.04);backface-visibility:hidden">
              <div style="position:absolute;top:0;left:50%;width:150px;height:9px;margin-left:-75px;border-radius:0 0 7px 7px;background:linear-gradient(180deg,#070706,#16130e)"></div>
              <div class="hd-keys" style="position:absolute;top:40px;left:46px;right:46px;height:230px;border-radius:8px;background:#0a0807;box-shadow:inset 0 1px 0 rgba(255,255,255,0.03);background-image:linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px);background-size:25px 22px;background-position:8px 8px"></div>
              <div class="hd-trackpad" style="position:absolute;bottom:34px;left:50%;width:230px;height:120px;margin-left:-115px;border-radius:11px;background:linear-gradient(180deg,#141009,#0d0b08);box-shadow:inset 0 0 0 1px rgba(255,255,255,0.05)"></div>
            </div>
          </div>

          <!-- floating layers (minimal) -->
          <div class="hd-flayer" data-k="grid" style="position:absolute;left:58px;top:30px;width:226px;height:148px;opacity:0;will-change:transform,opacity">
            <div style="width:100%;height:100%;border-radius:12px;border:1px solid var(--line);background:rgba(18,16,14,0.55);backdrop-filter:blur(6px);position:relative;overflow:hidden">
              <div style="position:absolute;inset:0;background-image:linear-gradient(color-mix(in srgb,var(--accent) 13%,transparent) 1px,transparent 1px),linear-gradient(90deg,color-mix(in srgb,var(--accent) 13%,transparent) 1px,transparent 1px);background-size:26px 26px"></div>
              <div style="position:absolute;bottom:8px;left:10px;font-family:ui-monospace,Menlo,monospace;font-size:9px;letter-spacing:0.08em;color:var(--accent-br)">Duidelijke structuur</div>
            </div>
          </div>

          <div class="hd-flayer" data-k="nav" style="position:absolute;left:54px;top:-34px;width:300px;height:50px;opacity:0;will-change:transform,opacity">
            <div style="width:100%;height:100%;border-radius:12px;border:1px solid var(--line);background:rgba(18,16,14,0.8);backdrop-filter:blur(10px);box-shadow:0 18px 40px -22px rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:space-between;padding:0 16px">
              <div style="width:64px;height:9px;border-radius:3px;background:rgba(244,241,236,0.5)"></div>
              <div style="display:flex;gap:8px;align-items:center"><span style="width:34px;height:7px;border-radius:3px;background:rgba(244,241,236,0.2)"></span><span style="display:inline-flex;align-items:center;padding:3px 8px;border-radius:100px;background:var(--accent);color:#07140e;font-size:8px;font-weight:600;letter-spacing:0.02em">SEO-klaar</span></div>
            </div>
          </div>

          <div class="hd-flayer" data-k="img" style="position:absolute;left:368px;top:48px;width:236px;height:158px;opacity:0;will-change:transform,opacity">
            <div style="width:100%;height:100%;border-radius:13px;overflow:hidden;border:1px solid var(--line);box-shadow:0 26px 60px -28px rgba(0,0,0,0.85);background:repeating-linear-gradient(135deg,#17140f 0,#17140f 9px,#110f0c 9px,#110f0c 18px);position:relative">
              <div style="position:absolute;inset:0;background:radial-gradient(120% 90% at 70% 10%,color-mix(in srgb,var(--accent) 10%,transparent),transparent 60%)"></div>
              <div style="position:absolute;bottom:10px;left:12px;font-family:ui-monospace,Menlo,monospace;font-size:9px;letter-spacing:0.1em;color:#a8a298">Moderne uitstraling</div>
            </div>
          </div>

          <div class="hd-flayer" data-k="head" style="position:absolute;left:-46px;top:188px;width:264px;height:126px;opacity:0;will-change:transform,opacity">
            <div style="width:100%;height:100%;border-radius:14px;border:1px solid var(--line);background:rgba(18,16,14,0.84);backdrop-filter:blur(12px);box-shadow:0 28px 60px -26px rgba(0,0,0,0.85);padding:18px;display:flex;flex-direction:column;gap:11px;justify-content:center">
              <div style="height:11px;width:62%;border-radius:4px;background:rgba(247,244,239,0.8)"></div>
              <div style="display:flex;align-items:center;gap:9px"><span style="width:5px;height:5px;border-radius:50%;background:var(--accent);flex:none"></span><span style="font-size:12.5px;color:var(--text)">Zelf te beheren</span></div>
              <div style="display:flex;align-items:center;gap:9px"><span style="width:5px;height:5px;border-radius:50%;background:var(--accent);flex:none"></span><span style="font-size:12.5px;color:var(--text)">Gebruiksvriendelijk</span></div>
              <div style="height:8px;width:48%;border-radius:4px;background:rgba(244,241,236,0.22)"></div>
            </div>
          </div>

          <div class="hd-flayer" data-k="code" aria-hidden="true" role="presentation" style="position:absolute;left:300px;top:320px;width:262px;height:124px;opacity:0;will-change:transform,opacity">
            <div style="width:100%;height:100%;border-radius:12px;border:1px solid var(--line);background:rgba(14,12,10,0.9);backdrop-filter:blur(10px);box-shadow:0 24px 56px -26px rgba(0,0,0,0.85);padding:14px 16px;font-family:ui-monospace,Menlo,monospace;font-size:10.5px;line-height:1.7;color:#837c70">
              <div style="color:#6b7268">// snelle laadtijd</div>
              <div><span style="color:var(--accent-br)">&lt;section</span> <span style="color:#a8a298">class</span>=<span style="color:var(--warm)">"hero"</span><span style="color:var(--accent-br)">&gt;</span></div>
              <div style="padding-left:14px">build<span style="color:#a8a298">(</span><span style="color:var(--accent-dp)">layout</span><span style="color:#a8a298">)</span></div>
              <div style="padding-left:14px">render<span style="color:#a8a298">(</span><span style="color:var(--warm)">site</span><span style="color:#a8a298">)</span> <span style="color:#6b7268">// schone code</span></div>
              <div><span style="color:var(--accent-br)">&lt;/section&gt;</span> <span style="color:#6b7268">// betere prestaties</span></div>
            </div>
          </div>

        </div>

        <!-- mobile phone hero -->
        <div class="hd-phone" style="display:none;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:222px;z-index:5;will-change:transform,opacity">
          <div class="hd-ptag" style="position:absolute;left:-32px;top:52px;z-index:6;opacity:0;display:inline-flex;align-items:center;gap:7px;padding:7px 12px;border-radius:100px;background:rgba(18,16,14,0.92);border:1px solid var(--line);backdrop-filter:blur(8px);box-shadow:0 14px 30px -18px rgba(0,0,0,0.8);font-size:11px;color:var(--text);white-space:nowrap"><span style="width:6px;height:6px;border-radius:50%;background:var(--accent)"></span>SEO-klaar</div>
          <div class="hd-ptag" style="position:absolute;right:-40px;top:158px;z-index:6;opacity:0;display:inline-flex;align-items:center;gap:7px;padding:7px 12px;border-radius:100px;background:rgba(18,16,14,0.92);border:1px solid var(--line);backdrop-filter:blur(8px);box-shadow:0 14px 30px -18px rgba(0,0,0,0.8);font-size:11px;color:var(--text);white-space:nowrap"><span style="width:6px;height:6px;border-radius:50%;background:var(--accent)"></span>Snelle laadtijd</div>
          <div class="hd-ptag" style="position:absolute;left:-26px;bottom:118px;z-index:6;opacity:0;display:inline-flex;align-items:center;gap:7px;padding:7px 12px;border-radius:100px;background:rgba(18,16,14,0.92);border:1px solid var(--line);backdrop-filter:blur(8px);box-shadow:0 14px 30px -18px rgba(0,0,0,0.8);font-size:11px;color:var(--text);white-space:nowrap"><span style="width:6px;height:6px;border-radius:50%;background:var(--accent)"></span>Mobielvriendelijk</div>
          <div style="position:relative;width:222px;height:452px;border-radius:42px;background:linear-gradient(155deg,#2a2620,#15120e);padding:8px;box-shadow:0 40px 80px -36px rgba(0,0,0,0.9),0 0 0 1px rgba(255,255,255,0.06),inset 0 1px 0 color-mix(in srgb,var(--accent) 12%,transparent)">
            <div style="position:absolute;top:13px;left:50%;transform:translateX(-50%);width:70px;height:17px;border-radius:100px;background:#070605;z-index:4"></div>
            <div style="position:relative;width:100%;height:100%;border-radius:34px;overflow:hidden;background:#080706">
              <div class="hd-pwire" style="position:absolute;inset:0;opacity:0;padding:16px 14px">
                <div style="display:flex;justify-content:space-between;margin-bottom:13px"><div style="width:42px;height:7px;border-radius:3px;background:rgba(244,241,236,0.16)"></div><div style="width:16px;height:7px;border-radius:3px;background:rgba(244,241,236,0.1)"></div></div>
                <div style="height:118px;border:1px dashed rgba(244,241,236,0.2);border-radius:9px;margin-bottom:13px"></div>
                <div style="height:9px;width:78%;border-radius:3px;background:rgba(244,241,236,0.18);margin-bottom:8px"></div>
                <div style="height:9px;width:54%;border-radius:3px;background:rgba(244,241,236,0.12);margin-bottom:16px"></div>
                <div style="display:flex;gap:9px"><div style="flex:1;height:52px;border:1px dashed rgba(244,241,236,0.2);border-radius:8px"></div><div style="flex:1;height:52px;border:1px dashed rgba(244,241,236,0.2);border-radius:8px"></div></div>
              </div>
              <div class="hd-psite" aria-hidden="true" role="presentation" style="position:absolute;inset:0;opacity:0">
                <div style="position:absolute;top:0;left:0;right:0;height:152px;background:repeating-linear-gradient(135deg,#16130f 0,#16130f 9px,#100e0b 9px,#100e0b 18px)"></div>
                <div style="position:absolute;top:0;left:0;right:0;height:152px;background:linear-gradient(180deg,rgba(7,7,6,0.25),transparent 60%,rgba(7,7,6,0.6))"></div>
                <div style="position:absolute;top:15px;left:15px;font-family:'General Sans',sans-serif;font-weight:600;font-size:11px;letter-spacing:0.05em;color:#F4F1EC">VOLMER</div>
                <div style="position:absolute;top:14px;right:15px;display:flex;flex-direction:column;gap:3px"><span style="width:15px;height:2px;background:#a8a298"></span><span style="width:15px;height:2px;background:#a8a298"></span></div>
                <div style="position:absolute;top:104px;left:15px;right:15px;font-family:'General Sans',sans-serif;font-weight:600;font-size:17px;line-height:1.12;color:#F7F4EF">Verspaning zonder stilstand.</div>
                <div style="position:absolute;top:170px;left:15px;padding:8px 14px;border-radius:100px;background:var(--accent);color:#07140e;font-weight:600;font-size:10px">Offerte aanvragen</div>
                <div style="position:absolute;top:212px;left:15px;right:15px;display:flex;flex-direction:column;gap:9px"><div style="height:8px;width:72%;border-radius:3px;background:rgba(244,241,236,0.2)"></div><div style="height:8px;width:92%;border-radius:3px;background:rgba(244,241,236,0.12)"></div><div style="height:8px;width:58%;border-radius:3px;background:rgba(244,241,236,0.12)"></div></div>
              </div>
              <div style="position:absolute;left:11px;right:11px;bottom:12px;display:flex;flex-direction:column;gap:6px">
                <div class="hd-pchip" style="opacity:0.16;display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:9px;background:rgba(18,16,14,0.92);border:1px solid var(--line);backdrop-filter:blur(6px)"><span class="hd-pchk" style="width:15px;height:15px;border-radius:50%;border:1px solid var(--line);display:flex;align-items:center;justify-content:center;flex:none;transition:background .3s,border-color .3s"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#07140e" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round" style="opacity:0"><path d="M5 13l4 4L19 7"></path></svg></span><span style="font-size:11px;color:var(--text)">Professionele indruk</span></div>
                <div class="hd-pchip" style="opacity:0.16;display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:9px;background:rgba(18,16,14,0.92);border:1px solid var(--line);backdrop-filter:blur(6px)"><span class="hd-pchk" style="width:15px;height:15px;border-radius:50%;border:1px solid var(--line);display:flex;align-items:center;justify-content:center;flex:none;transition:background .3s,border-color .3s"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#07140e" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round" style="opacity:0"><path d="M5 13l4 4L19 7"></path></svg></span><span style="font-size:11px;color:var(--text)">Gebruiksvriendelijk</span></div>
                <div class="hd-pchip" style="opacity:0.16;display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:9px;background:rgba(18,16,14,0.92);border:1px solid var(--line);backdrop-filter:blur(6px)"><span class="hd-pchk" style="width:15px;height:15px;border-radius:50%;border:1px solid var(--line);display:flex;align-items:center;justify-content:center;flex:none;transition:background .3s,border-color .3s"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#07140e" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round" style="opacity:0"><path d="M5 13l4 4L19 7"></path></svg></span><span style="font-size:11px;color:var(--text)">Duidelijke structuur</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- REAL HOMEPAGE -->
  <main style="position:relative;z-index:2;background:var(--bg2)">

    <!-- Diensten -->
    <section id="diensten" data-screen-label="Diensten" style="border-top:1px solid var(--line);padding:clamp(80px,12vw,140px) clamp(20px,5vw,64px)">
      <div class="hd-reveal" style="max-width:1140px;margin:0 auto">
        <div style="display:inline-flex;align-items:center;gap:10px;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:var(--muted);margin-bottom:22px"><span style="width:22px;height:2px;background:var(--accent)"></span>Diensten</div>
        <h2 style="font-family:'General Sans',sans-serif;font-weight:600;font-size:clamp(28px,3.6vw,46px);line-height:1.06;letter-spacing:-0.03em;max-width:720px;margin-bottom:54px">Nieuwe websites en <em style="font-style:normal;color:var(--accent)">redesigns</em>.</h2>
        <div class="hd-services" style="display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--line)">
          <div style="padding:26px 22px 26px 0;border-right:1px solid var(--line)"><div style="font-family:ui-monospace,Menlo,monospace;font-size:12px;color:var(--accent);margin-bottom:14px">01</div><div style="font-family:'General Sans',sans-serif;font-weight:600;font-size:18px;margin-bottom:8px">Nieuwe website</div><p style="font-size:14px;line-height:1.55;color:var(--muted)">Nog geen goede site? Ik bouw een moderne website die strak, snel en duidelijk is. Een site die vertrouwen wekt en past bij je bedrijf.</p></div>
          <div style="padding:26px 22px;border-right:1px solid var(--line)"><div style="font-family:ui-monospace,Menlo,monospace;font-size:12px;color:var(--accent);margin-bottom:14px">02</div><div style="font-family:'General Sans',sans-serif;font-weight:600;font-size:18px;margin-bottom:8px">Redesign</div><p style="font-size:14px;line-height:1.55;color:var(--muted)">Is je huidige website verouderd? Ik geef hem een moderne uitstraling en betere structuur — zonder dat je helemaal opnieuw hoeft te beginnen.</p></div>
          <div style="padding:26px 22px;border-right:1px solid var(--line)"><div style="font-family:ui-monospace,Menlo,monospace;font-size:12px;color:var(--accent);margin-bottom:14px">03</div><div style="font-family:'General Sans',sans-serif;font-weight:600;font-size:18px;margin-bottom:8px">Mobielvriendelijk &amp; snel</div><p style="font-size:14px;line-height:1.55;color:var(--muted)">Elke website werkt vlekkeloos op mobiel en laadt snel. Ook technisch SEO-klaar, zodat je vindbaar bent in Google.</p></div>
          <div style="padding:26px 0 26px 22px"><div style="font-family:ui-monospace,Menlo,monospace;font-size:12px;color:var(--accent);margin-bottom:14px">04</div><div style="font-family:'General Sans',sans-serif;font-weight:600;font-size:18px;margin-bottom:8px">Zelf te beheren</div><p style="font-size:14px;line-height:1.55;color:var(--muted)">Je kunt je site zelf eenvoudig bijhouden via een overzichtelijk CMS. Geen technische kennis nodig.</p></div>
        </div>
      </div>
    </section>

    <!-- Werkwijze -->
    <section id="werkwijze" data-screen-label="Werkwijze" style="border-top:1px solid var(--line);background:var(--bg);padding:clamp(80px,12vw,140px) clamp(20px,5vw,64px)">
      <div class="hd-reveal" style="max-width:1140px;margin:0 auto">
        <div style="display:inline-flex;align-items:center;gap:10px;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:var(--muted);margin-bottom:22px"><span style="width:22px;height:2px;background:var(--accent)"></span>Werkwijze</div>
        <h2 style="font-family:'General Sans',sans-serif;font-weight:600;font-size:clamp(28px,3.6vw,46px);line-height:1.06;letter-spacing:-0.03em;max-width:720px;margin-bottom:64px">In drie stappen naar een betere website.</h2>
        <div class="hd-steps" style="display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(24px,4vw,56px);position:relative">
          <div><div style="display:flex;align-items:center;gap:14px;margin-bottom:18px"><span style="width:11px;height:11px;border-radius:50%;background:var(--accent);box-shadow:0 0 10px color-mix(in srgb,var(--accent) 55%,transparent)"></span><span style="font-family:ui-monospace,Menlo,monospace;font-size:13px;color:var(--faint)">01</span></div><div style="font-family:'General Sans',sans-serif;font-weight:600;font-size:20px;margin-bottom:10px">Stuur je site of vertel je idee</div><p style="font-size:15px;line-height:1.6;color:var(--muted);max-width:300px">Een mailtje, link of korte uitleg is genoeg.</p></div>
          <div><div style="display:flex;align-items:center;gap:14px;margin-bottom:18px"><span style="width:11px;height:11px;border-radius:50%;background:var(--accent);box-shadow:0 0 10px color-mix(in srgb,var(--accent) 55%,transparent)"></span><span style="font-family:ui-monospace,Menlo,monospace;font-size:13px;color:var(--faint)">02</span></div><div style="font-family:'General Sans',sans-serif;font-weight:600;font-size:20px;margin-bottom:10px">Ik maak een concrete preview</div><p style="font-size:15px;line-height:1.6;color:var(--muted);max-width:300px">Je ziet hoe je nieuwe website of redesign eruit kan zien.</p></div>
          <div><div style="display:flex;align-items:center;gap:14px;margin-bottom:18px"><span style="width:11px;height:11px;border-radius:50%;background:var(--accent);box-shadow:0 0 10px color-mix(in srgb,var(--accent) 55%,transparent)"></span><span style="font-family:ui-monospace,Menlo,monospace;font-size:13px;color:var(--faint)">03</span></div><div style="font-family:'General Sans',sans-serif;font-weight:600;font-size:20px;margin-bottom:10px">Dan pas beslis je</div><p style="font-size:15px;line-height:1.6;color:var(--muted);max-width:300px">Bevalt het? Dan werken we verder. Zo niet, dan zit je nergens aan vast.</p></div>
        </div>
      </div>
    </section>

    <!-- Werk / Portfolio -->
    <section id="werk" data-screen-label="Werk" style="border-top:1px solid var(--line);padding:clamp(80px,12vw,140px) clamp(20px,5vw,64px)">
      <div class="hd-reveal" style="max-width:1140px;margin:0 auto">
        <div style="display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:20px;margin-bottom:54px">
          <div>
            <div style="display:inline-flex;align-items:center;gap:10px;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:var(--muted);margin-bottom:22px"><span style="width:22px;height:2px;background:var(--accent)"></span>Werk</div>
            <h2 style="font-family:'General Sans',sans-serif;font-weight:600;font-size:clamp(28px,3.6vw,46px);line-height:1.06;letter-spacing:-0.03em;max-width:620px">Recent gebouwd, met zorg afgewerkt.</h2>
          </div>
        </div>
        <div class="hd-work" style="display:grid;grid-template-columns:repeat(2,1fr);gap:22px">
          <a href="https://volmer-techniek.vercel.app/nl" target="_blank" rel="noopener noreferrer" style="text-decoration:none;color:inherit" style-hover="opacity:0.92"><div style="aspect-ratio:3/4;border-radius:13px;overflow:hidden;border:1px solid var(--line);position:relative"><img src="/images/Volmertechniek.gif" alt="Volmer Techniek" width="900" height="1200" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block"><div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(7,7,6,0.65) 0%,transparent 55%)"></div></div><div style="display:flex;justify-content:space-between;align-items:center;margin-top:14px"><span style="font-family:'General Sans',sans-serif;font-weight:600;font-size:16px">Volmer Techniek</span><span style="font-size:12px;color:var(--faint)">Metaalbewerking · Hoeksche Waard</span></div></a>
          <a href="https://youniekart.vercel.app" target="_blank" rel="noopener noreferrer" style="text-decoration:none;color:inherit" style-hover="opacity:0.92"><div style="aspect-ratio:3/4;border-radius:13px;overflow:hidden;border:1px solid var(--line);position:relative"><img src="/images/youniekart.jpg" alt="Youniek Art" width="900" height="1200" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block"><div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(7,7,6,0.65) 0%,transparent 55%)"></div></div><div style="display:flex;justify-content:space-between;align-items:center;margin-top:14px"><span style="font-family:'General Sans',sans-serif;font-weight:600;font-size:16px">Youniek Art</span><span style="font-size:12px;color:var(--faint)">Fotografie portfolio</span></div></a>
          <a href="https://maurits-site-nine.vercel.app" target="_blank" rel="noopener noreferrer" style="text-decoration:none;color:inherit" style-hover="opacity:0.92"><div style="aspect-ratio:3/4;border-radius:13px;overflow:hidden;border:1px solid var(--line);position:relative"><img src="/images/Mouritsschilderwerken.jpeg" alt="Maurits Schilderwerken" width="900" height="1200" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block"><div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(7,7,6,0.65) 0%,transparent 55%)"></div></div><div style="display:flex;justify-content:space-between;align-items:center;margin-top:14px"><span style="font-family:'General Sans',sans-serif;font-weight:600;font-size:16px">Maurits Schilderwerken</span><span style="font-size:12px;color:var(--faint)">Schildersbedrijf · Hoeksche Waard</span></div></a>
          <a href="https://cafe-centrum.vercel.app" target="_blank" rel="noopener noreferrer" style="text-decoration:none;color:inherit" style-hover="opacity:0.92"><div style="aspect-ratio:3/4;border-radius:13px;overflow:hidden;border:1px solid var(--line);position:relative"><img src="/images/cafecentrum.jpg" alt="Café 't Centrum" width="900" height="1200" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block"><div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(7,7,6,0.65) 0%,transparent 55%)"></div></div><div style="display:flex;justify-content:space-between;align-items:center;margin-top:14px"><span style="font-family:'General Sans',sans-serif;font-weight:600;font-size:16px">Café 't Centrum</span><span style="font-size:12px;color:var(--faint)">Lokaal café · Hoeksche Waard</span></div></a>
          <a href="https://www.opgietingen.nl/" target="_blank" rel="noopener noreferrer" style="text-decoration:none;color:inherit" style-hover="opacity:0.92"><div style="aspect-ratio:3/4;border-radius:13px;overflow:hidden;border:1px solid var(--line);position:relative"><img src="/images/opgietingen.jpg" alt="Opgietingen.nl" width="900" height="1200" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block"><div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(7,7,6,0.65) 0%,transparent 55%)"></div></div><div style="display:flex;justify-content:space-between;align-items:center;margin-top:14px"><span style="font-family:'General Sans',sans-serif;font-weight:600;font-size:16px">Opgietingen.nl</span><span style="font-size:12px;color:var(--faint)">Agenda voor opgiet-evenementen in Nederland en België</span></div></a>
          <a href="https://gelensbestratingen.vercel.app/" target="_blank" rel="noopener noreferrer" style="text-decoration:none;color:inherit" style-hover="opacity:0.92"><div style="aspect-ratio:3/4;border-radius:13px;overflow:hidden;border:1px solid var(--line);position:relative"><img src="/images/geleenbestrating.jpg" alt="Gelens Bestratingen" width="900" height="1200" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block"><div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(7,7,6,0.65) 0%,transparent 55%)"></div></div><div style="display:flex;justify-content:space-between;align-items:center;margin-top:14px"><span style="font-family:'General Sans',sans-serif;font-weight:600;font-size:16px">Gelens Bestratingen</span><span style="font-size:12px;color:var(--faint)">Bestratingen, grondwerken en kunstgras</span></div></a>
          <a href="https://festivaldiscounter.nl/" target="_blank" rel="noopener noreferrer" style="text-decoration:none;color:inherit" style-hover="opacity:0.92"><div style="aspect-ratio:3/4;border-radius:13px;overflow:hidden;border:1px solid var(--line);position:relative"><img src="/images/festivaldiscounter.jpg" alt="Festivaldiscounter" width="900" height="1200" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block"><div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(7,7,6,0.65) 0%,transparent 55%)"></div></div><div style="display:flex;justify-content:space-between;align-items:center;margin-top:14px"><span style="font-family:'General Sans',sans-serif;font-weight:600;font-size:16px">Festivaldiscounter</span><span style="font-size:12px;color:var(--faint)">Festival tickets vergelijker en agenda</span></div></a>
          <a href="https://lesbosreizen.nl" target="_blank" rel="noopener noreferrer" style="text-decoration:none;color:inherit" style-hover="opacity:0.92"><div style="aspect-ratio:3/4;border-radius:13px;overflow:hidden;border:1px solid var(--line);position:relative"><img src="/images/Lesbosreizen.jpg" alt="LesbosReizen" width="900" height="1200" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;object-position:top center;display:block"><div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(7,7,6,0.65) 0%,transparent 55%)"></div></div><div style="display:flex;justify-content:space-between;align-items:center;margin-top:14px"><span style="font-family:'General Sans',sans-serif;font-weight:600;font-size:16px">LesbosReizen</span><span style="font-size:12px;color:var(--faint)">Affiliate marketing · Hoeksche Waard</span></div></a>
        </div>
      </div>
    </section>

    <!-- Over -->
    <section id="over" data-screen-label="Over" style="border-top:1px solid var(--line);background:var(--bg);padding:clamp(80px,12vw,140px) clamp(20px,5vw,64px)">
      <div class="hd-reveal" style="max-width:1140px;margin:0 auto;display:grid;grid-template-columns:1.1fr 0.9fr;gap:clamp(32px,6vw,80px);align-items:center">
        <div>
          <div style="display:inline-flex;align-items:center;gap:10px;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:var(--muted);margin-bottom:22px"><span style="width:22px;height:2px;background:var(--accent)"></span>Over HitzDigital</div>
          <h2 style="font-family:'General Sans',sans-serif;font-weight:600;font-size:clamp(26px,3.2vw,40px);line-height:1.1;letter-spacing:-0.03em;margin-bottom:24px">Eén persoon. Korte lijnen. Geen gedoe.</h2>
          <p style="font-size:16px;line-height:1.65;color:var(--muted);max-width:480px;margin-bottom:18px">Ik ben Nathaniel, en ik bouw HitzDigital in mijn eentje voor ondernemers in de Hoeksche Waard — cafés, schilders, installateurs, iedereen die een website wil die klopt. Geen accountmanager, geen tussenlagen: je mailt mij, en ik reageer zelf. Eerst een concrete preview, dan pas beslis je.</p>
          <div style="font-size:13.5px;color:var(--faint)">Persoonlijk contact · Duidelijke afspraken · Eerst zien, dan beslissen</div>
        </div>
        <div style="aspect-ratio:4/5;border-radius:16px;overflow:hidden;border:1px solid var(--line);background:repeating-linear-gradient(135deg,#16130f 0,#16130f 11px,#100e0b 11px,#100e0b 22px);position:relative"><span style="position:absolute;bottom:14px;left:16px;font-family:ui-monospace,Menlo,monospace;font-size:10px;letter-spacing:0.1em;color:#a8a298">PORTRET · FOTO VOLGT</span></div>
      </div>
    </section>

    <!-- Contact -->
    <section id="contact" data-screen-label="Contact" style="border-top:1px solid var(--line);padding:clamp(96px,14vw,170px) clamp(20px,5vw,64px);position:relative;overflow:hidden">
      <div style="position:absolute;left:50%;top:30%;width:50vw;height:50vw;max-width:680px;max-height:680px;transform:translateX(-50%);border-radius:50%;background:radial-gradient(circle,color-mix(in srgb,var(--accent) 10%,transparent),transparent 66%);filter:blur(40px);pointer-events:none"></div>
      <div class="hd-reveal" style="max-width:780px;margin:0 auto;text-align:center;position:relative">
        <div style="display:inline-flex;align-items:center;gap:10px;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:var(--muted);margin-bottom:24px">Eerst zien. Dan beslissen.</div>
        <h2 style="font-family:'General Sans',sans-serif;font-weight:600;font-size:clamp(30px,4.4vw,56px);line-height:1.05;letter-spacing:-0.03em;margin-bottom:22px">Benieuwd hoe jouw website eruit kan zien?</h2>
        <p style="font-size:17px;line-height:1.6;color:var(--muted);max-width:520px;margin:0 auto 38px">Stuur je huidige website of vertel kort wat je zoekt. Ik kijk mee en maak vrijblijvend een concrete preview.</p>
        <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap">
          <a href="mailto:info@hitzdigital.nl" class="hd-btn-primary" style="display:inline-flex;align-items:center;gap:10px;padding:15px 28px;border-radius:100px;background:linear-gradient(135deg,var(--accent-br) 0%,var(--accent) 48%,var(--accent-dp) 100%);color:#07140e;text-decoration:none;font-weight:600;font-size:15px;box-shadow:0 12px 32px -16px rgba(0,0,0,0.7),0 6px 20px -12px color-mix(in srgb,var(--accent) 36%,transparent),inset 0 1px 0 rgba(255,255,255,0.16);transition:transform .25s,box-shadow .25s,filter .25s" style-hover="transform:translateY(-2px);filter:brightness(1.04)" style-active="transform:translateY(0)">Stuur je website</a>
        </div>
        <div style="margin-top:22px;font-size:13px;color:var(--faint)">Reactie binnen 1 werkdag · Vrijblijvend</div>
      </div>
    </section>

    <footer style="border-top:1px solid var(--line);background:var(--bg2);padding:44px clamp(20px,5vw,64px)">
      <div style="max-width:1140px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:18px;font-size:13px;color:var(--faint)">
        <div style="display:flex;align-items:center;gap:14px"><span style="font-family:'General Sans',sans-serif;font-weight:600;font-size:17px;color:var(--text)">hitz<span style="color:var(--accent)">.</span></span><span>Eerst zien. Dan beslissen.</span></div>
        <div style="display:flex;align-items:center;gap:18px"><a href="mailto:info@hitzdigital.nl" style="color:var(--muted);text-decoration:none" style-hover="color:var(--text)">info@hitzdigital.nl</a><span>© 2026 HitzDigital · Hoeksche Waard</span></div>
      </div>
    </footer>
  </main>
`

function initHitzAnimation(el: HTMLElement): () => void {
  const q = (s: string): any => el.querySelector(s)
  const qa = (s: string): any[] => Array.from(el.querySelectorAll(s))

  const exp: any = q('.hd-exp')
  const sticky: any = q('.hd-sticky')
  const nav: any = q('.hd-nav')
  const burger: any = q('.hd-burger')
  const menu: any = q('.hd-menu')
  const scene: any = q('.hd-scene')
  const stage: any = q('.hd-stage3d')
  const mac: any = q('.hd-mac')
  const lid: any = q('.hd-lid')
  const backlight: any = q('.hd-backlight')
  const wireScreen: any = q('.hd-wire-screen')
  const siteEl: any = q('.hd-site')
  const screenglow: any = q('.hd-screenglow')
  const copy: any = q('.hd-copy')
  const cue: any = q('.hd-cue')
  const linksSvg: any = q('.hd-links')
  const links: any[] = qa('.hd-link')
  const nodes: any[] = qa('.hd-node')
  const layerEls: any[] = qa('.hd-flayer')
  const mainEl: any = q('main')
  const phone: any = q('.hd-phone')
  const pwire: any = q('.hd-pwire')
  const psiteEl: any = q('.hd-psite')
  const pchips: any[] = qa('.hd-pchip')
  const ptags: any[] = qa('.hd-ptag')
  const revealEls: any[] = qa('.hd-reveal')

  links.forEach((p: any) => {
    const L = p.getTotalLength()
    p.style.strokeDasharray = L
    p.style.strokeDashoffset = L
    p.__L = L
  })

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const cfg: Record<string, any> = {
    grid: { z: -40, from: { x: -60, y: 80, z: -160, r: -5 }, par: 0.5, a: 0.34, b: 0.50 },
    nav:  { z: 96,  from: { x: -20, y: -130, z: 260, r: -4 }, par: 1.3, a: 0.36, b: 0.54 },
    img:  { z: 64,  from: { x: 180, y: 60, z: 230, r: 6 },    par: 0.9, a: 0.40, b: 0.58 },
    head: { z: 118, from: { x: -190, y: 70, z: 250, r: -6 },  par: 1.6, a: 0.42, b: 0.60 },
    code: { z: 130, from: { x: -130, y: 170, z: 300, r: 9 },  par: 2.0, a: 0.40, b: 0.58 },
  }
  layerEls.forEach((layerEl: any) => { layerEl.__cfg = cfg[layerEl.dataset.k] })

  let bScale = 0.8, bRY = -16, bRX = 8, shiftX = 150, ty = 0, parAmt = 1
  let p = 0, mx = 0, my = 0, tmx = 0, tmy = 0, introStart = 0, mProg = 0
  let mobile = false, scrollDriven = false, minimal = false
  let pinLen = 1
  let raf = 0, menuRaf = 0
  let io: IntersectionObserver | null = null

  // ---------- helpers ----------
  const eo = (t: number) => 1 - Math.pow(1 - Math.max(0, Math.min(1, t)), 3)
  const S = (prog: number, a: number, b: number) => eo((prog - a) / (b - a))

  const lighten = (hex: string, amt: number): string => {
    const m = hex.replace('#', '')
    const n = parseInt(m.length === 3 ? m.split('').map((c: string) => c + c).join('') : m, 16)
    let r = (n >> 16) & 255, g = (n >> 8) & 255, b2 = n & 255
    const f = (v: number) => Math.max(0, Math.min(255, Math.round(v + (amt > 0 ? (255 - v) * amt : v * amt))))
    return '#' + [f(r), f(g), f(b2)].map((v: number) => v.toString(16).padStart(2, '0')).join('')
  }

  // ---------- menu ----------
  function fadeMenu(open: boolean) {
    if (!menu) return
    if (open) { menu.style.setProperty('visibility', 'visible', 'important'); menu.style.setProperty('pointer-events', 'auto', 'important') }
    if (menuRaf) cancelAnimationFrame(menuRaf)
    const start = performance.now()
    const from = parseFloat(getComputedStyle(menu).opacity) || 0
    const to = open ? 1 : 0
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / 260)
      const v = from + (to - from) * t
      menu.style.setProperty('opacity', String(v), 'important')
      if (t < 1) { menuRaf = requestAnimationFrame(step) }
      else if (!open) { menu.style.setProperty('visibility', 'hidden', 'important'); menu.style.setProperty('pointer-events', 'none', 'important') }
    }
    menuRaf = requestAnimationFrame(step)
  }

  const openMenu = () => {
    if (!menu) return
    fadeMenu(true)
    document.body.style.overflow = 'hidden'
    if (burger) burger.setAttribute('aria-expanded', 'true')
    const f = menu.querySelector('.hd-menu-link')
    if (f) (f as HTMLElement).focus()
  }

  const closeMenu = () => {
    if (!menu) return
    fadeMenu(false)
    document.body.style.overflow = ''
    if (burger) burger.setAttribute('aria-expanded', 'false')
  }

  // ---------- reveal ----------
  function setupReveal() {
    if (reduce) { revealEls.forEach((revEl: any) => { revEl.style.opacity = '1' }); return }
    revealEls.forEach((revEl: any) => {
      revEl.style.opacity = '0'
      revEl.style.transform = 'translateY(26px)'
      revEl.style.transition = 'opacity .85s cubic-bezier(.2,.7,.2,1), transform .85s cubic-bezier(.2,.7,.2,1)'
    })
    io = new IntersectionObserver((ents) => {
      ents.forEach((en) => {
        if (en.intersectionRatio > 0.16) {
          (en.target as HTMLElement).style.opacity = '1';
          (en.target as HTMLElement).style.transform = 'none'
          io!.unobserve(en.target)
        }
      })
    }, { threshold: [0, 0.16, 0.5] })
    revealEls.forEach((revEl: any) => io!.observe(revEl))
  }

  // ---------- props / layout ----------
  function applyProps() {
    const accent = '#5FA47E'
    el.style.setProperty('--accent', accent)
    el.style.setProperty('--accent-br', '#79BB97')
    el.style.setProperty('--accent-dp', '#4A8466')
    el.style.setProperty('--warm', '#9ECDB4')
    minimal = false
    doLayout()
  }

  function doLayout() {
    const w = window.innerWidth
    const small = w <= 900
    const xs = w <= 560
    mobile = small
    scrollDriven = !small && !reduce

    if (exp) exp.style.height = scrollDriven ? '240vh' : 'auto'
    pinLen = Math.max(1, exp ? exp.offsetHeight - window.innerHeight : 1)

    if (small) {
      if (sticky) Object.assign(sticky.style, { position: 'static', height: 'auto', minHeight: '100vh', overflow: 'visible', paddingTop: '94px', paddingBottom: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: '', opacity: '1' })
      if (mainEl) mainEl.style.marginTop = '0'
      if (copy) {
        Object.assign(copy.style, { position: 'relative', left: 'auto', right: 'auto', top: 'auto', transform: 'none', maxWidth: '560px', margin: '0 auto', padding: '0 clamp(20px,7vw,40px)', textAlign: 'center' })
        copy.querySelectorAll('.hd-kicker,.hd-cta').forEach((e: any) => { e.style.justifyContent = 'center' })
        const trust = copy.querySelector('.hd-trust') as HTMLElement | null
        if (trust) trust.style.justifyContent = 'center'
        const sub = copy.querySelector('.hd-sub') as HTMLElement | null
        if (sub) sub.style.margin = '0 auto 32px'
      }
      if (scene) Object.assign(scene.style, { position: 'relative', inset: 'auto', height: '480px', width: '100%', marginTop: '12px' })
      if (cue) cue.style.display = 'none'
      if (stage) stage.style.display = 'none'
      if (phone) phone.style.display = 'block'
    } else {
      if (sticky) Object.assign(sticky.style, { position: 'sticky', height: '100vh', minHeight: '', overflow: 'hidden', paddingTop: '0', paddingBottom: '0', display: 'block', zIndex: '3' })
      if (mainEl) mainEl.style.marginTop = '-80vh'
      if (copy) {
        Object.assign(copy.style, { position: 'absolute', left: 'clamp(20px,5vw,64px)', right: 'auto', top: '50%', transform: 'translateY(-50%)', maxWidth: '540px', margin: '0', padding: '0', textAlign: 'left' })
        copy.querySelectorAll('.hd-kicker,.hd-cta').forEach((e: any) => { e.style.justifyContent = '' })
        const trust = copy.querySelector('.hd-trust') as HTMLElement | null
        if (trust) trust.style.justifyContent = ''
        const sub = copy.querySelector('.hd-sub') as HTMLElement | null
        if (sub) sub.style.margin = '0 0 36px'
      }
      if (scene) Object.assign(scene.style, { position: 'absolute', inset: '0', height: '', width: '', marginTop: '0' })
      if (cue) cue.style.display = ''
      if (stage) stage.style.display = ''
      if (phone) phone.style.display = 'none'
    }

    const navlinks = el.querySelector('.hd-navlinks') as HTMLElement | null
    if (navlinks) navlinks.style.display = small ? 'none' : 'flex'
    if (burger) burger.style.display = small ? 'flex' : 'none'
    if (!small) closeMenu()

    const svc = el.querySelector('.hd-services') as HTMLElement | null
    if (svc) svc.style.gridTemplateColumns = small ? '1fr' : 'repeat(4,1fr)'
    const steps = el.querySelector('.hd-steps') as HTMLElement | null
    if (steps) steps.style.gridTemplateColumns = small ? '1fr' : 'repeat(3,1fr)'
    const work = el.querySelector('.hd-work') as HTMLElement | null
    if (work) work.style.gridTemplateColumns = xs ? '1fr' : (small ? 'repeat(2,1fr)' : 'repeat(3,1fr)')
    const over = el.querySelector('#over .hd-reveal') as HTMLElement | null
    if (over) over.style.gridTemplateColumns = small ? '1fr' : '1.1fr 0.9fr'

    bScale = xs ? 0.5 : (small ? 0.6 : 0.8)
    shiftX = small ? 0 : 150
    ty = small ? 8 : 0
    bRY = small ? -8 : -16
    bRX = small ? 6 : 8
    parAmt = small ? 0 : 1

    const heavy = ['grid', 'code']
    layerEls.forEach((layerEl: any) => {
      const hide = small || (minimal && heavy.includes(layerEl.dataset.k))
      layerEl.style.display = hide ? 'none' : ''
    })
  }

  // ---------- animation loop ----------
  const loop = (now: number) => {
    if (!introStart) introStart = now
    const intro = Math.min(1, (now - introStart) / 1400)
    mProg = mobile ? Math.min(1, (now - introStart) / 2800) : 0

    if (scrollDriven) {
      const top = window.scrollY || document.documentElement.scrollTop || 0
      p = Math.max(0, Math.min(1, top / pinLen))
      if (nav) {
        nav.style.background = top > 24 ? 'rgba(9,9,8,0.72)' : 'transparent'
        nav.style.backdropFilter = top > 24 ? 'blur(14px)' : 'none'
        nav.style.borderBottomColor = top > 24 ? 'var(--line)' : 'transparent'
      }
    } else {
      p = 0.58
    }

    if (reduce) { mx = 0; my = 0 }
    else { mx += (tmx - mx) * 0.06; my += (tmy - my) * 0.06 }

    render(intro)
    raf = requestAnimationFrame(loop)
  }

  function render(intro: number) {
    const ie = eo(intro)
    const mxP = mx * (parAmt || 0)
    const myP = my * (parAmt || 0)
    const composed = !scrollDriven

    const camIn = S(p, 0.12, 0.5)
    const txOut = S(p, 0.10, 0.42)
    const outro = S(p, 0.62, 0.88)
    const layerFade = S(p, 0.58, 0.78)

    const scale = bScale + camIn * 0.16
    const tx = (1 - txOut) * shiftX
    const camRY = bRY + S(p, 0.12, 0.5) * 12 + mxP * 4
    const camRX = bRX - myP * 2.4
    if (stage) stage.style.transform = `scale(${scale}) translate3d(${tx}px,${ty}px,0) rotateX(${camRX}deg) rotateY(${camRY}deg)`

    const lidRX = -72 + ie * 66 - outro * 70
    if (lid) lid.style.transform = `rotateX(${lidRX}deg)`
    if (mac) mac.style.transform = `translateY(${outro * 150}px) scale(${1 - outro * 0.32})`

    if (scene) scene.style.opacity = String(1 - S(p, 0.68, 0.88))
    if (scrollDriven) {
      if (sticky) { sticky.style.opacity = String(1 - S(p, 0.68, 0.90)); sticky.style.pointerEvents = p > 0.75 ? 'none' : '' }
    } else {
      if (sticky) { sticky.style.opacity = '1'; sticky.style.pointerEvents = '' }
    }

    if (backlight) backlight.style.opacity = String(ie)
    if (wireScreen) wireScreen.style.opacity = String(ie * (1 - S(p, 0.46, 0.62)))
    if (siteEl) siteEl.style.opacity = String(S(p, 0.50, 0.66))
    if (screenglow) screenglow.style.opacity = String(ie * 0.9)

    if (copy) {
      if (composed) {
        copy.style.opacity = String(ie)
        copy.style.transform = mobile ? 'none' : 'translateY(-50%)'
        copy.style.pointerEvents = ''
      } else {
        const fade = S(p, 0.10, 0.32)
        copy.style.opacity = String(ie * (1 - fade))
        copy.style.transform = `translateY(calc(-50% - ${fade * 64}px))`
        copy.style.pointerEvents = fade > 0.85 ? 'none' : ''
      }
    }

    if (cue) cue.style.opacity = String((scrollDriven ? (1 - S(p, 0.02, 0.12)) : 0) * ie)

    const draw = S(p, 0.44, 0.62)
    const linkOp = S(p, 0.42, 0.58) * (1 - layerFade)
    if (linksSvg) linksSvg.style.opacity = String(linkOp)
    links.forEach((pa: any) => { pa.style.strokeDashoffset = String(pa.__L * (1 - draw)) })
    nodes.forEach((n: any) => { n.style.opacity = String(draw * 0.9) })

    layerEls.forEach((layerEl: any) => {
      const c = layerEl.__cfg; if (!c) return
      const t = S(p, c.a, c.b)
      const inv = 1 - t
      let x = c.from.x * inv + mxP * c.par * 6
      let y = c.from.y * inv + myP * c.par * -5
      let z = c.z + c.from.z * inv
      const rot = c.from.r * inv
      let op = t * (1 - layerFade)
      const f = layerFade
      x *= (1 - f * 0.5); z -= c.z * f * 0.8; y += f * 12
      layerEl.style.opacity = String(Math.max(0, op))
      layerEl.style.transform = `translate3d(${x}px,${y}px,${z}px) rotate(${rot}deg) scale(${1 - f * 0.08})`
    })

    if (phone && mobile) {
      const mp = mProg || 0
      phone.style.opacity = String(ie)
      phone.style.transform = `translate(-50%,calc(-50% + ${(1 - ie) * 26}px)) scale(${0.94 + 0.06 * ie})`
      const siteIn = S(mp, 0.34, 0.58)
      if (pwire) pwire.style.opacity = String(ie * (1 - S(mp, 0.26, 0.46)))
      if (psiteEl) { psiteEl.style.opacity = String(siteIn); psiteEl.style.transform = `translateY(${(1 - siteIn) * 14}px)` }
      pchips.forEach((chip: any, i: number) => {
        const ai = 0.46 + 0.34 * (i / (pchips.length || 1))
        const r = eo(Math.min(1, Math.max(0, (mp - ai) / 0.12)))
        chip.style.opacity = String(0.16 + 0.84 * r)
        chip.style.transform = `translateY(${(1 - r) * 10}px)`
        const on = r > 0.55
        const chk = chip.querySelector('.hd-pchk') as HTMLElement | null
        if (chk) { chk.style.background = on ? 'var(--accent)' : 'transparent'; chk.style.borderColor = on ? 'var(--accent)' : 'var(--line)'; const s = chk.querySelector('svg') as HTMLElement | null; if (s) s.style.opacity = on ? '1' : '0' }
      })
      ptags.forEach((tg: any, i: number) => {
        const ai = 0.52 + 0.36 * (i / (ptags.length || 1))
        const r = eo(Math.min(1, Math.max(0, (mp - ai) / 0.11)))
        tg.style.opacity = String(r)
        tg.style.transform = `translateY(${(1 - r) * 10}px)`
      })
    }
  }

  // ---------- event handlers ----------
  const onResize = () => doLayout()
  const onMove = (e: PointerEvent) => {
    const rect = el.getBoundingClientRect()
    tmx = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    tmy = ((e.clientY - rect.top) / rect.height - 0.5) * 2
  }
  const onLeave = () => { tmx = 0; tmy = 0 }
  const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeMenu() }

  // ---------- mount ----------
  applyProps()
  setupReveal()

  window.addEventListener('resize', onResize)
  el.addEventListener('pointermove', onMove as EventListener)
  el.addEventListener('pointerleave', onLeave)
  if (burger) burger.addEventListener('click', openMenu)
  qa('.hd-menu-close, .hd-menu-link').forEach((menuEl: any) => menuEl.addEventListener('click', closeMenu))
  document.addEventListener('keydown', onKey as EventListener)

  raf = requestAnimationFrame(loop)

  // ---------- cleanup ----------
  return () => {
    if (raf) cancelAnimationFrame(raf)
    if (menuRaf) cancelAnimationFrame(menuRaf)
    if (io) io.disconnect()
    el.removeEventListener('pointermove', onMove as EventListener)
    el.removeEventListener('pointerleave', onLeave)
    window.removeEventListener('resize', onResize)
    document.removeEventListener('keydown', onKey as EventListener)
    document.body.style.overflow = ''
  }

  // suppress unused warning for lighten (referenced indirectly)
  void lighten
}

const ROOT_STYLE: React.CSSProperties = {
  ['--bg' as string]: '#0c0b09',
  ['--bg2' as string]: '#070706',
  ['--surface' as string]: '#11100E',
  ['--text' as string]: '#F4F1EC',
  ['--muted' as string]: '#9B968D',
  ['--faint' as string]: '#6B665E',
  ['--line' as string]: 'rgba(244,241,236,0.10)',
  ['--line2' as string]: 'rgba(244,241,236,0.05)',
  ['--accent' as string]: '#5FA47E',
  ['--accent-br' as string]: '#79BB97',
  ['--accent-dp' as string]: '#4A8466',
  ['--warm' as string]: '#9ECDB4',
  position: 'relative',
  width: '100%',
  background: '#070706',
  color: 'var(--text)',
  fontFamily: "var(--font-body-src, 'Inter', system-ui, sans-serif)",
  WebkitFontSmoothing: 'antialiased',
}

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!rootRef.current) return
    return initHitzAnimation(rootRef.current)
  }, [])

  return (
    <div
      ref={rootRef}
      style={ROOT_STYLE}
      dangerouslySetInnerHTML={{ __html: BODY_HTML }}
    />
  )
}
