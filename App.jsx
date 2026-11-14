import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const page = String.raw`<!-- ===== NAVBAR ===== -->
  <header class="navbar" id="navbar">
    <div class="nav-container">
      <a href="#hero" class="logo" aria-label="Mubok Farm Home">
        <img class="brand-mark" src="/images/mubok-farms-logo.jpg" alt="Mubok Farms Limited logo"/>
        <span class="logo-wordmark">Mubok <em>Farm</em></span>
      </a>
      <nav class="nav-links" id="navLinks" aria-label="Main navigation">
        <a href="#services" class="nav-link">Services</a>
        <a href="#produce" class="nav-link">Our Farm</a>
        <a href="#about" class="nav-link">About</a>
        <a href="#livestock" class="nav-link">Livestock</a>
        <a href="#animals" class="nav-link">Animals</a>
        <a href="#products" class="nav-link">Products</a>
        <a href="#ordering" class="nav-link">How to Order</a>
        <a href="#contact" class="nav-link">Contact</a>
        <a href="#contact" class="nav-cta">Get a Free Quote</a>
        <button class="admin-trigger" type="button" data-admin-open>Admin</button>
      </nav>
      <button class="hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>

  <main>

    <!-- ===== HERO ===== -->
    <section class="hero" id="hero">
      <div class="hero-bg">
        <div class="hero-shapes">
          <div class="hs hs-1"></div>
          <div class="hs hs-2"></div>
          <div class="hs hs-3"></div>
        </div>
      </div>
      <div class="hero-content">
        <div class="hero-badge reveal">
          <svg viewBox="0 0 10 10" aria-hidden="true"><circle cx="5" cy="5" r="3" fill="currentColor"/></svg>
          Est. 2005 &nbsp;&middot;&nbsp; Proudly Nigerian
        </div>
        <h1 class="hero-title reveal delay-1">
          Rooted in the<br/>
          <em>Earth,</em> Grown<br/>
          with <em>Integrity.</em>
        </h1>
        <p class="hero-sub reveal delay-2">
          Mubok Farm delivers fresh produce and responsibly raised livestock straight from our fields to your community — naturally, ethically, and with pride.
        </p>
        <div class="hero-actions reveal delay-3">
          <a href="#contact" class="btn btn-primary">
            Get a Free Quote
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5"/></svg>
          </a>
          <a href="#services" class="btn btn-ghost">Explore Our Farm</a>
        </div>
        <div class="hero-stats reveal delay-3">
          <div class="stat"><strong>20+</strong><span>Years of Excellence</span></div>
          <div class="stat-sep"></div>
          <div class="stat"><strong>500+</strong><span>Families Served</span></div>
          <div class="stat-sep"></div>
          <div class="stat"><strong>100%</strong><span>Natural Produce</span></div>
        </div>
      </div>
      <div class="hero-scroll-cue">
        <div class="scroll-line"></div>
        <span>Scroll</span>
      </div>
    </section>

    <div class="farm-ribbon" aria-label="Mubok Farms: animals husbandry, fresh produce, trusted care"><span>✳ &nbsp; MUBOK FARMS LIMITED</span><i></i><span>ANIMALS HUSBANDRY</span><i></i><span>ROOTED IN NIGERIA</span><i></i><span>✳ &nbsp; MUBOK FARMS LIMITED</span></div>

    <!-- ===== SERVICES ===== -->
    <section class="services" id="services">
      <div class="container">
        <div class="section-header">
          <span class="section-label">What We Offer</span>
          <h2 class="section-title">Farm Fresh <em>Services</em></h2>
          <p class="section-desc">From seed to harvest, from pasture to plate — every step managed with integrity and care.</p>
        </div>
        <div class="services-grid">

          <article class="service-card" data-aos>
            <div class="svc-icon">
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="24" y1="42" x2="24" y2="20"/>
                <path d="M24 34c-4-2-7-6-7-11a7 7 0 0 1 7-7"/>
                <path d="M24 34c4-2 7-6 7-11a7 7 0 0 0-7-7"/>
                <path d="M24 28c-2.5-1.5-4-4-4-7a4 4 0 0 1 4-4"/>
                <path d="M24 28c2.5-1.5 4-4 4-7a4 4 0 0 0-4-4"/>
                <line x1="18" y1="42" x2="30" y2="42"/>
              </svg>
            </div>
            <h3>Crop Farming</h3>
            <p>Seasonal crops cultivated with sustainable practices — maize, sorghum, vegetables, and more, delivered fresh from our fields.</p>
            <a href="#contact" class="card-link">
              Enquire
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
            </a>
          </article>

          <article class="service-card featured" data-aos>
            <div class="featured-badge">Most Popular</div>
            <div class="svc-icon">
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M10 21c0-2 1.5-4 3.5-5L16 15v-4h4v3.5l3-1h6l3 1V11h4v4l2.5 1c2 1 3.5 3 3.5 5v8c0 2-1 3.5-2.5 4.5V38h-5v-3H15v3h-5v-4.5C8.5 32.5 8 31 8 29v-8z"/>
                <circle cx="19" cy="23" r="1.5" fill="currentColor" stroke="none"/>
                <circle cx="29" cy="23" r="1.5" fill="currentColor" stroke="none"/>
                <path d="M21 30c1 1.5 5 1.5 6 0"/>
                <path d="M13 14c-2-1-4-3-2-6 1-1.5 3.5 0 3.5 0s.5-3.5 2.5-3"/>
                <path d="M35 14c2-1 4-3 2-6-1-1.5-3.5 0-3.5 0s-.5-3.5-2.5-3"/>
              </svg>
            </div>
            <h3>Livestock Rearing</h3>
            <p>Cows and bulls, goats, sheep and rams, chickens, ducks, turkeys, and guinea fowl. Ask us about current animals and availability.</p>
            <a href="#contact" class="card-link">
              Enquire
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
            </a>
          </article>

          <article class="service-card" data-aos>
            <div class="svc-icon">
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="4" y="17" width="28" height="18" rx="2"/>
                <path d="M32 23h7l5 7v6H32V23z"/>
                <circle cx="13" cy="38" r="4.5"/>
                <circle cx="37" cy="38" r="4.5"/>
                <line x1="4" y1="23" x2="32" y2="23"/>
                <line x1="10" y1="17" x2="10" y2="10"/>
                <line x1="22" y1="17" x2="22" y2="10"/>
                <line x1="7" y1="10" x2="25" y2="10"/>
              </svg>
            </div>
            <h3>Farm-to-Door Delivery</h3>
            <p>We bring our freshest produce and animal products directly to your home, restaurant, or business. Reliable, fast, and fully local.</p>
            <a href="#contact" class="card-link">
              Enquire
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
            </a>
          </article>

        </div>
      </div>
    </section>

    <!-- ===== ABOUT ===== -->
    <section class="about" id="about">
      <div class="container about-grid">

        <div class="about-visual" data-aos>
          <figure class="about-illustration">
            <svg viewBox="0 0 440 340" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mubok Farm scenic illustration">
              <!-- Deep sky -->
              <rect width="440" height="340" fill="#1a2e1c"/>
              <!-- Subtle horizon glow -->
              <ellipse cx="220" cy="200" rx="280" ry="100" fill="#2d4a1e" opacity="0.6"/>
              <!-- Moon -->
              <circle cx="370" cy="55" r="26" fill="#c9932a" opacity="0.5"/>
              <circle cx="378" cy="50" r="20" fill="#1a2e1c"/>
              <!-- Stars -->
              <circle cx="40" cy="28" r="1.2" fill="#f5f0e8" opacity="0.7"/>
              <circle cx="80" cy="18" r="0.8" fill="#f5f0e8" opacity="0.5"/>
              <circle cx="155" cy="30" r="1" fill="#f5f0e8" opacity="0.6"/>
              <circle cx="200" cy="18" r="1.2" fill="#f5f0e8" opacity="0.7"/>
              <circle cx="255" cy="28" r="0.8" fill="#f5f0e8" opacity="0.5"/>
              <circle cx="300" cy="15" r="1" fill="#f5f0e8" opacity="0.6"/>
              <circle cx="60" cy="55" r="0.8" fill="#f5f0e8" opacity="0.4"/>
              <circle cx="130" cy="50" r="1" fill="#f5f0e8" opacity="0.5"/>
              <!-- Background hills -->
              <ellipse cx="220" cy="310" rx="300" ry="90" fill="#162414"/>
              <ellipse cx="60" cy="290" rx="140" ry="70" fill="#1e2e14"/>
              <ellipse cx="390" cy="295" rx="120" ry="65" fill="#1e2e14"/>
              <!-- Barn structure -->
              <rect x="155" y="168" width="130" height="98" fill="#5c3a1e"/>
              <rect x="155" y="168" width="130" height="98" stroke="#7a4f28" stroke-width="1"/>
              <!-- Barn roof -->
              <polygon points="148,168 220,115 292,168" fill="#4a2e14"/>
              <polygon points="148,168 220,115 292,168" fill="none" stroke="#6b4422" stroke-width="1.5"/>
              <!-- Barn silo -->
              <rect x="290" y="185" width="28" height="81" rx="2" fill="#4a3220"/>
              <ellipse cx="304" cy="185" rx="14" ry="6" fill="#5c4030"/>
              <!-- Barn door -->
              <rect x="192" y="210" width="56" height="56" rx="2" fill="#2a1a0c"/>
              <line x1="220" y1="210" x2="220" y2="266" stroke="#4a2e14" stroke-width="1.5"/>
              <line x1="192" y1="238" x2="248" y2="238" stroke="#4a2e14" stroke-width="1.5"/>
              <circle cx="216" cy="238" r="2.5" fill="#c9932a"/>
              <circle cx="224" cy="238" r="2.5" fill="#c9932a"/>
              <!-- Windows -->
              <rect x="162" y="180" width="26" height="22" rx="2" fill="#2a1a0c"/>
              <rect x="252" y="180" width="26" height="22" rx="2" fill="#2a1a0c"/>
              <line x1="175" y1="180" x2="175" y2="202" stroke="#3a2410" stroke-width="1"/>
              <line x1="265" y1="180" x2="265" y2="202" stroke="#3a2410" stroke-width="1"/>
              <!-- Warm barn light glow -->
              <ellipse cx="220" cy="266" rx="40" ry="8" fill="#c9932a" opacity="0.1"/>
              <!-- Tree left -->
              <rect x="78" y="218" width="9" height="48" fill="#3d2c1a"/>
              <ellipse cx="82" cy="210" rx="26" ry="35" fill="#1e4020" opacity="0.9"/>
              <ellipse cx="78" cy="200" rx="18" ry="24" fill="#265526"/>
              <!-- Tree right -->
              <rect x="362" y="222" width="9" height="44" fill="#3d2c1a"/>
              <ellipse cx="366" cy="214" rx="24" ry="32" fill="#1e4020" opacity="0.9"/>
              <ellipse cx="370" cy="205" rx="16" ry="22" fill="#265526"/>
              <!-- Fence left -->
              <line x1="106" y1="248" x2="106" y2="275" stroke="#7a6040" stroke-width="2.5"/>
              <line x1="120" y1="246" x2="120" y2="273" stroke="#7a6040" stroke-width="2.5"/>
              <line x1="134" y1="246" x2="134" y2="273" stroke="#7a6040" stroke-width="2.5"/>
              <line x1="148" y1="247" x2="148" y2="274" stroke="#7a6040" stroke-width="2.5"/>
              <line x1="104" y1="257" x2="150" y2="255" stroke="#7a6040" stroke-width="2"/>
              <line x1="104" y1="268" x2="150" y2="267" stroke="#7a6040" stroke-width="2"/>
              <!-- Fence right -->
              <line x1="292" y1="247" x2="292" y2="274" stroke="#7a6040" stroke-width="2.5"/>
              <line x1="306" y1="246" x2="306" y2="273" stroke="#7a6040" stroke-width="2.5"/>
              <line x1="320" y1="246" x2="320" y2="273" stroke="#7a6040" stroke-width="2.5"/>
              <line x1="334" y1="248" x2="334" y2="275" stroke="#7a6040" stroke-width="2.5"/>
              <line x1="290" y1="257" x2="336" y2="255" stroke="#7a6040" stroke-width="2"/>
              <line x1="290" y1="268" x2="336" y2="267" stroke="#7a6040" stroke-width="2"/>
              <!-- Cow silhouette -->
              <ellipse cx="120" cy="268" rx="20" ry="11" fill="#4a3020"/>
              <ellipse cx="138" cy="262" rx="10" ry="9" fill="#4a3020"/>
              <line x1="104" y1="279" x2="102" y2="294" stroke="#3a2415" stroke-width="3"/>
              <line x1="112" y1="280" x2="111" y2="294" stroke="#3a2415" stroke-width="3"/>
              <line x1="122" y1="279" x2="121" y2="294" stroke="#3a2415" stroke-width="3"/>
              <line x1="132" y1="279" x2="133" y2="294" stroke="#3a2415" stroke-width="3"/>
              <line x1="143" y1="257" x2="150" y2="254" stroke="#3a2415" stroke-width="2.5"/>
              <!-- Sheep silhouette -->
              <ellipse cx="322" cy="269" rx="16" ry="10" fill="#bdb5a8"/>
              <ellipse cx="336" cy="264" rx="9" ry="8" fill="#bdb5a8"/>
              <line x1="310" y1="279" x2="308" y2="292" stroke="#888074" stroke-width="2.5"/>
              <line x1="318" y1="280" x2="317" y2="292" stroke="#888074" stroke-width="2.5"/>
              <line x1="326" y1="280" x2="325" y2="292" stroke="#888074" stroke-width="2.5"/>
              <line x1="334" y1="279" x2="335" y2="292" stroke="#888074" stroke-width="2.5"/>
              <!-- Wheat stalks -->
              <g opacity="0.85" stroke="#b8902a" stroke-width="1.5" stroke-linecap="round">
                <line x1="170" y1="280" x2="169" y2="258"/>
                <line x1="178" y1="280" x2="177" y2="255"/>
                <line x1="186" y1="280" x2="185" y2="258"/>
                <line x1="194" y1="280" x2="193" y2="256"/>
                <line x1="202" y1="280" x2="201" y2="259"/>
                <line x1="246" y1="280" x2="245" y2="258"/>
                <line x1="254" y1="280" x2="253" y2="255"/>
                <line x1="262" y1="280" x2="261" y2="258"/>
                <line x1="270" y1="280" x2="269" y2="256"/>
                <!-- Grain heads -->
                <ellipse cx="169" cy="255" rx="3" ry="5" fill="#c9932a" stroke="none" opacity="0.8"/>
                <ellipse cx="177" cy="252" rx="3" ry="5" fill="#c9932a" stroke="none" opacity="0.8"/>
                <ellipse cx="185" cy="255" rx="3" ry="5" fill="#c9932a" stroke="none" opacity="0.8"/>
                <ellipse cx="193" cy="253" rx="3" ry="5" fill="#c9932a" stroke="none" opacity="0.8"/>
                <ellipse cx="201" cy="256" rx="3" ry="5" fill="#c9932a" stroke="none" opacity="0.8"/>
                <ellipse cx="245" cy="255" rx="3" ry="5" fill="#c9932a" stroke="none" opacity="0.8"/>
                <ellipse cx="253" cy="252" rx="3" ry="5" fill="#c9932a" stroke="none" opacity="0.8"/>
                <ellipse cx="261" cy="255" rx="3" ry="5" fill="#c9932a" stroke="none" opacity="0.8"/>
                <ellipse cx="269" cy="253" rx="3" ry="5" fill="#c9932a" stroke="none" opacity="0.8"/>
              </g>
              <!-- Ground plane -->
              <rect x="0" y="295" width="440" height="45" fill="#0e1c0e" opacity="0.7"/>
              <!-- Brand text -->
              <text x="220" y="325" text-anchor="middle" font-family="Georgia, serif" font-size="10" fill="#c9932a" opacity="0.6" letter-spacing="5">MUBOK FARM</text>
            </svg>
          </figure>
          <div class="about-stat-pill">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            <div>
              <strong>20+ Years</strong>
              <span>of farming excellence</span>
            </div>
          </div>
        </div>

        <div class="about-text" data-aos>
          <span class="section-label">Our Story</span>
          <h2 class="section-title">A farm with roots in <em>Ilaro.</em></h2>
          <p class="about-intro">Mubok Farms Limited is based in Jamia, Ilaro, Ogun State, Nigeria. Since 2005, the farm has brought crop farming and animal husbandry together, serving people looking for farm produce and livestock from a local source.</p>
          <p class="about-intro about-detail-copy">The farm grows maize, sorghum, and seasonal vegetables, and raises cows and bulls, goats, sheep and rams, chickens, ducks, turkeys, and guinea fowl. Farm-to-door delivery is available as a service. Because harvests and livestock change over time, contact Mubok to confirm what is currently available, prices, quantities, and delivery to your area.</p>
          <div class="founder-card">
            <img class="founder-portrait" src="/images/founder-hafiz-mubarak-kukoyi.png" alt="Portrait of Dr. Hafiz Mubarak Kukoyi" loading="lazy"/>
            <div class="founder-bio">
              <span>Founder of Mubok Farm</span>
              <h3>Afiz Kukoyi Mubarak</h3>
              <p>Professionally profiled as Dr. Hafiz Mubarak Kukoyi, he is a medical doctor and pharmaceutical drug-safety researcher. He has also volunteered with Humanity First’s surgical team in West Africa. At Mubok, his farming work is rooted in Jamia, Ilaro, where crop growing and animal husbandry come together.</p>
              <a class="founder-source" href="https://www.muslimscientists.org/hafiz-mubarak-kukoyi" target="_blank" rel="noreferrer">Read his professional profile ↗</a>
            </div>
          </div>
          <ul class="about-checklist">
            <li>
              <span class="checkmark">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M4 10l5 5 7-8"/></svg>
              </span>
              <div>
                <strong>Based in Jamia, Ilaro</strong>
                <p>Serving customers from Ogun State, Nigeria.</p>
              </div>
            </li>
            <li>
              <span class="checkmark">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M4 10l5 5 7-8"/></svg>
              </span>
              <div>
                <strong>Livestock</strong>
                <p>Cows and bulls, does and bucks, ewes and rams, hens and roosters, ducks, turkeys, and guinea fowl.</p>
              </div>
            </li>
            <li>
              <span class="checkmark">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M4 10l5 5 7-8"/></svg>
              </span>
              <div>
                <strong>Field Crops</strong>
                <p>Maize, sorghum, and seasonal vegetables feature in our crop offering.</p>
              </div>
            </li>
            <li>
              <span class="checkmark">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M4 10l5 5 7-8"/></svg>
              </span>
              <div>
                <strong>Ask Before You Order</strong>
                <p>Check current availability, prices, quantities, and delivery options with the farm.</p>
              </div>
            </li>
          </ul>
          <a href="#contact" class="btn btn-primary">
            Work With Us
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5"/></svg>
          </a>
        </div>
      </div>
    </section>

    <!-- ===== LIVESTOCK ===== -->
    <section class="livestock" id="livestock">
      <div class="container">
        <div class="section-header light">
          <span class="section-label">Our Animals</span>
          <h2 class="section-title">Meet the Mubok <em>livestock</em></h2>
          <p class="section-desc">Cows and bulls, goats, sheep and rams, chickens, ducks, turkeys, and guinea fowl. Contact us about the animals currently available.</p>
        </div>
        <div class="livestock-grid">

          <div class="lv-card" data-aos>
            <img class="lv-photo" src="/images/mubok-cattle-herd.png" alt="Mubok Farm cattle resting on green grass" loading="lazy"/>
            <div class="lv-icon">
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M10 21c0-2 1.5-4 3.5-5L16 15v-4h4v3.5l3-1h6l3 1V11h4v4l2.5 1c2 1 3.5 3 3.5 5v8c0 2-1 3.5-2.5 4.5V38h-5v-3H15v3h-5v-4.5C8.5 32.5 8 31 8 29v-8z"/>
                <circle cx="19" cy="23" r="1.5" fill="currentColor" stroke="none"/>
                <circle cx="29" cy="23" r="1.5" fill="currentColor" stroke="none"/>
                <path d="M21 30c1 1.5 5 1.5 6 0"/>
                <path d="M13 14c-2-1-4-3-2-6 1-1.5 3.5 0 3.5 0s.5-3.5 2.5-3"/>
                <path d="M35 14c2-1 4-3 2-6-1-1.5-3.5 0-3.5 0s-.5-3.5-2.5-3"/>
              </svg>
            </div>
            <h4>Cows &amp; Bulls</h4>
            <p>Male and female cattle raised at Mubok Farm. Ask us about current animals and availability.</p>
          </div>

          <div class="lv-card" data-aos>
            <img class="lv-photo" src="/images/mubok-goat-buck.png" alt="Brown and white goat with curved horns" loading="lazy"/>
            <div class="lv-icon">
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <ellipse cx="22" cy="28" rx="13" ry="9"/>
                <circle cx="33" cy="17" r="7"/>
                <circle cx="31" cy="15" r="1.5" fill="currentColor" stroke="none"/>
                <path d="M29 11L26 7M37 11L40 7"/>
                <line x1="14" y1="36" x2="13" y2="46"/>
                <line x1="19" y1="37" x2="18" y2="46"/>
                <line x1="25" y1="37" x2="25" y2="46"/>
                <line x1="30" y1="36" x2="31" y2="46"/>
                <path d="M36 21L43 25"/>
              </svg>
            </div>
            <h4>Goats</h4>
            <p>Does and bucks raised at Mubok Farm. Contact us to ask about current availability.</p>
          </div>

          <div class="lv-card" data-aos>
            <img class="lv-photo" src="/images/mubok-sheep-ram.png" alt="White sheep and a horned ram at a farm" loading="lazy"/>
            <div class="lv-icon">
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <ellipse cx="22" cy="27" rx="13" ry="10"/>
                <circle cx="33" cy="20" r="6"/>
                <circle cx="31" cy="18" r="1.5" fill="currentColor" stroke="none"/>
                <path d="M11 22c-2-1-5-3-3-7 1-2 3.5-1 4.5-1s0-4.5 2.5-4.5 3 3.5 3 3.5 1.5-3.5 3.5-2.5"/>
                <path d="M28 27c3 0 5-1 6 1"/>
                <line x1="14" y1="36" x2="12" y2="46"/>
                <line x1="19" y1="37" x2="18" y2="46"/>
                <line x1="25" y1="37" x2="24" y2="46"/>
                <line x1="30" y1="36" x2="31" y2="46"/>
              </svg>
            </div>
            <h4>Sheep &amp; Rams</h4>
            <p>Ewes and rams are part of our flock. Ask about the animals currently available.</p>
          </div>

          <div class="lv-card" data-aos>
            <img class="lv-photo" src="/images/farm-ducks.jpg" alt="Ducks standing beside a river" loading="lazy"/>
            <div class="lv-icon">
              <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <ellipse cx="22" cy="29" rx="11" ry="9"/>
                <circle cx="31" cy="17" r="7"/>
                <circle cx="33" cy="15" r="1.5" fill="currentColor" stroke="none"/>
                <path d="M31 10L37 7L35 13"/>
                <path d="M27 11L23 7L21 12"/>
                <line x1="16" y1="37" x2="14" y2="46"/>
                <line x1="22" y1="38" x2="22" y2="46"/>
                <line x1="28" y1="38" x2="30" y2="46"/>
                <path d="M35 22L40 24L35 26"/>
              </svg>
            </div>
            <h4>Ducks</h4>
            <p>Ducks and drakes raised at Mubok Farm. Enquire about current availability.</p>
          </div>

          <div class="lv-card" data-aos>
            <img class="lv-photo" src="/images/farm-chickens.jpg" alt="Hens and a rooster in a farmyard" loading="lazy"/>
            <div class="lv-icon"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 29c0-7 5-12 12-12 6 0 10 4 10 10v10H15c-1-2-2-5-2-8z"/><path d="M23 17c-2-3-1-6 2-8 1 3 4 4 4 7m-17 7-5-3m29 7 7 2M19 37v5m12-5v5"/><circle cx="29" cy="22" r="1" fill="currentColor"/></svg></div>
            <h4>Chickens</h4><p>Hens and roosters raised at Mubok Farm. Ask us about current availability.</p>
          </div>

          <div class="lv-card" data-aos>
            <img class="lv-photo" src="/images/farm-turkey.jpg" alt="Turkey standing in grass" loading="lazy"/>
            <div class="lv-icon"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M24 40c-8 0-13-6-13-14 0-6 5-11 13-13 8 2 13 7 13 13 0 8-5 14-13 14z"/><path d="M24 13V7m0 0-4 4m4-4 4 4m-17 8-5-2m32 2 5-2M18 39v4m12-4v4"/><circle cx="28" cy="19" r="1" fill="currentColor"/></svg></div>
            <h4>Turkeys</h4><p>Hens and toms raised at Mubok Farm. Ask us about current availability.</p>
          </div>

          <div class="lv-card" data-aos>
            <img class="lv-photo" src="/images/guinea-fowl.jpg" alt="Helmeted guinea fowl outdoors" loading="lazy"/>
            <div class="lv-icon"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 28c0-8 5-13 13-13s13 5 13 13-5 12-13 12-13-4-13-12z"/><path d="M24 15V9l5 4m-18 9-5-3m31 3 5-3M18 39v4m12-4v4"/><circle cx="29" cy="22" r="1" fill="currentColor"/></svg></div>
            <h4>Guinea Fowl</h4><p>Male and female guinea fowl. Contact us to ask about current availability.</p>
          </div>

        </div>
      </div>
    </section>

    <!-- ===== ANIMAL PHOTO GALLERY ===== -->
    <section class="animal-gallery" id="animals">
      <div class="container">
        <div class="section-header">
          <span class="section-label">Life on the farm</span>
          <h2 class="section-title">Meet the <em>animals.</em></h2>
          <p class="section-desc">Meet our cows and bulls, goats, sheep and rams, chickens, ducks, turkeys, and guinea fowl. Ask us about current availability.</p>
        </div>
        <div class="animal-photo-grid">
          <article class="animal-photo animal-photo-cattle" data-aos><img src="/images/mubok-cattle-herd.png" alt="Mubok Farm cattle resting together on grass" loading="lazy"/><span>01 / COWS &amp; BULLS</span><h3>Strong roots.<br/><em>Healthy herds.</em></h3></article>
          <article class="animal-photo animal-photo-goat" data-aos><img src="/images/mubok-goat-buck.png" alt="Brown and white goat with curved horns" loading="lazy"/><span>02 / GOATS</span><h3>Does &amp; bucks.</h3></article>
          <article class="animal-photo animal-photo-sheep" data-aos><img src="/images/mubok-sheep-ram.png" alt="White sheep with a horned ram at a farm" loading="lazy"/><span>03 / SHEEP &amp; RAMS</span><h3>Ewes &amp; rams.</h3></article>
          <article class="animal-photo animal-photo-sheep" data-aos><img src="/images/mubok-white-ram.png" alt="White ram with large curved horns" loading="lazy"/><span>04 / RAM</span><h3>Strong, healthy<br/><em>breeding stock.</em></h3></article>
          <article class="animal-photo animal-photo-sheep" data-aos><img src="/images/mubok-sheep-flock.png" alt="Group of white sheep feeding together" loading="lazy"/><span>05 / SHEEP FLOCK</span><h3>Raised with<br/><em>care.</em></h3></article>
          <article class="animal-photo animal-photo-ducks" data-aos><img src="/images/farm-ducks.jpg" alt="Ducks standing beside a river" loading="lazy"/><span>06 / DUCKS</span><h3>Ducks &amp; drakes.</h3></article>
          <article class="animal-photo animal-photo-chickens" data-aos><img src="/images/farm-chickens.jpg" alt="Hens and a rooster in a farmyard" loading="lazy"/><span>07 / CHICKENS</span><h3>Hens &amp; roosters.</h3></article>
          <article class="animal-photo animal-photo-turkeys" data-aos><img src="/images/farm-turkey.jpg" alt="Turkey standing in grass" loading="lazy"/><span>08 / TURKEYS</span><h3>Hens &amp; toms.</h3></article>
          <article class="animal-photo animal-photo-guinea" data-aos><img src="/images/guinea-fowl.jpg" alt="Helmeted guinea fowl outdoors" loading="lazy"/><span>09 / GUINEA FOWL</span><h3>Male &amp; female<br/><em>guinea fowl.</em></h3><small class="photo-credit">Representative photo · <a href="https://commons.wikimedia.org/wiki/File:Guinea_fowls.jpg" target="_blank" rel="noreferrer">Fanny Schertzer / Wikimedia Commons</a> · <a href="https://creativecommons.org/licenses/by/2.5/" target="_blank" rel="noreferrer">CC BY 2.5</a></small></article>
          <article class="animal-photo animal-photo-palms" data-aos><img src="/images/farm-palms.jpg" alt="Palm trees in a lush green field" loading="lazy"/><span>10 / FARM LANDSCAPE</span><h3>Palm trees.<br/><em>Green horizons.</em></h3></article>
        </div>
      </div>
    </section>

    <!-- ===== FARM PRODUCTS ===== -->
    <section class="product-shelf" id="products">
      <div class="container">
        <div class="product-heading"><div><span class="section-label">Farm shop</span><h2 class="section-title">Good things from <em>our farm.</em></h2></div><p>Browse current listings from Mubok Farm. Stock changes with the season; contact us to confirm availability and delivery to your area.</p></div>
        <div class="product-grid" id="publicProducts" aria-live="polite"><p class="product-loading">Loading current farm listings…</p></div>
      </div>
    </section>

    <!-- ===== FARM PROFILE ===== -->
    <section class="farm-profile" id="produce">
      <div class="container">
        <div class="profile-heading" data-aos>
          <div>
            <span class="section-label">A closer look at Mubok</span>
            <h2 class="section-title">Field to <em>farm gate.</em></h2>
          </div>
          <p>Crop farming, animal husbandry, and delivery come together at Mubok Farms Limited. Explore the work behind the harvest and tell us what you need.</p>
        </div>
        <div class="profile-grid">
          <article class="profile-card profile-crops" data-aos>
            <img src="/images/farm-field.jpg" alt="Rows of crops growing across a green farm field" loading="lazy" />
            <div class="profile-overlay"></div>
            <div class="profile-copy"><span>01 / CROPS</span><h3>Grown with the seasons.</h3><p>Maize, sorghum, vegetables, and other seasonal produce from our fields.</p><div class="profile-tags"><span>Maize</span><span>Sorghum</span><span>Vegetables</span></div><a href="#contact">Ask about availability <b>↗</b></a></div>
          </article>
          <article class="profile-card profile-herd" data-aos>
            <img src="/images/farm-pasture-cattle.jpg" alt="Cattle grazing on open pasture" loading="lazy" />
            <div class="profile-overlay"></div>
            <div class="profile-copy"><span>02 / ANIMAL HUSBANDRY</span><h3>Raised with care.</h3><p>Cows and bulls, goats, sheep and rams, chickens, ducks, turkeys, and guinea fowl are part of the Mubok farm story.</p><div class="profile-tags"><span>Cows &amp; bulls</span><span>Goats</span><span>Sheep &amp; rams</span><span>Chickens</span><span>Ducks</span><span>Turkeys</span><span>Guinea fowl</span></div><a href="#livestock">Meet the livestock <b>↗</b></a></div>
          </article>
          <aside class="profile-note" data-aos>
            <img src="/images/mubok-farms-logo.jpg" alt="Mubok Farms Limited badge" loading="lazy" />
            <span class="section-label">Rooted in Ogun State</span>
            <h3>Good farming is a relationship with the land.</h3>
            <p>Based in Jamia, Ilaro, Mubok Farm brings traditional farming knowledge together with thoughtful, sustainable methods.</p>
            <a href="https://www.google.com/maps/search/?api=1&amp;query=Jamia%2C%20Ilaro%2C%20Ogun%20State%2C%20Nigeria" target="_blank" rel="noreferrer" class="profile-arrow">Find us in Ilaro <b>↗</b></a>
          </aside>
        </div>
        <div class="farm-journey" aria-label="Our farm journey">
          <div><span>01</span><strong>Cultivate</strong><small>Seasonal crops &amp; healthy soil</small></div><i>→</i>
          <div><span>02</span><strong>Care</strong><small>Animals raised responsibly</small></div><i>→</i>
          <div><span>03</span><strong>Deliver</strong><small>From our farm to your table</small></div>
        </div>
      </div>
    </section>
    <!-- ===== BUYING GUIDE ===== -->
    <section class="buying-guide" id="ordering">
      <div class="container guide-grid">
        <div class="guide-intro" data-aos>
          <span class="section-label">Good to know</span>
          <h2 class="section-title">A simple way to <em>get started.</em></h2>
          <p>Tell us what you are looking for and where you are located. We will help you check current availability and delivery options from our farm in Ilaro.</p>
          <a href="#contact" class="btn btn-primary">Ask about an order <span aria-hidden="true">↗</span></a>
        </div>
        <div class="guide-steps" data-aos>
          <article><span>01</span><div><h3>Choose what you need</h3><p>Ask about seasonal crops, livestock, or animal products.</p></div></article>
          <article><span>02</span><div><h3>Share your location</h3><p>Let us know your town or delivery area so we can discuss options.</p></div></article>
          <article><span>03</span><div><h3>Confirm the details</h3><p>We will reply about availability, quantities, and delivery before you place an order.</p></div></article>
        </div>
      </div>
      <div class="container faq-wrap" data-aos>
        <div><span class="section-label">Quick answers</span><h2 class="section-title">Before you <em>enquire.</em></h2></div>
        <div class="faq-list">
          <details><summary>What crops do you grow?</summary><p>Our listed crops include maize, sorghum, and seasonal vegetables. Contact us to ask what is currently available.</p></details>
          <details><summary>What animals are raised at Mubok Farm?</summary><p>Our livestock includes cows and bulls, goats, sheep and rams, chickens, ducks, turkeys, and guinea fowl. Ask us which animals are currently available.</p></details>
          <details><summary>Do you deliver?</summary><p>Farm-to-door delivery is one of our services. Share your location and order needs so we can confirm delivery options.</p></details>
          <details><summary>Where is the farm located?</summary><p>Mubok Farm is in Jamia, Ilaro, Ogun State, Nigeria. Contact us for directions before visiting.</p></details>
        </div>
      </div>
    </section>

    <!-- ===== ADMIN ACCESS ===== -->
    <dialog class="admin-dialog" id="adminDialog" aria-labelledby="adminTitle">
      <div class="admin-shell"><button type="button" class="admin-close" data-admin-close aria-label="Close admin panel">×</button>
        <div class="admin-brand"><img src="/images/mubok-farms-logo.jpg" alt=""/><span>Farm management</span></div>
        <section class="admin-auth" id="adminAuth">
          <span class="section-label">Private area</span><h2 id="adminTitle">Admin <em>access</em></h2>
          <p id="adminAuthIntro">Sign in to update product listings and your password.</p>
          <form id="adminLoginForm" class="admin-form"><label for="adminPassword">Password</label><input id="adminPassword" type="password" autocomplete="current-password" required minlength="12"/><button class="btn btn-primary" type="submit">Sign in</button></form>
          <form id="adminSetupForm" class="admin-form" hidden><label for="setupKey">One-time setup key</label><input id="setupKey" type="password" autocomplete="off" required/><label for="setupPassword">Create admin password</label><input id="setupPassword" type="password" autocomplete="new-password" minlength="12" required/><small>The site owner must set ADMIN_SETUP_KEY on the server. Use an admin password with at least 12 characters.</small><button class="btn btn-primary" type="submit">Create admin account</button></form>
          <p class="admin-message" id="adminAuthMessage" role="status"></p>
        </section>
        <section class="admin-dashboard" id="adminDashboard" hidden>
          <div class="admin-dash-head"><div><span class="section-label">Signed in</span><h2 id="adminDashboardTitle">Manage the farm shop</h2></div><button class="admin-signout" type="button" id="adminLogout">Sign out</button></div>
          <div class="admin-columns"><form id="productForm" class="admin-form admin-product-form"><h3 id="productFormTitle">Add a product</h3><input type="hidden" id="productId"/><label for="productName">Product name</label><input id="productName" required maxlength="80" placeholder="Fresh maize"/><div class="admin-fields-row"><div><label for="productCategory">Category</label><select id="productCategory"><option>Crops</option><option>Livestock</option><option>Animal products</option><option>Other</option></select></div><div><label for="productPrice">Price (₦)</label><input id="productPrice" type="number" min="0" step="0.01" placeholder="Optional"/></div></div><label for="productUnit">Unit / quantity</label><input id="productUnit" maxlength="40" placeholder="e.g. per bag, per kg"/><label for="productImage">Product image URL</label><input id="productImage" type="url" placeholder="https://…"/><label for="productDescription">Description</label><textarea id="productDescription" rows="3" maxlength="500" placeholder="Describe the product"></textarea><label class="availability-check"><input type="checkbox" id="productAvailable" checked/> Show as currently available</label><div class="admin-actions"><button class="btn btn-primary" type="submit" id="saveProduct">Add product</button><button class="admin-signout" type="button" id="cancelProductEdit" hidden>Cancel edit</button></div><p class="admin-message" id="productMessage" role="status"></p></form>
            <div class="admin-inventory"><h3>Current listings</h3><div id="adminProducts"><p>Loading listings…</p></div><form id="passwordForm" class="admin-form admin-password-form"><h3>Change admin password</h3><label for="currentPassword">Current password</label><input id="currentPassword" type="password" autocomplete="current-password" required/><label for="newPassword">New password</label><input id="newPassword" type="password" autocomplete="new-password" minlength="12" required/><button class="admin-signout" type="submit">Update password</button><p class="admin-message" id="passwordMessage" role="status"></p></form></div>
          </div>
        </section>
      </div>
    </dialog>

    <!-- ===== CONTACT ===== -->
    <section class="contact" id="contact">
      <div class="container contact-grid">

        <div class="contact-info" data-aos>
          <span class="section-label">Reach Out</span>
          <h2 class="section-title">Let's <em>Connect</em></h2>
          <p class="contact-intro">Ask about current crops, livestock, quantities, or delivery from our farm in Ilaro.</p>
          <div class="contact-items">

            <div class="c-item">
              <div class="c-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M5 4h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2C10 20 4 13.6 4 6a2 2 0 0 1 1-1.7z"/></svg>
              </div>
              <div class="c-text">
                <strong>Phone</strong>
                <a href="tel:+1 (312) 217-7806">+1 (312) 217-7806</a>
              </div>
            </div>

            <div class="c-item">
              <div class="c-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
              </div>
              <div class="c-text">
                <strong>Email</strong>
                <a href="mailto:mubokfarms1215@gmail.com"><span class="__cf_email__">mubokfarms1215@gmail.com</span></a>
              </div>
            </div>

            <div class="c-item">
              <div class="c-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
              </div>
              <div class="c-text">
                <strong>Location</strong>
                <span>Jamia, Ilaro, Ogun State, Nigeria</span>
                <a class="location-link" href="https://www.google.com/maps/search/?api=1&amp;query=Jamia%2C%20Ilaro%2C%20Ogun%20State%2C%20Nigeria" target="_blank" rel="noreferrer">Open area in Google Maps ↗</a>
              </div>
            </div>

          </div>
        </div>

     <form class="contact-form" id="contactForm" data-aos novalidate>
          <h3 class="form-heading">Send Us a Message</h3>
          <div class="form-row">
            <div class="form-group">
              <label for="name">Full Name</label>
              <div class="field-wrap">
                <svg class="field-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="10" cy="7" r="4"/><path d="M2 18c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                <input type="text" id="name" name="name" placeholder="John Doe" required autocomplete="name" />
              </div>
            </div>
            <div class="form-group">
              <label for="email">Email Address</label>
              <div class="field-wrap">
                <svg class="field-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="2" y="4" width="16" height="12" rx="2"/><path d="M2 6l8 6 8-6"/></svg>
                <input type="email" id="email" name="email" placeholder="you@example.com" required autocomplete="email" />
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="phone">Phone <span class="lbl-opt">(optional)</span></label>
            <div class="field-wrap">
              <svg class="field-icon" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 3h3l1.5 4-2 1.5a11 11 0 0 0 4 4l1.5-2 4 1.5V15a1 1 0 0 1-1 1C8.4 16 4 11.6 4 6a1 1 0 0 1 1-1z"/></svg>
              <input type="tel" id="phone" name="phone" placeholder="+234 00 000 0000" autocomplete="tel" />
            </div>
          </div>
          <div class="form-group">
            <label for="message">Message</label>
            <textarea id="message" name="message" rows="5" placeholder="Tell us how we can help you..." required></textarea>
          </div>
          <button type="submit" class="btn btn-primary full-width">
            <span class="btn-text">Send Message</span>
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5"/></svg>
          </button>
          <p class="form-success" id="formSuccess" aria-live="polite">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><circle cx="10" cy="10" r="8"/><path d="M6 10l3 3 5-5"/></svg>
            Message sent. We will be in touch shortly.
          </p>
        </form>

      </div>
    </section>

  </main>

  <!-- ===== FOOTER ===== -->

  <!-- ===== FOOTER ===== -->
  <footer class="footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <a href="#hero" class="logo footer-logo">
            <img class="brand-mark" src="/images/mubok-farms-logo.jpg" alt="Mubok Farms Limited logo"/>
            <span class="logo-wordmark">Mubok <em>Farm</em></span>
          </a>
          <p>From our land to your table — with integrity and pride.</p>
        </div>
        <nav class="footer-nav" aria-label="Footer navigation">
          <strong>Navigate</strong>
          <a href="#services">Services</a>
          <a href="#produce">Our Farm</a>
          <a href="#about">About Us</a>
          <a href="#livestock">Livestock</a>
          <a href="#animals">Animal gallery</a>
          <a href="#products">Farm shop</a>
          <a href="#ordering">How to Order</a>
          <button class="footer-admin-link" type="button" data-admin-open>Admin login</button>
          <a href="#contact">Contact</a>
        </nav>
        <div class="footer-contact-col">
          <strong>Contact</strong>
          <a href="tel:+1 (312) 217-7806">+1 (312) 217-7806 </a>
          <a href="mailto:mubokfarms1215@gmail.com">mubokfarms1215@gmail.com</a>
          <span>Jamia, Ilaro, Ogun State, Nigeria</span>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; <span id="year"></span> Mubok Farm. All rights reserved.</p>
        <p>Est. 2005 &middot; Proudly Nigerian</p>
      </div>
    </div>
  </footer>`;

function App() {
  useEffect(() => {
    const site = document.createElement('script');
    site.src = '/site.js';
    document.body.appendChild(site);
    const sdk = document.createElement('script');
    sdk.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    sdk.onload = () => {
      window.emailjs.init('CF5JLlZVt-VrpKv1b');
      const behavior = document.createElement('script');
      behavior.src = '/script.js';
      document.body.appendChild(behavior);
    };
    document.body.appendChild(sdk);
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: page }} />;
}

createRoot(document.getElementById('root')).render(<App />);
