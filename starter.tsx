import React, { useState, useEffect, useRef, FC } from 'react';
import { Github, Book, Users, ArrowRight, Layers, Zap, Shield, MessageSquare, MousePointerClick, FileText, Workflow, Copy, Server, Database, Shuffle, Minus, Plus, Cpu, Clock } from 'lucide-react';

// --- Helper Components ---

// Custom hook for detecting if an element is in the viewport
const useOnScreen = (options: IntersectionObserverInit) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
            }
        }, options);

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [ref, options]);

    return [ref, isVisible] as const;
};

// Animated background component
const AnimatedBackground: FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        let particles: Particle[] = [];

        class Particle {
            x: number;
            y: number;
            directionX: number;
            directionY: number;
            size: number;
            color: string;

            constructor(x: number, y: number, directionX: number, directionY: number, size: number, color: string) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }

            draw() {
                ctx!.beginPath();
                ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx!.fillStyle = 'rgba(150, 150, 150, 0.1)';
                ctx!.fill();
            }

            update() {
                if (this.x > width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > height || this.y < 0) {
                    this.directionY = -this.directionY;
                }
                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        function init() {
            particles = [];
            let numberOfParticles = (width * height) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((width - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((height - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * .4) - .2;
                let directionY = (Math.random() * .4) - .2;
                let color = '#FFF';
                particles.push(new Particle(x, y, directionX, directionY, size, color));
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx!.clearRect(0, 0, width, height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
            }
            connect();
        }

        function connect() {
            let opacityValue = 1;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x))
                        + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
                    if (distance < (width / 7) * (height / 7)) {
                        opacityValue = 1 - (distance / 20000);
                        ctx!.strokeStyle = 'rgba(180, 180, 180,' + opacityValue + ')';
                        ctx!.lineWidth = 1;
                        ctx!.beginPath();
                        ctx!.moveTo(particles[a].x, particles[b].y);
                        ctx!.lineTo(particles[b].x, particles[a].y);
                        ctx!.stroke();
                    }
                }
            }
        }

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            init();
        };

        window.addEventListener('resize', handleResize);
        
        init();
        animate();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />;
};

// FadeIn component for scroll animations
const FadeIn: FC<{ children: React.ReactNode; delay?: string }> = ({ children, delay }) => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
    const style = { transitionDelay: delay || '0ms' };
    return (
        <div
            ref={ref}
            style={style}
            className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            {children}
        </div>
    );
};

// Gofka Logo Component
const GofkaLogo: FC<{ className?: string }> = ({ className }) => {
    return (
        <svg
            viewBox="0 0 200 200"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
        >
            <path d="M100 25C113.81 25 125 36.19 125 50V62.5H75V50C75 36.19 86.19 25 100 25Z" />
            <path d="M137.5 68.75C144.4 68.75 150 74.35 150 81.25V93.75H137.5V68.75Z" />
            <path d="M62.5 68.75C55.6 68.75 50 74.35 50 81.25V93.75H62.5V68.75Z" />
            <path d="M100 75C120.71 75 137.5 91.79 137.5 112.5V125H62.5V112.5C62.5 91.79 79.29 75 100 75Z" />
            <path d="M118.75 100C118.75 105.18 114.58 109.38 109.38 109.38H90.62C85.42 109.38 81.25 105.18 81.25 100C81.25 94.82 85.42 90.62 90.62 90.62H109.38C114.58 90.62 118.75 94.82 118.75 100Z" />
            <path d="M125 131.25H75V150C75 163.81 86.19 175 100 175C113.81 175 125 163.81 125 150V131.25Z" />
        </svg>
    );
};

// Custom hook for animating number count-up
const useCountUp = (end: number, duration: number = 500) => {
    const [count, setCount] = useState(0);
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);

    useEffect(() => {
        let currentFrame = 0;
        const counter = setInterval(() => {
            currentFrame++;
            const progress = currentFrame / totalFrames;
            const currentVal = end * progress;
            setCount(currentVal);

            if (currentFrame === totalFrames) {
                clearInterval(counter);
                setCount(end);
            }
        }, frameRate);

        return () => clearInterval(counter);
    }, [end, duration, frameRate, totalFrames]);
    
    return count;
};

// --- Page Sections ---

