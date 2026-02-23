import React from 'react';

const steps = [
  {
    number: "01",
    title: "Concepção & Briefing",
    description: "Iniciamos com uma imersão profunda nas necessidades e desejos do cliente. Analisamos o terreno, a incidência solar e o entorno para criar um conceito único que guiará todo o projeto.",
    image: "https://images.unsplash.com/photo-1503387762-592dea58ef21?auto=format&fit=crop&w=1000&q=80"
  },
  {
    number: "02",
    title: "Anteprojeto & Estudo",
    description: "Aqui as ideias tomam forma. Desenvolvemos plantas, volumetrias e maquetes eletrônicas 3D de alta fidelidade para que o cliente visualize o resultado final antes da execução.",
    image: "https://images.unsplash.com/photo-1581439645268-ea7bbe6bd091?auto=format&fit=crop&w=1000&q=80"
  },
  {
    number: "03",
    title: "Projeto Executivo",
    description: "O detalhamento técnico rigoroso. Elaboramos todos os desenhos necessários para a obra, especificando materiais, revestimentos e sistemas, garantindo precisão milimétrica.",
    image: "https://images.unsplash.com/photo-1508919892451-4b88bf769638?auto=format&fit=crop&w=1000&q=80"
  },
  {
    number: "04",
    title: "Acompanhamento & Gestão",
    description: "Acompanhamos cada fase da execução. Nossa presença na obra assegura que o projeto seja fielmente materializado, mantendo os padrões de qualidade e prazos estabelecidos.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&w=1000&q=80"
  }
];

const processFlow = ["Briefing", "Conceito", "Desenvolvimento", "Detalhamento", "Execução"];

export const MethodologyPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-24 px-8 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-32 space-y-6 fade-in-section">
          <span className="text-[10px] font-bold text-amber-700 tracking-[0.6em] uppercase">Processo Criativo</span>
          <h2 className="text-6xl md:text-8xl font-light text-slate-900 serif leading-none">
            Nossa <span className="italic">Metodologia</span>
          </h2>
          <p className="max-w-2xl text-slate-500 text-lg font-light leading-relaxed mt-8 italic serif">
            Combinamos técnica, sensibilidade e tecnologia para transformar aspirações em espaços tangíveis e inspiradores.
          </p>
        </div>

        <div className="space-y-48">
          {steps.map((step, idx) => (
            <div key={idx} className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 lg:gap-32 fade-in-section`}>
              <div className="flex-1 space-y-8">
                <span className="text-4xl font-light text-amber-700/30 serif italic">{step.number}</span>
                <h3 className="text-4xl md:text-5xl font-light text-slate-900 serif italic">{step.title}</h3>
                <p className="text-slate-600 text-lg font-light leading-relaxed">
                  {step.description}
                </p>
                <div className="w-16 h-px bg-amber-700"></div>
              </div>
              <div className="flex-1 relative aspect-[4/3] overflow-hidden bg-slate-100 group">
                <img 
                  src={step.image} 
                  alt={step.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 border-[20px] border-white/10 group-hover:border-white/0 transition-all pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Animação Gráfica Minimalista - Tecnologia & IA */}
        <section className="mt-48 relative overflow-hidden bg-slate-900 text-white rounded-sm min-h-[600px] flex items-center">
          {/* SVG Background Animation */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <svg width="100%" height="100%" viewBox="0 0 1000 600" fill="none" xmlns="http://www.w3.org/2000/svg">
              <style>
                {`
                  .draw-line {
                    stroke-dasharray: 1000;
                    stroke-dashoffset: 1000;
                    animation: draw 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                  }
                  @keyframes draw {
                    0% { stroke-dashoffset: 1000; opacity: 0; }
                    20% { opacity: 1; }
                    50% { stroke-dashoffset: 0; }
                    80% { opacity: 1; }
                    100% { stroke-dashoffset: 0; opacity: 0; }
                  }
                  .point {
                    animation: pulse-point 4s ease-in-out infinite;
                  }
                  @keyframes pulse-point {
                    0%, 100% { r: 2; opacity: 0.3; }
                    50% { r: 4; opacity: 1; }
                  }
                `}
              </style>
              {/* Abstract Architectural Lines */}
              <path d="M100 100 H900 V500 H100 V100" stroke="white" strokeWidth="0.5" className="draw-line" style={{ animationDelay: '0s' }} />
              <path d="M300 100 V500" stroke="white" strokeWidth="0.5" className="draw-line" style={{ animationDelay: '1s' }} />
              <path d="M700 100 V500" stroke="white" strokeWidth="0.5" className="draw-line" style={{ animationDelay: '2s' }} />
              <path d="M300 300 H700" stroke="white" strokeWidth="0.5" className="draw-line" style={{ animationDelay: '3s' }} />
              <path d="M100 200 H300" stroke="white" strokeWidth="0.5" className="draw-line" style={{ animationDelay: '4s' }} />
              <path d="M700 400 H900" stroke="white" strokeWidth="0.5" className="draw-line" style={{ animationDelay: '5s' }} />
              
              {/* Interaction Points */}
              <circle cx="300" cy="100" r="3" fill="#AF9058" className="point" />
              <circle cx="700" cy="500" r="3" fill="#AF9058" className="point" style={{ animationDelay: '1s' }} />
              <circle cx="300" cy="300" r="3" fill="#AF9058" className="point" style={{ animationDelay: '2s' }} />
            </svg>
          </div>

          <div className="max-w-5xl mx-auto px-8 py-24 relative z-10 w-full text-center space-y-16">
            <div className="space-y-4">
               <h3 className="text-5xl md:text-7xl font-light serif italic tracking-tight">Tecnologia & IA</h3>
               <div className="flex items-center justify-center gap-4">
                  <div className="h-px w-8 bg-amber-600/50"></div>
                  <span className="text-[10px] font-bold text-amber-600 tracking-[0.5em] uppercase">Clara Nascimento Studio</span>
                  <div className="h-px w-8 bg-amber-600/50"></div>
               </div>
            </div>

            <p className="text-slate-300 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto italic serif">
              "Utilizamos algoritmos avançados para otimizar fluxos e insolação, garantindo uma precisão técnica sem precedentes em cada metro quadrado."
            </p>

            {/* Diagrama de Fluxo Animado */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 w-full max-w-4xl mx-auto pt-8">
              {processFlow.map((stepName, i) => (
                <React.Fragment key={stepName}>
                  <div className="flex flex-col items-center group">
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-4 group-hover:border-amber-600 group-hover:bg-amber-600/10 transition-all duration-500">
                      <span className="text-[10px] font-bold text-amber-600">0{i + 1}</span>
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/60 group-hover:text-white transition-colors">
                      {stepName}
                    </span>
                  </div>
                  {i < processFlow.length - 1 && (
                    <div className="hidden md:block flex-1 h-px bg-gradient-to-r from-white/10 via-amber-600/30 to-white/10 mx-4 self-center mt-[-20px]"></div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="pt-12">
              <div className="inline-block px-12 py-5 border border-white/20 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white hover:text-slate-900 transition-all cursor-pointer group">
                <span className="relative z-10">Saber Mais Sobre IA Aplicada</span>
              </div>
            </div>
          </div>
          
          {/* Minimal Signature / Stamp */}
          <div className="absolute bottom-12 right-12 opacity-30 select-none">
            <p className="text-[8px] font-bold uppercase tracking-[0.8em] vertical-text">Clara Nascimento</p>
          </div>
        </section>
      </div>
    </div>
  );
};
