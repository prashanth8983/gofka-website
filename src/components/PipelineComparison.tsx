import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { Shuffle, Layers, Minus, Plus, Cpu, Clock, Server, Database } from 'lucide-react';
import FadeIn from './FadeIn';
import GofkaLogo from './GofkaLogo';

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

export default PipelineComparison;