const Header: FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const headerClasses = isScrolled
        ? 'bg-white shadow-md text-black'
        : 'text-white mix-blend-difference';

    const linkClasses = isScrolled ? 'hover:text-gray-600' : 'hover:text-gray-400';
    
    const githubButtonClasses = isScrolled
        ? 'bg-black text-white hover:bg-gray-800'
        : 'bg-white text-black hover:bg-gray-200';

    const mobileButtonClasses = isScrolled ? 'text-black' : 'text-white';

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${headerClasses}`}>
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <a href="#" className="flex items-center space-x-3">
                    <GofkaLogo className="w-8 h-8"/>
                    <span className="font-serif text-2xl font-bold tracking-wider">Gofka</span>
                </a>
                <div className="hidden md:flex items-center space-x-6 font-mono text-sm">
                    <a href="#features" className={linkClasses}>Features</a>
                    <a href="#use-cases" className={linkClasses}>Use Cases</a>
                    <a href="#pipeline" className={linkClasses}>Pipeline</a>
                    <a href="#quickstart" className={linkClasses}>Quickstart</a>
                    <a href="#community" className={linkClasses}>Community</a>
                    <a href="#" className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors duration-300 ${githubButtonClasses}`}>
                        <Github size={16} />
                        <span>GitHub</span>
                    </a>
                </div>
                 <div className="md:hidden">
                    <button className={`${mobileButtonClasses} focus:outline-none`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                    </button>
                </div>
            </nav>
        </header>
    );
};

