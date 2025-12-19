
import React, { useState, useRef } from 'react';
import { AssessmentResult } from './types';
import Assessment from './components/Assessment';
import ResultView from './components/ResultView';

type AppState = 'HOME' | 'QUIZ' | 'RESULT';

const App: React.FC = () => {
  const [view, setView] = useState<AppState>('HOME');
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const ejesRef = useRef<HTMLDivElement>(null);

  const startQuiz = () => setView('QUIZ');
  const handleComplete = (res: AssessmentResult) => {
    setResult(res);
    setView('RESULT');
  };
  const restart = () => {
    setResult(null);
    setView('HOME');
  };

  const scrollToEjes = (e: React.MouseEvent) => {
    e.preventDefault();
    if (view !== 'HOME') {
      setView('HOME');
      // Small timeout to allow state change before scrolling
      setTimeout(() => {
        ejesRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      ejesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 py-4 px-6 flex justify-between items-center glass-effect">
        <div className="flex items-center gap-2 cursor-pointer" onClick={restart}>
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-xl">
            <i className="fas fa-brain"></i>
          </div>
          <span className="font-extrabold text-slate-800 text-xl tracking-tight">AI<span className="text-indigo-600">Ambassador</span></span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-500">
          <a href="#ejes" onClick={scrollToEjes} className="hover:text-indigo-600 transition-colors">Ejes de Evaluación</a>
          <button 
            onClick={startQuiz}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200"
          >
            Evaluarme
          </button>
        </div>
      </nav>

      <main className="flex-grow">
        {view === 'HOME' && (
          <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-widest mb-8 animate-bounce">
              <i className="fas fa-sparkles"></i> Transformación Digital 2024
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-[1.1]">
              ¿Eres el próximo <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Embajador de IA?</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed">
              Identifica tu perfil tecnológico y descubre cómo puedes liderar la adopción de Inteligencia Artificial en tu equipo.
            </p>

            <div className="mb-20">
               <button
                onClick={startQuiz}
                className="group relative inline-flex items-center gap-3 bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-indigo-600 transition-all shadow-xl hover:-translate-y-1"
              >
                Iniciar Evaluación Gratuita
                <i className="fas fa-arrow-right transition-transform group-hover:translate-x-1"></i>
              </button>
            </div>
            
            <div id="ejes" ref={ejesRef} className="scroll-mt-24">
              <h2 className="text-3xl font-extrabold text-slate-800 mb-4">Nuestros Ejes de Evaluación</h2>
              <p className="text-slate-500 mb-12 max-w-xl mx-auto">Basamos nuestro diagnóstico en los cuatro pilares fundamentales que definen a un líder en la era de la IA.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 max-w-6xl mx-auto">
                {[
                  { 
                    icon: 'fa-lightbulb', 
                    title: 'Apertura al Cambio', 
                    desc: 'Evalúa tu disposición mental para abandonar viejos hábitos y abrazar nuevas metodologías de trabajo impulsadas por IA sin resistencia.' 
                  },
                  { 
                    icon: 'fa-users', 
                    title: 'Influencia en el Equipo', 
                    desc: 'Mide tu capacidad de inspirar, guiar y movilizar a otros compañeros hacia la adopción tecnológica positiva y el aprendizaje colaborativo.' 
                  },
                  { 
                    icon: 'fa-search', 
                    title: 'Curiosidad Tecnológica', 
                    desc: 'Deseo intrínseco de explorar herramientas emergentes, experimentar con nuevas funciones y entender su potencial antes de que sean obligatorias.' 
                  },
                  { 
                    icon: 'fa-bolt', 
                    title: 'Adopción Temprana', 
                    desc: 'Agilidad práctica para integrar la IA en tareas diarias, optimizando flujos de trabajo y generando resultados tangibles de manera inmediata.' 
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-indigo-100 transition-all text-left flex flex-col">
                    <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 text-2xl mb-6">
                      <i className={`fas ${item.icon}`}></i>
                    </div>
                    <h3 className="font-bold text-slate-800 text-xl mb-3">{item.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed flex-grow">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {view === 'QUIZ' && (
          <div className="bg-slate-50 min-h-[calc(100vh-80px)]">
            <Assessment onComplete={handleComplete} />
          </div>
        )}

        {view === 'RESULT' && result && (
          <div className="bg-slate-50 min-h-[calc(100vh-80px)]">
            <ResultView result={result} onRestart={restart} />
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-slate-100 py-10 px-6 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center text-slate-600 text-sm">
              <i className="fas fa-brain"></i>
            </div>
            <span className="font-bold text-slate-400">AI Ambassador Identifier</span>
          </div>
          <p className="text-sm text-slate-400 font-medium text-center md:text-left">
            Diseñado para la excelencia en la transformación digital empresarial.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
