
"use client";

import { useEffect, useState } from "react";

export default function IntroLoader() {
  const [progress, setProgress] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const start = Date.now();
    const duration = 1000;

    const timer = setInterval(() => {
      const value = Math.min(
        100,
        Math.floor(((Date.now() - start) / duration) * 100)
      );

      setProgress(value);

      if (value >= 100) {
        clearInterval(timer);
        setTimeout(() => setFinished(true), 350);
      }
    }, 30);

    return () => clearInterval(timer);
  }, []);

  if (finished) return null;

  const circumference = 2 * Math.PI * 85;
  const offset = circumference * (1 - progress / 100);

  return (
    <div className="intro-loader">
      <div className="intro-content">
        <div className="intro-name">IETE STUDENTS' FORUM</div>

        <div className="progress-circle">
          <svg viewBox="0 0 200 200">
            <circle
              className="circle-track"
              cx="100"
              cy="100"
              r="85"
            />

            <circle
              className="circle-progress"
              cx="100"
              cy="100"
              r="85"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>

          <div className="logo-container">
            <img src="/logo.svg" alt="IETE logo" />
          </div>
        </div>

        <div className="progress-number">{progress}%</div>

        <div className="intro-status">
          {progress < 100
            ? "INITIALIZING INNOVATION"
            : "WELCOME ABOARD"}
        </div>

        <div className="intro-line" />
      </div>
    </div>
  );
}
