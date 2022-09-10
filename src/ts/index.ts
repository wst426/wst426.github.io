import { add } from "./fns";

const el = document.createElement("div");
el.innerText = `1 + 2 = ${add(1, 2)}`;

document.body.appendChild(el);