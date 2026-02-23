import React, { useState } from 'react';

interface Project {
  id: string;
  title: string;
  location: string;
  year: string;
  image: string;
  size: 'large' | 'small' | 'wide';
  description: string;
  gallery: string[];
  specs: { label: string; value: string }[];
}

const projectsData: Project[] = [
  {
    id: "001",
    title: "Residência Brise Soleil",
    location: "São Paulo, SP",
    year: "2024",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    size: "large",
    description: "Uma exploração da luz filtrada e do conforto térmico passivo. Esta residência utiliza elementos vazados para criar um jogo de luz e sombra que evolui ao longo do dia, transformando o interior em uma galeria viva.",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: [
      { label: "Área", value: "450m²" },
      { label: "Materialidade", value: "Concreto Aparente, Madeira Freijó" },
      { label: "Status", value: "Concluído" }
    ]
  },
  {
    id: "002",
    title: "Studio Minimalista",
    location: "Curitiba, PR",
    year: "2023",
    image: "https://images.unsplash.com/photo-1600585154340-be6199f7d009?auto=format&fit=crop&w=1200&q=80",
    size: "small",
    description: "A essência do 'menos é mais'. Este studio foi projetado para um artista plástico, priorizando o silêncio visual e a iluminação zenital difusa, ideal para a criação.",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6199f7d009?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1598928636135-d146006ff4be?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-61dc36dc98c8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560184897-ae75f418493e?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: [
      { label: "Área", value: "85m²" },
      { label: "Materialidade", value: "Microcimento, Aço Corten" },
      { label: "Status", value: "Concluído" }
    ]
  },
  {
    id: "003",
    title: "Pavilhão de Vidro",
    location: "Ubatuba, SP",
    year: "2023",
    image: "https://images.unsplash.com/photo-1600607687940-4e524cb35a3a?auto=format&fit=crop&w=1200&q=80",
    size: "small",
    description: "Dissolvendo as fronteiras entre interior e exterior. Localizado frente ao mar, este pavilhão utiliza grandes vãos de vidro para emoldurar a paisagem como uma pintura em constante mudança.",
    gallery: [
      "https://images.unsplash.com/photo-1600607687940-4e524cb35a3a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: [
      { label: "Área", value: "320m²" },
      { label: "Materialidade", value: "Vidro de Alta Performance, Alumínio" },
      { label: "Status", value: "Concluído" }
    ]
  },
  {
    id: "004",
    title: "Torre Bioclimática",
    location: "Belo Horizonte, MG",
    year: "2024",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    size: "wide",
    description: "Arquitetura corporativa que respira. Esta torre integra jardins verticais e sistemas de ventilação natural por efeito chaminé, reduzindo drasticamente o consumo energético.",
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: [
      { label: "Área", value: "12.000m²" },
      { label: "Certificação", value: "LEED Platinum" },
      { label: "Status", value: "Em Execução" }
    ]
  },
  {
    id: "005",
    title: "Casa Suspensa",
    location: "Vale do Sol",
    year: "2022",
    image: "https://images.unsplash.com/photo-1449156059579-73040a3acc38?auto=format&fit=crop&w=1200&q=80",
    size: "large",
    description: "Elevada sobre o terreno acidentado para preservar a topografia e a vegetação nativa. Uma estrutura metálica leve que flutua entre as copas das árvores.",
    gallery: [
      "https://images.unsplash.com/photo-1449156059579-73040a3acc38?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6f3ea?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
    ],
    specs: [
      { label: "Área", value: "280m²" },
      { label: "Materialidade", value: "Aço e Vidro" },
      { label: "Status", value: "Concluído" }
    ]
  }
];

