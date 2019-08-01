import GetKey from "../helpers/GetKey";

export function afterRegistration({ Vue, config, store, isServer }) {
  if (!isServer) {
    const appKey = GetKey();

    var e = document.createElement("script");
    (e.type = "text/javascript"),
      (e.async = true),
      (e.src = `//staticw2.yotpo.com/${appKey}/widget.js`);
    var t = document.getElementsByTagName("script")[0];
    t.parentNode.insertBefore(e, t);
  }
}
