'use client'

/* eslint-disable react/no-string-refs */
import React from 'react';
import Matter from 'matter-js';
import Logo from '@/public/logo.svg'

interface HeaderPhysicsState {
    bodyWidth: number;
}

class HeaderPhysics extends React.Component<{}, HeaderPhysicsState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            bodyWidth: typeof document !== 'undefined' ? document.body.getBoundingClientRect().width : 0
        };
    }
    componentDidMount() {
        var Engine = Matter.Engine,
            Render = Matter.Render,
            World = Matter.World,
            Bodies = Matter.Bodies,
            Mouse = Matter.Mouse,
            width = this.state.bodyWidth,
            height = 320,
            MouseConstraint = Matter.MouseConstraint;

        var engine = Engine.create({
            // positionIterations: 20
        });

        var render = Render.create({
            element: this.refs.scene as HTMLElement,
            engine: engine,
            options: {
                pixelRatio: 'auto' as any,
                width: width,
                height: height,
                wireframes: false,
                background: 'transparent',
                wireframeBackground: 'transparent',
            },
        });
        Render.run(render);

        let runner = Matter.Runner.create();
        Matter.Runner.run(runner, engine);

        // Add collision event listener
        Matter.Events.on(engine, 'collisionStart', function (event) {
            event.pairs.forEach((pair) => {
                console.log('Collision detected:', {
                    bodyA: {
                        position: pair.bodyA.position,
                        radius: pair.bodyA.circleRadius,
                        velocity: pair.bodyA.velocity,
                        render: pair.bodyA.render
                    },
                    bodyB: {
                        position: pair.bodyB.position,
                        radius: pair.bodyB.circleRadius,
                        velocity: pair.bodyB.velocity,
                        render: pair.bodyB.render
                    }
                });
            });
        });

        var ballA = Bodies.circle(170, 50, 30, {
            density: 0.05,
            frictionAir: 0.03,
            friction: 0.05,
            restitution: 0.3,
            render: {
                sprite: {
                    texture: '/texture_trump.png',
                    xScale: 0.75,
                    yScale: 0.75,
                },
            },
        });
        var ballB = Bodies.circle(200, 50, 25, {
            density: 0.05,
            frictionAir: 0.03,
            friction: 0.05,
            restitution: 0.3,
            render: {
                sprite: {
                    texture: '/texture_doge.png',
                    xScale: 0.9,
                    yScale: 0.9,
                },
            },
        });
        var ballC = Bodies.circle(460, 50, 35, {
            density: 0.05,
            frictionAir: 0.03,
            friction: 0.05,
            restitution: 0.3,
            render: {
                sprite: {
                    texture: '/texture_spx6900.webp',
                    xScale: 0.75,
                    yScale: 0.75,
                },
            },
        });
        var ballD = Bodies.circle(270, 50, 20, {
            density: 0.05,
            frictionAir: 0.03,
            friction: 0.05,
            restitution: 0.3,
            render: {
                sprite: {
                    texture: '/texture_wif.webp',
                    xScale: 0.6,
                    yScale: 0.6,
                },
            },
        });
        var ballE = Bodies.circle(170, 50, 30, {
            density: 0.05,
            frictionAir: 0.03,
            friction: 0.05,
            restitution: 0.3,
            render: {
                sprite: {
                    texture: '/texture_trump.png',
                    xScale: 0.75,
                    yScale: 0.75,
                },
            },
        });
        var ballF = Bodies.circle(200, 50, 25, {
            density: 0.05,
            frictionAir: 0.03,
            friction: 0.05,
            restitution: 0.3,
            render: {
                sprite: {
                    texture: '/texture_doge.png',
                    xScale: 0.9,
                    yScale: 0.9,
                },
            },
        });
        var ballG = Bodies.circle(460, 50, 35, {
            density: 0.05,
            frictionAir: 0.03,
            friction: 0.05,
            restitution: 0.3,
            render: {
                sprite: {
                    texture: '/texture_spx6900.webp',
                    xScale: 0.75,
                    yScale: 0.75,
                },
            },
        });
        var ballH = Bodies.circle(270, 50, 20, {
            density: 0.05,
            frictionAir: 0.03,
            friction: 0.05,
            restitution: 0.3,
            render: {
                sprite: {
                    texture: '/texture_wif.webp',
                    xScale: 0.6,
                    yScale: 0.6,
                },
            },
        });
        World.add(engine.world, [
            // walls
            Bodies.rectangle(-50, 0, 50, height * 3, {
                isStatic: true,
                label: 'leftWall',
            }),
            Bodies.rectangle(width + 50, 0, 50, height * 3, {
                isStatic: true,
                label: 'rightWall',
            }),
            Bodies.rectangle(width / 2, height + 30, width, 90, {
                isStatic: true,
                label: 'floor',
                render: {
                    fillStyle: 'transparent',
                },
            }),
        ]);

        setTimeout(function () {
            World.add(engine.world, ballA);
        }, 800);
        setTimeout(function () {
            World.add(engine.world, ballB);
        }, 1600);
        setTimeout(function () {
            World.add(engine.world, ballC);
        }, 2400);
        setTimeout(function () {
            World.add(engine.world, ballD);
        }, 3200);
        setTimeout(function () {
            World.add(engine.world, ballE);
        }, 3600);
        setTimeout(function () {
            World.add(engine.world, ballF);
        }, 4000);
        setTimeout(function () {
            World.add(engine.world, ballG);
        }, 4800);
        setTimeout(function () {
            World.add(engine.world, ballH);
        }, 5600);

        // add mouse control
        var mouse = Mouse.create(render.canvas),
            mouseConstraint = MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.2,
                    render: {
                        visible: false,
                    },
                },
            });

        mouseConstraint.mouse.element.removeEventListener(
            'mousewheel',
            (mouseConstraint.mouse as any).mousewheel,
        );
        mouseConstraint.mouse.element.removeEventListener(
            'DOMMouseScroll',
            (mouseConstraint.mouse as any).mousewheel,
        );

        World.add(engine.world, mouseConstraint);

        const textures = [
            '/texture_pepe.png',
            '/texture_mog.png',
            '/texture_bonk.png',
            '/texture_popcat.png',
            '/texture_aixbt.webp',
        ];

        function createBall(fruitType: any) {
            let textureIndex;

            if (fruitType === 'one') {
                textureIndex = 0;
            } else if (fruitType === 'two') {
                textureIndex = 1;
            } else if (fruitType === 'three') {
                textureIndex = 2;
            } else if (fruitType === 'four') {
                textureIndex = 3;
            } else if (fruitType === 'five') {
                textureIndex = 4;
            }
            // size randomiser
            const ORIGINAL_SIZE = 100;
            const baseScale = 0.5; // Base scale factor
            const variationRange = 0.2; // Amount of random variation
            const SIZE = baseScale + (Math.random() * variationRange);

            const ball = Bodies.circle(
                Math.round(Math.random() * width), // x
                -30, // y
                (SIZE * ORIGINAL_SIZE) / 2.5, // r
                {
                    angle: Math.PI * (Math.random() * 2 - 1),
                    restitution: 0.5,
                    render: {
                        sprite: {
                            texture: textures[textureIndex as number],
                            xScale: SIZE,
                            yScale: SIZE,
                        },
                    },
                },
            );

            return ball;
        }

        let oneArray = [];

        Matter.Events.on(mouseConstraint, 'mousedown', function (event) {
            const oneFruit = createBall('one');
            World.add(engine.world, [oneFruit]);
            oneArray.push(oneFruit);
        });

        let twoArray = [];

        Matter.Events.on(mouseConstraint, 'mousedown', function (event) {
            const twoFruit = createBall('two');
            World.add(engine.world, [twoFruit]);
            twoArray.push(twoFruit);
        });

        let threeArray = [];

        Matter.Events.on(mouseConstraint, 'mousedown', function (event) {
            const threeFruit = createBall('three');
            World.add(engine.world, [threeFruit]);
            threeArray.push(threeFruit);
        });

        Matter.Events.on(mouseConstraint, 'mousedown', function (event) {
            const fourFruit = createBall('four');
            World.add(engine.world, [fourFruit]);
            threeArray.push(fourFruit);
        });

        Matter.Events.on(mouseConstraint, 'mousedown', function (event) {
            const fiveFruit = createBall('five');
            World.add(engine.world, [fiveFruit]);
            threeArray.push(fiveFruit);
        });

        var deviceOrientation = window.orientation;

        window.addEventListener(
            'devicemotion',
            function devicemotionHandler(event: DeviceMotionEvent) {
                const accGravity = event.accelerationIncludingGravity;
                const acc = event.acceleration;

                if (!accGravity || !acc) return;

                var xg = (accGravity.x || 0) / 10;
                var yg = (accGravity.y || 0) / 10;
                var accX = acc.x || 0;
                var accY = acc.y || 0;

                switch (deviceOrientation) {
                    case 0:
                        engine.world.gravity.x = xg + accX;
                        engine.world.gravity.y = -yg + accY;
                        break;
                    case 90:
                        engine.world.gravity.x = -yg - accX;
                        engine.world.gravity.y = -xg + accX;
                        break;
                    case -90:
                        engine.world.gravity.x = yg + accX;
                        engine.world.gravity.y = xg - accX;
                        break;
                    case 180:
                        engine.world.gravity.x = -xg - accX;
                        engine.world.gravity.y = yg - accX;
                }

                if (window.navigator.userAgent.indexOf('Android') > 0) {
                    engine.world.gravity.x = -engine.world.gravity.x;
                    engine.world.gravity.y = -engine.world.gravity.y;
                }
            },
        );

        Engine.run(engine);

        Render.run(render);
    }


    render() {
        return (
            <>
                <div className="relative overflow-x-hidden"
                    style={{
                        height: "320px",
                        width: this.state.bodyWidth
                    }}
                >
                    <div ref="scene" className="relative filter brightness-90" />
                    {/* <h1 className="text pointer-events-none text-[4rem] md:text-[6rem] absolute bottom-[50%] left-[10%]">
            Please Click!!
          </h1> */}
                    <Logo className="w-40 absolute bottom-[0%] left-[1rem] pointer-events-none text-white" />
                </div>
            </>
        );
    }
}

export default HeaderPhysics;
