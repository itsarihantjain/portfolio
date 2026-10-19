"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowDown, MapPin } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import AnimatedElement from "@/components/ui/AnimatedElement";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import styles from "./Hero.module.css";

const roles = [
  "Full Stack Developer",
  "Frontend-Heavy Engineer",
  "React Native Developer",
  "Node.js Builder",
];

// Hover colours cycle through a rich, bright spectrum so the name lights up letter by letter
const spectrum = ["#38bdf8", "#a78bfa", "#f472b6", "#fbbf24", "#34d399"];

const stickers = [
  { label: "React", className: "stickerReact" },
  { label: "Next.js", className: "stickerNext" },
  { label: "Node.js", className: "stickerNode" },
  { label: "React Native", className: "stickerNative" },
];

// The letter the cursor blob rests under until the visitor moves their mouse ("a" in Arihant)
const HOME_INDEX = 4;
const TEXT = "#f5f5f7";
const RETURN_DELAY_MS = 2500;

function Sticker({
  label,
  className,
  index,
  areaRef,
}: {
  label: string;
  className: string;
  index: number;
  areaRef: RefObject<HTMLDivElement | null>;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  // After a short rest, glide slowly back to where the sticker started
  const goHome = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const glide = {
        type: "tween",
        duration: 1.6,
        ease: [0.45, 0, 0.2, 1],
      } as const;
      animate(x, 0, glide);
      animate(y, 0, glide);
    }, RETURN_DELAY_MS);
  };

  return (
    <motion.div
      className={cn(styles.stickerWrap, styles[className])}
      style={{ x, y }}
      drag
      // The drag area stops below the fixed navbar, so a sticker can never slide under it and get stuck
      dragConstraints={areaRef}
      dragElastic={0.2}
      onDragStart={() => clearTimeout(timer.current)}
      onDragEnd={goHome}
      whileDrag={{ scale: 1.15, zIndex: 20 }}
      whileHover={{ scale: 1.08 }}
      initial={{ opacity: 0, scale: 0, rotate: -40 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 14,
        delay: 1 + index * 0.1,
      }}
      data-cursor="grow"
    >
      <span className={styles.sticker}>{label}</span>
    </motion.div>
  );
}