interface ProjectsPageProps {
  onRequestSimilarStudy: (project: { title: string, image: string }) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onRequestSimilarStudy }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');

  const handleOpenDetails = (project: Project) => {
    setSelectedProject(project);
    setActiveImage(project.image);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseDetails = () => {
    setSelectedProject(null);
  };

  if (selectedProject) {
    return (
      <div className="bg-white min-h-screen py-16 px-8 lg:px-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="max-w-[1400px] mx-auto">
          {/* Detailed View Header */}
          <div className="flex justify-between items-center mb-12 border-b border-slate-100 pb-8">
            <button 
              onClick={handleCloseDetails}
              className="flex items-center gap-4 text-[10px] font-bold text-slate-400 hover:text-amber-800 uppercase tracking-[0.4em] transition-all group"
            >
              <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Voltar ao Portfólio
            </button>
            <span className="text-[10px] font-bold text-amber-800 tracking-[0.8em] uppercase">Ref: {selectedProject.id}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Left Column: Media */}
            <div className="lg:col-span-8 space-y-8">
              <div className="aspect-[16/9] overflow-hidden bg-slate-100 shadow-2xl relative">
                <img 
                  src={activeImage} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-1000"
                />
                <div className="absolute top-8 left-8 text-white/40 text-[9px] font-mono tracking-tighter pointer-events-none">
                  HIGH_RES_VISUALIZATION_LAYER
                </div>
              </div>

              {/* Gallery Thumbnails */}
              <div className="grid grid-cols-5 gap-4">
                {selectedProject.gallery.map((img, i) => (
                  <button 
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`aspect-square overflow-hidden border-2 transition-all duration-300 ${
                      activeImage === img ? 'border-amber-700 scale-105 shadow-lg' : 'border-transparent grayscale hover:grayscale-0 hover:border-slate-200'
                    }`}
                  >
                    <img src={img} className="w-full h-full object-cover" alt={`Thumb ${i}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Info */}
            <div className="lg:col-span-4 space-y-12 py-4">
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-amber-700 tracking-[0.6em] uppercase block">{selectedProject.year} • {selectedProject.location}</span>
                <h2 className="text-5xl md:text-6xl font-light text-slate-900 serif italic leading-tight">{selectedProject.title}</h2>
                <div className="h-px w-20 bg-amber-700 mt-6"></div>
              </div>

              <div className="space-y-6">
                <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.4em]">Conceito do Projeto</h4>
                <p className="text-slate-600 text-lg font-light leading-relaxed italic serif">
                  {selectedProject.description}
                </p>
              </div>

              <div className="space-y-8 pt-8 border-t border-slate-100">
                <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.4em]">Especificações Técnicas</h4>
                <div className="space-y-4">
                  {selectedProject.specs.map((spec, i) => (
                    <div key={i} className="flex justify-between items-baseline border-b border-slate-50 pb-2">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{spec.label}</span>
                      <span className="text-xs font-medium text-slate-900 text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => onRequestSimilarStudy({ title: selectedProject.title, image: selectedProject.image })}
                className="w-full py-6 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-amber-800 transition-all shadow-xl mt-12 group overflow-hidden relative"
              >
                <span className="relative z-10">Solicitar Estudo Similar</span>
                <div className="absolute inset-0 bg-amber-700 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-24 px-8 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-24 space-y-4 fade-in-section">
          <span className="text-[10px] font-bold text-amber-700 tracking-[0.6em] uppercase">Portfolio Selection</span>
          <h2 className="text-6xl md:text-8xl font-light text-slate-900 serif leading-none">
            Projetos <span className="italic">Autorais</span>
          </h2>
          <div className="w-24 h-px bg-amber-700 mt-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16">
          {projectsData.map((project, idx) => (
            <div 
              key={idx} 
              className={`fade-in-section group relative overflow-hidden ${
                project.size === 'large' ? 'md:col-span-8 aspect-[4/3]' : 
                project.size === 'wide' ? 'md:col-span-12 aspect-[21/9]' : 
                'md:col-span-4 aspect-[3/4]'
              }`}
            >
              <div className="absolute inset-0 bg-slate-100 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-in-out"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <div className="flex justify-between items-end text-white">
                  <div className="space-y-2">
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-amber-500">{project.year}</span>
                    <h3 className="text-3xl font-light serif italic">{project.title}</h3>
                    <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-white/60">{project.location}</p>
                  </div>
                  <button 
                    onClick={() => handleOpenDetails(project)}
                    className="text-[10px] font-bold uppercase tracking-[0.2em] border-b border-white pb-1 hover:text-amber-500 hover:border-amber-500 transition-colors"
                  >
                    Ver Detalhes
                  </button>
                </div>
              </div>
              
              <div className="absolute top-8 left-8 text-white/20 text-[8px] font-mono tracking-tighter pointer-events-none group-hover:text-white/40 transition-colors">
                PROJECT_REF_{project.id} // SEC_{project.size.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-32 text-center fade-in-section">
           <p className="text-slate-400 font-light italic serif text-xl max-w-2xl mx-auto">
             "A arquitetura não deve apenas abrigar o corpo, mas elevar o espírito através da luz, da forma e da materialidade."
           </p>
        </div>
      </div>
    </div>
  );
};