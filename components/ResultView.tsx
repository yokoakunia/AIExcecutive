
import React, { useEffect, useState } from 'react';
import { AssessmentResult } from '../types';
import ProfileRadarChart from './RadarChart';
import { generatePersonalizedRoadmap } from '../geminiService';

interface ResultViewProps {
  result: AssessmentResult;
  onRestart: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ result, onRestart }) => {
  const [aiRoadmap, setAiRoadmap] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  useEffect(() => {
    const fetchRoadmap = async () => {
      setLoadingAi(true);
      const roadmap = await generatePersonalizedRoadmap(
        result.totalScore,
        result.category,
        result.axisScores
      );
      setAiRoadmap(roadmap);
      setLoadingAi(false);
    };

    fetchRoadmap();
  }, [result]);

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 animate-fade-in">
      {/* Header Summary */}
      <div className={`rounded-3xl p-8 mb-8 text-white shadow-2xl bg-gradient-to-br ${result.category.color} relative overflow-hidden`}>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 text-center min-w-[160px]">
            <div className="text-5xl font-black mb-1">{result.totalScore}</div>
            <div className="text-xs uppercase font-bold tracking-widest opacity-80">Puntaje Global</div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/20 text-sm font-bold mb-4">
              <i className={`fas ${result.category.icon}`}></i> Perfil: {result.category.name}
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3 leading-tight">
              {result.category.description}
            </h1>
            <p className="text-lg opacity-90 font-medium">
              Plan sugerido: {result.category.actionPlan}
            </p>
          </div>
        </div>
        {/* Abstract shapes for design */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black/10 rounded-full blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Chart Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-800">Mapa de Competencias</h3>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <i className="fas fa-chart-pie"></i>
            </div>
          </div>
          <div className="flex-grow flex items-center">
            <ProfileRadarChart data={result.axisScores} />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {result.axisScores.map((axis) => (
              <div key={axis.axis} className="bg-slate-50 p-3 rounded-xl">
                <div className="text-xs font-bold text-slate-400 uppercase mb-1">{axis.axis}</div>
                <div className="text-lg font-bold text-slate-700">{Math.round((axis.score / axis.maxScore) * 100)}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Action Plan Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-800">Hoja de Ruta Personalizada</h3>
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              <i className="fas fa-wand-magic-sparkles"></i>
            </div>
          </div>
          
          <div className="prose prose-slate max-w-none flex-grow">
            {loadingAi ? (
              <div className="flex flex-col items-center justify-center h-48 space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                <p className="text-slate-500 font-medium animate-pulse">Analizando tu perfil con IA...</p>
              </div>
            ) : (
              <div className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                {aiRoadmap}
              </div>
            )}
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
              Generado por Gemini AI basado en tus resultados
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <button
          onClick={() => window.print()}
          className="px-8 py-4 bg-slate-800 text-white rounded-2xl font-bold hover:bg-slate-900 transition-all flex items-center justify-center gap-2"
        >
          <i className="fas fa-download"></i> Descargar Informe PDF
        </button>
        <button
          onClick={onRestart}
          className="px-8 py-4 bg-white text-indigo-600 border-2 border-indigo-100 rounded-2xl font-bold hover:bg-indigo-50 transition-all flex items-center justify-center gap-2"
        >
          <i className="fas fa-redo"></i> Realizar de Nuevo
        </button>
      </div>
    </div>
  );
};

export default ResultView;