const Hero: FC = () => {
    return (
        <section className="min-h-screen flex items-center justify-center text-center text-black relative overflow-hidden bg-white">
            <div className="relative z-10 container mx-auto px-6">
                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tighter mb-4">
                    The Kafka Protocol,
                    <br />
                    Reimagined in Go.
                </h1>
                <p className="font-sans text-lg md:text-xl max-w-2xl mx-auto text-gray-700 mb-8">
                    Gofka is a high-performance, open-source message broker built in Go, offering Kafka-like semantics with simplified deployment.
                </p>
                <div className="flex justify-center items-center space-x-4">
                    <a
                        href="#quickstart"
                        className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-white bg-black rounded-md overflow-hidden transition-all duration-300"
                    >
                        <span className="absolute top-0 left-0 w-full h-full bg-gray-800 transition-all duration-300 transform -translate-x-full group-hover:translate-x-0"></span>
                        <span className="relative flex items-center">Get Started <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" /></span>
                    </a>
                    <a
                        href="#"
                        className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-black bg-transparent border-2 border-black rounded-md overflow-hidden transition-all duration-300"
                    >
                         <span className="absolute top-0 left-0 w-full h-full bg-gray-200 transition-all duration-300 transform -translate-x-full group-hover:translate-x-0"></span>
                        <span className="relative flex items-center"><Book className="mr-2 w-5 h-5" /> Documentation</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

const Features: FC = () => {
    const features = [
        {
            icon: <Zap className="w-10 h-10 text-black" />,
            title: "Blazing Fast",
            description: "Leveraging Go's concurrency for low-latency and high-throughput messaging."
        },
        {
            icon: <Layers className="w-10 h-10 text-black" />,
            title: "Persistent & Durable",
            description: "At-least-once delivery guarantee. Your messages are safe, even during system failures."
        },
        {
            icon: <Shield className="w-10 h-10 text-black" />,
            title: "Kafka Compatible",
            description: "Uses the Kafka protocol, allowing you to use existing Kafka clients and tools."
        }
    ];

    return (
        <section id="features" className="py-20 md:py-32 bg-gray-50 text-black">
            <div className="container mx-auto px-6">
                <FadeIn>
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl md:text-5xl font-bold">Why Gofka?</h2>
                        <p className="font-sans text-lg text-gray-600 mt-4 max-w-xl mx-auto">
                            A robust set of features designed for reliability and performance.
                        </p>
                    </div>
                </FadeIn>
                <div className="grid md:grid-cols-3 gap-12">
                    {features.map((feature, index) => (
                        <FadeIn key={index} delay={`${index * 150}ms`}>
                            <div className="text-center p-8 border border-gray-200 rounded-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-white">
                                <div className="inline-block p-4 bg-gray-100 rounded-full mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="font-serif text-2xl font-semibold mb-3">{feature.title}</h3>
                                <p className="font-sans text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

const UseCases: FC = () => {
    const cases = [
        { icon: <MessageSquare className="w-8 h-8 text-white" />, title: "Messaging", description: "Decouple services with reliable, asynchronous communication patterns." },
        { icon: <MousePointerClick className="w-8 h-8 text-white" />, title: "Activity Tracking", description: "Capture high-volume user interaction data in real-time for analysis." },
        { icon: <FileText className="w-8 h-8 text-white" />, title: "Log Aggregation", description: "Collect and process logs from distributed systems in a centralized, scalable way." },
        { icon: <Workflow className="w-8 h-8 text-white" />, title: "Stream Processing", description: "Build real-time data pipelines that react to, transform, and analyze event streams." },
    ];

    return (
        <section id="use-cases" className="py-20 md:py-32 bg-black text-white">
            <div className="container mx-auto px-6">
                <FadeIn>
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl md:text-5xl font-bold">Built for a Multitude of Scenarios</h2>
                        <p className="font-sans text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
                            Gofka's flexibility makes it a powerful tool for various data-driven applications.
                        </p>
                    </div>
                </FadeIn>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {cases.map((item, index) => (
                        <FadeIn key={index} delay={`${index * 150}ms`}>
                            <div className="p-6 border border-gray-800 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors">
                                <div className="inline-block p-4 bg-black rounded-full mb-4">
                                    {item.icon}
                                </div>
                                <h3 className="font-mono text-lg font-bold mb-2">{item.title}</h3>
                                <p className="font-sans text-sm text-gray-400">{item.description}</p>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

const PipelineComparison: FC = () => {
    type View = 'gofka' | 'kafka';
    const [view, setView] = useState<View>('gofka');
    const [producers, setProducers] = useState(2);
    const [consumers, setConsumers] = useState(2);
    const [calculatedMetrics, setCalculatedMetrics] = useState({ latency: 0, memory: 0 });

    const animatedLatency = useCountUp(calculatedMetrics.latency);
    const animatedMemory = useCountUp(calculatedMetrics.memory);

    const MAX_NODES = 5;

    useEffect(() => {
        let baseMemory, memoryPerProducer, memoryPerConsumer;
        let baseLatency, latencyPerProducer, latencyPerConsumer;

        if (view === 'gofka') {
            baseMemory = 30; memoryPerProducer = 5; memoryPerConsumer = 8;
            baseLatency = 2; latencyPerProducer = 0.2; latencyPerConsumer = 0.3;
        } else {
            baseMemory = 250; memoryPerProducer = 15; memoryPerConsumer = 20;
            baseLatency = 8; latencyPerProducer = 0.5; latencyPerConsumer = 0.7;
        }

        const totalMemory = baseMemory + (producers * memoryPerProducer) + (consumers * memoryPerConsumer);
        const avgLatency = baseLatency + (producers * latencyPerProducer) + (consumers * latencyPerConsumer);

        setCalculatedMetrics({
            memory: totalMemory,
            latency: avgLatency,
        });

    }, [view, producers, consumers]);

    const producerNodes = Array.from({ length: producers });
    const consumerNodes = Array.from({ length: consumers });

    const getNodeY = (index: number, total: number, height: number) => {
        if (total === 1) return height / 2 - 40;
        const totalHeight = height * 0.8;
        const startY = (height - totalHeight) / 2;
        return startY + (index / (total - 1)) * totalHeight - 40;
    };

    const canvasHeight = 500;

    const Counter: FC<{ label: string; value: number; setter: (v: number) => void }> = ({ label, value, setter }) => (
        <div className="font-mono text-sm text-center">
            <label className="block mb-2">{label}</label>
            <div className="flex items-center justify-center space-x-2">
                <button onClick={() => setter(Math.max(1, value - 1))} className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"><Minus size={16}/></button>
                <span className="text-lg font-bold w-8 text-center">{value}</span>
                <button onClick={() => setter(Math.min(MAX_NODES, value + 1))} className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"><Plus size={16}/></button>
            </div>
        </div>
    );

    return (
        <section id="pipeline" className="py-20 md:py-32 bg-white text-black">
            <div className="container mx-auto px-6">
                <FadeIn>
                    <div className="text-center mb-12">
                        <h2 className="font-serif text-4xl md:text-5xl font-bold">Interactive Pipeline Comparison</h2>
                        <p className="font-sans text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
                            Adjust the number of producers and consumers to see how Gofka's architecture provides lower latency and memory usage compared to a traditional Kafka setup.
                        </p>
                    </div>
                </FadeIn>
                <FadeIn delay="200ms">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-6 mb-8 items-center">
                            <div className="flex justify-center">
                                <div className="flex rounded-lg p-1 bg-gray-200">
                                    <button onClick={() => setView('gofka')} className={`px-4 py-2 text-sm font-mono rounded-md transition-colors ${view === 'gofka' ? 'bg-black text-white' : 'text-black'}`}>Gofka</button>
                                    <button onClick={() => setView('kafka')} className={`px-4 py-2 text-sm font-mono rounded-md transition-colors ${view === 'kafka' ? 'bg-black text-white' : 'text-black'}`}>Apache Kafka</button>
                                </div>
                            </div>
                            <Counter label="Producers" value={producers} setter={setProducers} />
                            <Counter label="Consumers" value={consumers} setter={setConsumers} />
                        </div>

                        <div className="grid lg:grid-cols-4 gap-8">
                            <div className="lg:col-span-1 flex flex-col justify-center space-y-6">
                                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
                                    <div className="flex items-center justify-center text-gray-500 mb-2">
                                        <Clock size={16} className="mr-2"/>
                                        <h4 className="font-mono text-sm">Avg. Latency</h4>
                                    </div>
                                    <p className="font-serif text-4xl font-bold">{animatedLatency.toFixed(1)}<span className="text-2xl text-gray-500">ms</span></p>
                                </div>
                                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
                                    <div className="flex items-center justify-center text-gray-500 mb-2">
                                        <Cpu size={16} className="mr-2"/>
                                        <h4 className="font-mono text-sm">Memory Usage</h4>
                                    </div>
                                    <p className="font-serif text-4xl font-bold">{animatedMemory.toFixed(1)}<span className="text-2xl text-gray-500">mb</span></p>
                                </div>
                            </div>
                            <div className="lg:col-span-3 relative w-full h-[500px] bg-transparent">
                                <svg className="absolute top-0 left-0 w-full h-full" style={{ pointerEvents: 'none' }}>
                                    {producerNodes.map((_, i) => (
                                        <line key={`p-line-${i}`} x1={100} y1={getNodeY(i, producers, canvasHeight) + 40} x2={400} y2={view === 'gofka' ? canvasHeight/2 + 40 : canvasHeight/2 - 50 + 40} stroke="black" strokeWidth="1" />
                                    ))}
                                    {consumerNodes.map((_, i) => (
                                        <line key={`c-line-${i}`} x1={400 + 160} y1={view === 'gofka' ? canvasHeight/2 + 40 : canvasHeight/2 - 50 + 40} x2={700} y2={getNodeY(i, consumers, canvasHeight) + 40} stroke="black" strokeWidth="1" />
                                    ))}
                                    {view === 'kafka' && <line x1={400 + 80} y1={canvasHeight/2 - 50 + 80} x2={400 + 80} y2={canvasHeight/2 + 100} stroke="black" strokeWidth="1" strokeDasharray="4 4"/>}
                                    
                                    {producerNodes.map((_, i) => (
                                         <circle key={`p-pack-${i}`} r="4" fill="black" className="animate-pulse">
                                            <animateMotion dur={`${2 + i * 0.2}s`} repeatCount="indefinite" path={`M${100},${getNodeY(i, producers, canvasHeight) + 40} L${400},${view === 'gofka' ? canvasHeight/2 + 40 : canvasHeight/2 - 50 + 40}`} />
                                        </circle>
                                    ))}
                                    {consumerNodes.map((_, i) => (
                                         <circle key={`c-pack-${i}`} r="4" fill="black" className="animate-pulse">
                                            <animateMotion dur={`${2 + i * 0.2}s`} repeatCount="indefinite" path={`M${400 + 160},${view === 'gofka' ? canvasHeight/2 + 40 : canvasHeight/2 - 50 + 40} L${700},${getNodeY(i, consumers, canvasHeight) + 40}`} />
                                        </circle>
                                    ))}
                                </svg>
                                
                                {producerNodes.map((_, i) => (
                                    <div key={`prod-${i}`} className="absolute w-40 h-20 bg-white border-2 border-black rounded-lg flex items-center justify-center flex-col shadow-md transition-all duration-500" style={{ left: 20, top: getNodeY(i, producers, canvasHeight) }}>
                                        <Server size={20} className="mb-1"/>
                                        <span className="font-mono text-sm font-bold">Python (Flask)</span>
                                        <span className="font-sans text-xs text-gray-500">Producer #{i+1}</span>
                                    </div>
                                ))}
                                
                                {view === 'gofka' ? (
                                    <div className="absolute w-40 h-20 bg-white border-2 border-black rounded-lg flex items-center justify-center flex-col shadow-lg transition-all duration-500" style={{ left: 400, top: canvasHeight/2 }}>
                                        <GofkaLogo className="w-6 h-6 mb-1"/>
                                        <span className="font-mono text-sm font-bold">Gofka Broker</span>
                                    </div>
                                ) : (
                                    <>
                                        <div className="absolute w-40 h-20 bg-white border-2 border-black rounded-lg flex items-center justify-center flex-col shadow-lg transition-all duration-500" style={{ left: 400, top: canvasHeight/2 - 50 }}>
                                            <Shuffle size={20} className="mb-1"/>
                                            <span className="font-mono text-sm font-bold">Kafka Broker</span>
                                        </div>
                                        <div className="absolute w-40 h-20 bg-white border-2 border-black rounded-lg flex items-center justify-center flex-col shadow-md transition-all duration-500" style={{ left: 400, top: canvasHeight/2 + 100 }}>
                                            <Layers size={20} className="mb-1"/>
                                            <span className="font-mono text-sm font-bold">ZooKeeper</span>
                                        </div>
                                    </>
                                )}

                                {consumerNodes.map((_, i) => (
                                    <div key={`cons-${i}`} className="absolute w-40 h-20 bg-white border-2 border-black rounded-lg flex items-center justify-center flex-col shadow-md transition-all duration-500" style={{ left: 700, top: getNodeY(i, consumers, canvasHeight) }}>
                                        <Database size={20} className="mb-1"/>
                                        <span className="font-mono text-sm font-bold">MongoDB Sink</span>
                                        <span className="font-sans text-xs text-gray-500">Consumer #{i+1}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};


const Quickstart: FC = () => {
    const [activeTab, setActiveTab] = useState<'producer' | 'consumer'>('producer');
    const [copySuccess, setCopySuccess] = useState('');

    const producerCode = `package main

import (
	"fmt"
	"time"
	"github.com/user/gofka"
)

func main() {
	p, err := gofka.NewProducer(&gofka.ConfigMap{"bootstrap.servers": "localhost:9092"})
	if err != nil {
		panic(err)
	}
	defer p.Close()

	topic := "my-topic"
	for _, word := range []string{"Welcome", "to", "Gofka"} {
		p.Produce(&gofka.Message{
			TopicPartition: gofka.TopicPartition{Topic: &topic, Partition: gofka.PartitionAny},
			Value:          []byte(word),
		}, nil)
	}

	p.Flush(15 * 1000)
}`;

    const consumerCode = `package main

import (
	"fmt"
	"github.com/user/gofka"
)

func main() {
	c, err := gofka.NewConsumer(&gofka.ConfigMap{
		"bootstrap.servers": "localhost:9092",
		"group.id":          "my-group",
		"auto.offset.reset": "earliest",
	})
	if err != nil {
		panic(err)
	}

	c.SubscribeTopics([]string{"my-topic"}, nil)
	defer c.Close()

	for {
		msg, err := c.ReadMessage(-1)
		if err == nil {
			fmt.Printf("Message on %s: %s\\n", msg.TopicPartition, string(msg.Value))
		} else {
			fmt.Printf("Consumer error: %v (%v)\\n", err, msg)
		}
	}
}`;

    const handleCopy = () => {
        const codeToCopy = activeTab === 'producer' ? producerCode : consumerCode;
        const textArea = document.createElement("textarea");
        textArea.value = codeToCopy;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            setCopySuccess('Copied!');
        } catch (err) {
            setCopySuccess('Failed');
        }
        document.body.removeChild(textArea);
        setTimeout(() => setCopySuccess(''), 2000);
    };

    return (
        <section id="quickstart" className="py-20 md:py-32 bg-gray-50 text-black">
            <div className="container mx-auto px-6">
                <FadeIn>
                    <div className="text-center mb-12">
                        <h2 className="font-serif text-4xl md:text-5xl font-bold">Get Started in Minutes</h2>
                        <p className="font-sans text-lg text-gray-600 mt-4 max-w-xl mx-auto">
                            Publish and consume your first messages with just a few lines of Go.
                        </p>
                    </div>
                </FadeIn>
                <FadeIn delay="200ms">
                    <div className="max-w-3xl mx-auto bg-black rounded-lg shadow-2xl overflow-hidden">
                        <div className="flex bg-gray-800 text-white font-mono text-sm border-b border-gray-700">
                            <button onClick={() => setActiveTab('producer')} className={`px-6 py-3 ${activeTab === 'producer' ? 'bg-black' : 'bg-gray-800 hover:bg-gray-700'} transition-colors`}>producer.go</button>
                            <button onClick={() => setActiveTab('consumer')} className={`px-6 py-3 ${activeTab === 'consumer' ? 'bg-black' : 'bg-gray-800 hover:bg-gray-700'} transition-colors`}>consumer.go</button>
                            <div className="flex-grow"></div>
                            <div className="relative">
                                <button onClick={handleCopy} className="px-4 py-3 bg-gray-700 hover:bg-gray-600 transition-colors flex items-center space-x-2">
                                    <Copy size={16}/>
                                    <span>{copySuccess || 'Copy'}</span>
                                </button>
                            </div>
                        </div>
                        <div className="p-6">
                            <pre className="text-white text-sm leading-relaxed overflow-x-auto"><code className="language-go">{activeTab === 'producer' ? producerCode : consumerCode}</code></pre>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};


const Community: FC = () => {
    return (
        <section id="community" className="py-20 md:py-32 bg-white text-black">
            <div className="container mx-auto px-6 text-center">
                <FadeIn>
                    <Users className="w-16 h-16 mx-auto text-black mb-6" />
                    <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Join the Community</h2>
                    <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto mb-10">
                        Gofka is built by developers, for developers. Get involved, contribute, and help shape the future of messaging.
                    </p>
                    <div className="flex justify-center items-center space-x-4">
                         <a
                            href="#"
                            className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-white bg-black rounded-md overflow-hidden transition-all duration-300"
                        >
                            <span className="absolute top-0 left-0 w-full h-full bg-gray-800 transition-all duration-300 transform -translate-x-full group-hover:translate-x-0"></span>
                            <span className="relative flex items-center"><Github className="mr-2 w-5 h-5" /> Contribute on GitHub</span>
                        </a>
                         <a
                            href="#"
                            className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-black bg-transparent border-2 border-black rounded-md overflow-hidden transition-all duration-300"
                        >
                             <span className="absolute top-0 left-0 w-full h-full bg-gray-200 transition-all duration-300 transform -translate-x-full group-hover:translate-x-0"></span>
                            <span className="relative">Join our Discord</span>
                        </a>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
};

const Footer: FC = () => {
    return (
        <footer className="bg-black text-gray-400 font-sans py-12">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2 flex items-center">
                        <GofkaLogo className="w-7 h-7 mr-3 text-white"/>
                        <div>
                            <h3 className="font-serif text-xl font-bold text-white mb-1">Gofka</h3>
                            <p className="text-sm">The Kafka Protocol, Reimagined in Go.</p>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-3">Docs</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#use-cases" className="hover:text-white transition-colors">Use Cases</a></li>
                            <li><a href="#pipeline" className="hover:text-white transition-colors">Pipeline</a></li>
                            <li><a href="#quickstart" className="hover:text-white transition-colors">Quickstart</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-3">Community</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-800 pt-6 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Gofka Project. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};


// --- Main App Component ---

export default function App() {
    return (
        <div className="bg-white antialiased">
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Lato:wght@400;700&family=Inconsolata:wght@400;700&display=swap');
                
                .font-serif { font-family: 'Playfair Display', serif; }
                .font-sans { font-family: 'Lato', sans-serif; }
                .font-mono { font-family: 'Inconsolata', monospace; }

                html {
                    scroll-behavior: smooth;
                }
            `}</style>
            
            <AnimatedBackground />
            <div className="relative z-10">
                <Header />
                <main>
                    <Hero />
                    <Features />
                    <UseCases />
                    <PipelineComparison />
                    <Quickstart />
                    <Community />
                </main>
                <Footer />
            </div>
        </div>
    );
}
