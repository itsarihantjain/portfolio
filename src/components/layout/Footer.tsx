"use client";

import { Briefcase, Mail } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import styles from "./Footer.module.css";

const iconMap: Record<string, React.ElementType> = {
  Briefcase,
  Mail,
};

export default function Footer() {
  const { socials } = portfolioData.personal;

  return (
    <footer className={styles.footer}>
      <div className={styles.socials}>
        {socials.map((social) => {
          const Icon = iconMap[social.icon];
          return (
            <a
              key={social.platform}
              href={social.url}
              target={
                social.url.startsWith("mailto") || social.url.startsWith("tel")
                  ? undefined
                  : "_blank"
              }
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label={social.platform}
            >
              {Icon && <Icon size={20} />}
            </a>
          );
        })}
      </div>
      <p className={styles.copyright}>
        © 2025 Arihant Jain. All rights reserved.
      </p>
      <p className={styles.builtWith}>Built with love</p>
    </footer>
  );
}
