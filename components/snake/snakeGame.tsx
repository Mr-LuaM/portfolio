"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Play,
  RotateCcw,
  Trophy,
  Gamepad2,
  ArrowLeft,
  Pause,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"

// Game constants
const CANVAS_SIZE = 400
const GRID_SIZE = 20
const INITIAL_SPEED = 150
const SPEED_INCREMENT = 8

// Game types
interface Position {
  x: number
  y: number
}

interface GameState {
  snake: Position[]
  direction: Position
  food: Position
  score: number
  highScore: number
  gameOver: boolean
  gameStarted: boolean
  isPaused: boolean
  speed: number
  level: number
}

// Sound system
class SoundManager {
  private audioContext: AudioContext | null = null
  private enabled = true

  constructor() {
    if (typeof window !== "undefined") {
      try {
        this.audioContext = new (
          window.AudioContext ||
          (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
        )()
      } catch (error) {
        console.warn("Web Audio API not supported", error)
      }
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled
  }

  private playTone(frequency: number, duration: number, type: OscillatorType = "sine", volume = 0.1) {
    if (!this.enabled || !this.audioContext) return

    try {
      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext.destination)

      oscillator.frequency.value = frequency
      oscillator.type = type

      gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration)

      oscillator.start(this.audioContext.currentTime)
      oscillator.stop(this.audioContext.currentTime + duration)
    } catch (error) {
      console.warn("Failed to play sound:", error)
    }
  }

  playMove() {
    this.playTone(200, 0.1, "sine", 0.05)
  }

  playEat() {
    this.playTone(400, 0.2, "sine", 0.15)
  }

  playPause() {
    this.playTone(300, 0.2, "triangle", 0.1)
  }

  playGameOver() {
    this.playTone(150, 0.5, "sawtooth", 0.2)
  }

  playStart() {
    this.playTone(500, 0.3, "triangle", 0.12)
  }

  playReset() {
    this.playTone(250, 0.3, "sine", 0.1)
  }
}

// Utility functions
const getRandomPosition = (): Position => ({
  x: Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE)),
  y: Math.floor(Math.random() * (CANVAS_SIZE / GRID_SIZE)),
})

const generateFood = (snake: Position[]): Position => {
  let newFood: Position
  do {
    newFood = getRandomPosition()
  } while (snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y))
  return newFood
}

const checkCollision = (head: Position, snake: Position[]): boolean => {
  if (head.x < 0 || head.x >= CANVAS_SIZE / GRID_SIZE || head.y < 0 || head.y >= CANVAS_SIZE / GRID_SIZE) {
    return true
  }
  return snake.some((segment) => segment.x === head.x && segment.y === head.y)
}

