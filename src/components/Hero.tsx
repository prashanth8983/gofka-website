import type { FC } from 'react';
import { ArrowRight, Book } from 'lucide-react';

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

export default Hero;
