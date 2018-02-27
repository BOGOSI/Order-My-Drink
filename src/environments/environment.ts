// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
    // Initialize Firebase
      firebase: {
      apiKey: "AIzaSyALdpQjPL0UkdhMHyH-0CFsVJIBtbl-eS8",
      authDomain: "coffeeisorder.firebaseapp.com",
      databaseURL: "https://coffeeisorder.firebaseio.com",
      projectId: "coffeeisorder",
      storageBucket: "coffeeisorder.appspot.com",
      messagingSenderId: "291015417106"
    }
};
