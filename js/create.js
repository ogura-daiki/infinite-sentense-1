const assignListeners = (elem, name, listeners) => {
  listeners = [listeners].flat(2);
  for (const func of listeners) {
    elem.addEventListener(name, func);
  }
}
const camel2kebab = (s) => {
  return s.replace(/[A-Z]+(?![a-z])|[A-Z]/g, (all, ofs) => (ofs ? "-" : "") + all.toLowerCase())
}
const assignStyleOptions = (elem, styles) => {
  if (typeof styles === "string") {
    elem.style = styles;
  }
  else if (typeof styles[Symbol.iterator] === "function") {
    for (const style of styles) {
      assignListeners(elem, style);
    }
  }
  else if (typeof styles === "object") {
    for (const [key, value] of styles) {
      elem.style[camel2kebab(key)] = value;
    }
  }
}
const buildClassNames = (classes) => {
  if (typeof classes === "string") {
    return classes;
  }
  else if (typeof classes[Symbol.iterator] === "function") {
    const classNames = [];
    for (const className of classes) {
      classNames.push(buildClassName(className));
    }
    return classNames.join(" ");
  }
  else if (typeof classes === "object") {
    const classNames = [];
    for (const [key, value] of classes) {
      if (!!value) {
        classNames.push(key);
      }
    }
    return classNames.join(" ");
  }
  return "";
}

const assignClassList = (elem, classList) => {
  const classNames = buildClassNames(classList);
  elem.className = classNames.replaceAll(/\s+/g, " ");
}

const create = (name, options = {}) => {
  const elem = document.createElement(name);
  for (const [name, value] of Object.entries(options)) {
    if (name.startsWith("@")) {
      assignListeners(elem, name.slice(1), value);
    }
    else if (name === "style") {
      assignStyleOptions(elem, value);
    }
    else if (name === "classList") {
      assignClassList(elem, value)
    }
    else {
      elem[name] = value;
    }
  }
  return elem;
}

export { create };