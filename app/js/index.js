import '../scss/styles.scss';

import firstModule from "./modules/firstModule";
import {secondModuleValue} from "./modules/secondModule";
import thirdModuleVar from "./modules/thirdModule";

const result = `${firstModule.name}: ${thirdModuleVar} and ${secondModuleValue}`
console.log(result)
