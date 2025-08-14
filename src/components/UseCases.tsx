import type { FC } from 'react';
import { MessageSquare, MousePointerClick, FileText, Workflow } from 'lucide-react';
import FadeIn from './FadeIn';

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

export default UseCases;
