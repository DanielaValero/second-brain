got to configure package.json 

```
"main": "../../dist/libs/my-library/ui-component-library.es.js",
"module": "../../dist/libs/my-library/ui-component-library.es.js",
"types": "../../dist/libs/my-library/main.d.ts",

"exports": {
".": {

"import": "../../dist/libs/my-library/ui-component-library.es.js"

},

-> this is: when you do in the pacakge that implements the library. 
you tell it where to find the styles
import "styles" from "my-library/styles.css"
"./styles.css": {

"import": "../../dist/libs/my-library/styles.css"

}

},
```


You declare your components as usual, and export them like this:

```
import type { App } from 'vue';

//add components to export
import { BaseLayout } from "./components";

// add all css here.
import './styles/main.scss'

  
// not sure what is this for. Will test removing it
export default {
install: (app: App) => {
//@ts-ignore
app.component('BaseLayout', BaseLayout);
}
};  

export { BaseLayout };
```

In vite:

```
lib: {

entry: resolve(__dirname, 'src/main.ts'),

name: 'uiComponentLibrary',

formats: ["es"],

/**

* Name of the main import file that will be placed in

* the folder specified in project.json > "build"."options"."outputPath"

* That united with this needs to be added to module of package.json

* in this example: ../../dist/libs/my-library/ui-component-library.js

*/

fileName: (format) => `ui-component-library.${format}.js`,

},

rollupOptions: {

// make sure to externalize deps that shouldn't be bundled

// into your library

external: ['vue'],

output: {

assetFileNames: (assetInfo) => {
// this is to expose the css with the name of the library
if (assetInfo.name === 'main.css') return 'ui-component-library.css';

return assetInfo.name;

},

},

},

},
```


Then in the packate that consumes the library, in the main.ts

```
import { createApp } from 'vue';

import uiComponentLibrary from 'my-library'

  

import App from './App.vue';

// add this
import 'my-library/ui-component-library.css'

import router from './router';

  

const app = createApp(App);
// you have to do this
app.use(uiComponentLibrary)

app.use(router)

app.mount('#app');
```

Then you can use the components as usual