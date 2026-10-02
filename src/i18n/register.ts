import { registerLocale } from "./content";
import { mr } from "./mr";
import { hi } from "./hi";

registerLocale("mr", () => mr);
registerLocale("hi", () => hi);
