// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  payloadKey: '57b0e476-142c-4762-8547-140b65cb1e9c',
  apis: {

  // imoveistock: 'https://imoveistock-prod.tgtdigital.io/',
  imoveistock: 'http://localhost:5000/',

  },
  google: {
    apiKey: 'AIzaSyBzwijvQ13DZALYBwC-uKdWWELaf0r9Xzs',
    map: {
      center: {

        //Curitiba
        lat: -25.439192,
        lng: -49.274468,

        //são Paulo
        // lat:-23.6813532,
        // lng: -47.1697154,

        //Brasilia
        // lat: -15.7929188,
        // lng: -47.8970312,
      }
    }
  }
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
