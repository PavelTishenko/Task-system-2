import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ChartDataService {
  emplData = {
    Kirill: null,
    Evgeniy: null,
    Timur: null,
    Evgeniykuz: null,
    Pavel: null
  };
  constructor() {}
}
