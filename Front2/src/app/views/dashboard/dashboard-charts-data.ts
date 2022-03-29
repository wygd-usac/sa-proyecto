import { Injectable } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/utils/src';

export interface IChartProps {
  data?: any;
  labels?: any;
  options?: any;
  colors?: any;
  type?: any;
  legend?: any;

  [propName: string]: any;
}

@Injectable({
  providedIn: 'any'
})
export class DashboardChartsData {
  constructor() {

  }

}
