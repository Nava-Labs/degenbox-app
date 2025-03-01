"use client";

import React from "react";
import Matter from "matter-js";
import Logo from "@/public/logo.svg";

// Constants for physics configuration
const PHYSICS_CONFIG = {
  density: 0.001,
  frictionAir: 0.01,
  friction: 0.01,
  restitution: 0.7,
  slop: 0.05,
} as Matter.IBodyDefinition;

// Available textures and their configurations
const TEXTURE_CONFIGS = [
  { texture: "/texture_trump.png", size: 64, scale: 1 },      // 64x64
  { texture: "/texture_doge.png", size: 64, scale: 1 },       // 64x64
  { texture: "/texture_spx6900.webp", size: 64, scale: 1 },   // 64x64
  { texture: "/texture_wif.webp", size: 96, scale: 0.667 },   // 96x96
  { texture: "/texture_bonk.png", size: 64, scale: 1 },       // 64x64
  { texture: "/texture_pepe.png", size: 64, scale: 1 },       // 64x64
  { texture: "/texture_popcat.png", size: 64, scale: 1 },     // 64x64
  { texture: "/texture_aixbt.webp", size: 80, scale: 0.8 },   // 80x80
  { texture: "/texture_mog.png", size: 64, scale: 1 }         // 64x64
] as const;

interface HeaderPhysicsState {
  bodyWidth: number;
}

class HeaderPhysics extends React.Component<{}, HeaderPhysicsState> {
  private engine!: Matter.Engine;
  private matterRender!: Matter.Render;
  private runner!: Matter.Runner;
  private sceneRef: React.RefObject<HTMLDivElement>;

  constructor(props: {}) {
    super(props);
    this.state = {
      bodyWidth: typeof document !== "undefined" ? document.body.getBoundingClientRect().width : 0,
    };
    this.sceneRef = React.createRef();
  }

  // Helper function to create a ball with physics properties
  private createBall = (x: number, y: number, radius: number, texture: string) => {
    return Matter.Bodies.circle(x, y, radius, {
      ...PHYSICS_CONFIG,
      render: {
        sprite: { texture, xScale: radius / 30, yScale: radius / 30 }
      }
    });
  }

  // Create a random ball for click events
  private createRandomBall = () => {
    const x = Math.random() * this.state.bodyWidth;
    const y = -30;

    const textureConfig = TEXTURE_CONFIGS[Math.floor(Math.random() * TEXTURE_CONFIGS.length)];
    // Randomize scale between 0.5 and 1.2 of the base scale
    const randomScale = textureConfig.scale * (0.5 + Math.random() * 0.7);
    const radius = (textureConfig.size / 2) * randomScale;

    const ball = Matter.Bodies.circle(x, y, radius, {
      ...PHYSICS_CONFIG,
      render: {
        sprite: {
          texture: textureConfig.texture,
          xScale: randomScale,
          yScale: randomScale
        }
      }
    });

    return ball;
  };

  private createInitialBalls = () => {
    const balls = [];
    for (let i = 0; i < 24; i++) {
      const x = Math.random() * this.state.bodyWidth;
      const y = Math.random() * -600; // Stagger initial drop heights

      const textureConfig = TEXTURE_CONFIGS[i % TEXTURE_CONFIGS.length];
      // Randomize scale between 0.5 and 1.2 of the base scale
      const randomScale = textureConfig.scale * (0.5 + Math.random() * 0.7);
      const radius = (textureConfig.size / 2) * randomScale;

      const ball = Matter.Bodies.circle(x, y, radius, {
        ...PHYSICS_CONFIG,
        render: {
          sprite: {
            texture: textureConfig.texture,
            xScale: randomScale,
            yScale: randomScale
          }
        }
      });
      balls.push(ball);
    }
    return balls;
  };

  componentDidMount() {
    if (!this.sceneRef.current) return;

    const { Engine, Render, World, Mouse, MouseConstraint, Bodies } = Matter;
    const { bodyWidth: width } = this.state;
    const height = 320;

    // Create engine with optimized settings
    this.engine = Engine.create({
      positionIterations: 6,
      velocityIterations: 4,
      constraintIterations: 2,
      enableSleeping: true,
    });

    // Create renderer
    this.matterRender = Render.create({
      element: this.sceneRef.current,
      engine: this.engine,
      options: {
        width,
        height,
        pixelRatio: window.devicePixelRatio,
        background: "transparent",
        wireframes: false,
        showSleeping: false,
      }
    });

    // Start the renderer
    Render.run(this.matterRender);

    // Create runner
    this.runner = Matter.Runner.create();
    Matter.Runner.run(this.runner, this.engine);

    // Add walls and floor
    World.add(this.engine.world, [
      Matter.Bodies.rectangle(-50, 0, 50, height * 3, { isStatic: true }),
      Matter.Bodies.rectangle(width + 50, 0, 50, height * 3, { isStatic: true }),
      Matter.Bodies.rectangle(width / 2, height + 30, width, 90, {
        isStatic: true,
        render: { fillStyle: "transparent" }
      }),
    ]);

    // Create initial dropping balls
    const initialBalls = this.createInitialBalls();
    initialBalls.forEach((ball, i) => {
      setTimeout(() => World.add(this.engine.world, ball), 400 * (i + 1));
    });

    // Add mouse control
    const mouse = Mouse.create(this.matterRender.canvas);
    const mouseConstraint = MouseConstraint.create(this.engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });

    // NOTE: Remove mouse wheel events
    // mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
    // mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);

    World.add(this.engine.world, mouseConstraint);

    // NOTE: Add click event for random ball drops
    // this.matterRender.canvas.addEventListener("click", () => {
    //   World.add(this.engine.world, this.createRandomBall());
    // });
  }

  componentWillUnmount() {
    // Stop the engine and runner first
    Matter.Runner.stop(this.runner);
    Matter.Engine.clear(this.engine);

    // Stop the renderer
    if (this.matterRender) {
      Matter.Render.stop(this.matterRender);
    }

    // Clear all instances
    if (this.engine) {
      Matter.World.clear(this.engine.world, false);
      Matter.Engine.clear(this.engine);
    }

    // Remove the canvas element
    if (this.matterRender && this.matterRender.canvas) {
      this.matterRender.canvas.remove();
    }

    // Nullify references
    this.engine = null as any;
    this.matterRender = null as any;
    this.runner = null as any;
  }

  render() {
    return (
      <div
        className="relative overflow-hidden"
        style={{
          height: "320px",
          width: this.state.bodyWidth,
        }}
      >
        <div ref={this.sceneRef} className="relative filter brightness-90" />
        <Logo className="w-40 absolute bottom-[10%] left-[1rem] pointer-events-none text-white" />
      </div>
    );
  }
}

export default HeaderPhysics;
