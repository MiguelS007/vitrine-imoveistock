import { Injectable } from "@angular/core";
import { getDistance } from 'geolib';

@Injectable({
    providedIn: 'root'
})
export class GeocodeService {

    constructor(
    ) { }

     getDistanceInKm(coord1: google.maps.LatLngLiteral , coord2: google.maps.LatLngLiteral ) {

        const result = getDistance(
            { latitude: coord1.lat, longitude: coord1.lng },
            { latitude: coord2.lat, longitude: coord2.lng },
        )

        return result / 1000;
    }
}