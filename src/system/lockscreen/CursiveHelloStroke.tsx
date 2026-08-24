import { useEffect, useState } from "react";
import { playGentleStartupSound } from "@/system/sound/soundEffects";

interface Props {
  onComplete?: () => void;
}

// Path traced directly from the reference "hello" artwork (potrace outline)
const HELLO_PATH =
  "M2604 2650 c-75 -11 -122 -37 -189 -105 -53 -53 -103 -133 -130 -210 -21 -59 -55 -191 -70 -270 -9 -49 -21 -106 -25 -125 -5 -19 -16 -84 -25 -145 -9 -60 -22 -148 -30 -195 -7 -47 -21 -150 -30 -230 -9 -80 -20 -164 -26 -187 -5 -23 -9 -55 -9 -71 0 -22 -11 -40 -42 -68 -120 -110 -368 -291 -528 -384 -85 -50 -104 -72 -103 -118 1 -27 9 -43 32 -64 17 -16 43 -28 57 -28 44 0 300 157 468 287 38 30 71 51 74 49 4 -4 -12 -152 -38 -356 -12 -95 -15 -199 -7 -225 8 -24 56 -55 85 -55 27 0 78 44 85 72 3 13 11 70 17 128 6 58 15 121 21 140 5 19 18 77 29 128 52 246 179 500 304 607 30 25 81 57 115 70 132 54 238 17 300 -103 24 -46 14 -159 -39 -457 -36 -203 -26 -359 29 -428 110 -140 243 -183 494 -160 141 13 285 49 408 103 l87 37 53 -37 c114 -78 259 -119 429 -119 259 -2 495 94 767 310 48 38 90 69 94 69 4 0 18 -21 31 -48 70 -144 158 -230 293 -284 77 -31 85 -32 225 -31 137 0 150 1 240 32 52 18 110 44 129 57 20 13 39 24 44 24 15 0 157 101 227 160 l68 59 32 -62 c91 -174 228 -263 426 -274 135 -8 218 8 329 62 106 51 203 135 291 251 l56 76 17 -50 c56 -165 197 -301 353 -339 89 -22 216 -20 309 5 143 38 288 148 374 282 56 86 81 146 111 259 19 75 24 118 24 220 0 69 -5 143 -11 164 -6 22 -8 41 -6 44 3 2 29 -2 58 -11 178 -49 322 -17 448 100 54 49 116 144 133 203 9 30 -14 86 -40 100 -12 6 -35 11 -52 11 -37 0 -62 -25 -123 -120 -29 -45 -57 -74 -91 -95 -44 -27 -58 -30 -130 -30 -72 0 -89 4 -146 32 -36 18 -101 56 -145 85 -160 106 -290 148 -453 148 -155 0 -265 -40 -379 -136 -109 -93 -174 -203 -274 -469 -148 -392 -306 -569 -540 -604 -105 -16 -194 -2 -264 44 -55 35 -108 101 -127 158 -6 17 -14 37 -18 42 -22 31 -17 57 17 98 41 48 155 203 194 262 111 167 271 470 338 637 107 271 152 470 153 678 1 142 -14 211 -61 280 -68 100 -156 137 -286 119 -82 -11 -142 -45 -215 -120 -123 -127 -250 -424 -304 -709 -9 -47 -21 -107 -26 -135 -40 -197 -60 -630 -41 -856 6 -75 9 -143 5 -150 -9 -22 -172 -165 -239 -210 -33 -23 -100 -61 -150 -84 -69 -34 -110 -46 -177 -55 -241 -32 -396 64 -464 288 l-13 43 106 132 c277 344 478 728 573 1095 40 155 53 264 48 406 -6 153 -28 215 -100 286 -59 59 -102 74 -206 73 -61 -1 -84 -6 -137 -32 -105 -52 -176 -135 -259 -299 -89 -177 -143 -362 -195 -667 -37 -215 -54 -536 -40 -763 l10 -166 -48 -49 c-62 -63 -233 -192 -318 -239 -203 -113 -402 -151 -587 -113 -71 15 -158 50 -158 63 0 4 24 24 54 45 130 93 283 268 354 403 132 256 96 540 -85 660 -67 45 -131 64 -214 64 -81 0 -157 -22 -224 -64 -54 -35 -152 -137 -175 -183 -8 -15 -20 -35 -27 -43 -20 -25 -70 -199 -84 -289 -22 -156 6 -362 67 -485 13 -28 24 -53 24 -58 0 -28 -233 -94 -381 -108 -178 -17 -272 5 -323 73 -31 42 -32 135 -1 312 51 289 59 372 47 457 -13 89 -55 181 -104 227 -59 55 -143 93 -234 105 l-83 11 45 70 c53 82 143 264 173 350 63 182 81 364 47 480 -9 33 -34 84 -55 114 -64 94 -186 140 -317 121z m157 -219 c40 -48 54 -128 39 -227 -19 -133 -57 -249 -125 -384 -37 -73 -130 -222 -162 -260 -11 -14 -55 -65 -96 -115 -41 -49 -87 -101 -101 -114 -26 -24 -26 -24 -26 -3 0 29 58 436 70 492 5 25 17 88 26 140 13 79 41 194 72 305 9 31 62 127 84 152 35 38 78 54 137 50 47 -3 59 -9 82 -36z m3142 19 c48 -38 64 -143 47 -300 -31 -289 -162 -628 -369 -958 -83 -132 -179 -262 -193 -262 -16 0 -3 429 16 575 20 147 64 360 99 477 56 186 153 372 228 436 61 52 130 65 172 32z m1252 -4 c39 -39 48 -95 41 -246 -5 -126 -13 -172 -50 -310 -23 -85 -30 -108 -77 -225 -42 -109 -203 -435 -250 -508 -86 -134 -183 -266 -192 -260 -14 8 -2 394 18 577 34 316 120 624 226 813 39 68 116 152 154 169 49 22 102 17 130 -10z m-2854 -1094 c66 -27 117 -140 105 -238 -16 -137 -97 -284 -231 -419 -80 -82 -186 -165 -209 -165 -40 0 -86 165 -87 310 0 166 37 302 112 404 87 118 193 155 310 108z m4054 2 c28 -3 70 -15 94 -26 47 -21 123 -93 148 -141 33 -65 53 -161 54 -259 1 -168 -30 -282 -109 -401 -99 -151 -275 -236 -432 -209 -112 20 -187 74 -237 169 -42 80 -58 151 -57 263 0 128 18 207 72 317 84 173 180 260 317 287 39 7 77 12 85 10 8 -1 38 -6 65 -10z";

