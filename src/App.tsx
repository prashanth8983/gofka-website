import {
    AnimatedBackground,
    Header,
    Hero,
    Features,
    UseCases,
    PipelineComparison,
    Quickstart,
    Community,
    Footer
} from './components';

export default function App() {
    return (
        <div className="bg-white antialiased">
            <style>{`
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
