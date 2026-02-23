import React, { useState, useMemo } from 'react';

const steps = [
  { id: 1, title: 'Identificação', summary: 'Dados do cliente', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { id: 2, title: 'Visão Geral', summary: 'Conceito e tipo', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { id: 3, title: 'Programa', summary: 'Funcionalidades', icon: 'M4 6h16M4 10h16M4 14h16M4 18h16' },
  { id: 4, title: 'Estética', summary: 'Estilo e atmosfera', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' },
  { id: 5, title: 'Viabilidade', summary: 'Investimento', icon: 'M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z M2 17l10 5 10-5M2 12l10 5 10-5M12 2l10 5-10 5L2 7l10-5z' },
  { id: 6, title: 'Técnico', summary: 'Terreno e leis', icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' },
  { id: 7, title: 'Finalização', summary: 'Anexos e envio', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
];

export const BriefingPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ projectType: '', style: '' });
  
  // States for scheduler
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  // Generate next 5 business days
  const availableDates = useMemo(() => {
    const dates = [];
    let d = new Date();
    while (dates.length < 5) {
      d.setDate(d.getDate() + 1);
      if (d.getDay() !== 0 && d.getDay() !== 6) {
        dates.push({
          id: d.getTime(),
          weekday: d.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', ''),
          day: d.getDate(),
          full: d.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })
        });
      }
    }
    return dates;
  }, []);

  const timeSlots = ['09:30', '11:00', '14:00', '15:30', '17:00'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBooking = () => {
    if (selectedDate && selectedTime) {
      setIsBookingConfirmed(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white min-h-screen py-24 px-8 lg:px-12 flex flex-col items-center justify-center animate-in fade-in duration-1000">
        {!isBookingConfirmed ? (
          <>
            <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mb-12 shadow-2xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-amber-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
               <svg className="w-10 h-10 text-amber-500 group-hover:text-white transition-colors relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
               </svg>
            </div>
            <h2 className="text-5xl font-light serif text-slate-900 mb-6 italic text-center">Protocolo de Briefing Consolidado</h2>
            <p className="text-slate-500 max-w-lg mb-12 font-light leading-relaxed text-center">
              Seu projeto foi integrado ao nosso ecossistema criativo. Agora, selecione uma data e horário para nossa Reunião Estratégica via Live Session.
            </p>
            
            <div className="w-full max-w-5xl bg-slate-900 p-1 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] rounded-sm shadow-2xl overflow-hidden">
               <div className="bg-white p-12 lg:p-16 space-y-16">
                 <div className="text-center space-y-4">
                    <h3 className="text-3xl font-light text-slate-900 serif uppercase tracking-widest">Agenda de Reunião Estratégica</h3>
                    <div className="h-px w-24 bg-amber-700 mx-auto"></div>
                 </div>

                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Date Selection */}
                    <div className="lg:col-span-7 space-y-8">
                      <div className="flex items-center justify-between">
                         <p className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.3em]">1. Selecione o Dia</p>
                         <p className="text-[9px] text-slate-400 font-medium italic">Horário de Brasília (GMT-3)</p>
                      </div>
                      <div className="grid grid-cols-5 gap-3">
                         {availableDates.map((date) => (
                           <button 
                             key={date.id}
                             onClick={() => { setSelectedDate(date.id); setSelectedTime(null); }}
                             className={`flex flex-col items-center justify-center p-4 border transition-all ${
                               selectedDate === date.id 
                               ? 'border-amber-700 bg-amber-50 shadow-md ring-1 ring-amber-700' 
                               : 'border-slate-100 bg-slate-50 hover:border-slate-300'
                             }`}
                           >
                             <span className={`text-[8px] font-bold uppercase tracking-widest mb-1 ${selectedDate === date.id ? 'text-amber-700' : 'text-slate-400'}`}>{date.weekday}</span>
                             <span className={`text-2xl font-light serif ${selectedDate === date.id ? 'text-slate-900' : 'text-slate-400'}`}>{date.day}</span>
                           </button>
                         ))}
                      </div>
                      {selectedDate && (
                        <p className="text-[10px] font-bold text-amber-800 uppercase tracking-widest animate-in fade-in slide-in-from-left duration-300">
                          Data Selecionada: {availableDates.find(d => d.id === selectedDate)?.full}
                        </p>
                      )}
                    </div>

                    {/* Time Selection */}
                    <div className="lg:col-span-5 space-y-8">
                      <p className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.3em]">2. Escolha o Horário</p>
                      <div className={`grid grid-cols-2 gap-3 transition-opacity duration-500 ${!selectedDate ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}>
                         {timeSlots.map(t => (
                           <button 
                             key={t} 
                             onClick={() => setSelectedTime(t)}
                             className={`py-4 text-[10px] font-bold tracking-[0.2em] border transition-all ${
                               selectedTime === t 
                               ? 'bg-slate-900 text-white border-slate-900 shadow-xl scale-105' 
                               : 'bg-white border-slate-100 text-slate-400 hover:border-amber-700'
                             }`}
                           >
                             {t}
                           </button>
                         ))}
                      </div>
                      <button 
                        onClick={handleBooking}
                        disabled={!selectedDate || !selectedTime}
                        className="w-full py-6 bg-amber-700 text-white text-[10px] font-bold uppercase tracking-[0.4em] shadow-xl hover:bg-amber-800 transition-all disabled:bg-slate-200 disabled:shadow-none relative group overflow-hidden"
                      >
                        <span className="relative z-10">Confirmar Consultoria</span>
                        <div className="absolute inset-0 bg-slate-900 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                      </button>
                    </div>
                 </div>
               </div>
            </div>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="mt-16 text-[9px] font-bold text-slate-400 hover:text-slate-900 uppercase tracking-widest border-b border-transparent hover:border-slate-900 transition-all"
            >
              Revisar Dados do Briefing
            </button>
          </>
        ) : (
          <div className="text-center space-y-12 animate-in zoom-in-95 duration-700">
             <div className="w-32 h-32 bg-slate-900 rounded-full flex items-center justify-center mx-auto shadow-2xl border-4 border-amber-600/20">
                <svg className="w-16 h-16 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
             </div>
             <div className="space-y-6">
                <h2 className="text-5xl font-light text-slate-900 serif italic">Agendamento Confirmado</h2>
                <div className="max-w-md mx-auto p-8 bg-slate-50 border border-slate-100 text-slate-900 space-y-4">
                   <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-700">Detalhes da Sessão</p>
                   <p className="text-2xl serif font-light">{availableDates.find(d => d.id === selectedDate)?.full}</p>
                   <p className="text-xl serif font-light">às {selectedTime}</p>
                   <div className="h-px w-12 bg-slate-200 mx-auto"></div>
                   <p className="text-[9px] text-slate-400 uppercase tracking-widest leading-relaxed">
                     Um link exclusivo para o Zoom foi enviado para o seu e-mail corporativo.
                   </p>
                </div>
             </div>
             <button 
                onClick={() => { setIsSubmitted(false); setIsBookingConfirmed(false); }}
                className="px-12 py-5 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-amber-800 transition-all shadow-lg"
             >
                Voltar para o Início
             </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Visual Header Banner */}
      <div className="h-[40vh] bg-slate-950 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center grayscale"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-slate-950/90"></div>
        <div className="relative z-10 text-center space-y-4 px-8">
          <span className="text-[10px] font-bold text-amber-500 tracking-[0.8em] uppercase block animate-pulse">Electronic Briefing v4.0</span>
          <h1 className="text-5xl md:text-7xl font-light text-white serif italic tracking-tight">Arquitetura de Intenções</h1>
          <div className="flex items-center justify-center gap-4 mt-6">
             <div className="h-px w-12 bg-amber-700/50"></div>
             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.4em]">Definindo o DNA do seu projeto</p>
             <div className="h-px w-12 bg-amber-700/50"></div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 -mt-20 relative z-20 px-8 lg:px-12 pb-32">
        
        {/* Navigation Sidebar: Slate-900 (O Azul Profissional) */}
        <div className="lg:col-span-4 bg-slate-900 p-10 lg:p-14 shadow-2xl flex flex-col justify-between border-r border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/skulls.png')]"></div>
          
          <div className="space-y-16 relative z-10">
            <div className="space-y-2">
              <h2 className="text-white text-3xl font-light serif italic">Etapas de <span className="text-amber-600">Concepção</span></h2>
              <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">Siga o fluxo técnico</p>
            </div>
            
            <div className="space-y-4">
              {steps.map((step) => (
                <button 
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`flex gap-6 items-center w-full p-4 transition-all duration-500 border-l-2 ${
                    activeStep === step.id 
                    ? 'border-amber-600 bg-white/5 translate-x-2' 
                    : 'border-transparent opacity-40 hover:opacity-80'
                  }`}
                >
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full border ${activeStep === step.id ? 'border-amber-600 bg-amber-600 text-white' : 'border-slate-700 text-slate-500'}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={step.icon} />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${activeStep === step.id ? 'text-white' : 'text-slate-400'}`}>{step.title}</p>
                    <p className="text-[8px] text-slate-500 uppercase tracking-tighter mt-1">{step.summary}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-20 pt-12 border-t border-white/10 relative z-10">
            <p className="text-[9px] text-slate-500 leading-relaxed font-light uppercase tracking-widest italic">
              "A precisão do briefing economiza 30% do tempo de obra."
            </p>
          </div>
        </div>

        {/* Form Content */}
        <div className="lg:col-span-8 bg-slate-50 p-12 lg:p-24 shadow-2xl relative overflow-hidden border border-slate-100">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>
          
          <form onSubmit={handleSubmit} className="space-y-24 relative z-10">
            
            {activeStep === 1 && (
              <div className="space-y-16 animate-in slide-in-from-right duration-700">
                <div className="flex items-baseline gap-6 border-b border-slate-200 pb-8">
                  <span className="text-6xl text-slate-200 font-bold serif italic">01</span>
                  <h3 className="text-4xl font-light text-slate-900 serif italic">Identificação de <span className="text-amber-800">Parceria</span></h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  <div className="space-y-3 group">
                    <label className="text-[9px] font-bold text-slate-900 uppercase tracking-[0.2em] group-focus-within:text-amber-800 transition-colors">Nome Completo / Instituição</label>
                    <input type="text" className="w-full py-3 bg-transparent border-b-2 border-slate-200 outline-none text-slate-900 font-light text-xl focus:border-amber-700 transition-all placeholder:text-slate-300" placeholder="Assine sua intenção..." required />
                  </div>
                  <div className="space-y-3 group">
                    <label className="text-[9px] font-bold text-slate-900 uppercase tracking-[0.2em] group-focus-within:text-amber-800 transition-colors">Canal de E-mail</label>
                    <input type="email" className="w-full py-3 bg-transparent border-b-2 border-slate-200 outline-none text-slate-900 font-light text-xl focus:border-amber-700 transition-all placeholder:text-slate-300" placeholder="seu@dominio.com" required />
                  </div>
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div className="space-y-16 animate-in slide-in-from-right duration-700">
                <div className="flex items-baseline gap-6 border-b border-slate-200 pb-8">
                  <span className="text-6xl text-slate-200 font-bold serif italic">02</span>
                  <h3 className="text-4xl font-light text-slate-900 serif italic">Visão Geral do <span className="text-amber-800">Escopo</span></h3>
                </div>
                <div className="space-y-16">
                  <div className="space-y-8">
                    <label className="text-[9px] font-bold text-slate-900 uppercase tracking-[0.3em]">Tipologia Arquitetônica</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {['Residencial', 'Comercial', 'Interiores', 'Hospitalidade'].map(t => (
                        <button 
                          key={t} 
                          type="button" 
                          onClick={() => setFormData({...formData, projectType: t})}
                          className={`px-4 py-6 border transition-all text-[9px] font-bold uppercase tracking-widest ${formData.projectType === t ? 'bg-slate-900 text-white border-slate-900 shadow-xl scale-105' : 'border-slate-200 text-slate-900 hover:border-amber-700'}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[9px] font-bold text-slate-900 uppercase tracking-[0.3em]">Manifesto de Intenções</label>
                    <textarea className="w-full h-40 p-8 bg-white border border-slate-200 outline-none text-slate-900 font-light text-lg resize-none italic serif leading-relaxed shadow-sm focus:ring-1 focus:ring-amber-700" placeholder="Descreva o sentimento que este espaço deve evocar..."></textarea>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 3 && (
              <div className="space-y-16 animate-in slide-in-from-right duration-700">
                <div className="flex items-baseline gap-6 border-b border-slate-200 pb-8">
                  <span className="text-6xl text-slate-200 font-bold serif italic">03</span>
                  <h3 className="text-4xl font-light text-slate-900 serif italic">Programa de <span className="text-amber-800">Necessidades</span></h3>
                </div>
                <div className="space-y-12">
                  <div className="space-y-4 group">
                    <label className="text-[9px] font-bold text-slate-900 uppercase tracking-[0.2em] group-focus-within:text-amber-800 transition-colors">Ambientes Essenciais</label>
                    <input type="text" className="w-full py-4 bg-transparent border-b-2 border-slate-200 outline-none text-slate-900 font-light text-xl focus:border-amber-700 transition-all" placeholder="Ex: Living Integrado, Deck, Cozinha Gourmet..." />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4 group">
                      <label className="text-[9px] font-bold text-slate-900 uppercase tracking-[0.2em]">Ocupantes Fixos</label>
                      <input type="number" className="w-full py-4 bg-transparent border-b-2 border-slate-200 outline-none text-slate-900 font-light text-xl focus:border-amber-700 transition-all" placeholder="0" />
                    </div>
                    <div className="space-y-4 group">
                      <label className="text-[9px] font-bold text-slate-900 uppercase tracking-[0.2em]">Fluxo de Visitantes</label>
                      <select className="w-full py-4 bg-transparent border-b-2 border-slate-200 outline-none text-slate-900 font-light text-xl focus:border-amber-700 transition-all text-slate-900">
                        <option>Baixo (Privacidade total)</option>
                        <option>Moderado</option>
                        <option>Alto (Espaço para eventos)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 4 && (
              <div className="space-y-16 animate-in slide-in-from-right duration-700">
                <div className="flex items-baseline gap-6 border-b border-slate-200 pb-8">
                  <span className="text-6xl text-slate-200 font-bold serif italic">04</span>
                  <h3 className="text-4xl font-light text-slate-900 serif italic">Atmosfera & <span className="text-amber-800">Estética</span></h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {[
                     { name: 'Minimalista', img: 'https://images.unsplash.com/photo-1600585154340-be6199f7d009?auto=format&fit=crop&w=400&q=80' },
                     { name: 'Contemporâneo', img: 'https://images.unsplash.com/photo-1600607687940-4e524cb35a3a?auto=format&fit=crop&w=400&q=80' },
                     { name: 'Industrial', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80' },
                     { name: 'Modernismo Tropical', img: 'https://images.unsplash.com/photo-1449156059579-73040a3acc38?auto=format&fit=crop&w=400&q=80' }
                   ].map(style => (
                     <div 
                        key={style.name} 
                        onClick={() => setFormData({...formData, style: style.name})}
                        className={`group relative aspect-[16/10] overflow-hidden cursor-pointer border-4 transition-all ${formData.style === style.name ? 'border-amber-700 scale-[1.02] shadow-2xl' : 'border-transparent grayscale hover:grayscale-0'}`}
                     >
                        <img src={style.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={style.name} />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-all"></div>
                        <div className="absolute bottom-6 left-6">
                           <p className="text-white text-[10px] font-bold uppercase tracking-[0.3em]">{style.name}</p>
                        </div>
                     </div>
                   ))}
                </div>
              </div>
            )}

            {activeStep === 5 && (
              <div className="space-y-16 animate-in slide-in-from-right duration-700">
                <div className="flex items-baseline gap-6 border-b border-slate-200 pb-8">
                  <span className="text-6xl text-slate-200 font-bold serif italic">05</span>
                  <h3 className="text-4xl font-light text-slate-900 serif italic">Viabilidade de <span className="text-amber-800">Investimento</span></h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  <div className="space-y-4 group">
                    <label className="text-[9px] font-bold text-slate-900 uppercase tracking-[0.2em]">Teto de Investimento (R$)</label>
                    <input type="text" className="w-full py-4 bg-transparent border-b-2 border-slate-200 outline-none text-slate-900 font-light text-2xl focus:border-amber-700 transition-all placeholder:text-slate-300" placeholder="R$ 0,00" />
                  </div>
                  <div className="space-y-4 group">
                    <label className="text-[9px] font-bold text-slate-900 uppercase tracking-[0.2em]">Expectativa de Entrega</label>
                    <input type="text" className="w-full py-4 bg-transparent border-b-2 border-slate-200 outline-none text-slate-900 font-light text-2xl focus:border-amber-700 transition-all placeholder:text-slate-300" placeholder="Ex: Natal de 2026" />
                  </div>
                </div>
              </div>
            )}

            {activeStep === 6 && (
              <div className="space-y-16 animate-in slide-in-from-right duration-700">
                <div className="flex items-baseline gap-6 border-b border-slate-200 pb-8">
                  <span className="text-6xl text-slate-200 font-bold serif italic">06</span>
                  <h3 className="text-4xl font-light text-slate-900 serif italic">Dados <span className="text-amber-800">Técnicos</span></h3>
                </div>
                <div className="space-y-12 text-slate-900">
                  <div className="space-y-4 group">
                    <label className="text-[9px] font-bold text-slate-900 uppercase tracking-[0.2em]">Endereço / Matrícula do Imóvel</label>
                    <input type="text" className="w-full py-4 bg-transparent border-b-2 border-slate-200 outline-none text-slate-900 font-light text-xl focus:border-amber-700 transition-all" placeholder="Cidade, Bairro, Lote/Quadra" />
                  </div>
                </div>
              </div>
            )}

            {activeStep === 7 && (
              <div className="space-y-16 animate-in slide-in-from-right duration-700">
                <div className="flex items-baseline gap-6 border-b border-slate-200 pb-8">
                  <span className="text-6xl text-slate-200 font-bold serif italic">07</span>
                  <h3 className="text-4xl font-light text-slate-900 serif italic">Protocolo de <span className="text-amber-800">Envio</span></h3>
                </div>
                <div className="space-y-12">
                  <div className="p-20 border-2 border-dashed border-slate-300 bg-white text-center space-y-6 group hover:border-amber-700 hover:bg-amber-50/10 transition-all cursor-pointer shadow-sm">
                    <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                    </div>
                    <div className="space-y-2">
                       <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-900">Anexar Documentação</p>
                       <p className="text-[9px] text-slate-500 uppercase tracking-widest">Plantas, Levantamentos Topográficos, Moodboards (Máx 50MB)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-6 bg-white border border-slate-200 shadow-sm">
                    <input type="checkbox" className="w-5 h-5 mt-1 rounded-none border-slate-400 text-slate-900 focus:ring-0" id="final" required />
                    <label htmlFor="final" className="text-[10px] text-slate-900 font-bold leading-relaxed uppercase tracking-widest">
                       Autorizo o processamento destes dados técnicos para fins de orçamentação e estudo de viabilidade por Clara Nascimento & Studio.
                    </label>
                  </div>
                  <button type="submit" className="w-full py-8 bg-slate-900 text-white text-[11px] font-bold uppercase tracking-[0.5em] hover:bg-amber-800 transition-all shadow-2xl relative overflow-hidden group">
                    <span className="relative z-10">Consolidar Briefing & Transmitir</span>
                    <div className="absolute inset-0 bg-amber-700 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  </button>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center pt-16 border-t border-slate-200">
              <button 
                type="button"
                onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                disabled={activeStep === 1}
                className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.3em] disabled:opacity-0 hover:text-amber-800 transition-all flex items-center gap-2"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                Etapa Anterior
              </button>
              
              <div className="flex gap-2">
                 {steps.map(s => (
                   <div key={s.id} className={`h-1 transition-all duration-500 ${activeStep === s.id ? 'w-8 bg-amber-600' : 'w-2 bg-slate-200'}`}></div>
                 ))}
              </div>

              {activeStep < 7 && (
                <button 
                  type="button"
                  onClick={() => {
                    window.scrollTo({ top: 300, behavior: 'smooth' });
                    setActiveStep(activeStep + 1);
                  }}
                  className="px-12 py-5 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-amber-800 transition-all flex items-center gap-4 group shadow-xl"
                >
                  Próxima Etapa
                  <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};