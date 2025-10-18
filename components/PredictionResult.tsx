import React from 'react';
import { IrisMeasurements, IrisSpecies } from '../types';
import { LoadingSpinner } from './LoadingSpinner';

interface PredictionResultProps {
  isLoading: boolean;
  prediction: IrisSpecies | null;
  error: string | null;
  measurements: IrisMeasurements | null;
  onRetry: () => void;
}

const speciesInfo = {
    [IrisSpecies.SETOSA]: {
        color: "bg-rose-100 text-rose-800",
        borderColor: "border-rose-300",
        name: "Iris Setosa"
    },
    [IrisSpecies.VERSICOLOR]: {
        color: "bg-sky-100 text-sky-800",
        borderColor: "border-sky-300",
        name: "Iris Versicolor"
    },
    [IrisSpecies.VIRGINICA]: {
        color: "bg-violet-100 text-violet-800",
        borderColor: "border-violet-300",
        name: "Iris Virginica"
    }
}

const ResultCard: React.FC<{ prediction: IrisSpecies }> = ({ prediction }) => {
    const info = speciesInfo[prediction];
    return (
        <div className={`p-6 rounded-lg shadow-lg border-2 ${info.borderColor} ${info.color} transform transition-all duration-500 ease-out animate-fade-in`}>
            <p className="text-sm font-medium uppercase tracking-wider">Prediction</p>
            <h3 className="text-3xl font-bold mt-1">{info.name}</h3>
        </div>
    );
};

const MeasurementPill: React.FC<{label: string, value: number | undefined}> = ({label, value}) => (
    <div className="bg-slate-200 text-slate-700 text-sm px-3 py-1 rounded-full">
        <span className="font-semibold">{label}:</span> {value} cm
    </div>
);


export const PredictionResult: React.FC<PredictionResultProps> = ({ isLoading, prediction, error, measurements, onRetry }) => {
  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md border border-slate-200 min-h-[160px] flex flex-col justify-center items-center">
      {isLoading && <LoadingSpinner />}
      
      {!isLoading && error && (
        <div className="text-center text-red-600 animate-fade-in space-y-2">
          <p className="font-semibold">Oh no! An error occurred.</p>
          <p>{error}</p>
          <button
            onClick={onRetry}
            className="mt-2 bg-red-500 text-white font-bold py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {!isLoading && !error && !prediction && (
        <div className="text-center text-slate-500">
          <p>The classification result will appear here.</p>
          <p className="text-sm">Please fill out the form and click "Classify".</p>
        </div>
      )}

      {!isLoading && prediction && (
        <div className="w-full text-center space-y-4">
            <ResultCard prediction={prediction} />
            {measurements && (
                <div className="pt-4 flex flex-wrap gap-2 justify-center">
                    <MeasurementPill label="Sepal L" value={measurements.sepalLength} />
                    <MeasurementPill label="Sepal W" value={measurements.sepalWidth} />
                    <MeasurementPill label="Petal L" value={measurements.petalLength} />
                    <MeasurementPill label="Petal W" value={measurements.petalWidth} />
                </div>
            )}
        </div>
      )}
    </div>
  );
};