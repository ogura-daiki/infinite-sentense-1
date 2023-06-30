const endpointURL = "https://script.google.com/macros/s/AKfycbxMQMgW48_NtqCOzvQ0JFo2D2rBmvsk8r1H5ju84v_kCls7x9_aujVHGDC8_sp5-XGM/exec";
const buildURL = (text, from = "zh", to = "ja") => {
  const url = new URL(endpointURL);
  url.searchParams.append("text", text);
  url.searchParams.append("from", from);
  url.searchParams.append("to", to);
  return url.toString();
}

const translate = (text) => {
  return fetch(buildURL(text)).then(r => r.text());
}

export { buildURL, translate };