export default function Hero() {
  const { name, location } = portfolioData.personal;
  const [first, ...rest] = name.split(" ");
  const [roleIndex, setRoleIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const dragAreaRef = useRef<HTMLDivElement>(null);
  // Until the visitor moves the mouse, the "a" stays lit with the cursor blob parked under it
  const [engaged, setEngaged] = useState(false);

  // Touch screens have no hover, so a colour wave runs through the name on its own
  const [waveIndex, setWaveIndex] = useState<number | null>(null);
  // Entrance uses a staggered tween; after that, letter changes use a snappy spring
  const [entered, setEntered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const orbRotate = useTransform(scrollYProgress, [0, 1], [0, 120]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      setEngaged(true);
      window.removeEventListener("pointermove", onMove);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    const id = setTimeout(() => setEntered(true), 1400);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(hover: none)").matches) return;
    // Same index scheme as the rendered letters: word w, char i → w * 10 + i
    const letters = name
      .split(" ")
      .flatMap((word, w) => word.split("").map((_, i) => w * 10 + i));
    let step = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (step < letters.length) {
        setWaveIndex(letters[step]);
        step += 1;
        timer = setTimeout(tick, 110);
      } else {
        // Back to default, rest, then roll the wave again
        setWaveIndex(null);
        step = 0;
        timer = setTimeout(tick, 3200);
      }
    };
    timer = setTimeout(tick, 1800);
    return () => clearTimeout(timer);
  }, [name]);

  useEffect(() => {
    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % roles.length),
      2400,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section id="hero" className={styles.hero} ref={heroRef}>
      {/* Separate glows instead of one blurred colour wheel, which averaged out to grey */}
      <motion.div
        className={styles.aurora}
        style={{ rotate: orbRotate }}
        aria-hidden
      >
        <span className={styles.glowSky} />
        <span className={styles.glowLavender} />
        <span className={styles.glowRose} />
        <span className={styles.glowAmber} />
      </motion.div>
      <div className={styles.gridLines} aria-hidden />

      <div className={styles.dragArea} ref={dragAreaRef} aria-hidden />
      {stickers.map((sticker, i) => (
        <Sticker
          key={sticker.label}
          label={sticker.label}
          className={sticker.className}
          index={i}
          areaRef={dragAreaRef}
        />
      ))}

      <div className={styles.content}>
        <AnimatedElement delay={0} direction="scale">
          <p className={styles.status}>
            <span className={styles.statusDot} />
            Available for new opportunities
            <span className={styles.statusSep} />
            <MapPin size={14} />
            {location}
          </p>
        </AnimatedElement>

        <AnimatedElement delay={0.1}>
          <p className={styles.hello}>Hi, I&apos;m</p>
        </AnimatedElement>

        <h1 className={styles.name} aria-label={name}>
          {[first, rest.join(" ")].map((word, w) => (
            <span key={w} className={styles.nameLine}>
              {word.split("").map((char, i) => {
                const index = w * 10 + i;
                const isHome = index === HOME_INDEX;
                const lit = isHome && !engaged;
                return (
                  <motion.span
                    key={i}
                    className={styles.char}
                    data-cursor-home={isHome || undefined}
                    initial={{ y: "110%", rotate: 12, color: TEXT }}
                    animate={
                      waveIndex === index
                        ? {
                            y: "-14%",
                            rotate: index % 2 ? 8 : -8,
                            color: spectrum[index % spectrum.length],
                          }
                        : lit
                          ? {
                              y: "-8%",
                              rotate: -8,
                              color: spectrum[HOME_INDEX],
                            }
                          : { y: "0%", rotate: 0, color: TEXT }
                    }
                    transition={
                      entered
                        ? { type: "spring", stiffness: 400, damping: 16 }
                        : {
                            duration: 0.9,
                            delay: 0.2 + index * 0.045,
                            ease: [0.22, 1, 0.36, 1],
                          }
                    }
                    whileHover={{
                      y: -18,
                      rotate: index % 2 ? 8 : -8,
                      color: spectrum[index % spectrum.length],
                      transition: {
                        type: "spring",
                        stiffness: 500,
                        damping: 12,
                      },
                    }}
                    aria-hidden
                  >
                    {char}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </h1>

        <AnimatedElement delay={0.7}>
          <div className={styles.roleWindow}>
            <AnimatePresence mode="wait">
              <motion.span
                key={roles[roleIndex]}
                className={styles.role}
                // 2D only: Chrome drops background-clip:text gradients inside 3D transforms
                initial={{ y: 40, opacity: 0, rotate: -6, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
                exit={{ y: -40, opacity: 0, rotate: 6, scale: 0.9 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="gradient-text">{roles[roleIndex]}</span>
              </motion.span>
            </AnimatePresence>
          </div>
        </AnimatedElement>

        <AnimatedElement delay={0.85}>
          <p className={styles.bio}>
            I build fast, playful products for web &amp; mobile with React,
            React Native, Next.js and Node.js.
          </p>
        </AnimatedElement>

        <AnimatedElement delay={1}>
          <div className={styles.ctas}>
            <Button href="#projects" size="lg" magnetic>
              See my work
            </Button>
            <Button href="#contact" variant="outline" size="lg" magnetic>
              Say hello
            </Button>
          </div>
        </AnimatedElement>
      </div>

      <AnimatedElement
        delay={1.6}
        direction="none"
        className={styles.footerRow}
      >
        <span className={styles.dragHint}>✦ drag the stickers</span>
        <a
          href="#statement"
          className={styles.scrollIndicator}
          aria-label="Scroll down"
        >
          <ArrowDown size={16} />
        </a>
      </AnimatedElement>
    </section>
  );
}
