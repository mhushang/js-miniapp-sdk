const ge = (t, e) => t + e;
/*! Capacitor: https://capacitorjs.com/ - MIT License */
const ee = (t) => {
  const e = /* @__PURE__ */ new Map();
  e.set("web", { name: "web" });
  const r = t.CapacitorPlatforms || {
    currentPlatform: { name: "web" },
    platforms: e
  }, i = (n, a) => {
    r.platforms.set(n, a);
  }, s = (n) => {
    r.platforms.has(n) && (r.currentPlatform = r.platforms.get(n));
  };
  return r.addPlatform = i, r.setPlatform = s, r;
}, te = (t) => t.CapacitorPlatforms = ee(t), D = /* @__PURE__ */ te(typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
D.addPlatform;
D.setPlatform;
var k;
(function(t) {
  t.Unimplemented = "UNIMPLEMENTED", t.Unavailable = "UNAVAILABLE";
})(k || (k = {}));
class S extends Error {
  constructor(e, r, i) {
    super(e), this.message = e, this.code = r, this.data = i;
  }
}
const re = (t) => {
  var e, r;
  return t != null && t.androidBridge ? "android" : !((r = (e = t == null ? void 0 : t.webkit) === null || e === void 0 ? void 0 : e.messageHandlers) === null || r === void 0) && r.bridge ? "ios" : "web";
}, se = (t) => {
  var e, r, i, s, n;
  const a = t.CapacitorCustomPlatform || null, o = t.Capacitor || {}, f = o.Plugins = o.Plugins || {}, c = t.CapacitorPlatforms, O = () => a !== null ? a.name : re(t), v = ((e = c == null ? void 0 : c.currentPlatform) === null || e === void 0 ? void 0 : e.getPlatform) || O, j = () => v() !== "web", G = ((r = c == null ? void 0 : c.currentPlatform) === null || r === void 0 ? void 0 : r.isNativePlatform) || j, z = (l) => {
    const d = x.get(l);
    return !!(d != null && d.platforms.has(v()) || H(l));
  }, F = ((i = c == null ? void 0 : c.currentPlatform) === null || i === void 0 ? void 0 : i.isPluginAvailable) || z, K = (l) => {
    var d;
    return (d = o.PluginHeaders) === null || d === void 0 ? void 0 : d.find((y) => y.name === l);
  }, H = ((s = c == null ? void 0 : c.currentPlatform) === null || s === void 0 ? void 0 : s.getPluginHeader) || K, V = (l) => t.console.error(l), J = (l, d, y) => Promise.reject(`${y} does not have an implementation of "${d}".`), x = /* @__PURE__ */ new Map(), N = (l, d = {}) => {
    const y = x.get(l);
    if (y)
      return console.warn(`Capacitor plugin "${l}" already registered. Cannot register plugins twice.`), y.proxy;
    const w = v(), C = H(l);
    let P;
    const X = async () => (!P && w in d ? P = typeof d[w] == "function" ? P = await d[w]() : P = d[w] : a !== null && !P && "web" in d && (P = typeof d.web == "function" ? P = await d.web() : P = d.web), P), Y = (u, b) => {
      var h, g;
      if (C) {
        const p = C == null ? void 0 : C.methods.find((m) => b === m.name);
        if (p)
          return p.rtype === "promise" ? (m) => o.nativePromise(l, b.toString(), m) : (m, E) => o.nativeCallback(l, b.toString(), m, E);
        if (u)
          return (h = u[b]) === null || h === void 0 ? void 0 : h.bind(u);
      } else {
        if (u)
          return (g = u[b]) === null || g === void 0 ? void 0 : g.bind(u);
        throw new S(`"${l}" plugin is not implemented on ${w}`, k.Unimplemented);
      }
    }, U = (u) => {
      let b;
      const h = (...g) => {
        const p = X().then((m) => {
          const E = Y(m, u);
          if (E) {
            const _ = E(...g);
            return b = _ == null ? void 0 : _.remove, _;
          } else
            throw new S(`"${l}.${u}()" is not implemented on ${w}`, k.Unimplemented);
        });
        return u === "addListener" && (p.remove = async () => b()), p;
      };
      return h.toString = () => `${u.toString()}() { [capacitor code] }`, Object.defineProperty(h, "name", {
        value: u,
        writable: !1,
        configurable: !1
      }), h;
    }, I = U("addListener"), M = U("removeListener"), Z = (u, b) => {
      const h = I({ eventName: u }, b), g = async () => {
        const m = await h;
        M({
          eventName: u,
          callbackId: m
        }, b);
      }, p = new Promise((m) => h.then(() => m({ remove: g })));
      return p.remove = async () => {
        console.warn("Using addListener() without 'await' is deprecated."), await g();
      }, p;
    }, A = new Proxy({}, {
      get(u, b) {
        switch (b) {
          case "$$typeof":
            return;
          case "toJSON":
            return () => ({});
          case "addListener":
            return C ? Z : I;
          case "removeListener":
            return M;
          default:
            return U(b);
        }
      }
    });
    return f[l] = A, x.set(l, {
      name: l,
      proxy: A,
      platforms: /* @__PURE__ */ new Set([
        ...Object.keys(d),
        ...C ? [w] : []
      ])
    }), A;
  }, Q = ((n = c == null ? void 0 : c.currentPlatform) === null || n === void 0 ? void 0 : n.registerPlugin) || N;
  return o.convertFileSrc || (o.convertFileSrc = (l) => l), o.getPlatform = v, o.handleError = V, o.isNativePlatform = G, o.isPluginAvailable = F, o.pluginMethodNoop = J, o.registerPlugin = Q, o.Exception = S, o.DEBUG = !!o.DEBUG, o.isLoggingEnabled = !!o.isLoggingEnabled, o.platform = o.getPlatform(), o.isNative = o.isNativePlatform(), o;
}, ne = (t) => t.Capacitor = se(t), $ = /* @__PURE__ */ ne(typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {}), T = $.registerPlugin, L = $.Plugins;
class W {
  constructor(e) {
    this.listeners = {}, this.windowListeners = {}, e && (console.warn(`Capacitor WebPlugin "${e.name}" config object was deprecated in v3 and will be removed in v4.`), this.config = e);
  }
  addListener(e, r) {
    this.listeners[e] || (this.listeners[e] = []), this.listeners[e].push(r);
    const s = this.windowListeners[e];
    s && !s.registered && this.addWindowListener(s);
    const n = async () => this.removeListener(e, r), a = Promise.resolve({ remove: n });
    return Object.defineProperty(a, "remove", {
      value: async () => {
        console.warn("Using addListener() without 'await' is deprecated."), await n();
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
    i && i.forEach((s) => s(r));
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
    return new $.Exception(e, k.Unimplemented);
  }
  unavailable(e = "not available") {
    return new $.Exception(e, k.Unavailable);
  }
  async removeListener(e, r) {
    const i = this.listeners[e];
    if (!i)
      return;
    const s = i.indexOf(r);
    this.listeners[e].splice(s, 1), this.listeners[e].length || this.removeWindowListener(this.windowListeners[e]);
  }
  addWindowListener(e) {
    window.addEventListener(e.windowEventName, e.handler), e.registered = !0;
  }
  removeWindowListener(e) {
    !e || (window.removeEventListener(e.windowEventName, e.handler), e.registered = !1);
  }
}
const R = (t) => encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape), q = (t) => t.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
class oe extends W {
  async getCookies() {
    const e = document.cookie, r = {};
    return e.split(";").forEach((i) => {
      if (i.length <= 0)
        return;
      let [s, n] = i.replace(/=/, "CAP_COOKIE").split("CAP_COOKIE");
      s = q(s).trim(), n = q(n).trim(), r[s] = n;
    }), r;
  }
  async setCookie(e) {
    try {
      const r = R(e.key), i = R(e.value), s = `; expires=${(e.expires || "").replace("expires=", "")}`, n = (e.path || "/").replace("path=", ""), a = e.url != null && e.url.length > 0 ? `domain=${e.url}` : "";
      document.cookie = `${r}=${i || ""}${s}; path=${n}; ${a};`;
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
    const s = i.result;
    e(s.indexOf(",") >= 0 ? s.split(",")[1] : s);
  }, i.onerror = (s) => r(s), i.readAsDataURL(t);
}), ae = (t = {}) => {
  const e = Object.keys(t);
  return Object.keys(t).map((s) => s.toLocaleLowerCase()).reduce((s, n, a) => (s[n] = t[e[a]], s), {});
}, ce = (t, e = !0) => t ? Object.entries(t).reduce((i, s) => {
  const [n, a] = s;
  let o, f;
  return Array.isArray(a) ? (f = "", a.forEach((c) => {
    o = e ? encodeURIComponent(c) : c, f += `${n}=${o}&`;
  }), f.slice(0, -1)) : (o = e ? encodeURIComponent(a) : a, f = `${n}=${o}`), `${i}&${f}`;
}, "").substr(1) : null, le = (t, e = {}) => {
  const r = Object.assign({ method: t.method || "GET", headers: t.headers }, e), s = ae(t.headers)["content-type"] || "";
  if (typeof t.data == "string")
    r.body = t.data;
  else if (s.includes("application/x-www-form-urlencoded")) {
    const n = new URLSearchParams();
    for (const [a, o] of Object.entries(t.data || {}))
      n.set(a, o);
    r.body = n.toString();
  } else if (s.includes("multipart/form-data")) {
    const n = new FormData();
    if (t.data instanceof FormData)
      t.data.forEach((o, f) => {
        n.append(f, o);
      });
    else
      for (const o of Object.keys(t.data))
        n.append(o, t.data[o]);
    r.body = n;
    const a = new Headers(r.headers);
    a.delete("content-type"), r.headers = a;
  } else
    (s.includes("application/json") || typeof t.data == "object") && (r.body = JSON.stringify(t.data));
  return r;
};
class de extends W {
  async request(e) {
    const r = le(e, e.webFetchExtra), i = ce(e.params, e.shouldEncodeUrlParams), s = i ? `${e.url}?${i}` : e.url, n = await fetch(s, r), a = n.headers.get("content-type") || "";
    let { responseType: o = "text" } = n.ok ? e : {};
    a.includes("application/json") && (o = "json");
    let f, c;
    switch (o) {
      case "arraybuffer":
      case "blob":
        c = await n.blob(), f = await ie(c);
        break;
      case "json":
        f = await n.json();
        break;
      case "document":
      case "text":
      default:
        f = await n.text();
    }
    const O = {};
    return n.headers.forEach((v, j) => {
      O[j] = v;
    }), {
      data: f,
      headers: O,
      status: n.status,
      url: n.url
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
const B = T("Portals", {
  web: () => Promise.resolve().then(function() {
    return fe;
  }).then((t) => new t.PortalsWeb()),
  android: () => Promise.resolve().then(function() {
    return me;
  }).then((t) => new t.PortalsAndroid()),
  ios: () => Promise.resolve().then(function() {
    return Pe;
  }).then((t) => new t.PortalsIOS())
});
class ue extends W {
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
const fe = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  PortalsWeb: ue
});
class be {
  async publish(e) {
    return L.Portals.publishNative(e);
  }
  async subscribe(e, r) {
    return new Promise((i) => {
      let s = !1;
      L.Portals.subscribeNative(e, (n) => {
        s ? r(n) : (i(n), s = !0);
      });
    });
  }
  async unsubscribe(e) {
    return L.Portals.unsubscribeNative(e);
  }
}
const me = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  PortalsAndroid: be
});
class he {
  async publish(e) {
    return L.Portals.publishNative(e);
  }
  async subscribe(e, r) {
    return new Promise((i) => {
      let s = !1;
      L.Portals.subscribeNative(e, (n) => {
        s ? r(n) : (i(n), s = !0);
      });
    });
  }
  async unsubscribe(e) {
    return L.Portals.unsubscribeNative(e);
  }
}
const Pe = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  PortalsIOS: he
}), pe = () => B.publish({ topic: "check", data: "success" }), we = async (t, e) => await B.subscribe({ topic: t }, e);
export {
  pe as publishCheck,
  we as subscribeCheck,
  ge as sum
};
