
export enum IrisSpecies {
  SETOSA = 'setosa',
  VERSICOLOR = 'versicolor',
  VIRGINICA = 'virginica',
}

export interface IrisMeasurements {
  sepalLength: number;
  sepalWidth: number;
  petalLength: number;
  petalWidth: number;
}

export interface PredictionResponse {
  species: IrisSpecies;
}
