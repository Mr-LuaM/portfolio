"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, RotateCcw, Trophy, Gamepad2, ArrowLeft, Pause, Volume2, VolumeX, Sun, Moon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes";
import Link from "next/link"


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
  const [soundEnabled, setSoundEnabled] = useState(true)
  const { theme, setTheme } = useTheme()

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

  // Handle keyboard input
  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      const gameKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "W", "a", "A", "s", "S", "d", "D", " "]

      if (!gameKeys.includes(e.key)) return

      e.preventDefault()
      e.stopPropagation()

      if (e.key === " ") {
        if (gameState.gameStarted && !gameState.gameOver) {
          setGameState((prev) => ({ ...prev, isPaused: !prev.isPaused }))
        }
        return
      }

      if (!gameState.gameStarted || gameState.gameOver || gameState.isPaused) return

      setGameState((prev) => {
        let newDirection = prev.direction

        switch (e.key) {
          case "ArrowUp":
          case "w":
          case "W":
            if (prev.direction.y !== 1) newDirection = { x: 0, y: -1 }
            break
          case "ArrowDown":
          case "s":
          case "S":
            if (prev.direction.y !== -1) newDirection = { x: 0, y: 1 }
            break
          case "ArrowLeft":
          case "a":
          case "A":
            if (prev.direction.x !== 1) newDirection = { x: -1, y: 0 }
            break
          case "ArrowRight":
          case "d":
          case "D":
            if (prev.direction.x !== -1) newDirection = { x: 1, y: 0 }
            break
          default:
            return prev
        }

        return { ...prev, direction: newDirection }
      })
    },
    [gameState.gameStarted, gameState.gameOver, gameState.isPaused],
  )

  // Game loop
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

    if (gameContainerRef.current) {
      gameContainerRef.current.addEventListener("click", handleFocus)
    }

    return () => {
      document.removeEventListener("keydown", handleKeyPress, { capture: true })
      if (gameContainerRef.current) {
        gameContainerRef.current.removeEventListener("click", handleFocus)
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
  }

  const togglePause = () => {
    if (gameState.gameStarted && !gameState.gameOver) {
      setGameState((prev) => ({ ...prev, isPaused: !prev.isPaused }))
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
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const getGameStatus = () => {
    if (!gameState.gameStarted) return "Ready to Play"
    if (gameState.gameOver) return "Game Over!"
    if (gameState.isPaused) return "Paused"
    return `Level ${gameState.level}`
  }

  return (
    <motion.div
      ref={gameContainerRef}
      tabIndex={0}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen bg-background flex items-center justify-center p-4 outline-none transition-colors duration-300"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card className="w-full max-w-2xl mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="space-y-4">
            {/* Header with controls */}
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="p-2 bg-primary/10 rounded-lg"
                >
                  <Gamepad2 className="w-5 h-5 text-primary" />
                </motion.div>
                <h1 className="text-2xl font-bold">Snake Game</h1>
              </div>

              <div className="flex items-center gap-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="sm" onClick={toggleTheme} className="p-2">
                    <motion.div animate={{ rotate: isDark ? 0 : 180 }} transition={{ duration: 0.3 }}>
                      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </motion.div>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="sm" onClick={() => setSoundEnabled(!soundEnabled)} className="p-2">
                    <motion.div animate={{ scale: soundEnabled ? 1 : 0.8 }} transition={{ duration: 0.2 }}>
                      {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </motion.div>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05, x: -2 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      <span className="hidden sm:inline">Back</span>
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Game stats */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3"
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
                  className="bg-muted rounded-lg p-3 text-center transition-colors duration-200"
                >
                  <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
                  <div className={`text-lg font-bold ${stat.color} flex items-center justify-center gap-1`}>
                    {stat.icon && <stat.icon className="w-4 h-4" />}
                    {stat.value}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Game Canvas */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex justify-center"
            >
              <div className="relative">
                <motion.canvas
                  ref={canvasRef}
                  width={CANVAS_SIZE}
                  height={CANVAS_SIZE}
                  className="border-2 border-border rounded-lg bg-background transition-all duration-300"
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
                        className="text-center space-y-4 p-6"
                      >
                        {gameState.gameOver && (
                          <div className="space-y-3">
                            <motion.div
                              animate={{ rotate: [0, -10, 10, -10, 0] }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                              className="text-4xl"
                            >
                              💀
                            </motion.div>
                            <h3 className="text-xl font-bold">Game Over!</h3>
                            <p className="text-muted-foreground">
                              Final Score: <span className="text-primary font-bold">{gameState.score}</span>
                            </p>
                            <AnimatePresence>
                              {gameState.score === gameState.highScore && gameState.score > 0 && (
                                <motion.div
                                  initial={{ scale: 0, rotate: -180 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
                                >
                                  <Badge className="bg-yellow-500 text-black">
                                    <Trophy className="w-3 h-3 mr-1" />
                                    New High Score!
                                  </Badge>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}

                        {gameState.isPaused && (
                          <div className="space-y-3">
                            <motion.div
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                              className="text-4xl"
                            >
                              ⏸️
                            </motion.div>
                            <h3 className="text-xl font-bold">Paused</h3>
                            <p className="text-muted-foreground">
                              Press <kbd className="px-2 py-1 bg-muted rounded text-xs">Space</kbd> to continue
                            </p>
                          </div>
                        )}

                        {!gameState.gameStarted && !gameState.gameOver && (
                          <div className="space-y-3">
                            <motion.div
                              animate={{ y: [0, -5, 0] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                              className="text-4xl"
                            >
                              🎮
                            </motion.div>
                            <h3 className="text-xl font-bold">Ready to Play?</h3>
                            <p className="text-muted-foreground">Use arrow keys or WASD to move</p>
                          </div>
                        )}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Game Controls */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="flex justify-center gap-3"
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
                    <Button onClick={startGame} className="px-6">
                      <Play className="w-4 h-4 mr-2" />
                      Start Game
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="controls"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="flex gap-3"
                  >
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button onClick={togglePause} variant="outline" disabled={gameState.gameOver}>
                        <motion.div animate={{ rotate: gameState.isPaused ? 0 : 180 }} transition={{ duration: 0.3 }}>
                          {gameState.isPaused ? <Play className="w-4 h-4 mr-2" /> : <Pause className="w-4 h-4 mr-2" />}
                        </motion.div>
                        {gameState.isPaused ? "Resume" : "Pause"}
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button onClick={resetGame} variant="outline">
                        <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                          <RotateCcw className="w-4 h-4 mr-2" />
                        </motion.div>
                        Reset
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Game Instructions */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="bg-muted/50 rounded-lg p-4 hover:bg-muted/70 transition-colors duration-200"
            >
              <h4 className="text-sm font-semibold text-center mb-3">Controls</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center text-sm">
                {[
                  { label: "Movement", keys: ["↑↓←→", "WASD"] },
                  { label: "Pause", keys: ["Space"] },
                ].map((control, index) => (
                  <motion.div
                    key={control.label}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                  >
                    <div className="text-muted-foreground mb-1">{control.label}</div>
                    <div className="flex justify-center gap-1 items-center">
                      {control.keys.map((key, keyIndex) => (
                        <div key={keyIndex} className="flex items-center gap-1">
                          <motion.kbd
                            whileHover={{ scale: 1.05 }}
                            className="px-2 py-1 bg-background border rounded text-xs transition-colors duration-200"
                          >
                            {key}
                          </motion.kbd>
                          {keyIndex < control.keys.length - 1 && <span className="text-muted-foreground">or</span>}
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
    </motion.div>
  )
}
