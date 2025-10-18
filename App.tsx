
import React, { useState } from 'react';
import { IrisInputForm } from './components/IrisInputForm';
import { PredictionResult } from './components/PredictionResult';
import { IrisInfo } from './components/IrisInfo';
import { Header } from './components/Header';
import { HelpModal } from './components/HelpModal';
import { IrisMeasurements, IrisSpecies } from './types';
import { predictIrisSpecies } from './services/geminiService';

// FIX: Implement the main App component.
const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<IrisSpecies | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submittedMeasurements, setSubmittedMeasurements] = useState<IrisMeasurements | null>(null);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  const handleSubmit = async (measurements: IrisMeasurements) => {
    setIsLoading(true);
    setError(null);
    setPrediction(null);
    setSubmittedMeasurements(measurements);

    try {
      const result = await predictIrisSpecies(measurements);
      setPrediction(result.species);
    } catch (e) {
      console.error(e);
      setError('Failed to classify the flower. Please check your measurements and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    setPrediction(null);
    setSubmittedMeasurements(null);
  };

  return (
    <>
      <Header onHelpClick={() => setIsHelpModalOpen(true)} />
      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
             <IrisInfo />
          </div>
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Iris Species Classifier</h1>
            <p className="text-slate-600 mb-6">
                Enter the measurements of an iris flower to predict its species using AI. 
                This tool uses Google's Gemini model to perform the classification.
            </p>
            <IrisInputForm onSubmit={handleSubmit} isLoading={isLoading} />
            <PredictionResult 
                isLoading={isLoading} 
                prediction={prediction} 
                error={error}
                measurements={submittedMeasurements}
                onRetry={handleRetry}
            />
          </div>
        </div>
      </main>
      <HelpModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
    </>
  );
};

export default App;
