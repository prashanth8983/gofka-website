import type { FC } from 'react';
import GofkaLogo from './GofkaLogo';

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

export default Footer;
