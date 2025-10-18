import React, { useState, useEffect } from 'react';
import { generateIrisImage } from '../services/geminiService';
import { IrisSpecies } from '../types';

interface IrisCardProps {
  name: string;
  description: string;
  imageUrl: string | null;
  colorClass: string;
}

const ImagePlaceholder: React.FC = () => (
    <div className="w-full h-40 bg-slate-200 animate-pulse flex items-center justify-center">
        <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
    </div>
);

const IrisCard: React.FC<IrisCardProps> = ({ name, description, imageUrl, colorClass }) => (
    <div className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
        <div className={`h-2 ${colorClass}`}></div>
        <div className="p-5">
            <h3 className="text-lg font-semibold text-slate-800">{name}</h3>
            <p className="text-slate-600 mt-2 text-sm">{description}</p>
        </div>
        {imageUrl ? (
            <img src={imageUrl} alt={name} className="w-full h-40 object-cover" />
        ) : (
            <ImagePlaceholder />
        )}
    </div>
);

const irisData = [
    {
        species: IrisSpecies.SETOSA,
        name: "Iris Setosa",
        description: "Typically has smaller petals and sepals. It's often the most easily distinguishable of the three species due to its distinct measurements.",
        colorClass: "bg-rose-500"
    },
    {
        species: IrisSpecies.VERSICOLOR,
        name: "Iris Versicolor",
        description: "Often has measurements that fall between Setosa and Virginica, making it an interesting classification challenge. Its features can sometimes overlap with the other two.",
        colorClass: "bg-sky-500"
    },
    {
        species: IrisSpecies.VIRGINICA,
        name: "Iris Virginica",
        description: "Usually the largest of the three species, with wider petals and longer sepals. Its measurements are generally at the higher end of the scale.",
        colorClass: "bg-violet-500"
    }
];


export const IrisInfo: React.FC = () => {
    const [imageUrls, setImageUrls] = useState<Record<IrisSpecies, string | null>>({
        [IrisSpecies.SETOSA]: null,
        [IrisSpecies.VERSICOLOR]: null,
        [IrisSpecies.VIRGINICA]: null,
    });

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const [setosaImg, versicolorImg, virginicaImg] = await Promise.all([
                    generateIrisImage(IrisSpecies.SETOSA),
                    generateIrisImage(IrisSpecies.VERSICOLOR),
                    generateIrisImage(IrisSpecies.VIRGINICA),
                ]);
                setImageUrls({
                    [IrisSpecies.SETOSA]: setosaImg,
                    [IrisSpecies.VERSICOLOR]: versicolorImg,
                    [IrisSpecies.VIRGINICA]: virginicaImg,
                });
            } catch (error) {
                console.error("Failed to generate iris images:", error);
            }
        };

        fetchImages();
    }, []);

  return (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-800 text-center lg:text-left">Meet the Species</h2>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {irisData.map((iris) => (
                 <IrisCard 
                    key={iris.species}
                    name={iris.name}
                    description={iris.description}
                    imageUrl={imageUrls[iris.species]}
                    colorClass={iris.colorClass}
                />
            ))}
        </div>
    </div>
  );
};
