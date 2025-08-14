import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { Github } from 'lucide-react';
import GofkaLogo from './GofkaLogo';

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

export default Header;
