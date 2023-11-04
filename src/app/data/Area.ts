import { CoordinatePoint } from './types';

class Area {
  northeast: CoordinatePoint;
  southwest: CoordinatePoint;
  area: number;
  name: string;
  description: string;
  id: number;

  constructor(northeast: CoordinatePoint, southwest: CoordinatePoint, area: number, name = '', description = '') {
    this.northeast = northeast;
    this.southwest = southwest;
    this.area = area;
    this.name = name;
    this.description = description;
    this.id = this.generateRandomId();
  }

  setName(name: string) {
    this.name = name;
  }

  setDescription(description: string) {
    this.description = description;
  }

  generateRandomId() {
    return Math.floor(Math.random() * 1000000) + 1;
  }
}

export default Area;
