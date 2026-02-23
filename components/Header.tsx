import React from 'react';
import { Page } from '../App';

interface HeaderProps {
  onNavigate: (page: Page) => void;
  currentPage: Page;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  return (
    <header className="sticky top-0 z-50 glass-morphism bg-black">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-12 h-20 flex items-center justify-between">
        <div className="flex flex-col cursor-pointer" onClick={() => onNavigate('home')}>
          <h1 className="text-xl font-medium tracking-[0.2em] text-white leading-none">
            CLARA NASCIMENTO
          </h1>
          <div className="flex items-center gap-3 mt-1.5">
            <span className="h-[1px] w-6 bg-amber-600/40"></span>
            <span className="text-[8px] font-bold text-amber-600/80 tracking-[0.4em] uppercase">
              Architecture & Studio
            </span>
          </div>
        </div>
        
        <nav className="hidden lg:flex items-center gap-10">
          <button 
            onClick={() => onNavigate('home')}
            className={`text-[9px] font-bold uppercase tracking-[0.2em] relative group transition-colors ${currentPage === 'home' ? 'text-amber-600' : 'text-slate-400 hover:text-white'}`}
          >
            Início
            <span className={`absolute -bottom-1 left-0 h-[1px] bg-amber-600 transition-all ${currentPage === 'home' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </button>
          <button 
            onClick={() => onNavigate('projetos')}
            className={`text-[9px] font-bold uppercase tracking-[0.2em] relative group transition-colors ${currentPage === 'projetos' ? 'text-amber-600' : 'text-slate-400 hover:text-white'}`}
          >
            Projetos
            <span className={`absolute -bottom-1 left-0 h-[1px] bg-amber-600 transition-all ${currentPage === 'projetos' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </button>
          <button 
            onClick={() => onNavigate('metodologia')}
            className={`text-[9px] font-bold uppercase tracking-[0.2em] relative group transition-colors ${currentPage === 'metodologia' ? 'text-amber-600' : 'text-slate-400 hover:text-white'}`}
          >
            Metodologia
            <span className={`absolute -bottom-1 left-0 h-[1px] bg-amber-600 transition-all ${currentPage === 'metodologia' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </button>
          <button 
            onClick={() => onNavigate('contato')}
            className={`text-[9px] font-bold uppercase tracking-[0.2em] relative group transition-colors ${currentPage === 'contato' ? 'text-amber-600' : 'text-slate-400 hover:text-white'}`}
          >
            Contato
            <span className={`absolute -bottom-1 left-0 h-[1px] bg-amber-600 transition-all ${currentPage === 'contato' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </button>
          
          <button 
            onClick={() => onNavigate('briefing')}
            className={`ml-4 px-6 py-2.5 border text-white text-[8px] font-bold rounded-none hover:bg-white hover:text-black transition-all uppercase tracking-[0.3em] ${currentPage === 'briefing' ? 'bg-amber-700 border-amber-700' : 'border-white/20'}`}
          >
            Reunião/Briefing
          </button>
        </nav>

        <button className="lg:hidden text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 16h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};