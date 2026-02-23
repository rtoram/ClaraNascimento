import React from 'react';
import { AnalysisResult } from '../types';

interface AnalysisViewProps {
  analysis: AnalysisResult;
}

export const AnalysisView: React.FC<AnalysisViewProps> = ({ analysis }) => {
  const images = analysis.imageUrlReferences?.filter(url => url.startsWith('http')) || [];
  const projects = analysis.projects || [];

  return (
    <div className="max-w-5xl mx-auto py-12 space-y-32">
      {/* Executive Summary */}
      <section className="space-y-8 fade-in-section">
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-bold text-amber-800 tracking-[0.4em] uppercase">01. Dossier</span>
          <div className="flex-1 h-[1px] bg-slate-100"></div>
        </div>
        <h2 className="text-5xl md:text-7xl font-light text-slate-900 leading-[1] tracking-tight">
          Resumo <span className="italic serif">Executivo</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-8">
          <div className="md:col-span-4 space-y-6">
            <div className="h-1 w-16 bg-amber-700"></div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] leading-relaxed">
              ESTUDO DE CASO E VIABILIDADE PARA REFERÊNCIA SELECIONADA.
            </p>
          </div>
          <div className="md:col-span-8">
            <p className="text-2xl md:text-3xl text-slate-700 font-light leading-snug serif italic">
              "{analysis.summary}"
            </p>
          </div>
        </div>
      </section>

      {/* Projects Timeline (New) */}
      {projects.length > 0 && (
        <section className="space-y-12 fade-in-section">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold text-amber-800 tracking-[0.4em] uppercase">02. Cronologia de Obras</span>
            <div className="flex-1 h-[1px] bg-slate-100"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {projects.map((proj, i) => (
              <div key={i} className="group border-l border-slate-200 pl-8 py-2 hover:border-amber-700 transition-colors">
                <div className="flex items-baseline gap-4 mb-3">
                  <span className="text-2xl font-light text-slate-900 serif italic">{proj.year || 'N/A'}</span>
                  <span className="text-[9px] font-bold text-amber-800 uppercase tracking-widest">{proj.location || 'Local Não Informado'}</span>
                </div>
                <h4 className="text-lg font-medium text-slate-800 mb-2 uppercase tracking-tight">{proj.name}</h4>
                {proj.description && <p className="text-xs text-slate-500 font-light leading-relaxed">{proj.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Visual Gallery */}
      {images.length > 0 && (
        <section className="space-y-12 fade-in-section">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold text-amber-800 tracking-[0.4em] uppercase">03. Arquivo Visual</span>
            <div className="flex-1 h-[1px] bg-slate-100"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {images.slice(0, 9).map((url, idx) => (
              <div key={idx} className="group relative aspect-square bg-slate-50 overflow-hidden">
                <img 
                  src={url} 
                  alt={`Referência ${idx + 1}`}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                  onError={(e) => (e.currentTarget.parentElement!.style.display = 'none')}
                />
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-all"></div>
                <div className="absolute top-4 right-4 text-[9px] font-bold text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  REF {String(idx + 1).padStart(2, '0')}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Insights and Entities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        <section className="space-y-10 fade-in-section">
          <h3 className="text-[11px] font-bold text-amber-800 tracking-[0.3em] uppercase flex items-center gap-3">
            <span className="w-2 h-2 border border-amber-700 rounded-full"></span>
            Análise Conceitual
          </h3>
          <div className="space-y-8">
            {analysis.keyInsights.map((insight, i) => (
              <div key={i} className="group flex gap-8 pb-8 border-b border-slate-100 last:border-0">
                <span className="text-[10px] font-bold text-amber-700/40 mt-1 serif italic text-xl">0{i + 1}</span>
                <p className="text-base text-slate-600 leading-relaxed font-light group-hover:text-slate-900 transition-colors italic serif">
                  {insight}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-10 fade-in-section">
          <h3 className="text-[11px] font-bold text-amber-800 tracking-[0.3em] uppercase flex items-center gap-3">
            <span className="w-2 h-2 border border-amber-700 rounded-full"></span>
            Componentes Técnicos
          </h3>
          <div className="flex flex-wrap gap-x-4 gap-y-6">
            {analysis.entities.map((entity, i) => (
              <div key={i} className="flex flex-col gap-2 group">
                <span className="px-5 py-3 bg-white border border-slate-200 text-slate-800 rounded-none text-[10px] font-bold uppercase tracking-[0.2em] group-hover:border-amber-700 transition-all cursor-default shadow-sm">
                  {entity}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Action Plan */}
      <section className="pt-20 fade-in-section">
        <div className="flex flex-col items-center text-center space-y-16 bg-slate-900 py-24 px-8 text-white">
           <div className="space-y-4">
              <h3 className="text-4xl md:text-5xl font-light serif italic">Próximas Etapas</h3>
              <p className="text-[10px] font-bold text-amber-600 tracking-[0.5em] uppercase">Estratégia de Desenvolvimento</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 w-full max-w-6xl">
              {analysis.suggestedActions.map((action, i) => (
                <div key={i} className="bg-slate-900 p-10 flex flex-col items-start text-left space-y-8 hover:bg-slate-800 transition-all group">
                  <div className="w-10 h-10 border border-amber-700/30 flex items-center justify-center text-amber-600 font-light serif italic text-2xl group-hover:bg-amber-700 group-hover:text-white transition-all">
                    {i+1}
                  </div>
                  <p className="text-[12px] font-medium leading-relaxed tracking-widest uppercase">{action}</p>
                </div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
};