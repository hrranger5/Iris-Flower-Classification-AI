import React, { useState } from 'react';
import { IrisMeasurements } from '../types';

interface IrisInputFormProps {
  onSubmit: (measurements: IrisMeasurements) => void;
  isLoading: boolean;
}

const exampleMeasurements = {
  setosa: {
    sepalLength: '5.1',
    sepalWidth: '3.5',
    petalLength: '1.4',
    petalWidth: '0.2',
  },
  versicolor: {
    sepalLength: '5.9',
    sepalWidth: '2.7',
    petalLength: '4.2',
    petalWidth: '1.3',
  },
  virginica: {
    sepalLength: '6.7',
    sepalWidth: '3.1',
    petalLength: '5.6',
    petalWidth: '2.2',
  },
};

const InputField: React.FC<{
  id: keyof IrisMeasurements;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}> = ({ id, label, value, onChange, placeholder }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
        <input
            type="number"
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 transition"
            placeholder={placeholder}
            step="0.1"
            min="0"
            required
        />
    </div>
);


export const IrisInputForm: React.FC<IrisInputFormProps> = ({ onSubmit, isLoading }) => {
  const [measurements, setMeasurements] = useState({
    sepalLength: '',
    sepalWidth: '',
    petalLength: '',
    petalWidth: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMeasurements(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      sepalLength: parseFloat(measurements.sepalLength),
      sepalWidth: parseFloat(measurements.sepalWidth),
      petalLength: parseFloat(measurements.petalLength),
      petalWidth: parseFloat(measurements.petalWidth),
    });
  };
  
  const handleExampleClick = (example: keyof typeof exampleMeasurements) => {
    setMeasurements(exampleMeasurements[example]);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-slate-200">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">Flower Measurements (cm)</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField id="sepalLength" label="Sepal Length" value={measurements.sepalLength} onChange={handleChange} placeholder="e.g., 5.1" />
                <InputField id="sepalWidth" label="Sepal Width" value={measurements.sepalWidth} onChange={handleChange} placeholder="e.g., 3.5" />
                <InputField id="petalLength" label="Petal Length" value={measurements.petalLength} onChange={handleChange} placeholder="e.g., 1.4" />
                <InputField id="petalWidth" label="Petal Width" value={measurements.petalWidth} onChange={handleChange} placeholder="e.g., 0.2" />
            </div>
            
            <div className="pt-2">
                <p className="text-sm text-slate-600 mb-2">Try with an example:</p>
                <div className="flex flex-wrap gap-2">
                    <button type="button" onClick={() => handleExampleClick('setosa')} className="flex-1 bg-rose-100 text-rose-800 text-sm font-semibold py-2 px-3 rounded-md hover:bg-rose-200 transition-colors">Setosa</button>
                    <button type="button" onClick={() => handleExampleClick('versicolor')} className="flex-1 bg-sky-100 text-sky-800 text-sm font-semibold py-2 px-3 rounded-md hover:bg-sky-200 transition-colors">Versicolor</button>
                    <button type="button" onClick={() => handleExampleClick('virginica')} className="flex-1 bg-violet-100 text-violet-800 text-sm font-semibold py-2 px-3 rounded-md hover:bg-violet-200 transition-colors">Virginica</button>
                </div>
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all duration-300 ease-in-out flex items-center justify-center"
            >
                {isLoading ? 'Classifying...' : 'Classify Flower'}
            </button>
        </form>
    </div>
  );
};
