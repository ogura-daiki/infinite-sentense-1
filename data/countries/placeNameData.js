import { centralAfricanRepublic } from "./data/centralAfricanRepublic.js";
import { eswatini } from "./data/eswatini.js";
import { georgia } from "./data/georgia.js";
import { guinea } from "./data/guinea.js";
import { korea } from "./data/korea.js";
import { mali } from "./data/mali.js";
import { northKorea } from "./data/northKorea.js";
import { taiwanese } from "./data/taiwanese.js";
import { uzbekistan } from "./data/uzbekistan.js";
import { countryNames } from "./countryNames.js";

const list = [
  ...countryNames,
  ...korea,
  ...northKorea,
  ...taiwanese,
  ...georgia,
  ...mali, ...guinea, ...eswatini, ...centralAfricanRepublic,
  ...uzbekistan,
];

export { list as placeNameData };