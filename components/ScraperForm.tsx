import React, { useState } from 'react';
import { FirecrawlOptions } from '../types';

interface ScraperFormProps {
  onScrape: (options: FirecrawlOptions) => void;
  onManualContent: (content: string) => void;
  isLoading: boolean;
}

export const ScraperForm: React.FC<ScraperFormProps> = ({ onScrape, onManualContent, isLoading }) => {
  const [url, setUrl] = useState('https://wright-plus-architecture.webflow.io/');
  const [manualMode, setManualMode] = useState(false);
  const [manualText, setManualText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualMode) {
      if (!manualText.trim()) return;
      onManualContent(manualText);
    } else {
      if (!url) return;
      onScrape({
        url,
        onlyMainContent: true,
        maxAge: 172800000,
        parsers: ['pdf', 'image'],
        formats: ['markdown']
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-end mb-4">
        <button 
          onClick={() => setManualMode(!manualMode)}
          className="text-[9px] font-bold text-slate-400 hover:text-amber-800 uppercase tracking-widest transition-colors flex items-center gap-2"
        >
          <span className={`w-2 h-2 rounded-full ${manualMode ? 'bg-amber-700' : 'bg-slate-200'}`}></span>
          {manualMode ? 'Voltar para Link' : 'Colar Conteúdo Manual'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-700/20 to-transparent blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
        <div className="relative flex flex-col items-stretch bg-white border border-slate-200 shadow-2xl shadow-slate-200/20">
          
          {!manualMode ? (
            <div className="flex flex-col md:flex-row w-full">
              <div className="flex-1 flex items-center px-8 py-6">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Link da referência (ex: Wright Plus)..."
                  className="w-full bg-transparent border-none outline-none text-slate-800 font-light placeholder:text-slate-300 text-lg"
                  required={!manualMode}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="px-10 py-6 bg-slate-900 text-white font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-amber-800 transition-all disabled:bg-slate-400"
              >
                {isLoading ? 'Processando...' : 'Analisar Site'}
              </button>
            </div>
          ) : (
            <div className="w-full">
              <textarea
                value={manualText}
                onChange={(e) => setManualText(e.target.value)}
                placeholder="Cole o markdown ou texto técnico aqui..."
                className="w-full h-40 p-8 bg-transparent border-none outline-none text-slate-800 font-light placeholder:text-slate-300 text-base resize-none"
                required={manualMode}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-6 bg-slate-900 text-white font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-amber-800 transition-all disabled:bg-slate-400 border-t border-slate-100"
              >
                {isLoading ? 'Processando Análise...' : 'Gerar Estudo de Conteúdo'}
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};