import { useEffect, useRef } from "react";

const ParticleBackground = () => {

    const canvasRef = useRef(null);

    const mouseRef = useRef({
        x: null,
        y: null,
        radius: 180,
    });

    useEffect(() => {

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        let animationFrameId;

        // =========================
        // RESIZE
        // =========================

        const resizeCanvas = () => {

            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;

        };

        // =========================
        // MOUSE
        // =========================

        const handleMouseMove = (e) => {

            const rect =
                canvas.getBoundingClientRect();

            mouseRef.current.x =
                e.clientX - rect.left;

            mouseRef.current.y =
                e.clientY - rect.top;
        };

        const handleMouseOut = () => {

            mouseRef.current.x = null;
            mouseRef.current.y = null;
        };

        window.addEventListener(
            "resize",
            resizeCanvas
        );

        window.addEventListener(
            "mousemove",
            handleMouseMove
        );

        window.addEventListener(
            "mouseout",
            handleMouseOut
        );

        resizeCanvas();

        // =========================
        // PARTICLES
        // =========================

        const particles = [];

        const particleCount = 70;

        const colors = [
            "#38bdf8",
            "#60a5fa",
            "#818cf8",
            "#22d3ee",
            "#ffffff",
        ];

        // =========================
        // PARTICLE CLASS
        // =========================

        class Particle {

            constructor() {
                this.reset();
            }

            reset() {

                this.x =
                    Math.random() * canvas.width;

                this.y =
                    Math.random() * canvas.height;

                // SLOW TECH MOTION
                this.vx =
                    (Math.random() - 0.5) * 0.7;

                this.vy =
                    (Math.random() - 0.5) * 0.7;

                this.radius =
                    Math.random() * 2.5 + 1;

                this.color =
                    colors[
                        Math.floor(
                            Math.random() *
                            colors.length
                        )
                    ];

                this.opacity =
                    Math.random() * 0.6 + 0.3;

                this.density =
                    (Math.random() * 30) + 1;

                // SHOOTING TAIL
                this.tail =
                    Math.random() * 20 + 10;
            }

            // =========================
            // UPDATE
            // =========================

            update() {

                // MOUSE REPULSION
                if (
                    mouseRef.current.x !== null
                ) {

                    let dx =
                        mouseRef.current.x -
                        this.x;

                    let dy =
                        mouseRef.current.y -
                        this.y;

                    let distance =
                        Math.sqrt(
                            dx * dx + dy * dy
                        );

                    let forceDirectionX =
                        dx / distance;

                    let forceDirectionY =
                        dy / distance;

                    let maxDistance =
                        mouseRef.current.radius;

                    let force =
                        (maxDistance -
                            distance) /
                        maxDistance;

                    let directionX =
                        forceDirectionX *
                        force *
                        this.density;

                    let directionY =
                        forceDirectionY *
                        force *
                        this.density;

                    if (
                        distance <
                        mouseRef.current.radius
                    ) {

                        this.x -= directionX;
                        this.y -= directionY;
                    }
                }

                // NATURAL FLOAT
                this.x += this.vx;
                this.y += this.vy;

                // WRAP SCREEN
                if (this.x < 0)
                    this.x = canvas.width;

                if (this.x > canvas.width)
                    this.x = 0;

                if (this.y < 0)
                    this.y = canvas.height;

                if (this.y > canvas.height)
                    this.y = 0;
            }

            // =========================
            // DRAW
            // =========================

            draw() {

                ctx.save();

                // PARTICLE GLOW
                ctx.shadowBlur = 20;
                ctx.shadowColor = this.color;

                // MAIN DOT
                ctx.beginPath();

                ctx.arc(
                    this.x,
                    this.y,
                    this.radius,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle = this.color;

                ctx.globalAlpha =
                    this.opacity;

                ctx.fill();

                // SHOOTING TRAIL
                ctx.beginPath();

                ctx.moveTo(this.x, this.y);

                ctx.lineTo(
                    this.x -
                    this.vx * this.tail,

                    this.y -
                    this.vy * this.tail
                );

                ctx.strokeStyle =
                    this.color;

                ctx.lineWidth = 1.1;

                ctx.stroke();

                // PULSE CIRCLE
                ctx.beginPath();

                ctx.arc(
                    this.x,
                    this.y,
                    this.radius * 4,
                    0,
                    Math.PI * 2
                );

                ctx.strokeStyle =
                    "rgba(56,189,248,0.08)";

                ctx.lineWidth = 1;

                ctx.stroke();

                // RANDOM FLASH
                // if (Math.random() > 0.997) {

                //     ctx.beginPath();

                //     ctx.arc(
                //         this.x,
                //         this.y,
                //         this.radius * 8,
                //         0,
                //         Math.PI * 2
                //     );

                //     ctx.fillStyle =
                //         "rgba(255,255,255,0.12)";

                //     ctx.fill();
                // }

                ctx.restore();
            }
        }

        // =========================
        // CREATE PARTICLES
        // =========================

        for (
            let i = 0;
            i < particleCount;
            i++
        ) {

            particles.push(
                new Particle()
            );
        }

        // =========================
        // ANIMATE
        // =========================

        const animate = () => {

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            // =========================
            // GRID
            // =========================

            // ctx.save();

            // ctx.strokeStyle =
            //     "rgba(255,255,255,0.03)";

            // ctx.lineWidth = 1;

            // for (
            //     let i = 0;
            //     i < canvas.width;
            //     i += 50
            // ) {

            //     ctx.beginPath();

            //     ctx.moveTo(i, 0);

            //     ctx.lineTo(
            //         i,
            //         canvas.height
            //     );

            //     ctx.stroke();
            // }

            // for (
            //     let j = 0;
            //     j < canvas.height;
            //     j += 50
            // ) {

            //     ctx.beginPath();

            //     ctx.moveTo(0, j);

            //     ctx.lineTo(
            //         canvas.width,
            //         j
            //     );

            //     ctx.stroke();
            // }

            // ctx.restore();

            // =========================
            // MOUSE GLOW
            // =========================

            if (
                mouseRef.current.x !== null
            ) {

                const gradient =
                    ctx.createRadialGradient(
                        mouseRef.current.x,
                        mouseRef.current.y,
                        0,

                        mouseRef.current.x,
                        mouseRef.current.y,
                        180
                    );

                gradient.addColorStop(
                    0,
                    "rgba(56,189,248,0.18)"
                );

                gradient.addColorStop(
                    1,
                    "transparent"
                );

                ctx.beginPath();

                ctx.fillStyle = gradient;

                ctx.arc(
                    mouseRef.current.x,
                    mouseRef.current.y,
                    180,
                    0,
                    Math.PI * 2
                );

                ctx.fill();
            }

            // =========================
            // DATA STREAMS
            // =========================

            // for (let i = 0; i < 8; i++) {

            //     let x =
            //         (
            //             Date.now() * 0.02 +
            //             i * 220
            //         ) %
            //         canvas.width;

            //     ctx.beginPath();

            //     const gradient =
            //         ctx.createLinearGradient(
            //             x,
            //             0,
            //             x,
            //             220
            //         );

            //     gradient.addColorStop(
            //         0,
            //         "transparent"
            //     );

            //     gradient.addColorStop(
            //         0.5,
            //         "rgba(56,189,248,0.15)"
            //     );

            //     gradient.addColorStop(
            //         1,
            //         "transparent"
            //     );

            //     ctx.strokeStyle =
            //         gradient;

            //     ctx.lineWidth = 1;

            //     ctx.moveTo(x, 0);

            //     ctx.lineTo(x, 220);

            //     ctx.stroke();
            // }

            // =========================
            // PARTICLES
            // =========================

            particles.forEach((p) => {

                p.update();
                p.draw();

            });

            // =========================
            // CONNECTING LINES
            // =========================

            for (
                let a = 0;
                a < particles.length;
                a++
            ) {

                for (
                    let b = a;
                    b < particles.length;
                    b++
                ) {

                    let dx =
                        particles[a].x -
                        particles[b].x;

                    let dy =
                        particles[a].y -
                        particles[b].y;

                    let distance =
                        Math.sqrt(
                            dx * dx +
                            dy * dy
                        );

                    if (distance < 150) {

                        ctx.beginPath();

                        ctx.strokeStyle =
                            "rgba(120,180,255,0.08)";

                        ctx.lineWidth = 1;

                        ctx.moveTo(
                            particles[a].x,
                            particles[a].y
                        );

                        ctx.lineTo(
                            particles[b].x,
                            particles[b].y
                        );

                        ctx.stroke();
                    }
                }
            }

            animationFrameId =
                requestAnimationFrame(
                    animate
                );
        };

        animate();

        // =========================
        // CLEANUP
        // =========================

        return () => {

            window.removeEventListener(
                "resize",
                resizeCanvas
            );

            window.removeEventListener(
                "mousemove",
                handleMouseMove
            );

            window.removeEventListener(
                "mouseout",
                handleMouseOut
            );

            cancelAnimationFrame(
                animationFrameId
            );
        };

    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="
                absolute
                inset-0
                pointer-events-none
                z-0
                overflow-hidden
            "
            style={{
                opacity: 1,
            }}
        />
    );
};

export default ParticleBackground;