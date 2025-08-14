import type { FC } from 'react';
import { Zap, Layers, Shield } from 'lucide-react';
import FadeIn from './FadeIn';

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

export default Features;
