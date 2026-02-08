"use client";

import { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import Image from "next/image";
import { useMemo } from "react";

export default function Home() {
  const [noButtonSize, setNoButtonSize] = useState(100);
  const [yesButtonSize, setYesButtonSize] = useState(100);
  const [noClickCount, setNoClickCount] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const noButtonTexts = [
    "No",
    "Are you sure?",
    "You might regret?",
    "Please reconsider!",
    "Really?",
    "Think again!",
    "Last chance!",
    "Don't be silly!",
    "Please click Yes 🥺",
    "Pretty please?",
  ];

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio("/song.mp3");
    audioRef.current.loop = true;

    // Try to play audio automatically
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().catch((err) => {
          console.log("Autoplay blocked, will try on first interaction:", err);
        });
      }
    };

    // Try to play immediately
    playAudio();

    // Also try on any user interaction
    const handleInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch((err) => console.log(err));
      }
    };

    document.addEventListener("click", handleInteraction, { once: true });
    document.addEventListener("touchstart", handleInteraction, { once: true });

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // Play video when accepted
    if (accepted && videoRef.current) {
      videoRef.current
        .play()
        .catch((err) => console.log("Video play error:", err));
    }
  }, [accepted]);

  const handleNoClick = () => {
    if (noButtonSize > 20) {
      setNoButtonSize((prev) => prev - 10);
      setYesButtonSize((prev) => prev + 15);
      setNoClickCount((prev) => prev + 1);
    }
    // Ensure audio plays on interaction
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch((err) => console.log(err));
    }
  };

  const handleYesClick = () => {
    setAccepted(true);
    setShowConfetti(true);
    // Ensure audio plays on interaction
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch((err) => console.log(err));
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
    // Also mute/unmute video if it exists
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  // Generate stable random positions for pleading images
  const pleadingPositions = useMemo(() => {
    return Array.from({ length: 10 }).map(() => ({
      // eslint-disable-next-line react-hooks/purity
      top: Math.random() * 80,
      // eslint-disable-next-line react-hooks/purity
      left: Math.random() * 80,
      // eslint-disable-next-line react-hooks/purity
      rotation: Math.random() * 360,
    }));
  }, []);

  if (accepted) {
    return (
      <div className="relative flex min-h-screen items-center justify-center p-4 overflow-hidden">
        {/* Background Image */}
        <Image
          src="/bg.jpeg"
          alt="background"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-pink-500/40"></div>

        {showConfetti && (
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={true}
            numberOfPieces={500}
            gravity={0.3}
          />
        )}

        {/* Video Container */}
        <div className="relative z-10 w-full max-w-2xl">
          <video
            ref={videoRef}
            className="w-full h-auto rounded-2xl shadow-2xl mb-8"
            controls
            loop
            playsInline
            muted={isMuted}
          >
            <source
              src="https://res.cloudinary.com/dlgxzzpkp/video/upload/v1770549151/WhatsApp_Video_2026-02-08_at_3.53.42_PM_oxzuom.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          <div className="text-center animate-bounce">
            <div className="text-6xl sm:text-8xl mb-8 animate-pulse">💖</div>
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4 animate-fade-in drop-shadow-lg">
              Thank You! 🥹 🎉
            </h1>
          </div>
        </div>

        {/* Sound control button */}
        <button
          onClick={toggleMute}
          className="fixed bottom-4 right-4 bg-white bg-opacity-50 hover:bg-opacity-75 text-2xl p-3 rounded-full shadow-lg transition-all z-20"
        >
          {isMuted ? "🔇" : "🔊"}
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center p-4">
      {/* Background Image */}
      <Image
        src="/bg.jpeg"
        alt="background"
        fill
        className="object-cover"
        priority
      />
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-pink-300/40"></div>

      <main className="relative z-10 flex flex-col items-center justify-center text-center max-w-md w-full">
        {/* Heart animation */}
        <div className="text-6xl sm:text-8xl mb-8 animate-bounce drop-shadow-lg">
          💝
        </div>

        {/* Question */}
        <h1 className="text-3xl sm:text-5xl font-bold text-white mb-12 px-4 drop-shadow-lg  rounded-2xl py-4">
          Will u be my Valentine, Goalbhera?
        </h1>

        {/* Buttons Container */}
        <div className="flex flex-col sm:flex-row gap-6 items-center justify-center w-full px-4">
          {/* Yes Button */}
          <button
            onClick={handleYesClick}
            style={{
              fontSize: `${yesButtonSize * 0.16}px`,
              padding: `${yesButtonSize * 0.12}px ${yesButtonSize * 0.24}px`,
              transition: "all 0.3s ease",
            }}
            className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-full shadow-lg transform hover:scale-105 active:scale-95 min-w-[100px]"
          >
            Yes! 💕
          </button>

          {/* No Button */}
          {noButtonSize > 15 && (
            <button
              onClick={handleNoClick}
              style={{
                fontSize: `${noButtonSize * 0.16}px`,
                padding: `${noButtonSize * 0.12}px ${noButtonSize * 0.24}px`,
                transition: "all 0.3s ease",
              }}
              className="bg-red-500 hover:bg-red-600 text-white font-bold rounded-full shadow-lg transform hover:scale-105 active:scale-95 min-w-[60px]"
            >
              {noButtonTexts[Math.min(noClickCount, noButtonTexts.length - 1)]}
            </button>
          )}
        </div>

        {/* Random GIFs when clicking No */}
        {noClickCount > 3 && (
          <div className="fixed inset-0 pointer-events-none z-10">
            {Array.from({ length: Math.min(noClickCount - 3, 10) }).map(
              (_, i) => (
                <Image
                  key={i}
                  src={i % 2 === 0 ? "/bfore.webp" : "/bfore2.webp"}
                  alt="pleading"
                  width={128}
                  height={128}
                  className="absolute w-24 h-24 sm:w-32 sm:h-32 animate-bounce"
                  style={{
                    top: `${pleadingPositions[i].top}%`,
                    left: `${pleadingPositions[i].left}%`,
                    transform: `rotate(${pleadingPositions[i].rotation}deg)`,
                  }}
                />
              ),
            )}
          </div>
        )}

        {/* Success GIF overlay */}
        {accepted && (
          <div className="fixed inset-0 flex items-center justify-center z-20 pointer-events-none">
            <Image
              src="/after.webp"
              alt="celebration"
              width={384}
              height={384}
              className="w-64 h-64 sm:w-96 sm:h-96 animate-bounce"
            />
          </div>
        )}
      </main>

      {/* Sound control button */}
      <button
        onClick={toggleMute}
        className="fixed bottom-4 right-4 bg-white bg-opacity-50 hover:bg-opacity-75 text-2xl p-3 rounded-full shadow-lg transition-all z-20"
      >
        {isMuted ? "🔇" : "🔊"}
      </button>
    </div>
  );
}
