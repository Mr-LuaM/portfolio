"use client"

import Image from "next/image"
import { useState, useRef } from "react"
import type { Profile } from "../lib/types"
import styles from "../styles/animatedCard.module.css"

interface AnimatedProfileCardProps {
  profileData: Profile
  width?: number
  height?: number
  className?: string
}

const AnimatedProfileCard = ({
  profileData,
  width = 160,
  height = 160,
  className = "",
}: AnimatedProfileCardProps) => {
  const [isTransformed, setIsTransformed] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)
  const hasPlayedSound = useRef(false)

  const handleMouseEnter = () => {
    // Reset sound flag for new hover
    hasPlayedSound.current = false

    // Trigger image transformation after 3.2s
    setTimeout(() => setIsTransformed(true), 3200)

    // Play sound effect after merge completes (3.2s)
    setTimeout(() => {
      if (!hasPlayedSound.current && audioRef.current) {
        audioRef.current.currentTime = 0 // Reset to beginning
        audioRef.current.play().catch((error) => {
          console.log("Audio play failed:", error)
        })
        hasPlayedSound.current = true
      }
    }, 3200)
  }

  const handleMouseLeave = () => {
    setIsTransformed(false)
    hasPlayedSound.current = false

    // Stop audio if it's playing
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }

  return (
    <div
      className={`${styles.cardContainer} ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Audio element for wizard evolution sound */}
      <audio ref={audioRef}  style={{ display: "none" }}>
        <source
          src={profileData.audioBaseUrl || 'https://mr-luam.s3.ap-southeast-2.amazonaws.com/mp3/Wizard+Evolution+Deploy+Sound+Effect.mp3'}
          type="audio/mpeg"
          
        />
        Your browser does not support the audio element.
      </audio>
      
      {/* Card glow effects */}
      <div className={styles.cardGlow}></div>
      <div className={styles.cardGlowInner}></div>

      {/* Border animation lines */}
      <div className={styles.borderAnimation}>
        <div className={`${styles.borderLine} ${styles.borderLineTop}`}>
          <div className={styles.borderLight}></div>
        </div>
        <div className={`${styles.borderLine} ${styles.borderLineLeft}`}>
          <div className={`${styles.borderLight} ${styles.borderLightVertical}`}></div>
        </div>
        <div className={`${styles.borderLine} ${styles.borderLineRight}`}>
          <div className={`${styles.borderLight} ${styles.borderLightVertical}`}></div>
        </div>
        <div className={`${styles.borderLine} ${styles.borderLineBottomLeft}`}>
          <div className={styles.borderLight}></div>
        </div>
        <div className={`${styles.borderLine} ${styles.borderLineBottomRight}`}>
          <div className={styles.borderLight}></div>
        </div>
      </div>

      {/* Main card content */}
      <div className={styles.cardMain}>
        <Image
          src={
            isTransformed
              ? profileData.evo_image_url || "https://mr-luam.s3.ap-southeast-2.amazonaws.com/evo_wizard.png"
              : profileData?.image_url || "https://avatars.githubusercontent.com/u/130156447?v=4"
          }
          alt={profileData?.name || "Profile Image"}
          width={width}
          height={height}
          className={styles.characterImage}
          priority
        />
        <div className={styles.cardOverlay}></div>
        <div className={styles.innerBorder}></div>

        {/* Sparkle effects */}
        <div className={`${styles.sparkle} ${styles.sparkle1}`}></div>
        <div className={`${styles.sparkle} ${styles.sparkle2}`}></div>
        <div className={`${styles.sparkle} ${styles.sparkle3}`}></div>
        <div className={`${styles.sparkle} ${styles.sparkle4}`}></div>
      </div>

      {/* Smaller Diamond gem */}
      <div className={styles.gemContainer}>
        <div className={styles.gem}></div>
      </div>
    </div>
  )
}

export default AnimatedProfileCard