// Map into the 0..806.69 x 0..252.65 viewBox
const GROUP_TRANSFORM = "translate(-139.704383,265.429649) scale(0.1,-0.1)";

export default function CursiveHelloStroke({ onComplete }: Props) {
  const [isAppeared, setIsAppeared] = useState(false);

  useEffect(() => {
    // Play gentle, fresh Web Audio API startup chime sound!
    playGentleStartupSound();

    // 1. Ultra-slow entrance: Fade & scale in the 3D claymorphed "hello." over 2200ms
    const timer1 = setTimeout(() => {
      setIsAppeared(true);
    }, 150);

    // 2. Stay in full 3D claymorphed view and trigger shrinkage after exactly 3.0 seconds (3000ms)
    const timer2 = setTimeout(() => {
      onComplete?.();
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div className="relative flex items-center justify-center select-none">
      {/* Inflated 3D Clay Soft Backdrop Lighting */}
      <div
        className={`absolute inset-[-20%] rounded-full bg-gradient-to-tr from-white/10 via-slate-200/15 to-transparent blur-3xl pointer-events-none transition-all duration-[2200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isAppeared ? "opacity-100 scale-110" : "opacity-0 scale-75"
        }`}
      />

      <svg
        viewBox="0 0 806.694235 252.648172"
        className={`w-[238px] sm:w-[294px] md:w-[336px] h-[77px] md:h-[95px] overflow-visible select-none transition-all duration-[2200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isAppeared ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-85 translate-y-4"
        }`}
      >
        <defs>
          {/* Authentic 3D Claymorphism Gradient */}
          <linearGradient id="clayFillGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#F1F5F9" />
            <stop offset="80%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          {/* Authentic 3D Clay Specular Lighting Filter */}
          <filter id="authenticClayFilter" x="-30%" y="-30%" width="160%" height="160%">
            {/* Soft Ambient Clay Drop Shadows */}
            <feDropShadow dx="0" dy="16" stdDeviation="14" floodColor="#000000" floodOpacity="0.75" />
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.4" />

            {/* Specular Top-Left Inflated Surface Light */}
            <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur" />
            <feSpecularLighting
              in="blur"
              surfaceScale="6"
              specularConstant="1.3"
              specularExponent="20"
              lightingColor="#FFFFFF"
              result="specular"
            >
              <feDistantLight azimuth="225" elevation="50" />
            </feSpecularLighting>
            <feComposite in="specular" in2="SourceAlpha" operator="in" result="specularLight" />
            <feComposite in="SourceGraphic" in2="specularLight" operator="arithmetic" k1="0" k2="1" k3="0.85" k4="0" />
          </filter>
        </defs>

        <g transform={GROUP_TRANSFORM} filter="url(#authenticClayFilter)">
          {/* Outer 3D Inflated Clay Edge/Border */}
          <path
            d={HELLO_PATH}
            fill="none"
            stroke="rgba(255, 255, 255, 0.4)"
            strokeWidth={40}
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Main 3D Clay Body */}
          <path
            d={HELLO_PATH}
            fill="url(#clayFillGradient)"
            stroke="#E2E8F0"
            strokeWidth={15}
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
}
