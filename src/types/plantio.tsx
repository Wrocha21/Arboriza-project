export interface Plantio {
  id: string;
  lat: number;
  lng: number;
  especie: string;
  desc?: string;
  quantidade: number | string;
  date: string;
  responsavel: string;
}
