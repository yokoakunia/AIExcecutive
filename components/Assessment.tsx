
import React, { useState } from 'react';
import { QUESTIONS } from '../constants';
import { AssessmentResult, Axis, AxisScore } from '../types';
import { CATEGORIES } from '../constants';

interface AssessmentProps {
  onComplete: (result: AssessmentResult) => void;
}

const Assessment: React.FC<AssessmentProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const question = QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

  const handleSelect = (value: number) => {
    const newAnswers = { ...answers, [question.id]: value };
    setAnswers(newAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (finalAnswers: Record<number, number>) => {
    const axisData: Record<Axis, { score: number; max: number }> = {
      [Axis.OPENNESS]: { score: 0, max: 0 },
      [Axis.INFLUENCE]: { score: 0, max: 0 },
      [Axis.CURIOSITY]: { score: 0, max: 0 },
      [Axis.ADOPTION]: { score: 0, max: 0 },
    };

    QUESTIONS.forEach(q => {
      axisData[q.axis].score += finalAnswers[q.id] || 0;
      axisData[q.axis].max += 5; // 1-5 scale
    });

    const axisScores: AxisScore[] = Object.entries(axisData).map(([axis, data]) => ({
      axis: axis as Axis,
      score: data.score,
      maxScore: data.max
    }));

    const totalRaw = axisScores.reduce((acc, curr) => acc + curr.score, 0);
    const maxRaw = axisScores.reduce((acc, curr) => acc + curr.maxScore, 0);
    const percentage = (totalRaw / maxRaw) * 100;

    const category = CATEGORIES.find(c => percentage >= c.range[0] && percentage <= c.range[1]) 
                  || CATEGORIES[CATEGORIES.length - 1];

    onComplete({
      totalScore: Math.round(percentage),
      axisScores,
      category,
      timestamp: Date.now()
    });
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {/* Progress Header */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-indigo-600">Pregunta {currentStep + 1} de {QUESTIONS.length}</span>
          <span className="text-sm font-medium text-slate-500">{Math.round(progress)}% completado</span>
        </div>
        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-indigo-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100 transform transition-all">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-6">
          <i className="fas fa-microchip mr-2"></i> {question.axis}
        </div>
        
        <h2 className="text-2xl font-bold text-slate-800 mb-4 leading-tight">
          {question.text}
        </h2>
        <p className="text-slate-500 mb-10 italic">
          {question.description}
        </p>

        <div className="space-y-3">
          {[
            { label: "Totalmente en desacuerdo", val: 1 },
            { label: "En desacuerdo", val: 2 },
            { label: "Neutral", val: 3 },
            { label: "De acuerdo", val: 4 },
            { label: "Totalmente de acuerdo", val: 5 }
          ].map((opt) => (
            <button
              key={opt.val}
              onClick={() => handleSelect(opt.val)}
              className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all duration-200 flex items-center group
                ${answers[question.id] === opt.val 
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                  : 'border-slate-100 hover:border-indigo-200 hover:bg-slate-50 text-slate-600'}`}
            >
              <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-colors
                ${answers[question.id] === opt.val ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300'}`}>
                {answers[question.id] === opt.val && <i className="fas fa-check text-white text-[10px]"></i>}
              </div>
              <span className="font-medium">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => currentStep > 0 && setCurrentStep(prev => prev - 1)}
          className={`flex items-center text-slate-500 font-medium hover:text-slate-800 transition-colors ${currentStep === 0 ? 'invisible' : ''}`}
        >
          <i className="fas fa-arrow-left mr-2"></i> Anterior
        </button>
      </div>
    </div>
  );
};

export default Assessment;
