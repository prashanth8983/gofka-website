import type { FC } from 'react';
import { Users, Github } from 'lucide-react';
import FadeIn from './FadeIn';

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

export default Community;
