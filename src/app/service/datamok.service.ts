import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatamokService {
  // MODA-LOGIN 
  private subject = new Subject<any>();
  bot: any;

  opModalLogin() {
    this.subject.next('');
  }

  getopModalLogin(): Observable<any> {
    return this.subject.asObservable();
  }
  // DETAILS-PROPERTY

  onlypreview = [
    {
      preview: '../../../assets/img/preview3.png',
    },
  ];
  imagespreview = [
    {
      previews: '../../../assets/img/preview1.png',
    },
    {
      previews: '../../../assets/img/preview4.png',
    },
    {
      previews: '../../../assets/img/preview2.png',
    },
    {
      previews: '../../../assets/img/preview5.png',
    },
  ];
  // SEARCH-PAGE
  exclusiveProperties = [
    {
      value: '2,000',
      rent: 'Alugar',
      exclusive: 'Exclusivo',
      bgproduct: '../../../assets/img/ap.png',
      nameproperty: 'Cobertura com uma vista incrível'
    },
    {
      value: '2,000',
      rent: 'Alugar',
      exclusive: 'Exclusivo',
      bgproduct: '../../../assets/img/ap.png',
      nameproperty: 'Cobertura com uma vista incrível'
    }
  ];
  resultSearch = [
    {
      type: 'Apartamento',
      bgproduct: '../../../assets/img/ap.png',
      nameproperty: 'Cobertura com uma vista incrível',
      local: 'Rua Estados Unidos 1987, Curitiba - PR',
      rooms: '4',
      sold: 'Venda',
      exclusive: 'Exclusivo',
      vacancies: '2',
      price: '222,000',
      metrics: '199',
      picface: '../../../assets/img/guy.png',
      nameface: 'Rafael Santos'
    },
    {
      type: 'Apartamento',
      bgproduct: '../../../assets/img/ap.png',
      nameproperty: 'Cobertura com uma vista incrível',
      local: 'Rua Estados Unidos 1987, Curitiba - PR',
      rooms: '4',
      sold: 'Venda',
      exclusive: 'Exclusivo',
      vacancies: '2',
      price: '222,000',
      metrics: '199',
      picface: '../../../assets/img/guy.png',
      nameface: 'Rafael Santos'
    },
    {
      type: 'Apartamento',
      bgproduct: '../../../assets/img/ap.png',
      nameproperty: 'Cobertura com uma vista incrível',
      local: 'Rua Estados Unidos 1987, Curitiba - PR',
      rooms: '4',
      sold: 'Venda',
      exclusive: 'Exclusivo',
      vacancies: '2',
      price: '222,000',
      metrics: '199',
      picface: '../../../assets/img/guy.png',
      nameface: 'Rafael Santos'
    },
    {
      type: 'Apartamento',
      bgproduct: '../../../assets/img/ap.png',
      nameproperty: 'Cobertura com uma vista incrível',
      local: 'Rua Estados Unidos 1987, Curitiba - PR',
      rooms: '4',
      sold: 'Venda',
      exclusive: 'Exclusivo',
      vacancies: '2',
      price: '222,000',
      metrics: '199',
      picface: '../../../assets/img/guy.png',
      nameface: 'Rafael Santos'
    },
    {
      type: 'Apartamento',
      bgproduct: '../../../assets/img/ap.png',
      nameproperty: 'Cobertura com uma vista incrível',
      local: 'Rua Estados Unidos 1987, Curitiba - PR',
      rooms: '4',
      sold: 'Venda',
      exclusive: 'Exclusivo',
      vacancies: '2',
      price: '222,000',
      metrics: '199',
      picface: '../../../assets/img/guy.png',
      nameface: 'Rafael Santos'
    },
    {
      type: 'Apartamento',
      bgproduct: '../../../assets/img/ap.png',
      nameproperty: 'Cobertura com uma vista incrível',
      local: 'Rua Estados Unidos 1987, Curitiba - PR',
      rooms: '4',
      sold: 'Venda',
      exclusive: 'Exclusivo',
      vacancies: '2',
      price: '222,000',
      metrics: '199',
      picface: '../../../assets/img/guy.png',
      nameface: 'Rafael Santos'
    },
    {
      type: 'Apartamento',
      bgproduct: '../../../assets/img/ap.png',
      nameproperty: 'Cobertura com uma vista incrível',
      local: 'Rua Estados Unidos 1987, Curitiba - PR',
      rooms: '4',
      sold: 'Venda',
      exclusive: 'Exclusivo',
      vacancies: '2',
      price: '222,000',
      metrics: '199',
      picface: '../../../assets/img/guy.png',
      nameface: 'Rafael Santos'
    },
    {
      type: 'Apartamento',
      bgproduct: '../../../assets/img/ap.png',
      nameproperty: 'Cobertura com uma vista incrível',
      local: 'Rua Estados Unidos 1987, Curitiba - PR',
      rooms: '4',
      sold: 'Venda',
      exclusive: 'Exclusivo',
      vacancies: '2',
      price: '222,000',
      metrics: '199',
      picface: '../../../assets/img/guy.png',
      nameface: 'Rafael Santos'
    },
    {
      type: 'Apartamento',
      bgproduct: '../../../assets/img/ap.png',
      nameproperty: 'Cobertura com uma vista incrível',
      local: 'Rua Estados Unidos 1987, Curitiba - PR',
      rooms: '4',
      sold: 'Venda',
      exclusive: 'Exclusivo',
      vacancies: '2',
      price: '222,000',
      metrics: '199',
      picface: '../../../assets/img/guy.png',
      nameface: 'Rafael Santos'
    },
    {
      type: 'Apartamento',
      bgproduct: '../../../assets/img/ap.png',
      nameproperty: 'Cobertura com uma vista incrível',
      local: 'Rua Estados Unidos 1987, Curitiba - PR',
      rooms: '4',
      sold: 'Venda',
      exclusive: 'Exclusivo',
      vacancies: '2',
      price: '222,000',
      metrics: '199',
      picface: '../../../assets/img/guy.png',
      nameface: 'Rafael Santos'
    },
    {
      type: 'Apartamento',
      bgproduct: '../../../assets/img/ap.png',
      nameproperty: 'Cobertura com uma vista incrível',
      local: 'Rua Estados Unidos 1987, Curitiba - PR',
      rooms: '4',
      sold: 'Venda',
      exclusive: 'Exclusivo',
      vacancies: '2',
      price: '222,000',
      metrics: '199',
      picface: '../../../assets/img/guy.png',
      nameface: 'Rafael Santos'
    },

  ];
}
