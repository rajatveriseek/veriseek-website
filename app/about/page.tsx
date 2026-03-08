"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import ImageCarousel from "@/components/home/carousel-home";
import { getImageUrl } from "@/lib/image-utils";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; }

  @keyframes ab-fade-up {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes ab-fade-left {
    from { opacity: 0; transform: translateX(-28px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes ab-fade-right {
    from { opacity: 0; transform: translateX(28px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes ab-pulse {
    0%, 100% { opacity: 0.10; }
    50%       { opacity: 0.22; }
  }
  @keyframes ab-bounce {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50%       { transform: translateX(-50%) translateY(8px); }
  }
  @keyframes ab-marquee-scroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }

  /* animate-in triggers */
  .ab-anim-up    { opacity: 0; transform: translateY(28px);  transition: opacity 0.7s ease, transform 0.7s ease; }
  .ab-anim-left  { opacity: 0; transform: translateX(-28px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .ab-anim-right { opacity: 0; transform: translateX(28px);  transition: opacity 0.7s ease, transform 0.7s ease; }
  .ab-anim-up.is-visible, .ab-anim-left.is-visible, .ab-anim-right.is-visible {
    opacity: 1; transform: translate(0, 0);
  }
  .ab-delay-1 { transition-delay: 0.10s; }
  .ab-delay-2 { transition-delay: 0.20s; }
  .ab-delay-3 { transition-delay: 0.30s; }
  .ab-delay-4 { transition-delay: 0.40s; }
  .ab-delay-5 { transition-delay: 0.50s; }

  /* ── HERO ── */
  .ab-hero {
    background: #011638;
    min-height: 100svh;
    display: flex;
    align-items: flex-end;
    position: relative;
    overflow: hidden;
    padding: 88px clamp(20px, 8vw, 120px) 80px;
    font-family: 'DM Sans', sans-serif;
  }

  .ab-hero::before {
    content: '';
    position: absolute; inset: 0;
    background:
      linear-gradient(to right, rgba(1,22,56,0.92) 0%, rgba(1,22,56,0.68) 42%, rgba(1,22,56,0.12) 100%),
      radial-gradient(ellipse 70% 50% at 75% 40%, rgba(30,90,200,0.15) 0%, transparent 30%);
    pointer-events: none;
    z-index: 1;
  }

  .ab-hero::after {
    content: '';
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse at 65% 40%, black 20%, transparent 30%);
    -webkit-mask-image: radial-gradient(ellipse at 65% 40%, black 20%, transparent 30%);
    pointer-events: none;
  }

  .ab-hero-image {
    position: absolute;
    right: 0; top: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    object-position: center 25%;
    opacity: 1;
    pointer-events: none;
    z-index: 0;
  }

  @media (max-width: 900px) {
    .ab-hero-image { display: none !important; }
  }

  .ab-hero-orb-1 {
    position: absolute; top: 20%; left: -80px;
    width: 360px; height: 360px;
    background: rgba(245,200,66,0.06);
    border-radius: 50%; filter: blur(70px);
    animation: ab-pulse 4s ease-in-out infinite;
    pointer-events: none;
  }
  .ab-hero-orb-2 {
    position: absolute; bottom: 15%; right: -80px;
    width: 440px; height: 440px;
    background: rgba(56,189,248,0.05);
    border-radius: 50%; filter: blur(90px);
    animation: ab-pulse 4s 1.5s ease-in-out infinite;
    pointer-events: none;
  }

  .ab-hero-content {
    position: relative;
    display: flex; flex-direction: row; gap: 24px;
    z-index: 2;

    max-width: 100%;
  }

  @media (max-width: 900px) {
    .ab-hero-content { max-width: 100%; }
  }

  .ab-eyebrow {
    display: inline-flex; align-items: center; gap: 12px;
    font-size: 11px; font-weight: 700; letter-spacing: 3px;
    text-transform: uppercase; color: #f5c842;
    margin-bottom: 20px;
  }

  .ab-hero-title {
    font-size: clamp(40px, 7vw, 64px);
    font-weight: 700; line-height: 0.9;
    letter-spacing: -2px; color: #ffffff;
    font-family: 'DM Sans', sans-serif;
    margin-bottom: 28px;
    text-shadow: 0 2px 32px rgba(1,22,56,0.45);
  }

  .ab-hero-sub {
    font-size: clamp(15px, 1.6vw, 18px);
    color: rgba(255,255,255,0.65);
    line-height: 1.5; max-width: 560px;
    margin-bottom: 40px;
  }

  .ab-rule {
    width: 80px; height: 4px;
    background: linear-gradient(to right, #60a5fa, #2563eb);
    border-radius: 99px;
    margin-bottom: 40px;
  }

  .ab-stats {
    display: flex; gap: clamp(24px, 5vw, 56px);
    flex-wrap: wrap;
  }
  .ab-stat-num {
    font-size: clamp(28px, 4vw, 42px);
    font-weight: 700; color: #f5c842;
    letter-spacing: -1px; line-height: 1;
    font-family: 'DM Sans', sans-serif;
  }
  .ab-stat-label {
    font-size: 12px; font-weight: 600;
    letter-spacing: 1.5px; text-transform: uppercase;
    color: rgba(255,255,255,0.40); margin-top: 4px;
  }

  .ab-scroll-hint {
    position: absolute; bottom: 32px; left: 50%;
    transform: translateX(-50%); z-index: 2;
    opacity: 0.50;
    animation: ab-bounce 1.4s ease-in-out infinite;
  }

  /* ── SHARED SECTION STYLES ── */
  .ab-section {
    font-family: 'DM Sans', sans-serif;
    position: relative; overflow: hidden;
  }

  .ab-section-eyebrow {
    font-size: 10px; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase;
    color: #f5c842; margin-bottom: 12px; opacity: 0.80;
  }

  .ab-section-title {
    font-size: clamp(26px, 3.5vw, 38px);
    font-weight: 700; color: #ffffff;
    letter-spacing: -0.5px; line-height: 1.15;
    font-family: 'DM Sans', sans-serif;
    margin-bottom: 20px;
  }
  .ab-section-title.dark { color: #011638; }

  .ab-section-body {
    font-size: clamp(14px, 1.4vw, 15.5px);
    line-height: 1.85; color: rgba(255,255,255,0.62);
    margin-bottom: 16px;
  }
  .ab-section-body.dark { color: rgba(1,22,56,0.65); }

  .ab-blue-rule {
    width: 80px; height: 4px;
    background: linear-gradient(to right, #60a5fa, #2563eb);
    border-radius: 99px; margin-bottom: 24px;
  }
  .ab-dark-rule {
    width: 80px; height: 4px;
    background: #011638; border-radius: 99px;
    margin-bottom: 24px; opacity: 0.18;
  }

  /* ── QUOTE SECTION ── */
  .ab-quote-section {
    position: relative; overflow: hidden;
    height: 100vh; min-height: 620px;
    display: flex; align-items: stretch;
    font-family: 'DM Sans', sans-serif;
  }
  .ab-quote-bg {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover; object-position: center;
    z-index: 0;
  }
  .ab-quote-blue-overlay {
    position: absolute; inset: 0; z-index: 1;
    background: rgba(1,22,56,0.74);
  }
  .ab-quote-inner {
    position: relative; z-index: 2;
    display: flex; width: 100%;
    padding: 72px clamp(24px, 8vw, 120px);
    align-items: flex-end;
    gap: clamp(12px, 5vw, 42px);
  }
  .ab-quote-photo-col {
    flex-shrink: 0;
    width: clamp(200px, 24vw, 320px);
    position: relative; align-self: flex-end;
  }
  .ab-quote-photo {
    width: 100%;
    object-fit: cover; object-position: top center;
    display: block;
    border-radius: 0 0 14px 14px;
    filter: drop-shadow(0 8px 32px rgba(1,22,56,0.55));
    mask-image: linear-gradient(to bottom, transparent 0%, black 14%, black 100%);
    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 14%, black 100%);
  }
  .ab-quote-col {
    flex: 1; display: flex; flex-direction: column; gap: 16px;
    padding-bottom: 16px;
  }
  .ab-quote-mark {
    font-size: 100px; line-height: 0.5;
    color: #f5c842; font-family: Georgia, serif;
    opacity: 0.55; margin-bottom: -8px;
  }
  .ab-quote-text {
    font-size: clamp(17px, 2vw, 24px);
    font-family: 'Playfair Display', Georgia, serif;
    font-style: italic; font-weight: 400;
    color: #ffffff; line-height: 1.60;
  }
  .ab-quote-divider {
    width: 52px; height: 2px; background: #f5c842;
    border-radius: 99px;
  }
  .ab-quote-name {
    font-size: 16px; font-weight: 700;
    color: #f5c842; font-family: 'DM Sans', sans-serif;
    letter-spacing: -0.2px;
  }
  .ab-quote-role {
    font-size: 11px; font-weight: 600;
    color: rgba(255,255,255,0.42);
    letter-spacing: 2px; text-transform: uppercase;
    font-family: 'DM Sans', sans-serif; margin-top: 2px;
  }
  @media (max-width: 700px) {
    .ab-quote-inner { flex-direction: column; align-items: center; padding: 56px 20px 48px; }
    .ab-quote-photo-col { width: clamp(160px, 55vw, 240px); align-self: center; }
    .ab-quote-mark { font-size: 72px; }
  }

  /* ── VISION / MISSION — MERGED STICKY SCROLL ── */
  .ab-vm-section {
    height: 200vh;
    position: relative;
  }
  .ab-vm-sticky {
    position: sticky;
    top: 0;
    height: 100vh;
    overflow: hidden;
    display: flex; align-items: center; justify-content: center;
  }
  .ab-vm-layer {
    position: absolute; inset: 0;
    display: flex; align-items: center; justify-content: center;
    transition: opacity 0.80s ease;
  }
  .ab-vm-vision-layer { opacity: 1; z-index: 2; pointer-events: auto; }
  .ab-vm-mission-layer { opacity: 0; z-index: 1; pointer-events: none; }
  .ab-vm-section.is-mission .ab-vm-vision-layer { opacity: 0; pointer-events: none; }
  .ab-vm-section.is-mission .ab-vm-mission-layer { opacity: 1; z-index: 2; pointer-events: auto; }
  .ab-vm-panel-bg {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover; object-position: center;
    z-index: 0;
    transition: transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  .ab-vm-layer:hover .ab-vm-panel-bg { transform: scale(1.05); }
  .ab-vm-panel-overlay {
    position: absolute; inset: 0; z-index: 1;
    background: rgba(1,22,56,0.62);
    transition: background 0.45s ease;
  }
  .ab-vm-layer:hover .ab-vm-panel-overlay { background: rgba(1,22,56,0.46); }
  .ab-vm-content {
    position: relative; z-index: 2;
    text-align: center;
    padding: clamp(24px, 6vw, 60px) clamp(24px, 8vw, 120px);
    font-family: 'DM Sans', sans-serif;
    max-width: 860px;
  }
  .ab-vm-eyebrow {
    font-size: 11px; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase;
    color: rgba(255,255,255,0.32);
    font-family: 'DM Sans', sans-serif;
    margin-bottom: 12px;
  }
  .ab-vm-heading {
    font-size: clamp(44px, 6.5vw, 80px);
    font-weight: 700; letter-spacing: -2.5px; line-height: 1;
    color: #ffffff; font-family: 'DM Sans', sans-serif;
    margin: 0 0 22px;
    transition: letter-spacing 0.4s ease, text-shadow 0.4s ease;
  }
  .ab-vm-layer:hover .ab-vm-heading {
    letter-spacing: -1.5px;
    text-shadow: 0 0 80px rgba(245,200,66,0.22), 0 2px 24px rgba(1,22,56,0.30);
  }
  .ab-vm-rule {
    width: 0; height: 3px;
    background: linear-gradient(to right, #f5c842, rgba(245,200,66,0.20));
    border-radius: 99px;
    margin: 0 auto 22px;
    transition: width 0.85s cubic-bezier(0.22,1,0.36,1) 0.15s;
  }
  .ab-vm-rule.is-visible { width: 64px; }
  .ab-vm-layer:hover .ab-vm-rule { width: 120px; transition: width 0.55s ease; }
  .ab-vm-body {
    font-size: clamp(14px, 1.5vw, 17px);
    line-height: 1.78; max-width: 620px;
    color: rgba(255,255,255,0.62);
    font-family: 'DM Sans', sans-serif;
    margin: 0 auto;
  }
  /* scroll indicator pill inside vm section */
  .ab-vm-progress {
    position: absolute; bottom: 32px; left: 50%;
    transform: translateX(-50%); z-index: 10;
    display: flex; gap: 8px; align-items: center;
  }
  .ab-vm-pip {
    width: 8px; height: 8px; border-radius: 50%;
    background: rgba(255,255,255,0.30);
    transition: background 0.4s ease, transform 0.4s ease;
  }
  .ab-vm-pip.active { background: #f5c842; transform: scale(1.35); }

  /* ── FOUNDERS SECTION ── */
  .ab-founders {
    background: #f5c842;
    padding: 96px clamp(20px, 8vw, 120px);
  }
  .ab-founders-header {
    text-align: center; margin-bottom: 56px;
  }
  .ab-founders-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: clamp(20px, 3vw, 36px);
    max-width: 860px; margin: 0 auto;
  }

  .ab-founder-card {
    background: #ffffff;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 12px 48px rgba(1,22,56,0.16);
    display: flex; flex-direction: column;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .ab-founder-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 24px 64px rgba(1,22,56,0.24);
  }

  .ab-founder-photo {
    position: relative;
    width: 100%; aspect-ratio: 1/1;
    background: #1a3a5c; overflow: hidden;
  }
  .ab-founder-photo img {
    width: 100%; height: 100%; object-fit: cover; object-position: top;
    display: block;
    filter: grayscale(100%);
    transition: filter 0.4s ease;
  }
  .ab-founder-card:hover .ab-founder-photo img { filter: grayscale(0%); }

  .ab-founder-li {
    position: absolute; bottom: 12px; right: 12px;
    width: 34px; height: 34px; border-radius: 50%;
    background: #0077b5; color: #fff;
    display: flex; align-items: center; justify-content: center;
    text-decoration: none;
    box-shadow: 0 2px 10px rgba(0,0,0,0.30);
    transition: transform 0.2s, box-shadow 0.2s;
    z-index: 2;
  }
  .ab-founder-li:hover { transform: scale(1.12); box-shadow: 0 4px 16px rgba(0,0,0,0.35); }

  .ab-founder-body { padding: 20px 20px 24px; }
  .ab-founder-name {
    font-size: clamp(16px, 1.8vw, 20px);
    font-weight: 700; color: #011638;
    letter-spacing: -0.3px; margin-bottom: 6px;
  }
  .ab-founder-bio {
    font-size: clamp(12px, 1.1vw, 13.5px);
    color: rgba(1,22,56,0.58); line-height: 1.7;
  }

  /* ── MENTOR MARQUEE STRIP ── */
  .ab-marquee-section {
    background: #011638;
    padding: 0;
    overflow: hidden;
  }
  .ab-marquee-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 52px 0 56px;
    gap: 22px;
    position: relative;
  }
  .ab-marquee-inner::before,
  .ab-marquee-inner::after {
    content: '';
    position: absolute; left: 0; right: 0;
    height: 1px;
    background: rgba(255,255,255,0.07);
  }
  .ab-marquee-inner::before { top: 0; }
  .ab-marquee-inner::after  { bottom: 0; }

  .ab-marquee-label {
    font-family: 'DM Sans', sans-serif;
    font-size: 10px; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase;
    color: rgba(245,200,66,0.65);
    display: flex; align-items: center; gap: 12px;
  }
  .ab-marquee-label::before,
  .ab-marquee-label::after {
    content: '';
    display: inline-block; width: 28px; height: 1.5px;
    background: #f5c842; opacity: 0.5;
  }

  .ab-marquee-track-wrap {
    width: 100%; overflow: hidden;
    mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
  }
  .ab-marquee-track {
    display: flex; align-items: center;
    width: max-content;
    animation: ab-marquee-scroll 32s linear infinite;
  }
  .ab-marquee-track:hover { animation-play-state: paused; }
  /* Each set is its own flex row with gap applied internally */
  .ab-marquee-set {
    display: flex; align-items: center; gap: 12px;
    padding-right: 12px; /* matches gap so loop is gapless */
    flex-shrink: 0;
  }

  .ab-logo-badge {
    display: inline-flex; align-items: center; justify-content: center;
    padding: 8px 20px;
    background: #ffffff;
    border: 1.5px solid rgba(245,200,66,0.28);
    border-radius: 14px;
    height: 56px; flex-shrink: 0;
    box-shadow: 0 2px 10px rgba(1,22,56,0.18);
    transition: border-color 0.2s, transform 0.2s;
  }
  .ab-logo-badge:hover {
    border-color: #f5c842; transform: scale(1.05);
  }
  .ab-logo-badge img {
    height: 28px; max-width: 110px;
    width: auto; object-fit: contain; display: block;
  }

  /* ── MENTORS BOX (inside founders) ── */
  .ab-mentors-box {
    max-width: 860px;
    margin: 44px auto 0;
    border: 1.5px solid rgba(1,22,56,0.18);
    border-radius: 20px;
    background: rgba(1,22,56,0.05);
    overflow: hidden;
    padding: 28px 0 24px;
  }
  .ab-mentors-box-label {
    text-align: center;
    font-size: 10px; font-weight: 700;
    letter-spacing: 3px; text-transform: uppercase;
    color: rgba(1,22,56,0.40);
    margin-bottom: 20px;
    font-family: 'DM Sans', sans-serif;
    display: flex; align-items: center; justify-content: center; gap: 12px;
  }
  .ab-mentors-box-label::before,
  .ab-mentors-box-label::after {
    content: ''; display: inline-block;
    width: 24px; height: 1.5px;
    background: rgba(1,22,56,0.28);
  }
  .ab-mentors-box .ab-marquee-track-wrap {
    mask-image: linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%);
    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%);
  }
  .ab-mentors-box .ab-logo-badge {
    background: #ffffff;
    border: 1.5px solid rgba(1,22,56,0.12);
    box-shadow: 0 2px 8px rgba(1,22,56,0.10);
  }
  .ab-mentors-box .ab-logo-badge:hover {
    border-color: rgba(1,22,56,0.35);
  }

  /* ── APPROACH SECTION ── */
  .ab-approach {
    background: #eef0f2;
    padding: 96px clamp(20px, 8vw, 120px);
  }
  .ab-approach-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(32px, 5vw, 72px);
    align-items: center;
  }

  .ab-features { display: flex; flex-direction: column; gap: 14px; margin-top: 4px; }

  .ab-feature {
    display: flex; align-items: flex-start; gap: 16px;
    background: #ffffff;
    border-radius: 12px; padding: 16px 18px;
    border: 1px solid rgba(1,22,56,0.07);
    position: relative; overflow: hidden;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }
  .ab-feature::before {
    content: '';
    position: absolute; left: 0; top: 0; bottom: 0;
    width: 3px; background: #f5c842; border-radius: 12px 0 0 12px;
  }
  .ab-feature:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(1,22,56,0.12);
  }

  .ab-feature-icon {
    flex-shrink: 0; width: 36px; height: 36px;
    border-radius: 50%; background: #f5c842;
    display: flex; align-items: center; justify-content: center;
    color: #011638;
    box-shadow: 0 3px 10px rgba(245,200,66,0.28);
    margin-top: 1px;
  }

  .ab-feature-title {
    font-size: clamp(13px, 1.2vw, 14.5px);
    font-weight: 700; color: #011638;
    margin-bottom: 2px; letter-spacing: -0.1px;
  }
  .ab-feature-desc {
    font-size: clamp(12px, 1.05vw, 13px);
    color: rgba(1,22,56,0.55); line-height: 1.65;
  }

  /* Carousel column */
  .ab-carousel-col {
    display: flex; flex-direction: column; gap: 20px;
  }
  .ab-carousel-wrap {
    border-radius: 20px; overflow: hidden;
    box-shadow: 0 20px 56px rgba(1,22,56,0.14);
    border: 2px solid rgba(245,200,66,0.22);
  }

  /* Explore button */
  .ab-explore-btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 32px; border-radius: 100px;
    background: #f5c842; color: #011638;
    font-size: 13px; font-weight: 700;
    letter-spacing: 1px; text-transform: uppercase;
    text-decoration: none; border: 2px solid #f5c842;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.25s ease;
    box-shadow: 0 8px 24px rgba(245,200,66,0.28);
    align-self: center;
  }
  .ab-explore-btn:hover {
    background: #ffe066;
    box-shadow: 0 12px 32px rgba(245,200,66,0.45);
    transform: scale(1.04);
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .ab-approach-grid { grid-template-columns: 1fr; }
    .ab-founders-grid { grid-template-columns: 1fr 1fr; }
    .ab-vm-sticky { height: 80vh; min-height: 420px; }
    .ab-quote-section { height: auto; min-height: 100svh; }
  }
  @media (max-width: 600px) {
    .ab-vision    { padding: 64px 18px; }
    .ab-founders  { padding: 64px 18px; }
    .ab-approach  { padding: 64px 18px; }
    .ab-founders-grid { grid-template-columns: 1fr; max-width: 380px; }
  }
  @media (max-width: 380px) {
    .ab-vision    { padding: 48px 14px; }
    .ab-founders  { padding: 48px 14px; }
    .ab-approach  { padding: 48px 14px; }
  }
`;

// ─── Marquee logo data ──────────────────────────────────────────────────────────
const MARQUEE_LOGOS = [
  { src: "/images/apple.png",                                            alt: "Apple"          },
  { src: "/schools/amazon.webp",                                         alt: "Amazon"         },
  { src: "/images/McKinseyCompany_logo-dark.png",                        alt: "McKinsey"       },
  { src: "/images/ey.png",                                               alt: "EY"             },
  { src: "/images/sixth sense.png",                                      alt: "Sixth Sense"    },
  { src: "/images/leenaai.png",                                          alt: "Leena AI"       },
  { src: "/images/Nandan_Final_Logo_page-0001_12-removebg-preview.png", alt: "Nandan Capital" },
  { src: "/schools/jio-removebg-preview.png",                           alt: "Jio"            },
  { src: "/schools/cardekho-removebg-preview.png",                      alt: "CarDekho"       },
  { src: "/schools/revxcapital.png",                                     alt: "RevX Capital"   },
  { src: "/images/WhatsApp Image 2026-02-22 at 4.01.38 PM.jpeg",                                 alt: "Himland Capital" },
];

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const FEATURES = [
  {
    title: "Experiential Learning",
    desc: "Students learn through real-world challenges and projects that mirror professional environments.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
  },
  {
    title: "Expert Mentorship",
    desc: "Industry professionals and Ivy League alumni provide direct guidance and feedback.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    title: "Collaborative Environment",
    desc: "Students work together to solve problems, debate ideas, and sharpen their thinking.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
  {
    title: "Personalised Feedback",
    desc: "Regular assessment and targeted guidance for continuous, measurable improvement.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    title: "Real-World Application",
    desc: "Students apply knowledge to solve authentic business problems — not hypothetical ones.",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
];

const DIRECTORS = [
  {
    name: "Rajat Kumar",
    bio: "Former McKinsey consultant with an MBA from Wharton. Passionate about educational innovation and entrepreneurship.",
    image: getImageUrl("founder-rajat") || "/placeholder.svg",
    linkedin: "https://www.linkedin.com/in/rajat-kumar-004533/",
    initials: "RK",
  },
  {
    name: "Durba Ray",
    bio: "Former executive at Airtel with a degree from University of Rochester. Expert in educational program development.",
    image: getImageUrl("founder-durba") || "/placeholder.svg",
    linkedin: "https://www.linkedin.com/in/durba-ray-ab3a6012/",
    initials: "DR",
  },
];

export default function AboutPage() {
  const pageRef     = useRef<HTMLDivElement>(null);
  const vmRef       = useRef<HTMLDivElement>(null);
  const cssInjected = useRef(false);

  useEffect(() => {
    if (cssInjected.current) return;
    cssInjected.current = true;
    const tag = document.createElement("style");
    tag.setAttribute("data-ab", "1");
    tag.textContent = CSS;
    document.head.appendChild(tag);
  }, []);

  // Vision ↔ Mission sticky scroll toggle
  useEffect(() => {
    const section = vmRef.current;
    if (!section) return;
    const pip0 = document.getElementById("vm-pip-0");
    const pip1 = document.getElementById("vm-pip-1");
    const onScroll = () => {
      const scrolledIn = -section.getBoundingClientRect().top;
      const isMission = scrolledIn >= window.innerHeight * 0.75;
      if (isMission) {
        section.classList.add("is-mission");
        pip0?.classList.remove("active"); pip1?.classList.add("active");
      } else {
        section.classList.remove("is-mission");
        pip0?.classList.add("active"); pip1?.classList.remove("active");
      }
      // keep rules visible once sticky panel is in view
      if (scrolledIn > -window.innerHeight * 0.5) {
        section.querySelectorAll<HTMLElement>(".ab-vm-rule").forEach((r) => r.classList.add("is-visible"));
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;
    const targets = Array.from(
      page.querySelectorAll<HTMLElement>(".ab-anim-up, .ab-anim-left, .ab-anim-right, .ab-vm-rule")
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-visible");
          } else {
            (entry.target as HTMLElement).classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <div ref={pageRef} style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── HERO ── */}
      <section className="ab-hero">
        <div className="ab-hero-orb-1" aria-hidden="true" />
        <div className="ab-hero-orb-2" aria-hidden="true" />

        <img
          src={getImageUrl("about-vision") || "/placeholder.svg"}
          alt=""
          aria-hidden="true"
          className="ab-hero-image"
        />

        <div className="ab-hero-content">
          <div>
            <div className="ab-eyebrow ab-anim-up">
              <span style={{ display:"inline-block", width:28, height:2, background:"#f5c842", flexShrink:0 }} />
              Veriseek Education
              <span style={{ display:"inline-block", width:28, height:2, background:"#f5c842", flexShrink:0 }} />
            </div>

            <h1 className="ab-hero-title ab-anim-up ab-delay-1">
              Designed to Build Skills<br />
              <em style={{ fontFamily:"'Playfair Display', Georgia, serif", fontStyle:"italic", fontWeight:400 }}>
                We Wish School Had Taught
              </em>
            </h1>
          </div>

          <div>
            <div className="ab-rule ab-anim-up ab-delay-2" />

            <p className="ab-hero-sub ab-anim-up ab-delay-2">
              At Veriseek Education, we design and deliver practitioner-led programmes and competitions for schools and colleges. Students build thinking, communication, and decision-making skills through real cases, simulations, and structured feedback from industry professionals, because students deserve to learn these skills before the real world demands them.
            </p>  
          </div>

          {/* <div className="ab-stats ab-anim-up ab-delay-3">
            {[
              { num: "500+", label: "Students Impacted" },
              { num: "3+",   label: "Programmes"        },
              { num: "20+",  label: "Expert Mentors"    },
            ].map((s) => (
              <div key={s.label}>
                <div className="ab-stat-num">{s.num}</div>
                <div className="ab-stat-label">{s.label}</div>
              </div>
            ))}
          </div> */}
        </div>

        <div className="ab-scroll-hint" aria-hidden="true">
          <svg width="22" height="12" viewBox="0 0 22 12" fill="none" stroke="#fff" strokeWidth="2">
            <path d="M1 1l10 10L21 1" />
          </svg>
        </div>
      </section>

      {/* ── RAJAT KUMAR QUOTE ── */}
      <section className="ab-quote-section ab-section">
        <img src="/images/P1101633.JPG" alt="" className="ab-quote-bg" aria-hidden="true" />
        <div className="ab-quote-blue-overlay" />
        <div className="ab-quote-inner">

          {/* Person photo — left */}
          <div className="ab-quote-photo-col ab-anim-left">
            <img
              src="/images/RajatSir.jpeg"
              alt="Mr. Rajat Kumar, Director"
              className="ab-quote-photo"
            />
          </div>

          {/* Quote — right */}
          <div className="ab-quote-col ab-anim-right">
            <div className="ab-quote-mark">&ldquo;</div>
            <p className="ab-quote-text">
              At Veriseek, we want every student to walk into the real world with the
              skills that most people spend years figuring out on the job.
              That&rsquo;s the programme we wish had existed when we were students.
            </p>
            <div className="ab-quote-divider" />
            <p className="ab-quote-name">Mr. Rajat Kumar</p>
            <p className="ab-quote-role">Director, Veriseek Education</p>
          </div>

        </div>
      </section>

      {/* ── VISION + MISSION — MERGED STICKY SCROLL ── */}
      <div className="ab-vm-section" ref={vmRef} aria-label="Vision and Mission">
        <div className="ab-vm-sticky">

          {/* —— VISION LAYER (shown first) —— */}
          <div className="ab-vm-layer ab-vm-vision-layer">
            <img src="/images/students-session.JPG" alt="" className="ab-vm-panel-bg" aria-hidden="true" />
            <div className="ab-vm-panel-overlay" />
            <div className="ab-vm-content">
              <p className="ab-vm-eyebrow">About Veriseek</p>
              <h2 className="ab-vm-heading">Our Vision</h2>
              <hr className="ab-vm-rule" />
              <p className="ab-vm-body">
                To make real-world skills a normal part of education, so every student learns to
                think clearly, communicate confidently, and make sound decisions
                before life forces them to.
              </p>
            </div>
          </div>

          {/* —— MISSION LAYER (fades in on scroll) —— */}
          <div className="ab-vm-layer ab-vm-mission-layer">
            <img src="/images/P1101630.JPG" alt="" className="ab-vm-panel-bg" aria-hidden="true" />
            <div className="ab-vm-panel-overlay" />
            <div className="ab-vm-content">
              <p className="ab-vm-eyebrow">Our Mission</p>
              <h2 className="ab-vm-heading">Our Mission</h2>
              <hr className="ab-vm-rule" />
              <p className="ab-vm-body">
                To design and deliver practitioner-led programmes and competitions for schools
                and colleges that build thinking, communication, and decision-making skills
                through real cases, simulations, and structured feedback from industry professionals.
              </p>
            </div>
          </div>

          {/* progress pips */}
          <div className="ab-vm-progress" aria-hidden="true">
            <span className="ab-vm-pip active" id="vm-pip-0" />
            <span className="ab-vm-pip" id="vm-pip-1" />
          </div>

        </div>
      </div>

      {/* ── FOUNDERS ── */}
      <section className="ab-founders ab-section">
        <div className="ab-founders-header ab-anim-up">
          <p className="ab-section-eyebrow" style={{ color:"rgba(1,22,56,0.55)" }}>The People Behind It</p>
          <h2 className="ab-section-title dark">
            Meet Our{" "}
            <em style={{ fontFamily:"'Playfair Display', Georgia, serif", fontStyle:"italic", fontWeight:400 }}>
              Directors
            </em>
          </h2>
          <div className="ab-dark-rule" style={{ margin:"0 auto 0" }} />
          <p style={{ marginTop:10, fontSize:14, color:"rgba(1,22,56,0.60)", lineHeight:1.7 }}>
            Visionary leaders with a passion for transforming education
          </p>
        </div>

        <div className="ab-founders-grid">
          {DIRECTORS.map((d, i) => (
            <div key={d.name} className={`ab-founder-card ab-anim-up ab-delay-${i + 1}`}>
              <div className="ab-founder-photo">
                <img
                  src={d.image}
                  alt={d.name}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                    const fb = (e.currentTarget as HTMLElement).nextElementSibling as HTMLElement;
                    if (fb) fb.style.display = "flex";
                  }}
                />
                <div style={{
                  display:"none", position:"absolute", inset:0,
                  alignItems:"center", justifyContent:"center",
                  background:"#011638", fontSize:52, fontWeight:700,
                  color:"#f5c842", fontFamily:"'DM Sans', sans-serif"
                }}>
                  {d.initials}
                </div>
                <a
                  href={d.linkedin}
                  target="_blank" rel="noopener noreferrer"
                  className="ab-founder-li"
                  aria-label={`${d.name} on LinkedIn`}
                >
                  <LinkedInIcon />
                </a>
              </div>
              <div className="ab-founder-body">
                <h3 className="ab-founder-name">{d.name}</h3>
                <p className="ab-founder-bio">{d.bio}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── MENTORS ASSOCIATED BOX ── */}
        <div className="ab-mentors-box ab-anim-up ab-delay-3">
          <p className="ab-mentors-box-label">Mentors Associated From</p>
          <div className="ab-marquee-track-wrap" aria-hidden="true">
            <div className="ab-marquee-track">
              {/* Set A */}
              <div className="ab-marquee-set">
                {MARQUEE_LOGOS.map((logo) => (
                  <span key={`a-${logo.alt}`} className="ab-logo-badge">
                    <img src={logo.src} alt={logo.alt} loading="lazy" />
                  </span>
                ))}
              </div>
              {/* Set B — identical clone for seamless loop */}
              <div className="ab-marquee-set" aria-hidden="true">
                {MARQUEE_LOGOS.map((logo) => (
                  <span key={`b-${logo.alt}`} className="ab-logo-badge">
                    <img src={logo.src} alt={logo.alt} loading="lazy" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* ── APPROACH ── (commented out) */}
      {false && (
      <section className="ab-approach ab-section">
        <div className="ab-approach-grid">

          {/* Text + features */}
          <div className="ab-anim-left" style={{ order: 1 }}>
            <p className="ab-section-eyebrow" style={{ color:"rgba(1,22,56,0.55)" }}>How We Teach</p>
            <h2 className="ab-section-title dark">
              Our Educational{" "}
              <em style={{ fontFamily:"'Playfair Display', Georgia, serif", fontStyle:"italic", fontWeight:400, color:"#011638" }}>
                Approach
              </em>
            </h2>
            <div className="ab-dark-rule" />
            <p className="ab-section-body dark" style={{ marginBottom:24 }}>
              At Veriseek, we believe in learning by doing. Our approach combines theoretical knowledge with practical application, allowing students to develop a deeper understanding while building valuable skills.
            </p>

            <div className="ab-features">
              {FEATURES.map((f, i) => (
                <div key={f.title} className={`ab-feature ab-anim-up ab-delay-${i + 1}`}>
                  <div className="ab-feature-icon">{f.icon}</div>
                  <div>
                    <p className="ab-feature-title">{f.title}</p>
                    <p className="ab-feature-desc">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel + Explore button */}
          <div className="ab-carousel-col ab-anim-right" style={{ order: 2 }}>
            <div className="ab-carousel-wrap">
              <ImageCarousel />
            </div>
            <Link href="/#programmes" className="ab-explore-btn">
              Explore Programmes
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </Link>
          </div>

        </div>
      </section>
      )}

    </div>
  );
}