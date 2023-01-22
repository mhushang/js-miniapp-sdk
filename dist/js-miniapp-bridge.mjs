/*! Capacitor: https://capacitorjs.com/ - MIT License */
const ee = (t) => {
  const e = /* @__PURE__ */ new Map();
  e.set("web", { name: "web" });
  const r = t.CapacitorPlatforms || {
    currentPlatform: { name: "web" },
    platforms: e
  }, i = (s, a) => {
    r.platforms.set(s, a);
  }, n = (s) => {
    r.platforms.has(s) && (r.currentPlatform = r.platforms.get(s));
  };
  return r.addPlatform = i, r.setPlatform = n, r;
}, te = (t) => t.CapacitorPlatforms = ee(t), G = /* @__PURE__ */ te(typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
G.addPlatform;
G.setPlatform;
var O;
(function(t) {
  t.Unimplemented = "UNIMPLEMENTED", t.Unavailable = "UNAVAILABLE";
})(O || (O = {}));
class S extends Error {
  constructor(e, r, i) {
    super(e), this.message = e, this.code = r, this.data = i;
  }
}
const re = (t) => {
  var e, r;
  return t != null && t.androidBridge ? "android" : !((r = (e = t == null ? void 0 : t.webkit) === null || e === void 0 ? void 0 : e.messageHandlers) === null || r === void 0) && r.bridge ? "ios" : "web";
}, ne = (t) => {
  var e, r, i, n, s;
  const a = t.CapacitorCustomPlatform || null, o = t.Capacitor || {}, f = o.Plugins = o.Plugins || {}, l = t.CapacitorPlatforms, k = () => a !== null ? a.name : re(t), v = ((e = l == null ? void 0 : l.currentPlatform) === null || e === void 0 ? void 0 : e.getPlatform) || k, $ = () => v() !== "web", B = ((r = l == null ? void 0 : l.currentPlatform) === null || r === void 0 ? void 0 : r.isNativePlatform) || $, z = (c) => {
    const d = j.get(c);
    return !!(d != null && d.platforms.has(v()) || W(c));
  }, F = ((i = l == null ? void 0 : l.currentPlatform) === null || i === void 0 ? void 0 : i.isPluginAvailable) || z, K = (c) => {
    var d;
    return (d = o.PluginHeaders) === null || d === void 0 ? void 0 : d.find((y) => y.name === c);
  }, W = ((n = l == null ? void 0 : l.currentPlatform) === null || n === void 0 ? void 0 : n.getPluginHeader) || K, V = (c) => t.console.error(c), J = (c, d, y) => Promise.reject(`${y} does not have an implementation of "${d}".`), j = /* @__PURE__ */ new Map(), N = (c, d = {}) => {
    const y = j.get(c);
    if (y)
      return console.warn(`Capacitor plugin "${c}" already registered. Cannot register plugins twice.`), y.proxy;
    const w = v(), C = W(c);
    let P;
    const X = async () => (!P && w in d ? P = typeof d[w] == "function" ? P = await d[w]() : P = d[w] : a !== null && !P && "web" in d && (P = typeof d.web == "function" ? P = await d.web() : P = d.web), P), Y = (u, b) => {
      var g, h;
      if (C) {
        const p = C == null ? void 0 : C.methods.find((m) => b === m.name);
        if (p)
          return p.rtype === "promise" ? (m) => o.nativePromise(c, b.toString(), m) : (m, E) => o.nativeCallback(c, b.toString(), m, E);
        if (u)
          return (g = u[b]) === null || g === void 0 ? void 0 : g.bind(u);
      } else {
        if (u)
          return (h = u[b]) === null || h === void 0 ? void 0 : h.bind(u);
        throw new S(`"${c}" plugin is not implemented on ${w}`, O.Unimplemented);
      }
    }, U = (u) => {
      let b;
      const g = (...h) => {
        const p = X().then((m) => {
          const E = Y(m, u);
          if (E) {
            const _ = E(...h);
            return b = _ == null ? void 0 : _.remove, _;
          } else
            throw new S(`"${c}.${u}()" is not implemented on ${w}`, O.Unimplemented);
        });
        return u === "addListener" && (p.remove = async () => b()), p;
      };
      return g.toString = () => `${u.toString()}() { [capacitor code] }`, Object.defineProperty(g, "name", {
        value: u,
        writable: !1,
        configurable: !1
      }), g;
    }, H = U("addListener"), R = U("removeListener"), Z = (u, b) => {
      const g = H({ eventName: u }, b), h = async () => {
        const m = await g;
        R({
          eventName: u,
          callbackId: m
        }, b);
      }, p = new Promise((m) => g.then(() => m({ remove: h })));
      return p.remove = async () => {
        console.warn("Using addListener() without 'await' is deprecated."), await h();
      }, p;
    }, A = new Proxy({}, {
      get(u, b) {
        switch (b) {
          case "$$typeof":
            return;
          case "toJSON":
            return () => ({});
          case "addListener":
            return C ? Z : H;
          case "removeListener":
            return R;
          default:
            return U(b);
        }
      }
    });
    return f[c] = A, j.set(c, {
      name: c,
      proxy: A,
      platforms: /* @__PURE__ */ new Set([
        ...Object.keys(d),
        ...C ? [w] : []
      ])
    }), A;
  }, Q = ((s = l == null ? void 0 : l.currentPlatform) === null || s === void 0 ? void 0 : s.registerPlugin) || N;
  return o.convertFileSrc || (o.convertFileSrc = (c) => c), o.getPlatform = v, o.handleError = V, o.isNativePlatform = B, o.isPluginAvailable = F, o.pluginMethodNoop = J, o.registerPlugin = Q, o.Exception = S, o.DEBUG = !!o.DEBUG, o.isLoggingEnabled = !!o.isLoggingEnabled, o.platform = o.getPlatform(), o.isNative = o.isNativePlatform(), o;
}, se = (t) => t.Capacitor = ne(t), x = /* @__PURE__ */ se(typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {}), T = x.registerPlugin, L = x.Plugins;
class I {
  constructor(e) {
    this.listeners = {}, this.windowListeners = {}, e && (console.warn(`Capacitor WebPlugin "${e.name}" config object was deprecated in v3 and will be removed in v4.`), this.config = e);
  }
  addListener(e, r) {
    this.listeners[e] || (this.listeners[e] = []), this.listeners[e].push(r);
    const n = this.windowListeners[e];
    n && !n.registered && this.addWindowListener(n);
    const s = async () => this.removeListener(e, r), a = Promise.resolve({ remove: s });
    return Object.defineProperty(a, "remove", {
      value: async () => {
        console.warn("Using addListener() without 'await' is deprecated."), await s();
      }
    }), a;
  }
  async removeAllListeners() {
    this.listeners = {};
    for (const e in this.windowListeners)
      this.removeWindowListener(this.windowListeners[e]);
    this.windowListeners = {};
  }
  notifyListeners(e, r) {
    const i = this.listeners[e];
    i && i.forEach((n) => n(r));
  }
  hasListeners(e) {
    return !!this.listeners[e].length;
  }
  registerWindowListener(e, r) {
    this.windowListeners[r] = {
      registered: !1,
      windowEventName: e,
      pluginEventName: r,
      handler: (i) => {
        this.notifyListeners(r, i);
      }
    };
  }
  unimplemented(e = "not implemented") {
    return new x.Exception(e, O.Unimplemented);
  }
  unavailable(e = "not available") {
    return new x.Exception(e, O.Unavailable);
  }
  async removeListener(e, r) {
    const i = this.listeners[e];
    if (!i)
      return;
    const n = i.indexOf(r);
    this.listeners[e].splice(n, 1), this.listeners[e].length || this.removeWindowListener(this.windowListeners[e]);
  }
  addWindowListener(e) {
    window.addEventListener(e.windowEventName, e.handler), e.registered = !0;
  }
  removeWindowListener(e) {
    !e || (window.removeEventListener(e.windowEventName, e.handler), e.registered = !1);
  }
}
const q = (t) => encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape), D = (t) => t.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
class oe extends I {
  async getCookies() {
    const e = document.cookie, r = {};
    return e.split(";").forEach((i) => {
      if (i.length <= 0)
        return;
      let [n, s] = i.replace(/=/, "CAP_COOKIE").split("CAP_COOKIE");
      n = D(n).trim(), s = D(s).trim(), r[n] = s;
    }), r;
  }
  async setCookie(e) {
    try {
      const r = q(e.key), i = q(e.value), n = `; expires=${(e.expires || "").replace("expires=", "")}`, s = (e.path || "/").replace("path=", ""), a = e.url != null && e.url.length > 0 ? `domain=${e.url}` : "";
      document.cookie = `${r}=${i || ""}${n}; path=${s}; ${a};`;
    } catch (r) {
      return Promise.reject(r);
    }
  }
  async deleteCookie(e) {
    try {
      document.cookie = `${e.key}=; Max-Age=0`;
    } catch (r) {
      return Promise.reject(r);
    }
  }
  async clearCookies() {
    try {
      const e = document.cookie.split(";") || [];
      for (const r of e)
        document.cookie = r.replace(/^ +/, "").replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  async clearAllCookies() {
    try {
      await this.clearCookies();
    } catch (e) {
      return Promise.reject(e);
    }
  }
}
T("CapacitorCookies", {
  web: () => new oe()
});
const ie = async (t) => new Promise((e, r) => {
  const i = new FileReader();
  i.onload = () => {
    const n = i.result;
    e(n.indexOf(",") >= 0 ? n.split(",")[1] : n);
  }, i.onerror = (n) => r(n), i.readAsDataURL(t);
}), ae = (t = {}) => {
  const e = Object.keys(t);
  return Object.keys(t).map((n) => n.toLocaleLowerCase()).reduce((n, s, a) => (n[s] = t[e[a]], n), {});
}, le = (t, e = !0) => t ? Object.entries(t).reduce((i, n) => {
  const [s, a] = n;
  let o, f;
  return Array.isArray(a) ? (f = "", a.forEach((l) => {
    o = e ? encodeURIComponent(l) : l, f += `${s}=${o}&`;
  }), f.slice(0, -1)) : (o = e ? encodeURIComponent(a) : a, f = `${s}=${o}`), `${i}&${f}`;
}, "").substr(1) : null, ce = (t, e = {}) => {
  const r = Object.assign({ method: t.method || "GET", headers: t.headers }, e), n = ae(t.headers)["content-type"] || "";
  if (typeof t.data == "string")
    r.body = t.data;
  else if (n.includes("application/x-www-form-urlencoded")) {
    const s = new URLSearchParams();
    for (const [a, o] of Object.entries(t.data || {}))
      s.set(a, o);
    r.body = s.toString();
  } else if (n.includes("multipart/form-data")) {
    const s = new FormData();
    if (t.data instanceof FormData)
      t.data.forEach((o, f) => {
        s.append(f, o);
      });
    else
      for (const o of Object.keys(t.data))
        s.append(o, t.data[o]);
    r.body = s;
    const a = new Headers(r.headers);
    a.delete("content-type"), r.headers = a;
  } else
    (n.includes("application/json") || typeof t.data == "object") && (r.body = JSON.stringify(t.data));
  return r;
};
class de extends I {
  async request(e) {
    const r = ce(e, e.webFetchExtra), i = le(e.params, e.shouldEncodeUrlParams), n = i ? `${e.url}?${i}` : e.url, s = await fetch(n, r), a = s.headers.get("content-type") || "";
    let { responseType: o = "text" } = s.ok ? e : {};
    a.includes("application/json") && (o = "json");
    let f, l;
    switch (o) {
      case "arraybuffer":
      case "blob":
        l = await s.blob(), f = await ie(l);
        break;
      case "json":
        f = await s.json();
        break;
      case "document":
      case "text":
      default:
        f = await s.text();
    }
    const k = {};
    return s.headers.forEach((v, $) => {
      k[$] = v;
    }), {
      data: f,
      headers: k,
      status: s.status,
      url: s.url
    };
  }
  async get(e) {
    return this.request(Object.assign(Object.assign({}, e), { method: "GET" }));
  }
  async post(e) {
    return this.request(Object.assign(Object.assign({}, e), { method: "POST" }));
  }
  async put(e) {
    return this.request(Object.assign(Object.assign({}, e), { method: "PUT" }));
  }
  async patch(e) {
    return this.request(Object.assign(Object.assign({}, e), { method: "PATCH" }));
  }
  async delete(e) {
    return this.request(Object.assign(Object.assign({}, e), { method: "DELETE" }));
  }
}
T("CapacitorHttp", {
  web: () => new de()
});
/*! Ionic Portals: https://ionic.io/portals - Commercial License */
const M = T("Portals", {
  web: () => Promise.resolve().then(function() {
    return be;
  }).then((t) => new t.PortalsWeb()),
  android: () => Promise.resolve().then(function() {
    return ge;
  }).then((t) => new t.PortalsAndroid()),
  ios: () => Promise.resolve().then(function() {
    return he;
  }).then((t) => new t.PortalsIOS())
});
function ue() {
  return window.portalInitialContext;
}
class fe extends I {
  async publish(e) {
  }
  async subscribe(e, r) {
    return {
      subscriptionRef: -0,
      topic: ""
    };
  }
  async unsubscribe(e) {
  }
}
const be = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  PortalsWeb: fe
});
class me {
  async publish(e) {
    return L.Portals.publishNative(e);
  }
  async subscribe(e, r) {
    return new Promise((i) => {
      let n = !1;
      L.Portals.subscribeNative(e, (s) => {
        n ? r(s) : (i(s), n = !0);
      });
    });
  }
  async unsubscribe(e) {
    return L.Portals.unsubscribeNative(e);
  }
}
const ge = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  PortalsAndroid: me
});
class Pe {
  async publish(e) {
    return L.Portals.publishNative(e);
  }
  async subscribe(e, r) {
    return new Promise((i) => {
      let n = !1;
      L.Portals.subscribeNative(e, (s) => {
        n ? r(s) : (i(s), n = !0);
      });
    });
  }
  async unsubscribe(e) {
    return L.Portals.unsubscribeNative(e);
  }
}
const he = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  PortalsIOS: Pe
}), pe = async (t) => {
  const { topic: e, data: r } = t;
  return M.publish({ topic: e, data: r });
}, we = async (t, e) => M.subscribe(t, e), ve = async (t) => M.unsubscribe(t), ye = () => ue();
export {
  ye as GetInitialContext,
  pe as SendMessage,
  we as SubscribeToMessage,
  ve as UnsubscribeToMessage
};