export default function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null)
  const gameContainerRef = useRef<HTMLDivElement>(null)
  const soundManagerRef = useRef<SoundManager>(new SoundManager())
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [isExiting, setIsExiting] = useState(false)
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  const [gameState, setGameState] = useState<GameState>({
    snake: [{ x: 10, y: 10 }],
    direction: { x: 1, y: 0 },
    food: { x: 15, y: 15 },
    score: 0,
    highScore: typeof window !== "undefined" ? Number.parseInt(localStorage.getItem("snakeHighScore") || "0") : 0,
    gameOver: false,
    gameStarted: false,
    isPaused: false,
    speed: INITIAL_SPEED,
    level: 1,
  })

  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  // Update sound manager when sound setting changes
  useEffect(() => {
    soundManagerRef.current.setEnabled(soundEnabled)
  }, [soundEnabled])

  // Handle direction change with sound
  const changeDirection = useCallback(
    (newDirection: Position) => {
      if (!gameState.gameStarted || gameState.gameOver || gameState.isPaused) return

      setGameState((prev) => {
        // Prevent reverse direction
        if (
          (newDirection.x === -prev.direction.x && newDirection.y === prev.direction.y) ||
          (newDirection.y === -prev.direction.y && newDirection.x === prev.direction.x)
        ) {
          return prev
        }

        // Play move sound
        soundManagerRef.current.playMove()

        return { ...prev, direction: newDirection }
      })
    },
    [gameState.gameStarted, gameState.gameOver, gameState.isPaused],
  )

  // Handle keyboard input
  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      const gameKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "W", "a", "A", "s", "S", "d", "D", " "]

      if (!gameKeys.includes(e.key)) return

      e.preventDefault()
      e.stopPropagation()

      if (e.key === " ") {
        if (!gameState.gameStarted && !gameState.gameOver) {
          // Space to start game
          startGame()
        } else if (gameState.gameStarted && !gameState.gameOver) {
          // Space to pause/unpause
          setGameState((prev) => ({ ...prev, isPaused: !prev.isPaused }))
          soundManagerRef.current.playPause()
        }
        return
      }

      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          changeDirection({ x: 0, y: -1 })
          break
        case "ArrowDown":
        case "s":
        case "S":
          changeDirection({ x: 0, y: 1 })
          break
        case "ArrowLeft":
        case "a":
        case "A":
          changeDirection({ x: -1, y: 0 })
          break
        case "ArrowRight":
        case "d":
        case "D":
          changeDirection({ x: 1, y: 0 })
          break
      }
    },
    [changeDirection, gameState.gameStarted, gameState.gameOver],
  )

  // Mobile touch controls
  const handleMobileControl = (direction: Position) => {
    changeDirection(direction)
  }

  // Game loop with sound effects
  const updateGame = useCallback(() => {
    setGameState((prev) => {
      if (!prev.gameStarted || prev.gameOver || prev.isPaused) return prev

      const newHead: Position = {
        x: prev.snake[0].x + prev.direction.x,
        y: prev.snake[0].y + prev.direction.y,
      }

      if (checkCollision(newHead, prev.snake)) {
        const newHighScore = Math.max(prev.score, prev.highScore)
        if (typeof window !== "undefined") {
          localStorage.setItem("snakeHighScore", newHighScore.toString())
        }

        // Play game over sound
        soundManagerRef.current.playGameOver()

        return { ...prev, gameOver: true, highScore: newHighScore }
      }

      const newSnake = [newHead, ...prev.snake]
      let newFood = prev.food
      let newScore = prev.score
      let newSpeed = prev.speed
      let newLevel = prev.level

      if (newHead.x === prev.food.x && newHead.y === prev.food.y) {
        newFood = generateFood(newSnake)
        newScore = prev.score + 10
        newLevel = Math.floor(newScore / 100) + 1
        newSpeed = Math.max(60, prev.speed - SPEED_INCREMENT)

        // Play eat sound
        soundManagerRef.current.playEat()
      } else {
        newSnake.pop()
      }

      return {
        ...prev,
        snake: newSnake,
        food: newFood,
        score: newScore,
        speed: newSpeed,
        level: newLevel,
      }
    })
  }, [])

  // Canvas rendering with theme support
  const draw = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!ctx || !canvas) return

    // Theme-aware colors
    const bgColor = isDark ? "#0a0a0a" : "#f8f9fa"
    const gridColor = isDark ? "#2a2a2a" : "#e9ecef"
    const snakeColor = isDark ? "#22c55e" : "#16a34a"
    const foodColor = isDark ? "#ef4444" : "#dc2626"

    // Clear canvas
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

    // Draw grid
    ctx.strokeStyle = gridColor
    ctx.lineWidth = 1
    for (let i = 0; i <= CANVAS_SIZE; i += GRID_SIZE) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, CANVAS_SIZE)
      ctx.moveTo(0, i)
      ctx.lineTo(CANVAS_SIZE, i)
      ctx.stroke()
    }

    // Draw food with subtle glow
    const foodX = gameState.food.x * GRID_SIZE
    const foodY = gameState.food.y * GRID_SIZE

    // Food glow effect
    ctx.shadowColor = foodColor
    ctx.shadowBlur = 8
    ctx.fillStyle = foodColor
    ctx.fillRect(foodX + 2, foodY + 2, GRID_SIZE - 4, GRID_SIZE - 4)
    ctx.shadowBlur = 0

    // Draw snake
    gameState.snake.forEach((segment, index) => {
      const x = segment.x * GRID_SIZE
      const y = segment.y * GRID_SIZE

      if (index === 0) {
        // Snake head with subtle glow
        ctx.shadowColor = snakeColor
        ctx.shadowBlur = 6
        ctx.fillStyle = snakeColor
        ctx.fillRect(x + 1, y + 1, GRID_SIZE - 2, GRID_SIZE - 2)
        ctx.shadowBlur = 0
      } else {
        // Snake body with fade effect
        const alpha = Math.max(0.4, 1 - index * 0.05)
        ctx.fillStyle = `${snakeColor}${Math.floor(alpha * 255)
          .toString(16)
          .padStart(2, "0")}`
        ctx.fillRect(x + 2, y + 2, GRID_SIZE - 4, GRID_SIZE - 4)
      }
    })
  }, [gameState.snake, gameState.food, isDark])

  // Event listeners
  useEffect(() => {
    const handleFocus = () => {
      if (gameContainerRef.current) {
        gameContainerRef.current.focus()
      }
    }

    handleFocus()
    document.addEventListener("keydown", handleKeyPress, { capture: true })

    const containerNode = gameContainerRef.current
    if (containerNode) {
      containerNode.addEventListener("click", handleFocus)
    }

    return () => {
      document.removeEventListener("keydown", handleKeyPress, { capture: true })
      if (containerNode) {
        containerNode.removeEventListener("click", handleFocus)
      }
    }
  }, [handleKeyPress])

  useEffect(() => {
    if (gameState.gameStarted && !gameState.gameOver && !gameState.isPaused) {
      gameLoopRef.current = setInterval(updateGame, gameState.speed)
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
        gameLoopRef.current = null
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
      }
    }
  }, [gameState.gameStarted, gameState.gameOver, gameState.isPaused, gameState.speed, updateGame])

  useEffect(() => {
    draw()
  }, [draw])

  const startGame = () => {
    setGameState((prev) => ({
      ...prev,
      gameStarted: true,
      gameOver: false,
      isPaused: false,
    }))
    soundManagerRef.current.playStart()
  }

  const togglePause = () => {
    if (gameState.gameStarted && !gameState.gameOver) {
      setGameState((prev) => ({ ...prev, isPaused: !prev.isPaused }))
      soundManagerRef.current.playPause()
    }
  }

  const resetGame = () => {
    setGameState((prev) => ({
      snake: [{ x: 10, y: 10 }],
      direction: { x: 1, y: 0 },
      food: generateFood([{ x: 10, y: 10 }]),
      score: 0,
      highScore: prev.highScore,
      gameOver: false,
      gameStarted: false,
      isPaused: false,
      speed: INITIAL_SPEED,
      level: 1,
    }))
    soundManagerRef.current.playReset()
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleExit = () => {
    setIsExiting(true)
    soundManagerRef.current.playReset()

    // Delay navigation to show exit animation
    setTimeout(() => {
      router.push("/")
    }, 800)
  }

  const getGameStatus = () => {
    if (!gameState.gameStarted) return "Ready to Play"
    if (gameState.gameOver) return "Game Over!"
    if (gameState.isPaused) return "Paused"
    return `Level ${gameState.level}`
  }

  // Animation variants for individual components
  const cardVariants = {
    initial: { opacity: 0, scale: 0.9, y: 100 },
    animate: {
      opacity: isExiting ? 0 : 1,
      scale: isExiting ? 0.9 : 1,
      y: isExiting ? -100 : 0,
      transition: { duration: 0.6},
    },
    exit: { opacity: 0, scale: 0.9, y: -100 },
  }

  const headerVariants = {
    initial: { y: 50, opacity: 0 },
    animate: {
      y: isExiting ? -50 : 0,
      opacity: isExiting ? 0 : 1,
      transition: { duration: 0.5, delay: isExiting ? 0 : 0.1 },
    },
  }

  const statsVariants = {
    initial: { y: 60, opacity: 0 },
    animate: {
      y: isExiting ? -60 : 0,
      opacity: isExiting ? 0 : 1,
      transition: { duration: 0.5, delay: isExiting ? 0.1 : 0.2 },
    },
  }

  const canvasVariants = {
    initial: { scale: 0.8, opacity: 0, y: 80 },
    animate: {
      scale: isExiting ? 0.8 : 1,
      opacity: isExiting ? 0 : 1,
      y: isExiting ? -80 : 0,
      transition: { duration: 0.6, delay: isExiting ? 0.2 : 0.3 },
    },
  }

  const controlsVariants = {
    initial: { y: 100, opacity: 0 },
    animate: {
      y: isExiting ? -100 : 0,
      opacity: isExiting ? 0 : 1,
      transition: { duration: 0.5, delay: isExiting ? 0.3 : 0.4 },
    },
  }

  const instructionsVariants = {
    initial: { y: 120, opacity: 0 },
    animate: {
      y: isExiting ? -120 : 0,
      opacity: isExiting ? 0 : 1,
      transition: { duration: 0.5, delay: isExiting ? 0.4 : 0.5 },
    },
  }

  return (
    <div
      ref={gameContainerRef}
      tabIndex={0}
      className="bg-background p-2 sm:p-4 outline-none transition-colors duration-300"
    >
      <motion.div variants={cardVariants} initial="initial" animate="animate" exit="exit">
        <Card className="w-full max-w-lg sm:max-w-2xl mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="space-y-3 sm:space-y-4 p-3 sm:p-6">
            {/* Header with controls */}
            <motion.div
              variants={headerVariants}
              initial="initial"
              animate="animate"
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="p-1.5 sm:p-2 bg-primary/10 rounded-lg"
                >
                  <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </motion.div>
                <h1 className="text-lg sm:text-2xl font-bold">Snake Game</h1>
              </div>

              <div className="flex items-center gap-1 sm:gap-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="sm" onClick={toggleTheme} className="p-1.5 sm:p-2">
                    <motion.div animate={{ rotate: isDark ? 0 : 180 }} transition={{ duration: 0.3 }}>
                      {isDark ? <Sun className="w-3 h-3 sm:w-4 sm:h-4" /> : <Moon className="w-3 h-3 sm:w-4 sm:h-4" />}
                    </motion.div>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className="p-1.5 sm:p-2"
                  >
                    <motion.div animate={{ scale: soundEnabled ? 1 : 0.8 }} transition={{ duration: 0.2 }}>
                      {soundEnabled ? (
                        <Volume2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      ) : (
                        <VolumeX className="w-3 h-3 sm:w-4 sm:h-4" />
                      )}
                    </motion.div>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05, x: -2 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExit}
                    className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3"
                  >
                    <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm">Back</span>
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Game stats */}
            <motion.div
              variants={statsVariants}
              initial="initial"
              animate="animate"
              className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3"
            >
              {[
                { label: "Score", value: gameState.score, color: "text-foreground" },
                { label: "Level", value: gameState.level, color: "text-primary" },
                { label: "Best", value: gameState.highScore, color: "text-yellow-600", icon: Trophy },
                {
                  label: "Status",
                  value: getGameStatus(),
                  color: gameState.gameOver
                    ? "text-red-500"
                    : gameState.isPaused
                      ? "text-yellow-500"
                      : gameState.gameStarted
                        ? "text-green-500"
                        : "text-muted-foreground",
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-muted rounded-lg p-2 sm:p-3 text-center transition-colors duration-200"
                >
                  <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
                  <div className={`text-sm sm:text-lg font-bold ${stat.color} flex items-center justify-center gap-1`}>
                    {stat.icon && <stat.icon className="w-3 h-3 sm:w-4 sm:h-4" />}
                    <span className="truncate">{stat.value}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </CardHeader>

          <CardContent className="space-y-4 sm:space-y-6 p-3 sm:p-6">
            {/* Game Canvas */}
            <motion.div variants={canvasVariants} initial="initial" animate="animate" className="flex justify-center">
              <div className="relative">
                <motion.canvas
                  ref={canvasRef}
                  width={CANVAS_SIZE}
                  height={CANVAS_SIZE}
                  className="border-2 border-border rounded-lg bg-background transition-all duration-300 w-full max-w-[300px] sm:max-w-[400px] h-auto"
                  style={{ aspectRatio: "1/1" }}
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />

                {/* Game State Overlay */}
                <AnimatePresence>
                  {(!gameState.gameStarted || gameState.gameOver || gameState.isPaused) && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-lg flex items-center justify-center"
                    >
                      <motion.div
                        initial={{ scale: 0.8, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.8, y: -20 }}
                        transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
                        className="text-center space-y-3 sm:space-y-4 p-4 sm:p-6"
                      >
                        {gameState.gameOver && (
                          <div className="space-y-2 sm:space-y-3">
                            <motion.div
                              animate={{ rotate: [0, -10, 10, -10, 0] }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                              className="text-3xl sm:text-4xl"
                            >
                              💀
                            </motion.div>
                            <h3 className="text-lg sm:text-xl font-bold">Game Over!</h3>
                            <p className="text-sm sm:text-base text-muted-foreground">
                              Final Score: <span className="text-primary font-bold">{gameState.score}</span>
                            </p>
                            <AnimatePresence>
                              {gameState.score === gameState.highScore && gameState.score > 0 && (
                                <motion.div
                                  initial={{ scale: 0, rotate: -180 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
                                >
                                  <Badge className="bg-yellow-500 text-black text-xs sm:text-sm">
                                    <Trophy className="w-3 h-3 mr-1" />
                                    New High Score!
                                  </Badge>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}

                        {gameState.isPaused && (
                          <div className="space-y-2 sm:space-y-3">
                            <motion.div
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                              className="text-3xl sm:text-4xl"
                            >
                              ⏸️
                            </motion.div>
                            <h3 className="text-lg sm:text-xl font-bold">Paused</h3>
                            <p className="text-sm sm:text-base text-muted-foreground">
                              Press <kbd className="px-2 py-1 bg-muted rounded text-xs">Space</kbd> to continue
                            </p>
                          </div>
                        )}

                        {!gameState.gameStarted && !gameState.gameOver && (
                          <div className="space-y-2 sm:space-y-3">
                            <motion.div
                              animate={{ y: [0, -5, 0] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                              className="text-3xl sm:text-4xl"
                            >
                              🎮
                            </motion.div>
                            <h3 className="text-lg sm:text-xl font-bold">Ready to Play?</h3>
                            <p className="text-sm sm:text-base text-muted-foreground">
                              Press <kbd className="px-2 py-1 bg-muted rounded text-xs">Space</kbd> to start
                            </p>
                          </div>
                        )}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Mobile Controls */}
            <motion.div variants={controlsVariants} initial="initial" animate="animate" className="block sm:hidden">
              <div className="flex flex-col items-center gap-1">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onTouchStart={() => handleMobileControl({ x: 0, y: -1 })}
                  className="p-2 bg-muted rounded-lg border-2 border-border hover:bg-muted/80 transition-colors"
                >
                  <ChevronUp className="w-5 h-5" />
                </motion.button>
                <div className="flex gap-1">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onTouchStart={() => handleMobileControl({ x: -1, y: 0 })}
                    className="p-2 bg-muted rounded-lg border-2 border-border hover:bg-muted/80 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onTouchStart={() => handleMobileControl({ x: 1, y: 0 })}
                    className="p-2 bg-muted rounded-lg border-2 border-border hover:bg-muted/80 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onTouchStart={() => handleMobileControl({ x: 0, y: 1 })}
                  className="p-2 bg-muted rounded-lg border-2 border-border hover:bg-muted/80 transition-colors"
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>

            {/* Game Controls */}
            <motion.div
              variants={controlsVariants}
              initial="initial"
              animate="animate"
              className="flex justify-center gap-2 sm:gap-3"
            >
              <AnimatePresence mode="wait">
                {!gameState.gameStarted ? (
                  <motion.div
                    key="start"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button onClick={startGame} className="px-4 sm:px-6 text-sm sm:text-base">
                      <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      Start Game
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="controls"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="flex gap-2 sm:gap-3"
                  >
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        onClick={togglePause}
                        variant="outline"
                        disabled={gameState.gameOver}
                        className="text-sm sm:text-base"
                      >
                        <motion.div animate={{ rotate: gameState.isPaused ? 0 : 180 }} transition={{ duration: 0.3 }}>
                          {gameState.isPaused ? (
                            <Play className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          ) : (
                            <Pause className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                          )}
                        </motion.div>
                        <span className="hidden sm:inline">{gameState.isPaused ? "Resume" : "Pause"}</span>
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button onClick={resetGame} variant="outline" className="text-sm sm:text-base">
                        <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                          <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        </motion.div>
                        <span className="hidden sm:inline">Reset</span>
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Game Instructions */}
            <motion.div
              variants={instructionsVariants}
              initial="initial"
              animate="animate"
              className="bg-muted/50 rounded-lg p-3 sm:p-4 hover:bg-muted/70 transition-colors duration-200"
            >
              <h4 className="text-sm font-semibold text-center mb-2 sm:mb-3">Controls</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center text-xs sm:text-sm">
                {[
                  { label: "Movement", keys: ["↑↓←→", "WASD", "Touch"] },
                  { label: "Start/Pause", keys: ["Space"] },
                  { label: "Sound", keys: [soundEnabled ? "On" : "Off"] },
                ].map((control, index) => (
                  <motion.div
                    key={control.label}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                  >
                    <div className="text-muted-foreground mb-1">{control.label}</div>
                    <div className="flex justify-center gap-1 items-center flex-wrap">
                      {control.keys.map((key, keyIndex) => (
                        <div key={keyIndex} className="flex items-center gap-1">
                          <motion.kbd
                            whileHover={{ scale: 1.05 }}
                            className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-background border rounded text-xs transition-colors duration-200"
                          >
                            {key}
                          </motion.kbd>
                          {keyIndex < control.keys.length - 1 && <span className="text-muted-foreground">•</span>}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
