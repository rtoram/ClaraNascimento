import React, { useState, useMemo, useEffect } from 'react';

const timeSlots = ["09:00", "10:30", "14:00", "15:30", "17:00"];
const projectTypes = ["Residencial", "Comercial", "Interiores", "Consultoria"];

interface ContactPageProps {
  projectRef?: { title: string, image: string } | null;
  onClearRef?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ projectRef, onClearRef }) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', project: '', message: '' });
  
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill project type if arriving from a specific reference
  useEffect(() => {
    if (projectRef && !formData.project) {
      setFormData(prev => ({ ...prev, project: 'Consultoria' }));
    }
  }, [projectRef]);

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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulação de envio de formulário
    setTimeout(() => {
      setIsSubmitting(false);
      setIsMessageSent(true);
      if (onClearRef) onClearRef();
    }, 1500);
  };

  const handleConfirmBooking = () => {
    if (!selectedDate || !selectedTime) return;
    setIsSubmitting(true);

    // Simulação de agendamento
    setTimeout(() => {
      setIsSubmitting(false);
      setIsBookingConfirmed(true);
    }, 1500);
  };

  return (
    <div className="bg-white min-h-screen py-24 px-8 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-24 space-y-6 fade-in-section">
          <span className="text-[10px] font-bold text-amber-800 tracking-[0.6em] uppercase">Connect</span>
          <h2 className="text-6xl md:text-8xl font-light text-slate-900 serif leading-none">
            Inicie seu <span className="italic">Legado</span>
          </h2>
          <p className="max-w-xl text-slate-700 text-lg font-light leading-relaxed mt-8 italic serif">
            Seja para uma residência dos sonhos ou um espaço comercial disruptivo, estamos prontos para projetar o extraordinário com você.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          {/* Contact Form Container */}
          <div className="space-y-12 fade-in-section">
            <h3 className="text-2xl font-light text-slate-900 serif tracking-widest uppercase mb-8">Informações Básicas</h3>
            
            {!isMessageSent ? (
              <form onSubmit={handleFormSubmit} className="space-y-8">
                {/* Contextual Reference Card */}
                {projectRef && (
                  <div className="p-6 bg-slate-50 border border-amber-700/30 rounded-sm animate-in slide-in-from-top-4 duration-500 shadow-sm flex items-center justify-between group">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 overflow-hidden shadow-md">
                        <img src={projectRef.image} alt={projectRef.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[9px] font-bold text-amber-800 uppercase tracking-widest">Referência Selecionada</p>
                        <p className="text-xl font-bold text-slate-900 serif italic">{projectRef.title}</p>
                        <p className="text-[10px] font-medium text-slate-500 uppercase tracking-tighter">Interesse em Estudo Similar</p>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      onClick={onClearRef}
                      className="p-2 text-slate-300 hover:text-amber-800 transition-colors"
                      title="Remover Referência"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}

                <div className="relative border-b border-slate-300 focus-within:border-amber-700 transition-colors">
                  <label className="text-[10px] font-bold text-slate-800 uppercase tracking-widest">Nome Completo</label>
                  <input 
                    type="text" 
                    className="w-full py-4 bg-transparent outline-none text-slate-900 font-medium placeholder:text-slate-400"
                    placeholder="Seu nome aqui"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative border-b border-slate-300 focus-within:border-amber-700 transition-colors">
                    <label className="text-[10px] font-bold text-slate-800 uppercase tracking-widest">E-mail</label>
                    <input 
                      type="email" 
                      className="w-full py-4 bg-transparent outline-none text-slate-900 font-medium placeholder:text-slate-400"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                  <div className="relative border-b border-slate-300 focus-within:border-amber-700 transition-colors">
                    <label className="text-[10px] font-bold text-slate-800 uppercase tracking-widest">Telefone / WhatsApp</label>
                    <input 
                      type="tel" 
                      className="w-full py-4 bg-transparent outline-none text-slate-900 font-medium placeholder:text-slate-400"
                      placeholder="+55 (00) 00000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-slate-800 uppercase tracking-widest">Tipo de Projeto</label>
                  <div className="grid grid-cols-2 gap-4">
                    {projectTypes.map(type => (
                      <button 
                        key={type}
                        type="button"
                        onClick={() => setFormData({...formData, project: type})}
                        className={`py-3 px-4 border text-[9px] font-bold uppercase tracking-widest transition-all ${
                          formData.project === type 
                          ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                          : 'border-slate-300 text-slate-600 hover:border-amber-700'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="relative border-b border-slate-300 focus-within:border-amber-700 transition-colors">
                  <label className="text-[10px] font-bold text-slate-800 uppercase tracking-widest">Mensagem</label>
                  <textarea 
                    className="w-full py-4 bg-transparent outline-none text-slate-900 font-medium h-32 resize-none placeholder:text-slate-400"
                    placeholder={projectRef ? `Conte-nos o que mais lhe atrai no projeto ${projectRef.title}...` : "Conte-nos sobre sua visão..."}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-6 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-amber-800 transition-all shadow-xl disabled:opacity-50"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                </button>
              </form>
            ) : (
              <div className="py-16 text-center space-y-8 animate-in fade-in zoom-in-95 duration-700">
                <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto border border-amber-200">
                  <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="space-y-4">
                  <h4 className="text-3xl font-light text-slate-900 serif italic">Mensagem Enviada</h4>
                  <p className="text-slate-600 font-light max-w-sm mx-auto">
                    Obrigado pelo contato, {formData.name}. Nossa equipe analisará sua solicitação e retornará em breve.
                  </p>
                </div>
                <button 
                  onClick={() => setIsMessageSent(false)}
                  className="text-[9px] font-bold text-amber-800 uppercase tracking-widest border-b border-amber-800 pb-1"
                >
                  Enviar outra mensagem
                </button>
              </div>
            )}
          </div>

          {/* Scheduler Area */}
          <div className="bg-slate-50 p-12 lg:p-16 space-y-10 fade-in-section rounded-sm border border-slate-200 shadow-sm relative overflow-hidden">
            {!isBookingConfirmed ? (
              <>
                <div className="space-y-4 text-center lg:text-left">
                  <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 text-[8px] font-bold rounded-full border border-amber-200 uppercase tracking-widest mb-2 shadow-sm">Live Session</span>
                  <h3 className="text-3xl md:text-4xl font-light text-slate-900 serif italic">Agende uma Call com a Clara</h3>
                  <p className="text-slate-700 text-sm font-light leading-relaxed">
                    Uma reunião estratégica de 30 minutos para alinhamento conceitual e análise técnica preliminar do seu espaço.
                  </p>
                </div>

                <div className="space-y-8">
                  {/* Date Selection */}
                  <div className="space-y-4">
                    <p className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.3em]">1. Escolha o Dia</p>
                    <div className="grid grid-cols-5 gap-2">
                        {availableDates.map((date) => (
                          <button 
                            key={date.id}
                            onClick={() => { setSelectedDate(date.id); setSelectedTime(null); }}
                            className={`flex flex-col items-center justify-center p-3 border transition-all ${
                              selectedDate === date.id 
                              ? 'border-amber-700 bg-amber-50 ring-2 ring-amber-700/20 shadow-sm' 
                              : 'border-slate-300 bg-white hover:border-amber-700 text-slate-600'
                            }`}
                          >
                            <span className={`text-[8px] font-bold uppercase tracking-widest mb-1 ${selectedDate === date.id ? 'text-amber-800' : 'text-slate-500'}`}>{date.weekday}</span>
                            <span className={`text-xl font-bold serif ${selectedDate === date.id ? 'text-slate-950' : 'text-slate-500'}`}>{date.day}</span>
                          </button>
                        ))}
                    </div>
                  </div>

                  {/* Time Selection */}
                  <div className={`space-y-4 transition-opacity duration-500 ${!selectedDate ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                    <p className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.3em]">2. Escolha o Horário</p>
                    <div className="grid grid-cols-3 gap-3">
                      {timeSlots.map(time => (
                        <button 
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-3 text-[10px] font-bold tracking-widest transition-all ${
                            selectedTime === time 
                            ? 'bg-slate-900 text-white shadow-lg ring-2 ring-slate-900/20' 
                            : 'bg-white text-slate-600 hover:border-amber-700 border border-slate-300'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  {selectedDate && selectedTime && (
                    <div className="p-5 bg-amber-50 border border-amber-200 text-center animate-in fade-in slide-in-from-bottom-2 duration-300 shadow-sm">
                        <p className="text-[9px] font-bold text-amber-900 uppercase tracking-widest mb-1">Horário Selecionado</p>
                        <p className="text-base text-slate-900 serif italic font-medium">
                          {availableDates.find(d => d.id === selectedDate)?.full} às {selectedTime}
                        </p>
                    </div>
                  )}

                  <div className="pt-4 flex items-center gap-6">
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md overflow-hidden border-2 border-amber-600/10">
                        <img src="https://i.ibb.co/qMNP90Rp/Whats-App-Image-2026-02-17-at-21-24-01.jpg" alt="Clara" className="w-full h-full object-cover" 
                          onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"; }} />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-slate-950 uppercase tracking-widest leading-none">Clara Nascimento</p>
                        <p className="text-[9px] text-slate-600 font-bold italic mt-1.5 uppercase tracking-tighter">Arquiteta & Founder</p>
                    </div>
                  </div>

                  <button 
                    onClick={handleConfirmBooking}
                    disabled={!selectedDate || !selectedTime || isSubmitting}
                    className="w-full py-5 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-amber-800 transition-all disabled:bg-slate-300 disabled:cursor-not-allowed shadow-xl"
                  >
                    {isSubmitting ? 'Confirmando...' : 'Confirmar Agendamento'}
                  </button>
                </div>
              </>
            ) : (
              <div className="py-20 text-center space-y-10 animate-in fade-in zoom-in-95 duration-700">
                <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mx-auto shadow-2xl border-4 border-amber-600/20">
                  <svg className="w-12 h-12 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="space-y-6">
                  <h3 className="text-4xl font-light text-slate-900 serif italic">Call Agendada</h3>
                  <div className="bg-white p-6 border border-slate-100 shadow-sm space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-amber-800">Sua Reserva:</p>
                    <p className="text-xl serif italic">{availableDates.find(d => d.id === selectedDate)?.full}</p>
                    <p className="text-lg serif">às {selectedTime}</p>
                  </div>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Um convite de calendário foi enviado para o seu e-mail com o link de acesso.
                  </p>
                </div>
                <button 
                  onClick={() => setIsBookingConfirmed(false)}
                  className="text-[9px] font-bold text-slate-900 uppercase tracking-widest border-b border-slate-900 pb-1"
                >
                  Alterar Horário
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};