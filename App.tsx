import React, { useState } from 'react';
import { Header } from './components/Header';
import { AnalysisView } from './components/AnalysisView';
import { ChatInterface } from './components/ChatInterface';
import { ProjectsPage } from './pages/ProjectsPage';
import { MethodologyPage } from './pages/MethodologyPage';
import { ContactPage } from './pages/ContactPage';
import { BriefingPage } from './pages/BriefingPage';
import { scrapeUrl } from './services/firecrawlService';
import { analyzeContent } from './services/geminiService';
import { AppStatus, FirecrawlOptions, FirecrawlResponse, AnalysisResult } from './types';

export type Page = 'home' | 'projetos' | 'metodologia' | 'contato' | 'briefing';

interface ProjectRef {
  title: string;
  image: string;
}

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [scrapedData, setScrapedData] = useState<FirecrawlResponse['data'] | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [activeTab, setActiveTab] = useState<'estudo' | 'chat' | 'dados'>('estudo');
  const [interestedProject, setInterestedProject] = useState<ProjectRef | null>(null);

  const handleRequestSimilarStudy = (project: { title: string, image: string }) => {
    setInterestedProject(project);
    setCurrentPage('contato');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'projetos':
        return <ProjectsPage onRequestSimilarStudy={handleRequestSimilarStudy} />;
      case 'metodologia':
        return < MethodologyPage />;
      case 'contato':
        return (
          <ContactPage 
            projectRef={interestedProject} 
            onClearRef={() => setInterestedProject(null)} 
          />
        );
      case 'briefing':
        return <BriefingPage />;
      default:
        return (
          <main className="flex-1 w-full">
            {/* Hero Section Refinada */}
            <section className="max-w-[1400px] mx-auto px-8 lg:px-12 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-12 fade-in-section">
                <div className="space-y-8">
                  <span className="text-[10px] font-bold text-amber-700 tracking-[0.6em] uppercase block mb-4">Arquitetura • Urbanismo • Design</span>
                  <h2 className="text-6xl md:text-8xl font-light text-slate-900 tracking-tight leading-[0.95] serif">
                    A beleza de um lar <span className="italic serif font-normal text-amber-800">vai muito além</span> do que você vê.
                  </h2>
                  
                  <div className="space-y-6 pt-4">
                    <div className="h-px w-20 bg-amber-700/30"></div>
                    <p className="max-w-md text-slate-800 text-2xl md:text-3xl font-light leading-snug serif italic">
                      "Aqui cada projeto é único, assim como você. Conheça os nossos serviços e descubra qual se encaixa melhor no seu momento"
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">— Clara Nascimento</p>
                  </div>
                </div>
                
                <div className="flex gap-6 pt-4">
                   <button 
                     onClick={() => setCurrentPage('briefing')}
                     className="px-10 py-5 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-amber-800 transition-all shadow-2xl"
                   >
                     Iniciar Briefing
                   </button>
                   <button 
                     onClick={() => setCurrentPage('projetos')}
                     className="px-10 py-5 border border-slate-200 text-slate-900 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-slate-50 transition-all"
                   >
                     Ver Portfólio
                   </button>
                </div>
              </div>
              
              <div className="relative group fade-in-section">
                 <div className="absolute -inset-4 bg-amber-50 rounded-sm -z-10 group-hover:scale-105 transition-transform duration-1000"></div>
                 <div className="relative aspect-[3/4] overflow-hidden shadow-2xl bg-slate-100">
                    <img 
                      src="https://i.ibb.co/qMNP90Rp/Whats-App-Image-2026-02-17-at-21-24-01.jpg" 
                      alt="Clara Nascimento" 
                      className="w-full h-full object-cover transition-all duration-1000"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
                    <div className="absolute bottom-10 left-10 text-white">
                       <p className="text-[10px] font-bold uppercase tracking-[0.5em] mb-2 opacity-80">Arquiteta</p>
                       <h3 className="text-3xl font-light serif italic">Clara Nascimento</h3>
                    </div>
                 </div>
                 
                 <div className="absolute -bottom-10 -right-10 w-40 h-40 border-r border-b border-amber-700/20 pointer-events-none hidden md:block"></div>
              </div>
            </section>

            {/* Dashboard Results (hidden by default now) */}
            {scrapedData && (
              <section id="results" className="w-full bg-white py-24 border-t border-slate-100">
                <div className="max-w-[1400px] mx-auto px-8 lg:px-12">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-20">
                    <div className="space-y-2">
                      <h3 className="text-4xl font-light serif">Dossier de <span className="italic">Viabilidade</span></h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Análise Técnica Digital</p>
                    </div>
                    
                    <div className="flex bg-slate-50 p-1">
                      {(['estudo', 'chat', 'dados'] as const).map(tab => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`px-8 py-3 text-[9px] font-bold uppercase tracking-[0.2em] transition-all ${
                            activeTab === tab ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'
                          }`}
                        >
                          {tab === 'estudo' ? 'Análise' : tab === 'chat' ? 'Consultoria' : 'Dados'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="relative min-h-[500px]">
                    {status === AppStatus.ANALYZING && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 backdrop-blur-md z-10 text-center">
                        <div className="w-24 h-24 border-[0.5px] border-amber-700/20 rounded-full flex items-center justify-center mb-8">
                           <div className="w-16 h-16 border-b border-amber-800 rounded-full animate-spin"></div>
                        </div>
                        <p className="text-[10px] font-bold text-amber-800 uppercase tracking-[0.5em] animate-pulse">
                          Sincronizando Parâmetros Técnicos
                        </p>
                      </div>
                    )}
                    {analysis && activeTab === 'estudo' && <AnalysisView analysis={analysis} />}
                    {scrapedData && activeTab === 'chat' && <ChatInterface content={scrapedData.markdown || ''} />}
                  </div>
                </div>
              </section>
            )}

            {/* Seção Instagram - Projetos Recentes */}
            <section className="bg-white py-16 md:py-24 px-5">
              <div className="max-w-[1200px] mx-auto">
                <div className="text-center mb-12 fade-in-section">
                  <h2 className="text-3xl md:text-4xl font-light text-slate-900 serif tracking-tight mb-3">
                    Projetos Recentes
                  </h2>
                  <p className="text-[10px] font-bold text-amber-800 uppercase tracking-[0.5em] italic">
                    Momentos transformados
                  </p>
                </div>
                
                {/* Elfsight Instagram Feed Embed */}
                <div className="fade-in-section">
                  <div className="elfsight-app-87881a47-3063-4a31-a65e-de23f54bdfc2" data-elfsight-app-lazy></div>
                </div>
              </div>
            </section>
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-amber-100 selection:text-amber-900 bg-white">
      <Header onNavigate={(page) => { setCurrentPage(page); setInterestedProject(null); }} currentPage={currentPage} />
      {renderContent()}
      <footer className="py-24 border-t border-slate-100 bg-white">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-16">
          <div className="space-y-8">
            <div className="flex flex-col">
              <h2 className="text-3xl font-medium tracking-[0.1em] text-slate-900 leading-none">CLARA NASCIMENTO</h2>
              <span className="text-[9px] font-bold text-amber-800 tracking-[0.4em] uppercase mt-3">Architecture Studio</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-6">
            <div className="flex gap-12 text-[10px] font-bold uppercase tracking-[0.2em]">
               <a href="#" className="hover:text-amber-800 transition-colors">Instagram</a>
               <a href="#" className="hover:text-amber-800 transition-colors">LinkedIn</a>
               <a href="#" className="hover:text-amber-800 transition-colors">WhatsApp</a>
            </div>
            <p className="text-slate-400 text-[9px] uppercase tracking-[0.3em]">© 2025 Clara Nascimento Studio.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;