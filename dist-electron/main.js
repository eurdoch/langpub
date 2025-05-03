import { app as be, BrowserWindow as Ct, ipcMain as De, dialog as nn, net as rn } from "electron";
import { fileURLToPath as on } from "node:url";
import z from "node:path";
import xe from "node:fs";
import sn from "fs";
import qe from "path";
import Tt from "zlib";
import an from "crypto";
function fn(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ge = { exports: {} }, St = {
  /* The local file header */
  LOCHDR: 30,
  // LOC header size
  LOCSIG: 67324752,
  // "PK\003\004"
  LOCVER: 4,
  // version needed to extract
  LOCFLG: 6,
  // general purpose bit flag
  LOCHOW: 8,
  // compression method
  LOCTIM: 10,
  // modification time (2 bytes time, 2 bytes date)
  LOCCRC: 14,
  // uncompressed file crc-32 value
  LOCSIZ: 18,
  // compressed size
  LOCLEN: 22,
  // uncompressed size
  LOCNAM: 26,
  // filename length
  LOCEXT: 28,
  // extra field length
  /* The Data descriptor */
  EXTSIG: 134695760,
  // "PK\007\008"
  EXTHDR: 16,
  // EXT header size
  EXTCRC: 4,
  // uncompressed file crc-32 value
  EXTSIZ: 8,
  // compressed size
  EXTLEN: 12,
  // uncompressed size
  /* The central directory file header */
  CENHDR: 46,
  // CEN header size
  CENSIG: 33639248,
  // "PK\001\002"
  CENVEM: 4,
  // version made by
  CENVER: 6,
  // version needed to extract
  CENFLG: 8,
  // encrypt, decrypt flags
  CENHOW: 10,
  // compression method
  CENTIM: 12,
  // modification time (2 bytes time, 2 bytes date)
  CENCRC: 16,
  // uncompressed file crc-32 value
  CENSIZ: 20,
  // compressed size
  CENLEN: 24,
  // uncompressed size
  CENNAM: 28,
  // filename length
  CENEXT: 30,
  // extra field length
  CENCOM: 32,
  // file comment length
  CENDSK: 34,
  // volume number start
  CENATT: 36,
  // internal file attributes
  CENATX: 38,
  // external file attributes (host system dependent)
  CENOFF: 42,
  // LOC header offset
  /* The entries in the end of central directory */
  ENDHDR: 22,
  // END header size
  ENDSIG: 101010256,
  // "PK\005\006"
  ENDSUB: 8,
  // number of entries on this disk
  ENDTOT: 10,
  // total number of entries
  ENDSIZ: 12,
  // central directory size in bytes
  ENDOFF: 16,
  // offset of first CEN header
  ENDCOM: 20,
  // zip file comment length
  END64HDR: 20,
  // zip64 END header size
  END64SIG: 117853008,
  // zip64 Locator signature, "PK\006\007"
  END64START: 4,
  // number of the disk with the start of the zip64
  END64OFF: 8,
  // relative offset of the zip64 end of central directory
  END64NUMDISKS: 16,
  // total number of disks
  ZIP64SIG: 101075792,
  // zip64 signature, "PK\006\006"
  ZIP64HDR: 56,
  // zip64 record minimum size
  ZIP64LEAD: 12,
  // leading bytes at the start of the record, not counted by the value stored in ZIP64SIZE
  ZIP64SIZE: 4,
  // zip64 size of the central directory record
  ZIP64VEM: 12,
  // zip64 version made by
  ZIP64VER: 14,
  // zip64 version needed to extract
  ZIP64DSK: 16,
  // zip64 number of this disk
  ZIP64DSKDIR: 20,
  // number of the disk with the start of the record directory
  ZIP64SUB: 24,
  // number of entries on this disk
  ZIP64TOT: 32,
  // total number of entries
  ZIP64SIZB: 40,
  // zip64 central directory size in bytes
  ZIP64OFF: 48,
  // offset of start of central directory with respect to the starting disk number
  ZIP64EXTRA: 56,
  // extensible data sector
  /* Compression methods */
  STORED: 0,
  // no compression
  SHRUNK: 1,
  // shrunk
  REDUCED1: 2,
  // reduced with compression factor 1
  REDUCED2: 3,
  // reduced with compression factor 2
  REDUCED3: 4,
  // reduced with compression factor 3
  REDUCED4: 5,
  // reduced with compression factor 4
  IMPLODED: 6,
  // imploded
  // 7 reserved for Tokenizing compression algorithm
  DEFLATED: 8,
  // deflated
  ENHANCED_DEFLATED: 9,
  // enhanced deflated
  PKWARE: 10,
  // PKWare DCL imploded
  // 11 reserved by PKWARE
  BZIP2: 12,
  //  compressed using BZIP2
  // 13 reserved by PKWARE
  LZMA: 14,
  // LZMA
  // 15-17 reserved by PKWARE
  IBM_TERSE: 18,
  // compressed using IBM TERSE
  IBM_LZ77: 19,
  // IBM LZ77 z
  AES_ENCRYPT: 99,
  // WinZIP AES encryption method
  /* General purpose bit flag */
  // values can obtained with expression 2**bitnr
  FLG_ENC: 1,
  // Bit 0: encrypted file
  FLG_COMP1: 2,
  // Bit 1, compression option
  FLG_COMP2: 4,
  // Bit 2, compression option
  FLG_DESC: 8,
  // Bit 3, data descriptor
  FLG_ENH: 16,
  // Bit 4, enhanced deflating
  FLG_PATCH: 32,
  // Bit 5, indicates that the file is compressed patched data.
  FLG_STR: 64,
  // Bit 6, strong encryption (patented)
  // Bits 7-10: Currently unused.
  FLG_EFS: 2048,
  // Bit 11: Language encoding flag (EFS)
  // Bit 12: Reserved by PKWARE for enhanced compression.
  // Bit 13: encrypted the Central Directory (patented).
  // Bits 14-15: Reserved by PKWARE.
  FLG_MSK: 4096,
  // mask header values
  /* Load type */
  FILE: 2,
  BUFFER: 1,
  NONE: 0,
  /* 4.5 Extensible data fields */
  EF_ID: 0,
  EF_SIZE: 2,
  /* Header IDs */
  ID_ZIP64: 1,
  ID_AVINFO: 7,
  ID_PFS: 8,
  ID_OS2: 9,
  ID_NTFS: 10,
  ID_OPENVMS: 12,
  ID_UNIX: 13,
  ID_FORK: 14,
  ID_PATCH: 15,
  ID_X509_PKCS7: 20,
  ID_X509_CERTID_F: 21,
  ID_X509_CERTID_C: 22,
  ID_STRONGENC: 23,
  ID_RECORD_MGT: 24,
  ID_X509_PKCS7_RL: 25,
  ID_IBM1: 101,
  ID_IBM2: 102,
  ID_POSZIP: 18064,
  EF_ZIP64_OR_32: 4294967295,
  EF_ZIP64_OR_16: 65535,
  EF_ZIP64_SUNCOMP: 0,
  EF_ZIP64_SCOMP: 8,
  EF_ZIP64_RHO: 16,
  EF_ZIP64_DSN: 24
}, ze = {};
(function(e) {
  const t = {
    /* Header error messages */
    INVALID_LOC: "Invalid LOC header (bad signature)",
    INVALID_CEN: "Invalid CEN header (bad signature)",
    INVALID_END: "Invalid END header (bad signature)",
    /* Descriptor */
    DESCRIPTOR_NOT_EXIST: "No descriptor present",
    DESCRIPTOR_UNKNOWN: "Unknown descriptor format",
    DESCRIPTOR_FAULTY: "Descriptor data is malformed",
    /* ZipEntry error messages*/
    NO_DATA: "Nothing to decompress",
    BAD_CRC: "CRC32 checksum failed {0}",
    FILE_IN_THE_WAY: "There is a file in the way: {0}",
    UNKNOWN_METHOD: "Invalid/unsupported compression method",
    /* Inflater error messages */
    AVAIL_DATA: "inflate::Available inflate data did not terminate",
    INVALID_DISTANCE: "inflate::Invalid literal/length or distance code in fixed or dynamic block",
    TO_MANY_CODES: "inflate::Dynamic block code description: too many length or distance codes",
    INVALID_REPEAT_LEN: "inflate::Dynamic block code description: repeat more than specified lengths",
    INVALID_REPEAT_FIRST: "inflate::Dynamic block code description: repeat lengths with no first length",
    INCOMPLETE_CODES: "inflate::Dynamic block code description: code lengths codes incomplete",
    INVALID_DYN_DISTANCE: "inflate::Dynamic block code description: invalid distance code lengths",
    INVALID_CODES_LEN: "inflate::Dynamic block code description: invalid literal/length code lengths",
    INVALID_STORE_BLOCK: "inflate::Stored block length did not match one's complement",
    INVALID_BLOCK_TYPE: "inflate::Invalid block type (type == 3)",
    /* ADM-ZIP error messages */
    CANT_EXTRACT_FILE: "Could not extract the file",
    CANT_OVERRIDE: "Target file already exists",
    DISK_ENTRY_TOO_LARGE: "Number of disk entries is too large",
    NO_ZIP: "No zip file was loaded",
    NO_ENTRY: "Entry doesn't exist",
    DIRECTORY_CONTENT_ERROR: "A directory cannot have content",
    FILE_NOT_FOUND: 'File not found: "{0}"',
    NOT_IMPLEMENTED: "Not implemented",
    INVALID_FILENAME: "Invalid filename",
    INVALID_FORMAT: "Invalid or unsupported zip format. No END header found",
    INVALID_PASS_PARAM: "Incompatible password parameter",
    WRONG_PASSWORD: "Wrong Password",
    /* ADM-ZIP */
    COMMENT_TOO_LONG: "Comment is too long",
    // Comment can be max 65535 bytes long (NOTE: some non-US characters may take more space)
    EXTRA_FIELD_PARSE_ERROR: "Extra field parsing error"
  };
  function n(r) {
    return function(...i) {
      return i.length && (r = r.replace(/\{(\d)\}/g, (o, u) => i[u] || "")), new Error("ADM-ZIP: " + r);
    };
  }
  for (const r of Object.keys(t))
    e[r] = n(t[r]);
})(ze);
const cn = sn, Z = qe, ft = St, ln = ze, un = typeof process == "object" && process.platform === "win32", ct = (e) => typeof e == "object" && e !== null, wt = new Uint32Array(256).map((e, t) => {
  for (let n = 0; n < 8; n++)
    t & 1 ? t = 3988292384 ^ t >>> 1 : t >>>= 1;
  return t >>> 0;
});
function P(e) {
  this.sep = Z.sep, this.fs = cn, ct(e) && ct(e.fs) && typeof e.fs.statSync == "function" && (this.fs = e.fs);
}
var mn = P;
P.prototype.makeDir = function(e) {
  const t = this;
  function n(r) {
    let i = r.split(t.sep)[0];
    r.split(t.sep).forEach(function(o) {
      if (!(!o || o.substr(-1, 1) === ":")) {
        i += t.sep + o;
        var u;
        try {
          u = t.fs.statSync(i);
        } catch {
          t.fs.mkdirSync(i);
        }
        if (u && u.isFile()) throw ln.FILE_IN_THE_WAY(`"${i}"`);
      }
    });
  }
  n(e);
};
P.prototype.writeFileTo = function(e, t, n, r) {
  const i = this;
  if (i.fs.existsSync(e)) {
    if (!n) return !1;
    var o = i.fs.statSync(e);
    if (o.isDirectory())
      return !1;
  }
  var u = Z.dirname(e);
  i.fs.existsSync(u) || i.makeDir(u);
  var N;
  try {
    N = i.fs.openSync(e, "w", 438);
  } catch {
    i.fs.chmodSync(e, 438), N = i.fs.openSync(e, "w", 438);
  }
  if (N)
    try {
      i.fs.writeSync(N, t, 0, t.length, 0);
    } finally {
      i.fs.closeSync(N);
    }
  return i.fs.chmodSync(e, r || 438), !0;
};
P.prototype.writeFileToAsync = function(e, t, n, r, i) {
  typeof r == "function" && (i = r, r = void 0);
  const o = this;
  o.fs.exists(e, function(u) {
    if (u && !n) return i(!1);
    o.fs.stat(e, function(N, d) {
      if (u && d.isDirectory())
        return i(!1);
      var E = Z.dirname(e);
      o.fs.exists(E, function(D) {
        D || o.makeDir(E), o.fs.open(e, "w", 438, function(C, _) {
          C ? o.fs.chmod(e, 438, function() {
            o.fs.open(e, "w", 438, function(f, m) {
              o.fs.write(m, t, 0, t.length, 0, function() {
                o.fs.close(m, function() {
                  o.fs.chmod(e, r || 438, function() {
                    i(!0);
                  });
                });
              });
            });
          }) : _ ? o.fs.write(_, t, 0, t.length, 0, function() {
            o.fs.close(_, function() {
              o.fs.chmod(e, r || 438, function() {
                i(!0);
              });
            });
          }) : o.fs.chmod(e, r || 438, function() {
            i(!0);
          });
        });
      });
    });
  });
};
P.prototype.findFiles = function(e) {
  const t = this;
  function n(r, i, o) {
    let u = [];
    return t.fs.readdirSync(r).forEach(function(N) {
      const d = Z.join(r, N), E = t.fs.statSync(d);
      u.push(Z.normalize(d) + (E.isDirectory() ? t.sep : "")), E.isDirectory() && o && (u = u.concat(n(d, i, o)));
    }), u;
  }
  return n(e, void 0, !0);
};
P.prototype.findFilesAsync = function(e, t) {
  const n = this;
  let r = [];
  n.fs.readdir(e, function(i, o) {
    if (i) return t(i);
    let u = o.length;
    if (!u) return t(null, r);
    o.forEach(function(N) {
      N = Z.join(e, N), n.fs.stat(N, function(d, E) {
        if (d) return t(d);
        E && (r.push(Z.normalize(N) + (E.isDirectory() ? n.sep : "")), E.isDirectory() ? n.findFilesAsync(N, function(D, C) {
          if (D) return t(D);
          r = r.concat(C), --u || t(null, r);
        }) : --u || t(null, r));
      });
    });
  });
};
P.prototype.getAttributes = function() {
};
P.prototype.setAttributes = function() {
};
P.crc32update = function(e, t) {
  return wt[(e ^ t) & 255] ^ e >>> 8;
};
P.crc32 = function(e) {
  typeof e == "string" && (e = Buffer.from(e, "utf8"));
  let t = e.length, n = -1;
  for (let r = 0; r < t; ) n = P.crc32update(n, e[r++]);
  return ~n >>> 0;
};
P.methodToString = function(e) {
  switch (e) {
    case ft.STORED:
      return "STORED (" + e + ")";
    case ft.DEFLATED:
      return "DEFLATED (" + e + ")";
    default:
      return "UNSUPPORTED (" + e + ")";
  }
};
P.canonical = function(e) {
  if (!e) return "";
  const t = Z.posix.normalize("/" + e.split("\\").join("/"));
  return Z.join(".", t);
};
P.zipnamefix = function(e) {
  if (!e) return "";
  const t = Z.posix.normalize("/" + e.split("\\").join("/"));
  return Z.posix.join(".", t);
};
P.findLast = function(e, t) {
  if (!Array.isArray(e)) throw new TypeError("arr is not array");
  const n = e.length >>> 0;
  for (let r = n - 1; r >= 0; r--)
    if (t(e[r], r, e))
      return e[r];
};
P.sanitize = function(e, t) {
  e = Z.resolve(Z.normalize(e));
  for (var n = t.split("/"), r = 0, i = n.length; r < i; r++) {
    var o = Z.normalize(Z.join(e, n.slice(r, i).join(Z.sep)));
    if (o.indexOf(e) === 0)
      return o;
  }
  return Z.normalize(Z.join(e, Z.basename(t)));
};
P.toBuffer = function(t, n) {
  return Buffer.isBuffer(t) ? t : t instanceof Uint8Array ? Buffer.from(t) : typeof t == "string" ? n(t) : Buffer.alloc(0);
};
P.readBigUInt64LE = function(e, t) {
  var n = Buffer.from(e.slice(t, t + 8));
  return n.swap64(), parseInt(`0x${n.toString("hex")}`);
};
P.fromDOS2Date = function(e) {
  return new Date((e >> 25 & 127) + 1980, Math.max((e >> 21 & 15) - 1, 0), Math.max(e >> 16 & 31, 1), e >> 11 & 31, e >> 5 & 63, (e & 31) << 1);
};
P.fromDate2DOS = function(e) {
  let t = 0, n = 0;
  return e.getFullYear() > 1979 && (t = (e.getFullYear() - 1980 & 127) << 9 | e.getMonth() + 1 << 5 | e.getDate(), n = e.getHours() << 11 | e.getMinutes() << 5 | e.getSeconds() >> 1), t << 16 | n;
};
P.isWin = un;
P.crcTable = wt;
const dn = qe;
var hn = function(e, { fs: t }) {
  var n = e || "", r = o(), i = null;
  function o() {
    return {
      directory: !1,
      readonly: !1,
      hidden: !1,
      executable: !1,
      mtime: 0,
      atime: 0
    };
  }
  return n && t.existsSync(n) ? (i = t.statSync(n), r.directory = i.isDirectory(), r.mtime = i.mtime, r.atime = i.atime, r.executable = (73 & i.mode) !== 0, r.readonly = (128 & i.mode) === 0, r.hidden = dn.basename(n)[0] === ".") : console.warn("Invalid path: " + n), {
    get directory() {
      return r.directory;
    },
    get readOnly() {
      return r.readonly;
    },
    get hidden() {
      return r.hidden;
    },
    get mtime() {
      return r.mtime;
    },
    get atime() {
      return r.atime;
    },
    get executable() {
      return r.executable;
    },
    decodeAttributes: function() {
    },
    encodeAttributes: function() {
    },
    toJSON: function() {
      return {
        path: n,
        isDirectory: r.directory,
        isReadOnly: r.readonly,
        isHidden: r.hidden,
        isExecutable: r.executable,
        mTime: r.mtime,
        aTime: r.atime
      };
    },
    toString: function() {
      return JSON.stringify(this.toJSON(), null, "	");
    }
  };
}, En = {
  efs: !0,
  encode: (e) => Buffer.from(e, "utf8"),
  decode: (e) => e.toString("utf8")
};
ge.exports = mn;
ge.exports.Constants = St;
ge.exports.Errors = ze;
ge.exports.FileAttr = hn;
ge.exports.decoder = En;
var Te = ge.exports, Ze = {}, ee = Te, I = ee.Constants, pn = function() {
  var e = 20, t = 10, n = 0, r = 0, i = 0, o = 0, u = 0, N = 0, d = 0, E = 0, D = 0, C = 0, _ = 0, f = 0, m = 0;
  e |= ee.isWin ? 2560 : 768, n |= I.FLG_EFS;
  const a = {
    extraLen: 0
  }, l = (s) => Math.max(0, s) >>> 0, p = (s) => Math.max(0, s) & 255;
  return i = ee.fromDate2DOS(/* @__PURE__ */ new Date()), {
    get made() {
      return e;
    },
    set made(s) {
      e = s;
    },
    get version() {
      return t;
    },
    set version(s) {
      t = s;
    },
    get flags() {
      return n;
    },
    set flags(s) {
      n = s;
    },
    get flags_efs() {
      return (n & I.FLG_EFS) > 0;
    },
    set flags_efs(s) {
      s ? n |= I.FLG_EFS : n &= ~I.FLG_EFS;
    },
    get flags_desc() {
      return (n & I.FLG_DESC) > 0;
    },
    set flags_desc(s) {
      s ? n |= I.FLG_DESC : n &= ~I.FLG_DESC;
    },
    get method() {
      return r;
    },
    set method(s) {
      switch (s) {
        case I.STORED:
          this.version = 10;
        case I.DEFLATED:
        default:
          this.version = 20;
      }
      r = s;
    },
    get time() {
      return ee.fromDOS2Date(this.timeval);
    },
    set time(s) {
      this.timeval = ee.fromDate2DOS(s);
    },
    get timeval() {
      return i;
    },
    set timeval(s) {
      i = l(s);
    },
    get timeHighByte() {
      return p(i >>> 8);
    },
    get crc() {
      return o;
    },
    set crc(s) {
      o = l(s);
    },
    get compressedSize() {
      return u;
    },
    set compressedSize(s) {
      u = l(s);
    },
    get size() {
      return N;
    },
    set size(s) {
      N = l(s);
    },
    get fileNameLength() {
      return d;
    },
    set fileNameLength(s) {
      d = s;
    },
    get extraLength() {
      return E;
    },
    set extraLength(s) {
      E = s;
    },
    get extraLocalLength() {
      return a.extraLen;
    },
    set extraLocalLength(s) {
      a.extraLen = s;
    },
    get commentLength() {
      return D;
    },
    set commentLength(s) {
      D = s;
    },
    get diskNumStart() {
      return C;
    },
    set diskNumStart(s) {
      C = l(s);
    },
    get inAttr() {
      return _;
    },
    set inAttr(s) {
      _ = l(s);
    },
    get attr() {
      return f;
    },
    set attr(s) {
      f = l(s);
    },
    // get Unix file permissions
    get fileAttr() {
      return (f || 0) >> 16 & 4095;
    },
    get offset() {
      return m;
    },
    set offset(s) {
      m = l(s);
    },
    get encrypted() {
      return (n & I.FLG_ENC) === I.FLG_ENC;
    },
    get centralHeaderSize() {
      return I.CENHDR + d + E + D;
    },
    get realDataOffset() {
      return m + I.LOCHDR + a.fnameLen + a.extraLen;
    },
    get localHeader() {
      return a;
    },
    loadLocalHeaderFromBinary: function(s) {
      var c = s.slice(m, m + I.LOCHDR);
      if (c.readUInt32LE(0) !== I.LOCSIG)
        throw ee.Errors.INVALID_LOC();
      a.version = c.readUInt16LE(I.LOCVER), a.flags = c.readUInt16LE(I.LOCFLG), a.method = c.readUInt16LE(I.LOCHOW), a.time = c.readUInt32LE(I.LOCTIM), a.crc = c.readUInt32LE(I.LOCCRC), a.compressedSize = c.readUInt32LE(I.LOCSIZ), a.size = c.readUInt32LE(I.LOCLEN), a.fnameLen = c.readUInt16LE(I.LOCNAM), a.extraLen = c.readUInt16LE(I.LOCEXT);
      const h = m + I.LOCHDR + a.fnameLen, g = h + a.extraLen;
      return s.slice(h, g);
    },
    loadFromBinary: function(s) {
      if (s.length !== I.CENHDR || s.readUInt32LE(0) !== I.CENSIG)
        throw ee.Errors.INVALID_CEN();
      e = s.readUInt16LE(I.CENVEM), t = s.readUInt16LE(I.CENVER), n = s.readUInt16LE(I.CENFLG), r = s.readUInt16LE(I.CENHOW), i = s.readUInt32LE(I.CENTIM), o = s.readUInt32LE(I.CENCRC), u = s.readUInt32LE(I.CENSIZ), N = s.readUInt32LE(I.CENLEN), d = s.readUInt16LE(I.CENNAM), E = s.readUInt16LE(I.CENEXT), D = s.readUInt16LE(I.CENCOM), C = s.readUInt16LE(I.CENDSK), _ = s.readUInt16LE(I.CENATT), f = s.readUInt32LE(I.CENATX), m = s.readUInt32LE(I.CENOFF);
    },
    localHeaderToBinary: function() {
      var s = Buffer.alloc(I.LOCHDR);
      return s.writeUInt32LE(I.LOCSIG, 0), s.writeUInt16LE(t, I.LOCVER), s.writeUInt16LE(n, I.LOCFLG), s.writeUInt16LE(r, I.LOCHOW), s.writeUInt32LE(i, I.LOCTIM), s.writeUInt32LE(o, I.LOCCRC), s.writeUInt32LE(u, I.LOCSIZ), s.writeUInt32LE(N, I.LOCLEN), s.writeUInt16LE(d, I.LOCNAM), s.writeUInt16LE(a.extraLen, I.LOCEXT), s;
    },
    centralHeaderToBinary: function() {
      var s = Buffer.alloc(I.CENHDR + d + E + D);
      return s.writeUInt32LE(I.CENSIG, 0), s.writeUInt16LE(e, I.CENVEM), s.writeUInt16LE(t, I.CENVER), s.writeUInt16LE(n, I.CENFLG), s.writeUInt16LE(r, I.CENHOW), s.writeUInt32LE(i, I.CENTIM), s.writeUInt32LE(o, I.CENCRC), s.writeUInt32LE(u, I.CENSIZ), s.writeUInt32LE(N, I.CENLEN), s.writeUInt16LE(d, I.CENNAM), s.writeUInt16LE(E, I.CENEXT), s.writeUInt16LE(D, I.CENCOM), s.writeUInt16LE(C, I.CENDSK), s.writeUInt16LE(_, I.CENATT), s.writeUInt32LE(f, I.CENATX), s.writeUInt32LE(m, I.CENOFF), s;
    },
    toJSON: function() {
      const s = function(c) {
        return c + " bytes";
      };
      return {
        made: e,
        version: t,
        flags: n,
        method: ee.methodToString(r),
        time: this.time,
        crc: "0x" + o.toString(16).toUpperCase(),
        compressedSize: s(u),
        size: s(N),
        fileNameLength: s(d),
        extraLength: s(E),
        commentLength: s(D),
        diskNumStart: C,
        inAttr: _,
        attr: f,
        offset: m,
        centralHeaderSize: s(I.CENHDR + d + E + D)
      };
    },
    toString: function() {
      return JSON.stringify(this.toJSON(), null, "	");
    }
  };
}, ue = Te, U = ue.Constants, gn = function() {
  var e = 0, t = 0, n = 0, r = 0, i = 0;
  return {
    get diskEntries() {
      return e;
    },
    set diskEntries(o) {
      e = t = o;
    },
    get totalEntries() {
      return t;
    },
    set totalEntries(o) {
      t = e = o;
    },
    get size() {
      return n;
    },
    set size(o) {
      n = o;
    },
    get offset() {
      return r;
    },
    set offset(o) {
      r = o;
    },
    get commentLength() {
      return i;
    },
    set commentLength(o) {
      i = o;
    },
    get mainHeaderSize() {
      return U.ENDHDR + i;
    },
    loadFromBinary: function(o) {
      if ((o.length !== U.ENDHDR || o.readUInt32LE(0) !== U.ENDSIG) && (o.length < U.ZIP64HDR || o.readUInt32LE(0) !== U.ZIP64SIG))
        throw ue.Errors.INVALID_END();
      o.readUInt32LE(0) === U.ENDSIG ? (e = o.readUInt16LE(U.ENDSUB), t = o.readUInt16LE(U.ENDTOT), n = o.readUInt32LE(U.ENDSIZ), r = o.readUInt32LE(U.ENDOFF), i = o.readUInt16LE(U.ENDCOM)) : (e = ue.readBigUInt64LE(o, U.ZIP64SUB), t = ue.readBigUInt64LE(o, U.ZIP64TOT), n = ue.readBigUInt64LE(o, U.ZIP64SIZE), r = ue.readBigUInt64LE(o, U.ZIP64OFF), i = 0);
    },
    toBinary: function() {
      var o = Buffer.alloc(U.ENDHDR + i);
      return o.writeUInt32LE(U.ENDSIG, 0), o.writeUInt32LE(0, 4), o.writeUInt16LE(e, U.ENDSUB), o.writeUInt16LE(t, U.ENDTOT), o.writeUInt32LE(n, U.ENDSIZ), o.writeUInt32LE(r, U.ENDOFF), o.writeUInt16LE(i, U.ENDCOM), o.fill(" ", U.ENDHDR), o;
    },
    toJSON: function() {
      const o = function(u, N) {
        let d = u.toString(16).toUpperCase();
        for (; d.length < N; ) d = "0" + d;
        return "0x" + d;
      };
      return {
        diskEntries: e,
        totalEntries: t,
        size: n + " bytes",
        offset: o(r, 4),
        commentLength: i
      };
    },
    toString: function() {
      return JSON.stringify(this.toJSON(), null, "	");
    }
  };
};
Ze.EntryHeader = pn;
Ze.MainHeader = gn;
var He = {}, Nn = function(e) {
  var t = Tt, n = { chunkSize: (parseInt(e.length / 1024) + 1) * 1024 };
  return {
    deflate: function() {
      return t.deflateRawSync(e, n);
    },
    deflateAsync: function(r) {
      var i = t.createDeflateRaw(n), o = [], u = 0;
      i.on("data", function(N) {
        o.push(N), u += N.length;
      }), i.on("end", function() {
        var N = Buffer.alloc(u), d = 0;
        N.fill(0);
        for (var E = 0; E < o.length; E++) {
          var D = o[E];
          D.copy(N, d), d += D.length;
        }
        r && r(N);
      }), i.end(e);
    }
  };
};
const Dn = +(process.versions ? process.versions.node : "").split(".")[0] || 0;
var yn = function(e, t) {
  var n = Tt;
  const r = Dn >= 15 && t > 0 ? { maxOutputLength: t } : {};
  return {
    inflate: function() {
      return n.inflateRawSync(e, r);
    },
    inflateAsync: function(i) {
      var o = n.createInflateRaw(r), u = [], N = 0;
      o.on("data", function(d) {
        u.push(d), N += d.length;
      }), o.on("end", function() {
        var d = Buffer.alloc(N), E = 0;
        d.fill(0);
        for (var D = 0; D < u.length; D++) {
          var C = u[D];
          C.copy(d, E), E += C.length;
        }
        i && i(d);
      }), o.end(e);
    }
  };
};
const { randomFillSync: lt } = an, vn = ze, In = new Uint32Array(256).map((e, t) => {
  for (let n = 0; n < 8; n++)
    t & 1 ? t = t >>> 1 ^ 3988292384 : t >>>= 1;
  return t >>> 0;
}), Lt = (e, t) => Math.imul(e, t) >>> 0, ut = (e, t) => In[(e ^ t) & 255] ^ e >>> 8, _e = () => typeof lt == "function" ? lt(Buffer.alloc(12)) : _e.node();
_e.node = () => {
  const e = Buffer.alloc(12), t = e.length;
  for (let n = 0; n < t; n++) e[n] = Math.random() * 256 & 255;
  return e;
};
const Ue = {
  genSalt: _e
};
function $e(e) {
  const t = Buffer.isBuffer(e) ? e : Buffer.from(e);
  this.keys = new Uint32Array([305419896, 591751049, 878082192]);
  for (let n = 0; n < t.length; n++)
    this.updateKeys(t[n]);
}
$e.prototype.updateKeys = function(e) {
  const t = this.keys;
  return t[0] = ut(t[0], e), t[1] += t[0] & 255, t[1] = Lt(t[1], 134775813) + 1, t[2] = ut(t[2], t[1] >>> 24), e;
};
$e.prototype.next = function() {
  const e = (this.keys[2] | 2) >>> 0;
  return Lt(e, e ^ 1) >> 8 & 255;
};
function _n(e) {
  const t = new $e(e);
  return function(n) {
    const r = Buffer.alloc(n.length);
    let i = 0;
    for (let o of n)
      r[i++] = t.updateKeys(o ^ t.next());
    return r;
  };
}
function Cn(e) {
  const t = new $e(e);
  return function(n, r, i = 0) {
    r || (r = Buffer.alloc(n.length));
    for (let o of n) {
      const u = t.next();
      r[i++] = o ^ u, t.updateKeys(o);
    }
    return r;
  };
}
function Tn(e, t, n) {
  if (!e || !Buffer.isBuffer(e) || e.length < 12)
    return Buffer.alloc(0);
  const r = _n(n), i = r(e.slice(0, 12)), o = (t.flags & 8) === 8 ? t.timeHighByte : t.crc >>> 24;
  if (i[11] !== o)
    throw vn.WRONG_PASSWORD();
  return r(e.slice(12));
}
function Sn(e) {
  Buffer.isBuffer(e) && e.length >= 12 ? Ue.genSalt = function() {
    return e.slice(0, 12);
  } : e === "node" ? Ue.genSalt = _e.node : Ue.genSalt = _e;
}
function wn(e, t, n, r = !1) {
  e == null && (e = Buffer.alloc(0)), Buffer.isBuffer(e) || (e = Buffer.from(e.toString()));
  const i = Cn(n), o = Ue.genSalt();
  o[11] = t.crc >>> 24 & 255, r && (o[10] = t.crc >>> 16 & 255);
  const u = Buffer.alloc(e.length + 12);
  return i(o, u), i(e, u, 12);
}
var Ln = { decrypt: Tn, encrypt: wn, _salter: Sn };
He.Deflater = Nn;
He.Inflater = yn;
He.ZipCrypto = Ln;
var x = Te, On = Ze, B = x.Constants, Xe = He, Ot = function(e, t) {
  var n = new On.EntryHeader(), r = Buffer.alloc(0), i = Buffer.alloc(0), o = !1, u = null, N = Buffer.alloc(0), d = Buffer.alloc(0), E = !0;
  const D = e, C = typeof D.decoder == "object" ? D.decoder : x.decoder;
  E = C.hasOwnProperty("efs") ? C.efs : !1;
  function _() {
    return !t || !(t instanceof Uint8Array) ? Buffer.alloc(0) : (d = n.loadLocalHeaderFromBinary(t), t.slice(n.realDataOffset, n.realDataOffset + n.compressedSize));
  }
  function f(c) {
    if (n.flags_desc) {
      const h = {}, g = n.realDataOffset + n.compressedSize;
      if (t.readUInt32LE(g) == B.LOCSIG || t.readUInt32LE(g) == B.CENSIG)
        throw x.Errors.DESCRIPTOR_NOT_EXIST();
      if (t.readUInt32LE(g) == B.EXTSIG)
        h.crc = t.readUInt32LE(g + B.EXTCRC), h.compressedSize = t.readUInt32LE(g + B.EXTSIZ), h.size = t.readUInt32LE(g + B.EXTLEN);
      else if (t.readUInt16LE(g + 12) === 19280)
        h.crc = t.readUInt32LE(g + B.EXTCRC - 4), h.compressedSize = t.readUInt32LE(g + B.EXTSIZ - 4), h.size = t.readUInt32LE(g + B.EXTLEN - 4);
      else
        throw x.Errors.DESCRIPTOR_UNKNOWN();
      if (h.compressedSize !== n.compressedSize || h.size !== n.size || h.crc !== n.crc)
        throw x.Errors.DESCRIPTOR_FAULTY();
      if (x.crc32(c) !== h.crc)
        return !1;
    } else if (x.crc32(c) !== n.localHeader.crc)
      return !1;
    return !0;
  }
  function m(c, h, g) {
    if (typeof h > "u" && typeof c == "string" && (g = c, c = void 0), o)
      return c && h && h(Buffer.alloc(0), x.Errors.DIRECTORY_CONTENT_ERROR()), Buffer.alloc(0);
    var y = _();
    if (y.length === 0)
      return c && h && h(y), y;
    if (n.encrypted) {
      if (typeof g != "string" && !Buffer.isBuffer(g))
        throw x.Errors.INVALID_PASS_PARAM();
      y = Xe.ZipCrypto.decrypt(y, n, g);
    }
    var T = Buffer.alloc(n.size);
    switch (n.method) {
      case x.Constants.STORED:
        if (y.copy(T), f(T))
          return c && h && h(T), T;
        throw c && h && h(T, x.Errors.BAD_CRC()), x.Errors.BAD_CRC();
      case x.Constants.DEFLATED:
        var L = new Xe.Inflater(y, n.size);
        if (c)
          L.inflateAsync(function(v) {
            v.copy(v, 0), h && (f(v) ? h(v) : h(v, x.Errors.BAD_CRC()));
          });
        else {
          if (L.inflate(T).copy(T, 0), !f(T))
            throw x.Errors.BAD_CRC(`"${C.decode(r)}"`);
          return T;
        }
        break;
      default:
        throw c && h && h(Buffer.alloc(0), x.Errors.UNKNOWN_METHOD()), x.Errors.UNKNOWN_METHOD();
    }
  }
  function a(c, h) {
    if ((!u || !u.length) && Buffer.isBuffer(t))
      return c && h && h(_()), _();
    if (u.length && !o) {
      var g;
      switch (n.method) {
        case x.Constants.STORED:
          return n.compressedSize = n.size, g = Buffer.alloc(u.length), u.copy(g), c && h && h(g), g;
        default:
        case x.Constants.DEFLATED:
          var y = new Xe.Deflater(u);
          if (c)
            y.deflateAsync(function(L) {
              g = Buffer.alloc(L.length), n.compressedSize = L.length, L.copy(g), h && h(g);
            });
          else {
            var T = y.deflate();
            return n.compressedSize = T.length, T;
          }
          y = null;
          break;
      }
    } else if (c && h)
      h(Buffer.alloc(0));
    else
      return Buffer.alloc(0);
  }
  function l(c, h) {
    return (c.readUInt32LE(h + 4) << 4) + c.readUInt32LE(h);
  }
  function p(c) {
    try {
      for (var h = 0, g, y, T; h + 4 < c.length; )
        g = c.readUInt16LE(h), h += 2, y = c.readUInt16LE(h), h += 2, T = c.slice(h, h + y), h += y, B.ID_ZIP64 === g && s(T);
    } catch {
      throw x.Errors.EXTRA_FIELD_PARSE_ERROR();
    }
  }
  function s(c) {
    var h, g, y, T;
    c.length >= B.EF_ZIP64_SCOMP && (h = l(c, B.EF_ZIP64_SUNCOMP), n.size === B.EF_ZIP64_OR_32 && (n.size = h)), c.length >= B.EF_ZIP64_RHO && (g = l(c, B.EF_ZIP64_SCOMP), n.compressedSize === B.EF_ZIP64_OR_32 && (n.compressedSize = g)), c.length >= B.EF_ZIP64_DSN && (y = l(c, B.EF_ZIP64_RHO), n.offset === B.EF_ZIP64_OR_32 && (n.offset = y)), c.length >= B.EF_ZIP64_DSN + 4 && (T = c.readUInt32LE(B.EF_ZIP64_DSN), n.diskNumStart === B.EF_ZIP64_OR_16 && (n.diskNumStart = T));
  }
  return {
    get entryName() {
      return C.decode(r);
    },
    get rawEntryName() {
      return r;
    },
    set entryName(c) {
      r = x.toBuffer(c, C.encode);
      var h = r[r.length - 1];
      o = h === 47 || h === 92, n.fileNameLength = r.length;
    },
    get efs() {
      return typeof E == "function" ? E(this.entryName) : E;
    },
    get extra() {
      return N;
    },
    set extra(c) {
      N = c, n.extraLength = c.length, p(c);
    },
    get comment() {
      return C.decode(i);
    },
    set comment(c) {
      if (i = x.toBuffer(c, C.encode), n.commentLength = i.length, i.length > 65535) throw x.Errors.COMMENT_TOO_LONG();
    },
    get name() {
      var c = C.decode(r);
      return o ? c.substr(c.length - 1).split("/").pop() : c.split("/").pop();
    },
    get isDirectory() {
      return o;
    },
    getCompressedData: function() {
      return a(!1, null);
    },
    getCompressedDataAsync: function(c) {
      a(!0, c);
    },
    setData: function(c) {
      u = x.toBuffer(c, x.decoder.encode), !o && u.length ? (n.size = u.length, n.method = x.Constants.DEFLATED, n.crc = x.crc32(c), n.changed = !0) : n.method = x.Constants.STORED;
    },
    getData: function(c) {
      return n.changed ? u : m(!1, null, c);
    },
    getDataAsync: function(c, h) {
      n.changed ? c(u) : m(!0, c, h);
    },
    set attr(c) {
      n.attr = c;
    },
    get attr() {
      return n.attr;
    },
    set header(c) {
      n.loadFromBinary(c);
    },
    get header() {
      return n;
    },
    packCentralHeader: function() {
      n.flags_efs = this.efs, n.extraLength = N.length;
      var c = n.centralHeaderToBinary(), h = x.Constants.CENHDR;
      return r.copy(c, h), h += r.length, N.copy(c, h), h += n.extraLength, i.copy(c, h), c;
    },
    packLocalHeader: function() {
      let c = 0;
      n.flags_efs = this.efs, n.extraLocalLength = d.length;
      const h = n.localHeaderToBinary(), g = Buffer.alloc(h.length + r.length + n.extraLocalLength);
      return h.copy(g, c), c += h.length, r.copy(g, c), c += r.length, d.copy(g, c), c += d.length, g;
    },
    toJSON: function() {
      const c = function(h) {
        return "<" + (h && h.length + " bytes buffer" || "null") + ">";
      };
      return {
        entryName: this.entryName,
        name: this.name,
        comment: this.comment,
        isDirectory: this.isDirectory,
        header: n.toJSON(),
        compressedData: c(t),
        data: c(u)
      };
    },
    toString: function() {
      return JSON.stringify(this.toJSON(), null, "	");
    }
  };
};
const mt = Ot, An = Ze, V = Te;
var xn = function(e, t) {
  var n = [], r = {}, i = Buffer.alloc(0), o = new An.MainHeader(), u = !1;
  const N = /* @__PURE__ */ new Set(), d = t, { noSort: E, decoder: D } = d;
  e ? f(d.readEntries) : u = !0;
  function C() {
    const a = /* @__PURE__ */ new Set();
    for (const l of Object.keys(r)) {
      const p = l.split("/");
      if (p.pop(), !!p.length)
        for (let s = 0; s < p.length; s++) {
          const c = p.slice(0, s + 1).join("/") + "/";
          a.add(c);
        }
    }
    for (const l of a)
      if (!(l in r)) {
        const p = new mt(d);
        p.entryName = l, p.attr = 16, p.temporary = !0, n.push(p), r[p.entryName] = p, N.add(p);
      }
  }
  function _() {
    if (u = !0, r = {}, o.diskEntries > (e.length - o.offset) / V.Constants.CENHDR)
      throw V.Errors.DISK_ENTRY_TOO_LARGE();
    n = new Array(o.diskEntries);
    for (var a = o.offset, l = 0; l < n.length; l++) {
      var p = a, s = new mt(d, e);
      s.header = e.slice(p, p += V.Constants.CENHDR), s.entryName = e.slice(p, p += s.header.fileNameLength), s.header.extraLength && (s.extra = e.slice(p, p += s.header.extraLength)), s.header.commentLength && (s.comment = e.slice(p, p + s.header.commentLength)), a += s.header.centralHeaderSize, n[l] = s, r[s.entryName] = s;
    }
    N.clear(), C();
  }
  function f(a) {
    var l = e.length - V.Constants.ENDHDR, p = Math.max(0, l - 65535), s = p, c = e.length, h = -1, g = 0;
    for ((typeof d.trailingSpace == "boolean" ? d.trailingSpace : !1) && (p = 0), l; l >= s; l--)
      if (e[l] === 80) {
        if (e.readUInt32LE(l) === V.Constants.ENDSIG) {
          h = l, g = l, c = l + V.Constants.ENDHDR, s = l - V.Constants.END64HDR;
          continue;
        }
        if (e.readUInt32LE(l) === V.Constants.END64SIG) {
          s = p;
          continue;
        }
        if (e.readUInt32LE(l) === V.Constants.ZIP64SIG) {
          h = l, c = l + V.readBigUInt64LE(e, l + V.Constants.ZIP64SIZE) + V.Constants.ZIP64LEAD;
          break;
        }
      }
    if (h == -1) throw V.Errors.INVALID_FORMAT();
    o.loadFromBinary(e.slice(h, c)), o.commentLength && (i = e.slice(g + V.Constants.ENDHDR)), a && _();
  }
  function m() {
    n.length > 1 && !E && n.sort((a, l) => a.entryName.toLowerCase().localeCompare(l.entryName.toLowerCase()));
  }
  return {
    /**
     * Returns an array of ZipEntry objects existent in the current opened archive
     * @return Array
     */
    get entries() {
      return u || _(), n.filter((a) => !N.has(a));
    },
    /**
     * Archive comment
     * @return {String}
     */
    get comment() {
      return D.decode(i);
    },
    set comment(a) {
      i = V.toBuffer(a, D.encode), o.commentLength = i.length;
    },
    getEntryCount: function() {
      return u ? n.length : o.diskEntries;
    },
    forEach: function(a) {
      this.entries.forEach(a);
    },
    /**
     * Returns a reference to the entry with the given name or null if entry is inexistent
     *
     * @param entryName
     * @return ZipEntry
     */
    getEntry: function(a) {
      return u || _(), r[a] || null;
    },
    /**
     * Adds the given entry to the entry list
     *
     * @param entry
     */
    setEntry: function(a) {
      u || _(), n.push(a), r[a.entryName] = a, o.totalEntries = n.length;
    },
    /**
     * Removes the file with the given name from the entry list.
     *
     * If the entry is a directory, then all nested files and directories will be removed
     * @param entryName
     * @returns {void}
     */
    deleteFile: function(a, l = !0) {
      u || _();
      const p = r[a];
      this.getEntryChildren(p, l).map((c) => c.entryName).forEach(this.deleteEntry);
    },
    /**
     * Removes the entry with the given name from the entry list.
     *
     * @param {string} entryName
     * @returns {void}
     */
    deleteEntry: function(a) {
      u || _();
      const l = r[a], p = n.indexOf(l);
      p >= 0 && (n.splice(p, 1), delete r[a], o.totalEntries = n.length);
    },
    /**
     *  Iterates and returns all nested files and directories of the given entry
     *
     * @param entry
     * @return Array
     */
    getEntryChildren: function(a, l = !0) {
      if (u || _(), typeof a == "object")
        if (a.isDirectory && l) {
          const p = [], s = a.entryName;
          for (const c of n)
            c.entryName.startsWith(s) && p.push(c);
          return p;
        } else
          return [a];
      return [];
    },
    /**
     *  How many child elements entry has
     *
     * @param {ZipEntry} entry
     * @return {integer}
     */
    getChildCount: function(a) {
      if (a && a.isDirectory) {
        const l = this.getEntryChildren(a);
        return l.includes(a) ? l.length - 1 : l.length;
      }
      return 0;
    },
    /**
     * Returns the zip file
     *
     * @return Buffer
     */
    compressToBuffer: function() {
      u || _(), m();
      const a = [], l = [];
      let p = 0, s = 0;
      o.size = 0, o.offset = 0;
      let c = 0;
      for (const y of this.entries) {
        const T = y.getCompressedData();
        y.header.offset = s;
        const L = y.packLocalHeader(), v = L.length + T.length;
        s += v, a.push(L), a.push(T);
        const w = y.packCentralHeader();
        l.push(w), o.size += w.length, p += v + w.length, c++;
      }
      p += o.mainHeaderSize, o.offset = s, o.totalEntries = c, s = 0;
      const h = Buffer.alloc(p);
      for (const y of a)
        y.copy(h, s), s += y.length;
      for (const y of l)
        y.copy(h, s), s += y.length;
      const g = o.toBinary();
      return i && i.copy(g, V.Constants.ENDHDR), g.copy(h, s), e = h, u = !1, h;
    },
    toAsyncBuffer: function(a, l, p, s) {
      try {
        u || _(), m();
        const c = [], h = [];
        let g = 0, y = 0, T = 0;
        o.size = 0, o.offset = 0;
        const L = function(v) {
          if (v.length > 0) {
            const w = v.shift(), S = w.entryName + w.extra.toString();
            p && p(S), w.getCompressedDataAsync(function(O) {
              s && s(S), w.header.offset = y;
              const R = w.packLocalHeader(), $ = R.length + O.length;
              y += $, c.push(R), c.push(O);
              const F = w.packCentralHeader();
              h.push(F), o.size += F.length, g += $ + F.length, T++, L(v);
            });
          } else {
            g += o.mainHeaderSize, o.offset = y, o.totalEntries = T, y = 0;
            const w = Buffer.alloc(g);
            c.forEach(function(O) {
              O.copy(w, y), y += O.length;
            }), h.forEach(function(O) {
              O.copy(w, y), y += O.length;
            });
            const S = o.toBinary();
            i && i.copy(S, V.Constants.ENDHDR), S.copy(w, y), e = w, u = !1, a(w);
          }
        };
        L(Array.from(this.entries));
      } catch (c) {
        l(c);
      }
    }
  };
};
const b = Te, M = qe, Rn = Ot, Fn = xn, oe = (...e) => b.findLast(e, (t) => typeof t == "boolean"), dt = (...e) => b.findLast(e, (t) => typeof t == "string"), Un = (...e) => b.findLast(e, (t) => typeof t == "function"), bn = {
  // option "noSort" : if true it disables files sorting
  noSort: !1,
  // read entries during load (initial loading may be slower)
  readEntries: !1,
  // default method is none
  method: b.Constants.NONE,
  // file system
  fs: null
};
var Bn = function(e, t) {
  let n = null;
  const r = Object.assign(/* @__PURE__ */ Object.create(null), bn);
  e && typeof e == "object" && (e instanceof Uint8Array || (Object.assign(r, e), e = r.input ? r.input : void 0, r.input && delete r.input), Buffer.isBuffer(e) && (n = e, r.method = b.Constants.BUFFER, e = void 0)), Object.assign(r, t);
  const i = new b(r);
  if ((typeof r.decoder != "object" || typeof r.decoder.encode != "function" || typeof r.decoder.decode != "function") && (r.decoder = b.decoder), e && typeof e == "string")
    if (i.fs.existsSync(e))
      r.method = b.Constants.FILE, r.filename = e, n = i.fs.readFileSync(e);
    else
      throw b.Errors.INVALID_FILENAME();
  const o = new Fn(n, r), { canonical: u, sanitize: N, zipnamefix: d } = b;
  function E(f) {
    if (f && o) {
      var m;
      if (typeof f == "string" && (m = o.getEntry(M.posix.normalize(f))), typeof f == "object" && typeof f.entryName < "u" && typeof f.header < "u" && (m = o.getEntry(f.entryName)), m)
        return m;
    }
    return null;
  }
  function D(f) {
    const { join: m, normalize: a, sep: l } = M.posix;
    return m(".", a(l + f.split("\\").join(l) + l));
  }
  function C(f) {
    return f instanceof RegExp ? /* @__PURE__ */ function(m) {
      return function(a) {
        return m.test(a);
      };
    }(f) : typeof f != "function" ? () => !0 : f;
  }
  const _ = (f, m) => {
    let a = m.slice(-1);
    return a = a === i.sep ? i.sep : "", M.relative(f, m) + a;
  };
  return {
    /**
     * Extracts the given entry from the archive and returns the content as a Buffer object
     * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
     * @param {Buffer|string} [pass] - password
     * @return Buffer or Null in case of error
     */
    readFile: function(f, m) {
      var a = E(f);
      return a && a.getData(m) || null;
    },
    /**
     * Returns how many child elements has on entry (directories) on files it is always 0
     * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
     * @returns {integer}
     */
    childCount: function(f) {
      const m = E(f);
      if (m)
        return o.getChildCount(m);
    },
    /**
     * Asynchronous readFile
     * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
     * @param {callback} callback
     *
     * @return Buffer or Null in case of error
     */
    readFileAsync: function(f, m) {
      var a = E(f);
      a ? a.getDataAsync(m) : m(null, "getEntry failed for:" + f);
    },
    /**
     * Extracts the given entry from the archive and returns the content as plain text in the given encoding
     * @param {ZipEntry|string} entry - ZipEntry object or String with the full path of the entry
     * @param {string} encoding - Optional. If no encoding is specified utf8 is used
     *
     * @return String
     */
    readAsText: function(f, m) {
      var a = E(f);
      if (a) {
        var l = a.getData();
        if (l && l.length)
          return l.toString(m || "utf8");
      }
      return "";
    },
    /**
     * Asynchronous readAsText
     * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
     * @param {callback} callback
     * @param {string} [encoding] - Optional. If no encoding is specified utf8 is used
     *
     * @return String
     */
    readAsTextAsync: function(f, m, a) {
      var l = E(f);
      l ? l.getDataAsync(function(p, s) {
        if (s) {
          m(p, s);
          return;
        }
        p && p.length ? m(p.toString(a || "utf8")) : m("");
      }) : m("");
    },
    /**
     * Remove the entry from the file or the entry and all it's nested directories and files if the given entry is a directory
     *
     * @param {ZipEntry|string} entry
     * @returns {void}
     */
    deleteFile: function(f, m = !0) {
      var a = E(f);
      a && o.deleteFile(a.entryName, m);
    },
    /**
     * Remove the entry from the file or directory without affecting any nested entries
     *
     * @param {ZipEntry|string} entry
     * @returns {void}
     */
    deleteEntry: function(f) {
      var m = E(f);
      m && o.deleteEntry(m.entryName);
    },
    /**
     * Adds a comment to the zip. The zip must be rewritten after adding the comment.
     *
     * @param {string} comment
     */
    addZipComment: function(f) {
      o.comment = f;
    },
    /**
     * Returns the zip comment
     *
     * @return String
     */
    getZipComment: function() {
      return o.comment || "";
    },
    /**
     * Adds a comment to a specified zipEntry. The zip must be rewritten after adding the comment
     * The comment cannot exceed 65535 characters in length
     *
     * @param {ZipEntry} entry
     * @param {string} comment
     */
    addZipEntryComment: function(f, m) {
      var a = E(f);
      a && (a.comment = m);
    },
    /**
     * Returns the comment of the specified entry
     *
     * @param {ZipEntry} entry
     * @return String
     */
    getZipEntryComment: function(f) {
      var m = E(f);
      return m && m.comment || "";
    },
    /**
     * Updates the content of an existing entry inside the archive. The zip must be rewritten after updating the content
     *
     * @param {ZipEntry} entry
     * @param {Buffer} content
     */
    updateFile: function(f, m) {
      var a = E(f);
      a && a.setData(m);
    },
    /**
     * Adds a file from the disk to the archive
     *
     * @param {string} localPath File to add to zip
     * @param {string} [zipPath] Optional path inside the zip
     * @param {string} [zipName] Optional name for the file
     * @param {string} [comment] Optional file comment
     */
    addLocalFile: function(f, m, a, l) {
      if (i.fs.existsSync(f)) {
        m = m ? D(m) : "";
        const p = M.win32.basename(M.win32.normalize(f));
        m += a || p;
        const s = i.fs.statSync(f), c = s.isFile() ? i.fs.readFileSync(f) : Buffer.alloc(0);
        s.isDirectory() && (m += i.sep), this.addFile(m, c, l, s);
      } else
        throw b.Errors.FILE_NOT_FOUND(f);
    },
    /**
     * Callback for showing if everything was done.
     *
     * @callback doneCallback
     * @param {Error} err - Error object
     * @param {boolean} done - was request fully completed
     */
    /**
     * Adds a file from the disk to the archive
     *
     * @param {(object|string)} options - options object, if it is string it us used as localPath.
     * @param {string} options.localPath - Local path to the file.
     * @param {string} [options.comment] - Optional file comment.
     * @param {string} [options.zipPath] - Optional path inside the zip
     * @param {string} [options.zipName] - Optional name for the file
     * @param {doneCallback} callback - The callback that handles the response.
     */
    addLocalFileAsync: function(f, m) {
      f = typeof f == "object" ? f : { localPath: f };
      const a = M.resolve(f.localPath), { comment: l } = f;
      let { zipPath: p, zipName: s } = f;
      const c = this;
      i.fs.stat(a, function(h, g) {
        if (h) return m(h, !1);
        p = p ? D(p) : "";
        const y = M.win32.basename(M.win32.normalize(a));
        if (p += s || y, g.isFile())
          i.fs.readFile(a, function(T, L) {
            return T ? m(T, !1) : (c.addFile(p, L, l, g), setImmediate(m, void 0, !0));
          });
        else if (g.isDirectory())
          return p += i.sep, c.addFile(p, Buffer.alloc(0), l, g), setImmediate(m, void 0, !0);
      });
    },
    /**
     * Adds a local directory and all its nested files and directories to the archive
     *
     * @param {string} localPath - local path to the folder
     * @param {string} [zipPath] - optional path inside zip
     * @param {(RegExp|function)} [filter] - optional RegExp or Function if files match will be included.
     */
    addLocalFolder: function(f, m, a) {
      if (a = C(a), m = m ? D(m) : "", f = M.normalize(f), i.fs.existsSync(f)) {
        const l = i.findFiles(f), p = this;
        if (l.length)
          for (const s of l) {
            const c = M.join(m, _(f, s));
            a(c) && p.addLocalFile(s, M.dirname(c));
          }
      } else
        throw b.Errors.FILE_NOT_FOUND(f);
    },
    /**
     * Asynchronous addLocalFolder
     * @param {string} localPath
     * @param {callback} callback
     * @param {string} [zipPath] optional path inside zip
     * @param {RegExp|function} [filter] optional RegExp or Function if files match will
     *               be included.
     */
    addLocalFolderAsync: function(f, m, a, l) {
      l = C(l), a = a ? D(a) : "", f = M.normalize(f);
      var p = this;
      i.fs.open(f, "r", function(s) {
        if (s && s.code === "ENOENT")
          m(void 0, b.Errors.FILE_NOT_FOUND(f));
        else if (s)
          m(void 0, s);
        else {
          var c = i.findFiles(f), h = -1, g = function() {
            if (h += 1, h < c.length) {
              var y = c[h], T = _(f, y).split("\\").join("/");
              T = T.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, ""), l(T) ? i.fs.stat(y, function(L, v) {
                L && m(void 0, L), v.isFile() ? i.fs.readFile(y, function(w, S) {
                  w ? m(void 0, w) : (p.addFile(a + T, S, "", v), g());
                }) : (p.addFile(a + T + "/", Buffer.alloc(0), "", v), g());
              }) : process.nextTick(() => {
                g();
              });
            } else
              m(!0, void 0);
          };
          g();
        }
      });
    },
    /**
     * Adds a local directory and all its nested files and directories to the archive
     *
     * @param {object | string} options - options object, if it is string it us used as localPath.
     * @param {string} options.localPath - Local path to the folder.
     * @param {string} [options.zipPath] - optional path inside zip.
     * @param {RegExp|function} [options.filter] - optional RegExp or Function if files match will be included.
     * @param {function|string} [options.namefix] - optional function to help fix filename
     * @param {doneCallback} callback - The callback that handles the response.
     *
     */
    addLocalFolderAsync2: function(f, m) {
      const a = this;
      f = typeof f == "object" ? f : { localPath: f }, localPath = M.resolve(D(f.localPath));
      let { zipPath: l, filter: p, namefix: s } = f;
      p instanceof RegExp ? p = /* @__PURE__ */ function(g) {
        return function(y) {
          return g.test(y);
        };
      }(p) : typeof p != "function" && (p = function() {
        return !0;
      }), l = l ? D(l) : "", s == "latin1" && (s = (g) => g.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, "")), typeof s != "function" && (s = (g) => g);
      const c = (g) => M.join(l, s(_(localPath, g))), h = (g) => M.win32.basename(M.win32.normalize(s(g)));
      i.fs.open(localPath, "r", function(g) {
        g && g.code === "ENOENT" ? m(void 0, b.Errors.FILE_NOT_FOUND(localPath)) : g ? m(void 0, g) : i.findFilesAsync(localPath, function(y, T) {
          if (y) return m(y);
          T = T.filter((L) => p(c(L))), T.length || m(void 0, !1), setImmediate(
            T.reverse().reduce(function(L, v) {
              return function(w, S) {
                if (w || S === !1) return setImmediate(L, w, !1);
                a.addLocalFileAsync(
                  {
                    localPath: v,
                    zipPath: M.dirname(c(v)),
                    zipName: h(v)
                  },
                  L
                );
              };
            }, m)
          );
        });
      });
    },
    /**
     * Adds a local directory and all its nested files and directories to the archive
     *
     * @param {string} localPath - path where files will be extracted
     * @param {object} props - optional properties
     * @param {string} [props.zipPath] - optional path inside zip
     * @param {RegExp|function} [props.filter] - optional RegExp or Function if files match will be included.
     * @param {function|string} [props.namefix] - optional function to help fix filename
     */
    addLocalFolderPromise: function(f, m) {
      return new Promise((a, l) => {
        this.addLocalFolderAsync2(Object.assign({ localPath: f }, m), (p, s) => {
          p && l(p), s && a(this);
        });
      });
    },
    /**
     * Allows you to create a entry (file or directory) in the zip file.
     * If you want to create a directory the entryName must end in / and a null buffer should be provided.
     * Comment and attributes are optional
     *
     * @param {string} entryName
     * @param {Buffer | string} content - file content as buffer or utf8 coded string
     * @param {string} [comment] - file comment
     * @param {number | object} [attr] - number as unix file permissions, object as filesystem Stats object
     */
    addFile: function(f, m, a, l) {
      f = d(f);
      let p = E(f);
      const s = p != null;
      s || (p = new Rn(r), p.entryName = f), p.comment = a || "";
      const c = typeof l == "object" && l instanceof i.fs.Stats;
      c && (p.header.time = l.mtime);
      var h = p.isDirectory ? 16 : 0;
      let g = p.isDirectory ? 16384 : 32768;
      return c ? g |= 4095 & l.mode : typeof l == "number" ? g |= 4095 & l : g |= p.isDirectory ? 493 : 420, h = (h | g << 16) >>> 0, p.attr = h, p.setData(m), s || o.setEntry(p), p;
    },
    /**
     * Returns an array of ZipEntry objects representing the files and folders inside the archive
     *
     * @param {string} [password]
     * @returns Array
     */
    getEntries: function(f) {
      return o.password = f, o ? o.entries : [];
    },
    /**
     * Returns a ZipEntry object representing the file or folder specified by ``name``.
     *
     * @param {string} name
     * @return ZipEntry
     */
    getEntry: function(f) {
      return E(f);
    },
    getEntryCount: function() {
      return o.getEntryCount();
    },
    forEach: function(f) {
      return o.forEach(f);
    },
    /**
     * Extracts the given entry to the given targetPath
     * If the entry is a directory inside the archive, the entire directory and it's subdirectories will be extracted
     *
     * @param {string|ZipEntry} entry - ZipEntry object or String with the full path of the entry
     * @param {string} targetPath - Target folder where to write the file
     * @param {boolean} [maintainEntryPath=true] - If maintainEntryPath is true and the entry is inside a folder, the entry folder will be created in targetPath as well. Default is TRUE
     * @param {boolean} [overwrite=false] - If the file already exists at the target path, the file will be overwriten if this is true.
     * @param {boolean} [keepOriginalPermission=false] - The file will be set as the permission from the entry if this is true.
     * @param {string} [outFileName] - String If set will override the filename of the extracted file (Only works if the entry is a file)
     *
     * @return Boolean
     */
    extractEntryTo: function(f, m, a, l, p, s) {
      l = oe(!1, l), p = oe(!1, p), a = oe(!0, a), s = dt(p, s);
      var c = E(f);
      if (!c)
        throw b.Errors.NO_ENTRY();
      var h = u(c.entryName), g = N(m, s && !c.isDirectory ? s : a ? h : M.basename(h));
      if (c.isDirectory) {
        var y = o.getEntryChildren(c);
        return y.forEach(function(v) {
          if (v.isDirectory) return;
          var w = v.getData();
          if (!w)
            throw b.Errors.CANT_EXTRACT_FILE();
          var S = u(v.entryName), O = N(m, a ? S : M.basename(S));
          const R = p ? v.header.fileAttr : void 0;
          i.writeFileTo(O, w, l, R);
        }), !0;
      }
      var T = c.getData(o.password);
      if (!T) throw b.Errors.CANT_EXTRACT_FILE();
      if (i.fs.existsSync(g) && !l)
        throw b.Errors.CANT_OVERRIDE();
      const L = p ? f.header.fileAttr : void 0;
      return i.writeFileTo(g, T, l, L), !0;
    },
    /**
     * Test the archive
     * @param {string} [pass]
     */
    test: function(f) {
      if (!o)
        return !1;
      for (var m in o.entries)
        try {
          if (m.isDirectory)
            continue;
          var a = o.entries[m].getData(f);
          if (!a)
            return !1;
        } catch {
          return !1;
        }
      return !0;
    },
    /**
     * Extracts the entire archive to the given location
     *
     * @param {string} targetPath Target location
     * @param {boolean} [overwrite=false] If the file already exists at the target path, the file will be overwriten if this is true.
     *                  Default is FALSE
     * @param {boolean} [keepOriginalPermission=false] The file will be set as the permission from the entry if this is true.
     *                  Default is FALSE
     * @param {string|Buffer} [pass] password
     */
    extractAllTo: function(f, m, a, l) {
      if (a = oe(!1, a), l = dt(a, l), m = oe(!1, m), !o) throw b.Errors.NO_ZIP();
      o.entries.forEach(function(p) {
        var s = N(f, u(p.entryName));
        if (p.isDirectory) {
          i.makeDir(s);
          return;
        }
        var c = p.getData(l);
        if (!c)
          throw b.Errors.CANT_EXTRACT_FILE();
        const h = a ? p.header.fileAttr : void 0;
        i.writeFileTo(s, c, m, h);
        try {
          i.fs.utimesSync(s, p.header.time, p.header.time);
        } catch {
          throw b.Errors.CANT_EXTRACT_FILE();
        }
      });
    },
    /**
     * Asynchronous extractAllTo
     *
     * @param {string} targetPath Target location
     * @param {boolean} [overwrite=false] If the file already exists at the target path, the file will be overwriten if this is true.
     *                  Default is FALSE
     * @param {boolean} [keepOriginalPermission=false] The file will be set as the permission from the entry if this is true.
     *                  Default is FALSE
     * @param {function} callback The callback will be executed when all entries are extracted successfully or any error is thrown.
     */
    extractAllToAsync: function(f, m, a, l) {
      if (l = Un(m, a, l), a = oe(!1, a), m = oe(!1, m), !l)
        return new Promise((g, y) => {
          this.extractAllToAsync(f, m, a, function(T) {
            T ? y(T) : g(this);
          });
        });
      if (!o) {
        l(b.Errors.NO_ZIP());
        return;
      }
      f = M.resolve(f);
      const p = (g) => N(f, M.normalize(u(g.entryName))), s = (g, y) => new Error(g + ': "' + y + '"'), c = [], h = [];
      o.entries.forEach((g) => {
        g.isDirectory ? c.push(g) : h.push(g);
      });
      for (const g of c) {
        const y = p(g), T = a ? g.header.fileAttr : void 0;
        try {
          i.makeDir(y), T && i.fs.chmodSync(y, T), i.fs.utimesSync(y, g.header.time, g.header.time);
        } catch {
          l(s("Unable to create folder", y));
        }
      }
      h.reverse().reduce(function(g, y) {
        return function(T) {
          if (T)
            g(T);
          else {
            const L = M.normalize(u(y.entryName)), v = N(f, L);
            y.getDataAsync(function(w, S) {
              if (S)
                g(S);
              else if (!w)
                g(b.Errors.CANT_EXTRACT_FILE());
              else {
                const O = a ? y.header.fileAttr : void 0;
                i.writeFileToAsync(v, w, m, O, function(R) {
                  R || g(s("Unable to write file", v)), i.fs.utimes(v, y.header.time, y.header.time, function($) {
                    $ ? g(s("Unable to set times", v)) : g();
                  });
                });
              }
            });
          }
        };
      }, l)();
    },
    /**
     * Writes the newly created zip file to disk at the specified location or if a zip was opened and no ``targetFileName`` is provided, it will overwrite the opened zip
     *
     * @param {string} targetFileName
     * @param {function} callback
     */
    writeZip: function(f, m) {
      if (arguments.length === 1 && typeof f == "function" && (m = f, f = ""), !f && r.filename && (f = r.filename), !!f) {
        var a = o.compressToBuffer();
        if (a) {
          var l = i.writeFileTo(f, a, !0);
          typeof m == "function" && m(l ? null : new Error("failed"), "");
        }
      }
    },
    /**
             *
             * @param {string} targetFileName
             * @param {object} [props]
             * @param {boolean} [props.overwrite=true] If the file already exists at the target path, the file will be overwriten if this is true.
             * @param {boolean} [props.perm] The file will be set as the permission from the entry if this is true.
    
             * @returns {Promise<void>}
             */
    writeZipPromise: function(f, m) {
      const { overwrite: a, perm: l } = Object.assign({ overwrite: !0 }, m);
      return new Promise((p, s) => {
        !f && r.filename && (f = r.filename), f || s("ADM-ZIP: ZIP File Name Missing"), this.toBufferPromise().then((c) => {
          const h = (g) => g ? p(g) : s("ADM-ZIP: Wasn't able to write zip file");
          i.writeFileToAsync(f, c, a, l, h);
        }, s);
      });
    },
    /**
     * @returns {Promise<Buffer>} A promise to the Buffer.
     */
    toBufferPromise: function() {
      return new Promise((f, m) => {
        o.toAsyncBuffer(f, m);
      });
    },
    /**
     * Returns the content of the entire zip file as a Buffer object
     *
     * @prop {function} [onSuccess]
     * @prop {function} [onFail]
     * @prop {function} [onItemStart]
     * @prop {function} [onItemEnd]
     * @returns {Buffer}
     */
    toBuffer: function(f, m, a, l) {
      return typeof f == "function" ? (o.toAsyncBuffer(f, m, a, l), null) : o.compressToBuffer();
    }
  };
};
const Mn = /* @__PURE__ */ fn(Bn);
var At = {};
At.entityMap = {
  lt: "<",
  gt: ">",
  amp: "&",
  quot: '"',
  apos: "'",
  Agrave: "À",
  Aacute: "Á",
  Acirc: "Â",
  Atilde: "Ã",
  Auml: "Ä",
  Aring: "Å",
  AElig: "Æ",
  Ccedil: "Ç",
  Egrave: "È",
  Eacute: "É",
  Ecirc: "Ê",
  Euml: "Ë",
  Igrave: "Ì",
  Iacute: "Í",
  Icirc: "Î",
  Iuml: "Ï",
  ETH: "Ð",
  Ntilde: "Ñ",
  Ograve: "Ò",
  Oacute: "Ó",
  Ocirc: "Ô",
  Otilde: "Õ",
  Ouml: "Ö",
  Oslash: "Ø",
  Ugrave: "Ù",
  Uacute: "Ú",
  Ucirc: "Û",
  Uuml: "Ü",
  Yacute: "Ý",
  THORN: "Þ",
  szlig: "ß",
  agrave: "à",
  aacute: "á",
  acirc: "â",
  atilde: "ã",
  auml: "ä",
  aring: "å",
  aelig: "æ",
  ccedil: "ç",
  egrave: "è",
  eacute: "é",
  ecirc: "ê",
  euml: "ë",
  igrave: "ì",
  iacute: "í",
  icirc: "î",
  iuml: "ï",
  eth: "ð",
  ntilde: "ñ",
  ograve: "ò",
  oacute: "ó",
  ocirc: "ô",
  otilde: "õ",
  ouml: "ö",
  oslash: "ø",
  ugrave: "ù",
  uacute: "ú",
  ucirc: "û",
  uuml: "ü",
  yacute: "ý",
  thorn: "þ",
  yuml: "ÿ",
  nbsp: " ",
  iexcl: "¡",
  cent: "¢",
  pound: "£",
  curren: "¤",
  yen: "¥",
  brvbar: "¦",
  sect: "§",
  uml: "¨",
  copy: "©",
  ordf: "ª",
  laquo: "«",
  not: "¬",
  shy: "­­",
  reg: "®",
  macr: "¯",
  deg: "°",
  plusmn: "±",
  sup2: "²",
  sup3: "³",
  acute: "´",
  micro: "µ",
  para: "¶",
  middot: "·",
  cedil: "¸",
  sup1: "¹",
  ordm: "º",
  raquo: "»",
  frac14: "¼",
  frac12: "½",
  frac34: "¾",
  iquest: "¿",
  times: "×",
  divide: "÷",
  forall: "∀",
  part: "∂",
  exist: "∃",
  empty: "∅",
  nabla: "∇",
  isin: "∈",
  notin: "∉",
  ni: "∋",
  prod: "∏",
  sum: "∑",
  minus: "−",
  lowast: "∗",
  radic: "√",
  prop: "∝",
  infin: "∞",
  ang: "∠",
  and: "∧",
  or: "∨",
  cap: "∩",
  cup: "∪",
  int: "∫",
  there4: "∴",
  sim: "∼",
  cong: "≅",
  asymp: "≈",
  ne: "≠",
  equiv: "≡",
  le: "≤",
  ge: "≥",
  sub: "⊂",
  sup: "⊃",
  nsub: "⊄",
  sube: "⊆",
  supe: "⊇",
  oplus: "⊕",
  otimes: "⊗",
  perp: "⊥",
  sdot: "⋅",
  Alpha: "Α",
  Beta: "Β",
  Gamma: "Γ",
  Delta: "Δ",
  Epsilon: "Ε",
  Zeta: "Ζ",
  Eta: "Η",
  Theta: "Θ",
  Iota: "Ι",
  Kappa: "Κ",
  Lambda: "Λ",
  Mu: "Μ",
  Nu: "Ν",
  Xi: "Ξ",
  Omicron: "Ο",
  Pi: "Π",
  Rho: "Ρ",
  Sigma: "Σ",
  Tau: "Τ",
  Upsilon: "Υ",
  Phi: "Φ",
  Chi: "Χ",
  Psi: "Ψ",
  Omega: "Ω",
  alpha: "α",
  beta: "β",
  gamma: "γ",
  delta: "δ",
  epsilon: "ε",
  zeta: "ζ",
  eta: "η",
  theta: "θ",
  iota: "ι",
  kappa: "κ",
  lambda: "λ",
  mu: "μ",
  nu: "ν",
  xi: "ξ",
  omicron: "ο",
  pi: "π",
  rho: "ρ",
  sigmaf: "ς",
  sigma: "σ",
  tau: "τ",
  upsilon: "υ",
  phi: "φ",
  chi: "χ",
  psi: "ψ",
  omega: "ω",
  thetasym: "ϑ",
  upsih: "ϒ",
  piv: "ϖ",
  OElig: "Œ",
  oelig: "œ",
  Scaron: "Š",
  scaron: "š",
  Yuml: "Ÿ",
  fnof: "ƒ",
  circ: "ˆ",
  tilde: "˜",
  ensp: " ",
  emsp: " ",
  thinsp: " ",
  zwnj: "‌",
  zwj: "‍",
  lrm: "‎",
  rlm: "‏",
  ndash: "–",
  mdash: "—",
  lsquo: "‘",
  rsquo: "’",
  sbquo: "‚",
  ldquo: "“",
  rdquo: "”",
  bdquo: "„",
  dagger: "†",
  Dagger: "‡",
  bull: "•",
  hellip: "…",
  permil: "‰",
  prime: "′",
  Prime: "″",
  lsaquo: "‹",
  rsaquo: "›",
  oline: "‾",
  euro: "€",
  trade: "™",
  larr: "←",
  uarr: "↑",
  rarr: "→",
  darr: "↓",
  harr: "↔",
  crarr: "↵",
  lceil: "⌈",
  rceil: "⌉",
  lfloor: "⌊",
  rfloor: "⌋",
  loz: "◊",
  spades: "♠",
  clubs: "♣",
  hearts: "♥",
  diams: "♦"
};
var Je = {}, ke = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, ht = new RegExp("[\\-\\.0-9" + ke.source.slice(1, -1) + "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]"), Et = new RegExp("^" + ke.source + ht.source + "*(?::" + ke.source + ht.source + "*)?$"), ye = 0, Q = 1, ae = 2, ve = 3, fe = 4, ce = 5, Ie = 6, Re = 7;
function de(e, t) {
  this.message = e, this.locator = t, Error.captureStackTrace && Error.captureStackTrace(this, de);
}
de.prototype = new Error();
de.prototype.name = de.name;
function xt() {
}
xt.prototype = {
  parse: function(e, t, n) {
    var r = this.domBuilder;
    r.startDocument(), Rt(t, t = {}), Pn(
      e,
      t,
      n,
      r,
      this.errorHandler
    ), r.endDocument();
  }
};
function Pn(e, t, n, r, i) {
  function o(A) {
    if (A > 65535) {
      A -= 65536;
      var G = 55296 + (A >> 10), re = 56320 + (A & 1023);
      return String.fromCharCode(G, re);
    } else
      return String.fromCharCode(A);
  }
  function u(A) {
    var G = A.slice(1, -1);
    return G in n ? n[G] : G.charAt(0) === "#" ? o(parseInt(G.substr(1).replace("x", "0x"))) : (i.error("entity not found:" + A), A);
  }
  function N(A) {
    if (A > a) {
      var G = e.substring(a, A).replace(/&#?\w+;/g, u);
      _ && d(a), r.characters(G, 0, A - a), a = A;
    }
  }
  function d(A, G) {
    for (; A >= D && (G = C.exec(e)); )
      E = G.index, D = E + G[0].length, _.lineNumber++;
    _.columnNumber = A - E + 1;
  }
  for (var E = 0, D = 0, C = /.*(?:\r\n?|\n)|.*$/g, _ = r.locator, f = [{ currentNSMap: t }], m = {}, a = 0; ; ) {
    try {
      var l = e.indexOf("<", a);
      if (l < 0) {
        if (!e.substr(a).match(/^\s*$/)) {
          var p = r.doc, s = p.createTextNode(e.substr(a));
          p.appendChild(s), r.currentElement = s;
        }
        return;
      }
      switch (l > a && N(l), e.charAt(l + 1)) {
        case "/":
          var S = e.indexOf(">", l + 3), c = e.substring(l + 2, S), h = f.pop();
          S < 0 ? (c = e.substring(l + 2).replace(/[\s<].*/, ""), i.error("end tag name: " + c + " is not complete:" + h.tagName), S = l + 1 + c.length) : c.match(/\s</) && (c = c.replace(/[\s<].*/, ""), i.error("end tag name: " + c + " maybe not complete"), S = l + 1 + c.length);
          var g = h.localNSMap, y = h.tagName == c, T = y || h.tagName && h.tagName.toLowerCase() == c.toLowerCase();
          if (T) {
            if (r.endElement(h.uri, h.localName, c), g)
              for (var L in g)
                r.endPrefixMapping(L);
            y || i.fatalError("end tag name: " + c + " is not match the current start tagName:" + h.tagName);
          } else
            f.push(h);
          S++;
          break;
        case "?":
          _ && d(l), S = Vn(e, l, r);
          break;
        case "!":
          _ && d(l), S = $n(e, l, r, i);
          break;
        default:
          _ && d(l);
          var v = new Ft(), w = f[f.length - 1].currentNSMap, S = zn(e, l, v, w, u, i), O = v.length;
          if (!v.closed && Hn(e, S, v.tagName, m) && (v.closed = !0, n.nbsp || i.warning("unclosed xml attribute")), _ && O) {
            for (var R = pt(_, {}), $ = 0; $ < O; $++) {
              var F = v[$];
              d(F.offset), F.locator = pt(_, {});
            }
            r.locator = R, gt(v, r, w) && f.push(v), r.locator = _;
          } else
            gt(v, r, w) && f.push(v);
          v.uri === "http://www.w3.org/1999/xhtml" && !v.closed ? S = Zn(e, S, v.tagName, u, r) : S++;
      }
    } catch (A) {
      if (A instanceof de)
        throw A;
      i.error("element parse error: " + A), S = -1;
    }
    S > a ? a = S : N(Math.max(l, a) + 1);
  }
}
function pt(e, t) {
  return t.lineNumber = e.lineNumber, t.columnNumber = e.columnNumber, t;
}
function zn(e, t, n, r, i, o) {
  function u(_, f, m) {
    _ in n.attributeNames && o.fatalError("Attribute " + _ + " redefined"), n.addValue(_, f, m);
  }
  for (var N, d, E = ++t, D = ye; ; ) {
    var C = e.charAt(E);
    switch (C) {
      case "=":
        if (D === Q)
          N = e.slice(t, E), D = ve;
        else if (D === ae)
          D = ve;
        else
          throw new Error("attribute equal must after attrName");
        break;
      case "'":
      case '"':
        if (D === ve || D === Q)
          if (D === Q && (o.warning('attribute value must after "="'), N = e.slice(t, E)), t = E + 1, E = e.indexOf(C, t), E > 0)
            d = e.slice(t, E).replace(/&#?\w+;/g, i), u(N, d, t - 1), D = ce;
          else
            throw new Error("attribute value no end '" + C + "' match");
        else if (D == fe)
          d = e.slice(t, E).replace(/&#?\w+;/g, i), u(N, d, t), o.warning('attribute "' + N + '" missed start quot(' + C + ")!!"), t = E + 1, D = ce;
        else
          throw new Error('attribute value must after "="');
        break;
      case "/":
        switch (D) {
          case ye:
            n.setTagName(e.slice(t, E));
          case ce:
          case Ie:
          case Re:
            D = Re, n.closed = !0;
          case fe:
          case Q:
          case ae:
            break;
          default:
            throw new Error("attribute invalid close char('/')");
        }
        break;
      case "":
        return o.error("unexpected end of input"), D == ye && n.setTagName(e.slice(t, E)), E;
      case ">":
        switch (D) {
          case ye:
            n.setTagName(e.slice(t, E));
          case ce:
          case Ie:
          case Re:
            break;
          case fe:
          case Q:
            d = e.slice(t, E), d.slice(-1) === "/" && (n.closed = !0, d = d.slice(0, -1));
          case ae:
            D === ae && (d = N), D == fe ? (o.warning('attribute "' + d + '" missed quot(")!'), u(N, d.replace(/&#?\w+;/g, i), t)) : ((r[""] !== "http://www.w3.org/1999/xhtml" || !d.match(/^(?:disabled|checked|selected)$/i)) && o.warning('attribute "' + d + '" missed value!! "' + d + '" instead!!'), u(d, d, t));
            break;
          case ve:
            throw new Error("attribute value missed!!");
        }
        return E;
      case "":
        C = " ";
      default:
        if (C <= " ")
          switch (D) {
            case ye:
              n.setTagName(e.slice(t, E)), D = Ie;
              break;
            case Q:
              N = e.slice(t, E), D = ae;
              break;
            case fe:
              var d = e.slice(t, E).replace(/&#?\w+;/g, i);
              o.warning('attribute "' + d + '" missed quot(")!!'), u(N, d, t);
            case ce:
              D = Ie;
              break;
          }
        else
          switch (D) {
            case ae:
              n.tagName, (r[""] !== "http://www.w3.org/1999/xhtml" || !N.match(/^(?:disabled|checked|selected)$/i)) && o.warning('attribute "' + N + '" missed value!! "' + N + '" instead2!!'), u(N, N, t), t = E, D = Q;
              break;
            case ce:
              o.warning('attribute space is required"' + N + '"!!');
            case Ie:
              D = Q, t = E;
              break;
            case ve:
              D = fe, t = E;
              break;
            case Re:
              throw new Error("elements closed character '/' and '>' must be connected to");
          }
    }
    E++;
  }
}
function gt(e, t, n) {
  for (var r = e.tagName, i = null, C = e.length; C--; ) {
    var o = e[C], u = o.qName, N = o.value, _ = u.indexOf(":");
    if (_ > 0)
      var d = o.prefix = u.slice(0, _), E = u.slice(_ + 1), D = d === "xmlns" && E;
    else
      E = u, d = null, D = u === "xmlns" && "";
    o.localName = E, D !== !1 && (i == null && (i = {}, Rt(n, n = {})), n[D] = i[D] = N, o.uri = "http://www.w3.org/2000/xmlns/", t.startPrefixMapping(D, N));
  }
  for (var C = e.length; C--; ) {
    o = e[C];
    var d = o.prefix;
    d && (d === "xml" && (o.uri = "http://www.w3.org/XML/1998/namespace"), d !== "xmlns" && (o.uri = n[d || ""]));
  }
  var _ = r.indexOf(":");
  _ > 0 ? (d = e.prefix = r.slice(0, _), E = e.localName = r.slice(_ + 1)) : (d = null, E = e.localName = r);
  var f = e.uri = n[d || ""];
  if (t.startElement(f, E, r, e), e.closed) {
    if (t.endElement(f, E, r), i)
      for (d in i)
        t.endPrefixMapping(d);
  } else
    return e.currentNSMap = n, e.localNSMap = i, !0;
}
function Zn(e, t, n, r, i) {
  if (/^(?:script|textarea)$/i.test(n)) {
    var o = e.indexOf("</" + n + ">", t), u = e.substring(t + 1, o);
    if (/[&<]/.test(u))
      return /^script$/i.test(n) ? (i.characters(u, 0, u.length), o) : (u = u.replace(/&#?\w+;/g, r), i.characters(u, 0, u.length), o);
  }
  return t + 1;
}
function Hn(e, t, n, r) {
  var i = r[n];
  return i == null && (i = e.lastIndexOf("</" + n + ">"), i < t && (i = e.lastIndexOf("</" + n)), r[n] = i), i < t;
}
function Rt(e, t) {
  for (var n in e)
    t[n] = e[n];
}
function $n(e, t, n, r) {
  var i = e.charAt(t + 2);
  switch (i) {
    case "-":
      if (e.charAt(t + 3) === "-") {
        var o = e.indexOf("-->", t + 4);
        return o > t ? (n.comment(e, t + 4, o - t - 4), o + 3) : (r.error("Unclosed comment"), -1);
      } else
        return -1;
    default:
      if (e.substr(t + 3, 6) == "CDATA[") {
        var o = e.indexOf("]]>", t + 9);
        return n.startCDATA(), n.characters(e, t + 9, o - t - 9), n.endCDATA(), o + 3;
      }
      var u = Gn(e, t), N = u.length;
      if (N > 1 && /!doctype/i.test(u[0][0])) {
        var d = u[1][0], E = !1, D = !1;
        N > 3 && (/^public$/i.test(u[2][0]) ? (E = u[3][0], D = N > 4 && u[4][0]) : /^system$/i.test(u[2][0]) && (D = u[3][0]));
        var C = u[N - 1];
        return n.startDTD(d, E, D), n.endDTD(), C.index + C[0].length;
      }
  }
  return -1;
}
function Vn(e, t, n) {
  var r = e.indexOf("?>", t);
  if (r) {
    var i = e.substring(t, r).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
    return i ? (i[0].length, n.processingInstruction(i[1], i[2]), r + 2) : -1;
  }
  return -1;
}
function Ft() {
  this.attributeNames = {};
}
Ft.prototype = {
  setTagName: function(e) {
    if (!Et.test(e))
      throw new Error("invalid tagName:" + e);
    this.tagName = e;
  },
  addValue: function(e, t, n) {
    if (!Et.test(e))
      throw new Error("invalid attribute:" + e);
    this.attributeNames[e] = this.length, this[this.length++] = { qName: e, value: t, offset: n };
  },
  length: 0,
  getLocalName: function(e) {
    return this[e].localName;
  },
  getLocator: function(e) {
    return this[e].locator;
  },
  getQName: function(e) {
    return this[e].qName;
  },
  getURI: function(e) {
    return this[e].uri;
  },
  getValue: function(e) {
    return this[e].value;
  }
  //	,getIndex:function(uri, localName)){
  //		if(localName){
  //			
  //		}else{
  //			var qName = uri
  //		}
  //	},
  //	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
  //	getType:function(uri,localName){}
  //	getType:function(i){},
};
function Gn(e, t) {
  var n, r = [], i = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
  for (i.lastIndex = t, i.exec(e); n = i.exec(e); )
    if (r.push(n), n[1]) return r;
}
Je.XMLReader = xt;
Je.ParseError = de;
var Se = {};
function we(e, t) {
  for (var n in e)
    t[n] = e[n];
}
function k(e, t) {
  var n = e.prototype;
  if (!(n instanceof t)) {
    let r = function() {
    };
    r.prototype = t.prototype, r = new r(), we(n, r), e.prototype = n = r;
  }
  n.constructor != e && (typeof e != "function" && console.error("unknow Class:" + e), n.constructor = e);
}
var jn = "http://www.w3.org/1999/xhtml", W = {}, K = W.ELEMENT_NODE = 1, he = W.ATTRIBUTE_NODE = 2, Be = W.TEXT_NODE = 3, Ut = W.CDATA_SECTION_NODE = 4, bt = W.ENTITY_REFERENCE_NODE = 5, Xn = W.ENTITY_NODE = 6, Bt = W.PROCESSING_INSTRUCTION_NODE = 7, Mt = W.COMMENT_NODE = 8, Pt = W.DOCUMENT_NODE = 9, zt = W.DOCUMENT_TYPE_NODE = 10, J = W.DOCUMENT_FRAGMENT_NODE = 11, kn = W.NOTATION_NODE = 12, j = {}, H = {};
j.INDEX_SIZE_ERR = (H[1] = "Index size error", 1);
j.DOMSTRING_SIZE_ERR = (H[2] = "DOMString size error", 2);
var Wn = j.HIERARCHY_REQUEST_ERR = (H[3] = "Hierarchy request error", 3);
j.WRONG_DOCUMENT_ERR = (H[4] = "Wrong document", 4);
j.INVALID_CHARACTER_ERR = (H[5] = "Invalid character", 5);
j.NO_DATA_ALLOWED_ERR = (H[6] = "No data allowed", 6);
j.NO_MODIFICATION_ALLOWED_ERR = (H[7] = "No modification allowed", 7);
var Kn = j.NOT_FOUND_ERR = (H[8] = "Not found", 8);
j.NOT_SUPPORTED_ERR = (H[9] = "Not supported", 9);
var Nt = j.INUSE_ATTRIBUTE_ERR = (H[10] = "Attribute in use", 10);
j.INVALID_STATE_ERR = (H[11] = "Invalid state", 11);
j.SYNTAX_ERR = (H[12] = "Syntax error", 12);
j.INVALID_MODIFICATION_ERR = (H[13] = "Invalid modification", 13);
j.NAMESPACE_ERR = (H[14] = "Invalid namespace", 14);
j.INVALID_ACCESS_ERR = (H[15] = "Invalid access", 15);
function se(e, t) {
  if (t instanceof Error)
    var n = t;
  else
    n = this, Error.call(this, H[e]), this.message = H[e], Error.captureStackTrace && Error.captureStackTrace(this, se);
  return n.code = e, t && (this.message = this.message + ": " + t), n;
}
se.prototype = Error.prototype;
we(j, se);
function ne() {
}
ne.prototype = {
  /**
   * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
   * @standard level1
   */
  length: 0,
  /**
   * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
   * @standard level1
   * @param index  unsigned long 
   *   Index into the collection.
   * @return Node
   * 	The node at the indexth position in the NodeList, or null if that is not a valid index. 
   */
  item: function(e) {
    return this[e] || null;
  },
  toString: function(e, t) {
    for (var n = [], r = 0; r < this.length; r++)
      me(this[r], n, e, t);
    return n.join("");
  }
};
function Ee(e, t) {
  this._node = e, this._refresh = t, Qe(this);
}
function Qe(e) {
  var t = e._node._inc || e._node.ownerDocument._inc;
  if (e._inc != t) {
    var n = e._refresh(e._node);
    Yt(e, "length", n.length), we(n, e), e._inc = t;
  }
}
Ee.prototype.item = function(e) {
  return Qe(this), this[e];
};
k(Ee, ne);
function Me() {
}
function Zt(e, t) {
  for (var n = e.length; n--; )
    if (e[n] === t)
      return n;
}
function Dt(e, t, n, r) {
  if (r ? t[Zt(t, r)] = n : t[t.length++] = n, e) {
    n.ownerElement = e;
    var i = e.ownerDocument;
    i && (r && $t(i, e, r), Yn(i, e, n));
  }
}
function yt(e, t, n) {
  var r = Zt(t, n);
  if (r >= 0) {
    for (var i = t.length - 1; r < i; )
      t[r] = t[++r];
    if (t.length = i, e) {
      var o = e.ownerDocument;
      o && ($t(o, e, n), n.ownerElement = null);
    }
  } else
    throw se(Kn, new Error(e.tagName + "@" + n));
}
Me.prototype = {
  length: 0,
  item: ne.prototype.item,
  getNamedItem: function(e) {
    for (var t = this.length; t--; ) {
      var n = this[t];
      if (n.nodeName == e)
        return n;
    }
  },
  setNamedItem: function(e) {
    var t = e.ownerElement;
    if (t && t != this._ownerElement)
      throw new se(Nt);
    var n = this.getNamedItem(e.nodeName);
    return Dt(this._ownerElement, this, e, n), n;
  },
  /* returns Node */
  setNamedItemNS: function(e) {
    var t = e.ownerElement, n;
    if (t && t != this._ownerElement)
      throw new se(Nt);
    return n = this.getNamedItemNS(e.namespaceURI, e.localName), Dt(this._ownerElement, this, e, n), n;
  },
  /* returns Node */
  removeNamedItem: function(e) {
    var t = this.getNamedItem(e);
    return yt(this._ownerElement, this, t), t;
  },
  // raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR
  //for level2
  removeNamedItemNS: function(e, t) {
    var n = this.getNamedItemNS(e, t);
    return yt(this._ownerElement, this, n), n;
  },
  getNamedItemNS: function(e, t) {
    for (var n = this.length; n--; ) {
      var r = this[n];
      if (r.localName == t && r.namespaceURI == e)
        return r;
    }
    return null;
  }
};
function Ht(e) {
  if (this._features = {}, e)
    for (var t in e)
      this._features = e[t];
}
Ht.prototype = {
  hasFeature: function(e, t) {
    var n = this._features[e.toLowerCase()];
    return !!(n && (!t || t in n));
  },
  // Introduced in DOM Level 2:
  createDocument: function(e, t, n) {
    var r = new Le();
    if (r.implementation = this, r.childNodes = new ne(), r.doctype = n, n && r.appendChild(n), t) {
      var i = r.createElementNS(e, t);
      r.appendChild(i);
    }
    return r;
  },
  // Introduced in DOM Level 2:
  createDocumentType: function(e, t, n) {
    var r = new it();
    return r.name = e, r.nodeName = e, r.publicId = t, r.systemId = n, r;
  }
};
function X() {
}
X.prototype = {
  firstChild: null,
  lastChild: null,
  previousSibling: null,
  nextSibling: null,
  attributes: null,
  parentNode: null,
  childNodes: null,
  ownerDocument: null,
  nodeValue: null,
  namespaceURI: null,
  prefix: null,
  localName: null,
  // Modified in DOM Level 2:
  insertBefore: function(e, t) {
    return Gt(this, e, t);
  },
  replaceChild: function(e, t) {
    this.insertBefore(e, t), t && this.removeChild(t);
  },
  removeChild: function(e) {
    return Vt(this, e);
  },
  appendChild: function(e) {
    return this.insertBefore(e, null);
  },
  hasChildNodes: function() {
    return this.firstChild != null;
  },
  cloneNode: function(e) {
    return We(this.ownerDocument || this, this, e);
  },
  // Modified in DOM Level 2:
  normalize: function() {
    for (var e = this.firstChild; e; ) {
      var t = e.nextSibling;
      t && t.nodeType == Be && e.nodeType == Be ? (this.removeChild(t), e.appendData(t.data)) : (e.normalize(), e = t);
    }
  },
  // Introduced in DOM Level 2:
  isSupported: function(e, t) {
    return this.ownerDocument.implementation.hasFeature(e, t);
  },
  // Introduced in DOM Level 2:
  hasAttributes: function() {
    return this.attributes.length > 0;
  },
  lookupPrefix: function(e) {
    for (var t = this; t; ) {
      var n = t._nsMap;
      if (n) {
        for (var r in n)
          if (n[r] == e)
            return r;
      }
      t = t.nodeType == he ? t.ownerDocument : t.parentNode;
    }
    return null;
  },
  // Introduced in DOM Level 3:
  lookupNamespaceURI: function(e) {
    for (var t = this; t; ) {
      var n = t._nsMap;
      if (n && e in n)
        return n[e];
      t = t.nodeType == he ? t.ownerDocument : t.parentNode;
    }
    return null;
  },
  // Introduced in DOM Level 3:
  isDefaultNamespace: function(e) {
    var t = this.lookupPrefix(e);
    return t == null;
  }
};
function vt(e) {
  return e == "<" && "&lt;" || e == ">" && "&gt;" || e == "&" && "&amp;" || e == '"' && "&quot;" || "&#" + e.charCodeAt() + ";";
}
we(W, X);
we(W, X.prototype);
function Ce(e, t) {
  if (t(e))
    return !0;
  if (e = e.firstChild)
    do
      if (Ce(e, t))
        return !0;
    while (e = e.nextSibling);
}
function Le() {
}
function Yn(e, t, n) {
  e && e._inc++;
  var r = n.namespaceURI;
  r == "http://www.w3.org/2000/xmlns/" && (t._nsMap[n.prefix ? n.localName : ""] = n.value);
}
function $t(e, t, n, r) {
  e && e._inc++;
  var i = n.namespaceURI;
  i == "http://www.w3.org/2000/xmlns/" && delete t._nsMap[n.prefix ? n.localName : ""];
}
function et(e, t, n) {
  if (e && e._inc) {
    e._inc++;
    var r = t.childNodes;
    if (n)
      r[r.length++] = n;
    else {
      for (var i = t.firstChild, o = 0; i; )
        r[o++] = i, i = i.nextSibling;
      r.length = o;
    }
  }
}
function Vt(e, t) {
  var n = t.previousSibling, r = t.nextSibling;
  return n ? n.nextSibling = r : e.firstChild = r, r ? r.previousSibling = n : e.lastChild = n, et(e.ownerDocument, e), t;
}
function Gt(e, t, n) {
  var r = t.parentNode;
  if (r && r.removeChild(t), t.nodeType === J) {
    var i = t.firstChild;
    if (i == null)
      return t;
    var o = t.lastChild;
  } else
    i = o = t;
  var u = n ? n.previousSibling : e.lastChild;
  i.previousSibling = u, o.nextSibling = n, u ? u.nextSibling = i : e.firstChild = i, n == null ? e.lastChild = o : n.previousSibling = o;
  do
    i.parentNode = e;
  while (i !== o && (i = i.nextSibling));
  return et(e.ownerDocument || e, e), t.nodeType == J && (t.firstChild = t.lastChild = null), t;
}
function qn(e, t) {
  var n = t.parentNode;
  if (n) {
    var r = e.lastChild;
    n.removeChild(t);
    var r = e.lastChild;
  }
  var r = e.lastChild;
  return t.parentNode = e, t.previousSibling = r, t.nextSibling = null, r ? r.nextSibling = t : e.firstChild = t, e.lastChild = t, et(e.ownerDocument, e, t), t;
}
Le.prototype = {
  //implementation : null,
  nodeName: "#document",
  nodeType: Pt,
  doctype: null,
  documentElement: null,
  _inc: 1,
  insertBefore: function(e, t) {
    if (e.nodeType == J) {
      for (var n = e.firstChild; n; ) {
        var r = n.nextSibling;
        this.insertBefore(n, t), n = r;
      }
      return e;
    }
    return this.documentElement == null && e.nodeType == K && (this.documentElement = e), Gt(this, e, t), e.ownerDocument = this, e;
  },
  removeChild: function(e) {
    return this.documentElement == e && (this.documentElement = null), Vt(this, e);
  },
  // Introduced in DOM Level 2:
  importNode: function(e, t) {
    return Kt(this, e, t);
  },
  // Introduced in DOM Level 2:
  getElementById: function(e) {
    var t = null;
    return Ce(this.documentElement, function(n) {
      if (n.nodeType == K && n.getAttribute("id") == e)
        return t = n, !0;
    }), t;
  },
  getElementsByClassName: function(e) {
    var t = new RegExp("(^|\\s)" + e + "(\\s|$)");
    return new Ee(this, function(n) {
      var r = [];
      return Ce(n.documentElement, function(i) {
        i !== n && i.nodeType == K && t.test(i.getAttribute("class")) && r.push(i);
      }), r;
    });
  },
  //document factory method:
  createElement: function(e) {
    var t = new pe();
    t.ownerDocument = this, t.nodeName = e, t.tagName = e, t.childNodes = new ne();
    var n = t.attributes = new Me();
    return n._ownerElement = t, t;
  },
  createDocumentFragment: function() {
    var e = new Ve();
    return e.ownerDocument = this, e.childNodes = new ne(), e;
  },
  createTextNode: function(e) {
    var t = new tt();
    return t.ownerDocument = this, t.appendData(e), t;
  },
  createComment: function(e) {
    var t = new nt();
    return t.ownerDocument = this, t.appendData(e), t;
  },
  createCDATASection: function(e) {
    var t = new rt();
    return t.ownerDocument = this, t.appendData(e), t;
  },
  createProcessingInstruction: function(e, t) {
    var n = new st();
    return n.ownerDocument = this, n.tagName = n.target = e, n.nodeValue = n.data = t, n;
  },
  createAttribute: function(e) {
    var t = new Pe();
    return t.ownerDocument = this, t.name = e, t.nodeName = e, t.localName = e, t.specified = !0, t;
  },
  createEntityReference: function(e) {
    var t = new ot();
    return t.ownerDocument = this, t.nodeName = e, t;
  },
  // Introduced in DOM Level 2:
  createElementNS: function(e, t) {
    var n = new pe(), r = t.split(":"), i = n.attributes = new Me();
    return n.childNodes = new ne(), n.ownerDocument = this, n.nodeName = t, n.tagName = t, n.namespaceURI = e, r.length == 2 ? (n.prefix = r[0], n.localName = r[1]) : n.localName = t, i._ownerElement = n, n;
  },
  // Introduced in DOM Level 2:
  createAttributeNS: function(e, t) {
    var n = new Pe(), r = t.split(":");
    return n.ownerDocument = this, n.nodeName = t, n.name = t, n.namespaceURI = e, n.specified = !0, r.length == 2 ? (n.prefix = r[0], n.localName = r[1]) : n.localName = t, n;
  }
};
k(Le, X);
function pe() {
  this._nsMap = {};
}
pe.prototype = {
  nodeType: K,
  hasAttribute: function(e) {
    return this.getAttributeNode(e) != null;
  },
  getAttribute: function(e) {
    var t = this.getAttributeNode(e);
    return t && t.value || "";
  },
  getAttributeNode: function(e) {
    return this.attributes.getNamedItem(e);
  },
  setAttribute: function(e, t) {
    var n = this.ownerDocument.createAttribute(e);
    n.value = n.nodeValue = "" + t, this.setAttributeNode(n);
  },
  removeAttribute: function(e) {
    var t = this.getAttributeNode(e);
    t && this.removeAttributeNode(t);
  },
  //four real opeartion method
  appendChild: function(e) {
    return e.nodeType === J ? this.insertBefore(e, null) : qn(this, e);
  },
  setAttributeNode: function(e) {
    return this.attributes.setNamedItem(e);
  },
  setAttributeNodeNS: function(e) {
    return this.attributes.setNamedItemNS(e);
  },
  removeAttributeNode: function(e) {
    return this.attributes.removeNamedItem(e.nodeName);
  },
  //get real attribute name,and remove it by removeAttributeNode
  removeAttributeNS: function(e, t) {
    var n = this.getAttributeNodeNS(e, t);
    n && this.removeAttributeNode(n);
  },
  hasAttributeNS: function(e, t) {
    return this.getAttributeNodeNS(e, t) != null;
  },
  getAttributeNS: function(e, t) {
    var n = this.getAttributeNodeNS(e, t);
    return n && n.value || "";
  },
  setAttributeNS: function(e, t, n) {
    var r = this.ownerDocument.createAttributeNS(e, t);
    r.value = r.nodeValue = "" + n, this.setAttributeNode(r);
  },
  getAttributeNodeNS: function(e, t) {
    return this.attributes.getNamedItemNS(e, t);
  },
  getElementsByTagName: function(e) {
    return new Ee(this, function(t) {
      var n = [];
      return Ce(t, function(r) {
        r !== t && r.nodeType == K && (e === "*" || r.tagName == e) && n.push(r);
      }), n;
    });
  },
  getElementsByTagNameNS: function(e, t) {
    return new Ee(this, function(n) {
      var r = [];
      return Ce(n, function(i) {
        i !== n && i.nodeType === K && (e === "*" || i.namespaceURI === e) && (t === "*" || i.localName == t) && r.push(i);
      }), r;
    });
  }
};
Le.prototype.getElementsByTagName = pe.prototype.getElementsByTagName;
Le.prototype.getElementsByTagNameNS = pe.prototype.getElementsByTagNameNS;
k(pe, X);
function Pe() {
}
Pe.prototype.nodeType = he;
k(Pe, X);
function Oe() {
}
Oe.prototype = {
  data: "",
  substringData: function(e, t) {
    return this.data.substring(e, e + t);
  },
  appendData: function(e) {
    e = this.data + e, this.nodeValue = this.data = e, this.length = e.length;
  },
  insertData: function(e, t) {
    this.replaceData(e, 0, t);
  },
  appendChild: function(e) {
    throw new Error(H[Wn]);
  },
  deleteData: function(e, t) {
    this.replaceData(e, t, "");
  },
  replaceData: function(e, t, n) {
    var r = this.data.substring(0, e), i = this.data.substring(e + t);
    n = r + n + i, this.nodeValue = this.data = n, this.length = n.length;
  }
};
k(Oe, X);
function tt() {
}
tt.prototype = {
  nodeName: "#text",
  nodeType: Be,
  splitText: function(e) {
    var t = this.data, n = t.substring(e);
    t = t.substring(0, e), this.data = this.nodeValue = t, this.length = t.length;
    var r = this.ownerDocument.createTextNode(n);
    return this.parentNode && this.parentNode.insertBefore(r, this.nextSibling), r;
  }
};
k(tt, Oe);
function nt() {
}
nt.prototype = {
  nodeName: "#comment",
  nodeType: Mt
};
k(nt, Oe);
function rt() {
}
rt.prototype = {
  nodeName: "#cdata-section",
  nodeType: Ut
};
k(rt, Oe);
function it() {
}
it.prototype.nodeType = zt;
k(it, X);
function jt() {
}
jt.prototype.nodeType = kn;
k(jt, X);
function Xt() {
}
Xt.prototype.nodeType = Xn;
k(Xt, X);
function ot() {
}
ot.prototype.nodeType = bt;
k(ot, X);
function Ve() {
}
Ve.prototype.nodeName = "#document-fragment";
Ve.prototype.nodeType = J;
k(Ve, X);
function st() {
}
st.prototype.nodeType = Bt;
k(st, X);
function kt() {
}
kt.prototype.serializeToString = function(e, t, n) {
  return Wt.call(e, t, n);
};
X.prototype.toString = Wt;
function Wt(e, t) {
  var n = [], r = this.nodeType == 9 && this.documentElement || this, i = r.prefix, o = r.namespaceURI;
  if (o && i == null) {
    var i = r.lookupPrefix(o);
    if (i == null)
      var u = [
        { namespace: o, prefix: null }
        //{namespace:uri,prefix:''}
      ];
  }
  return me(this, n, e, t, u), n.join("");
}
function It(e, t, n) {
  var r = e.prefix || "", i = e.namespaceURI;
  if (!r && !i || r === "xml" && i === "http://www.w3.org/XML/1998/namespace" || i == "http://www.w3.org/2000/xmlns/")
    return !1;
  for (var o = n.length; o--; ) {
    var u = n[o];
    if (u.prefix == r)
      return u.namespace != i;
  }
  return !0;
}
function me(e, t, n, r, i) {
  if (r)
    if (e = r(e), e) {
      if (typeof e == "string") {
        t.push(e);
        return;
      }
    } else
      return;
  switch (e.nodeType) {
    case K:
      i || (i = []), i.length;
      var o = e.attributes, u = o.length, f = e.firstChild, N = e.tagName;
      n = jn === e.namespaceURI || n, t.push("<", N);
      for (var d = 0; d < u; d++) {
        var E = o.item(d);
        E.prefix == "xmlns" ? i.push({ prefix: E.localName, namespace: E.value }) : E.nodeName == "xmlns" && i.push({ prefix: "", namespace: E.value });
      }
      for (var d = 0; d < u; d++) {
        var E = o.item(d);
        if (It(E, n, i)) {
          var D = E.prefix || "", C = E.namespaceURI, _ = D ? " xmlns:" + D : " xmlns";
          t.push(_, '="', C, '"'), i.push({ prefix: D, namespace: C });
        }
        me(E, t, n, r, i);
      }
      if (It(e, n, i)) {
        var D = e.prefix || "", C = e.namespaceURI;
        if (C) {
          var _ = D ? " xmlns:" + D : " xmlns";
          t.push(_, '="', C, '"'), i.push({ prefix: D, namespace: C });
        }
      }
      if (f || n && !/^(?:meta|link|img|br|hr|input)$/i.test(N)) {
        if (t.push(">"), n && /^script$/i.test(N))
          for (; f; )
            f.data ? t.push(f.data) : me(f, t, n, r, i), f = f.nextSibling;
        else
          for (; f; )
            me(f, t, n, r, i), f = f.nextSibling;
        t.push("</", N, ">");
      } else
        t.push("/>");
      return;
    case Pt:
    case J:
      for (var f = e.firstChild; f; )
        me(f, t, n, r, i), f = f.nextSibling;
      return;
    case he:
      return t.push(" ", e.name, '="', e.value.replace(/[<&"]/g, vt), '"');
    case Be:
      return t.push(
        e.data.replace(/[<&]/g, vt).replace(/]]>/g, "]]&gt;")
      );
    case Ut:
      return t.push("<![CDATA[", e.data, "]]>");
    case Mt:
      return t.push("<!--", e.data, "-->");
    case zt:
      var m = e.publicId, a = e.systemId;
      if (t.push("<!DOCTYPE ", e.name), m)
        t.push(" PUBLIC ", m), a && a != "." && t.push(" ", a), t.push(">");
      else if (a && a != ".")
        t.push(" SYSTEM ", a, ">");
      else {
        var l = e.internalSubset;
        l && t.push(" [", l, "]"), t.push(">");
      }
      return;
    case Bt:
      return t.push("<?", e.target, " ", e.data, "?>");
    case bt:
      return t.push("&", e.nodeName, ";");
    default:
      t.push("??", e.nodeName);
  }
}
function Kt(e, t, n) {
  var r;
  switch (t.nodeType) {
    case K:
      r = t.cloneNode(!1), r.ownerDocument = e;
    case J:
      break;
    case he:
      n = !0;
      break;
  }
  if (r || (r = t.cloneNode(!1)), r.ownerDocument = e, r.parentNode = null, n)
    for (var i = t.firstChild; i; )
      r.appendChild(Kt(e, i, n)), i = i.nextSibling;
  return r;
}
function We(e, t, n) {
  var r = new t.constructor();
  for (var i in t) {
    var o = t[i];
    typeof o != "object" && o != r[i] && (r[i] = o);
  }
  switch (t.childNodes && (r.childNodes = new ne()), r.ownerDocument = e, r.nodeType) {
    case K:
      var u = t.attributes, N = r.attributes = new Me(), d = u.length;
      N._ownerElement = r;
      for (var E = 0; E < d; E++)
        r.setAttributeNode(We(e, u.item(E), !0));
      break;
    case he:
      n = !0;
  }
  if (n)
    for (var D = t.firstChild; D; )
      r.appendChild(We(e, D, n)), D = D.nextSibling;
  return r;
}
function Yt(e, t, n) {
  e[t] = n;
}
try {
  if (Object.defineProperty) {
    let e = function(t) {
      switch (t.nodeType) {
        case K:
        case J:
          var n = [];
          for (t = t.firstChild; t; )
            t.nodeType !== 7 && t.nodeType !== 8 && n.push(e(t)), t = t.nextSibling;
          return n.join("");
        default:
          return t.nodeValue;
      }
    };
    Object.defineProperty(Ee.prototype, "length", {
      get: function() {
        return Qe(this), this.$$length;
      }
    }), Object.defineProperty(X.prototype, "textContent", {
      get: function() {
        return e(this);
      },
      set: function(t) {
        switch (this.nodeType) {
          case K:
          case J:
            for (; this.firstChild; )
              this.removeChild(this.firstChild);
            (t || String(t)) && this.appendChild(this.ownerDocument.createTextNode(t));
            break;
          default:
            this.data = t, this.value = t, this.nodeValue = t;
        }
      }
    }), Yt = function(t, n, r) {
      t["$$" + n] = r;
    };
  }
} catch {
}
Se.Node = X;
Se.DOMException = se;
Se.DOMImplementation = Ht;
Se.XMLSerializer = kt;
function qt(e) {
  this.options = e || { locator: {} };
}
qt.prototype.parseFromString = function(e, t) {
  var n = this.options, r = new er(), i = n.domBuilder || new Ge(), o = n.errorHandler, u = n.locator, N = n.xmlns || {}, d = /\/x?html?$/.test(t), E = d ? Qn.entityMap : { lt: "<", gt: ">", amp: "&", quot: '"', apos: "'" };
  return u && i.setDocumentLocator(u), r.errorHandler = Jn(o, i, u), r.domBuilder = n.domBuilder || i, d && (N[""] = "http://www.w3.org/1999/xhtml"), N.xml = N.xml || "http://www.w3.org/XML/1998/namespace", e && typeof e == "string" ? r.parse(e, N, E) : r.errorHandler.error("invalid doc source"), i.doc;
};
function Jn(e, t, n) {
  if (!e) {
    if (t instanceof Ge)
      return t;
    e = t;
  }
  var r = {}, i = e instanceof Function;
  n = n || {};
  function o(u) {
    var N = e[u];
    !N && i && (N = e.length == 2 ? function(d) {
      e(u, d);
    } : e), r[u] = N && function(d) {
      N("[xmldom " + u + "]	" + d + Ke(n));
    } || function() {
    };
  }
  return o("warning"), o("error"), o("fatalError"), r;
}
function Ge() {
  this.cdata = !1;
}
function le(e, t) {
  t.lineNumber = e.lineNumber, t.columnNumber = e.columnNumber;
}
Ge.prototype = {
  startDocument: function() {
    this.doc = new nr().createDocument(null, null, null), this.locator && (this.doc.documentURI = this.locator.systemId);
  },
  startElement: function(e, t, n, r) {
    var i = this.doc, o = i.createElementNS(e, n || t), u = r.length;
    Fe(this, o), this.currentElement = o, this.locator && le(this.locator, o);
    for (var N = 0; N < u; N++) {
      var e = r.getURI(N), d = r.getValue(N), n = r.getQName(N), E = i.createAttributeNS(e, n);
      this.locator && le(r.getLocator(N), E), E.value = E.nodeValue = d, o.setAttributeNode(E);
    }
  },
  endElement: function(e, t, n) {
    var r = this.currentElement;
    r.tagName, this.currentElement = r.parentNode;
  },
  startPrefixMapping: function(e, t) {
  },
  endPrefixMapping: function(e) {
  },
  processingInstruction: function(e, t) {
    var n = this.doc.createProcessingInstruction(e, t);
    this.locator && le(this.locator, n), Fe(this, n);
  },
  ignorableWhitespace: function(e, t, n) {
  },
  characters: function(e, t, n) {
    if (e = _t.apply(this, arguments), e) {
      if (this.cdata)
        var r = this.doc.createCDATASection(e);
      else
        var r = this.doc.createTextNode(e);
      this.currentElement ? this.currentElement.appendChild(r) : /^\s*$/.test(e) && this.doc.appendChild(r), this.locator && le(this.locator, r);
    }
  },
  skippedEntity: function(e) {
  },
  endDocument: function() {
    this.doc.normalize();
  },
  setDocumentLocator: function(e) {
    (this.locator = e) && (e.lineNumber = 0);
  },
  //LexicalHandler
  comment: function(e, t, n) {
    e = _t.apply(this, arguments);
    var r = this.doc.createComment(e);
    this.locator && le(this.locator, r), Fe(this, r);
  },
  startCDATA: function() {
    this.cdata = !0;
  },
  endCDATA: function() {
    this.cdata = !1;
  },
  startDTD: function(e, t, n) {
    var r = this.doc.implementation;
    if (r && r.createDocumentType) {
      var i = r.createDocumentType(e, t, n);
      this.locator && le(this.locator, i), Fe(this, i);
    }
  },
  /**
   * @see org.xml.sax.ErrorHandler
   * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
   */
  warning: function(e) {
    console.warn("[xmldom warning]	" + e, Ke(this.locator));
  },
  error: function(e) {
    console.error("[xmldom error]	" + e, Ke(this.locator));
  },
  fatalError: function(e) {
    throw new tr(e, this.locator);
  }
};
function Ke(e) {
  if (e)
    return `
@` + (e.systemId || "") + "#[line:" + e.lineNumber + ",col:" + e.columnNumber + "]";
}
function _t(e, t, n) {
  return typeof e == "string" ? e.substr(t, n) : e.length >= t + n || t ? new java.lang.String(e, t, n) + "" : e;
}
"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function(e) {
  Ge.prototype[e] = function() {
    return null;
  };
});
function Fe(e, t) {
  e.currentElement ? e.currentElement.appendChild(t) : e.doc.appendChild(t);
}
var Qn = At, Jt = Je, er = Jt.XMLReader, tr = Jt.ParseError, nr = Se.DOMImplementation, rr = qt;
const Qt = z.dirname(on(import.meta.url));
process.env.APP_ROOT = z.join(Qt, "..");
const Ye = process.env.VITE_DEV_SERVER_URL, mr = z.join(process.env.APP_ROOT, "dist-electron"), en = z.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = Ye ? z.join(process.env.APP_ROOT, "public") : en;
let te;
function tn() {
  te = new Ct({
    icon: z.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: z.join(Qt, "preload.mjs")
    }
  }), te.webContents.on("did-finish-load", () => {
    te == null || te.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), Ye ? te.loadURL(Ye) : te.loadFile(z.join(en, "index.html"));
}
be.on("window-all-closed", () => {
  process.platform !== "darwin" && (be.quit(), te = null);
});
be.on("activate", () => {
  Ct.getAllWindows().length === 0 && tn();
});
be.whenReady().then(() => {
  tn(), De.handle("open-file", async (e, t) => {
    try {
      return await xe.promises.access(t, xe.constants.F_OK), t;
    } catch (n) {
      throw console.error("Error opening file:", n), new Error("Failed to open file");
    }
  }), De.handle("open-file-dialog", async (e, t) => {
    try {
      const { canceled: n, filePaths: r } = await nn.showOpenDialog({
        properties: ["openFile"],
        filters: t || [{ name: "All Files", extensions: ["*"] }]
      });
      return n || r.length === 0 ? null : r[0];
    } catch (n) {
      throw console.error("Error showing open dialog:", n), new Error("Failed to show open dialog");
    }
  }), De.handle("unzip-epub", async (e, t) => {
    var n, r, i;
    try {
      await xe.promises.access(t, xe.constants.F_OK);
      const o = new Mn(t), u = o.getEntries(), N = u.map((m) => ({
        name: m.entryName,
        isDirectory: m.isDirectory,
        size: m.header.size
      })), d = ((n = o.getEntry("META-INF/container.xml")) == null ? void 0 : n.getData().toString("utf8")) || null;
      let E = null, D = [], C = null;
      if (d) {
        const m = d.match(/full-path="([^"]+\.opf)"/i);
        m && m[1] && (C = m[1], console.log("Found OPF path from container.xml:", C));
      }
      let _ = null;
      if (C) {
        const m = o.getEntry(C);
        m && (_ = m.getData().toString("utf8"), console.log("Successfully loaded OPF file from", C));
      }
      if (!_) {
        const m = u.find(
          (a) => a.entryName.endsWith(".opf") || a.entryName.includes("content.opf")
        );
        m && (C = m.entryName, _ = m.getData().toString("utf8"), console.log("Found OPF file by searching:", C));
      }
      let f = [];
      if (_)
        try {
          const a = new rr().parseFromString(_, "application/xml"), l = a.getElementsByTagName("dc:title")[0], p = a.getElementsByTagName("dc:creator")[0], s = a.getElementsByTagName("dc:language")[0], c = a.getElementsByTagName("dc:publisher")[0];
          E = {
            title: l != null && l.textContent ? l.textContent.trim() : "Unknown Title",
            creator: p != null && p.textContent ? p.textContent.trim() : "Unknown Author",
            language: s != null && s.textContent ? s.textContent.trim() : "Unknown",
            publisher: c != null && c.textContent ? c.textContent.trim() : "",
            opfPath: C || "Unknown",
            opfContent: _
          }, console.log("Extracted metadata from XML:", E);
          const h = (r = a.getElementsByTagName("manifest")[0]) == null ? void 0 : r.getElementsByTagName("item"), g = {};
          if (h)
            for (let L = 0; L < h.length; L++) {
              const v = h[L], w = v.getAttribute("id"), S = v.getAttribute("href"), O = v.getAttribute("media-type");
              w && S && (g[w] = { id: w, href: S, mediaType: O });
            }
          console.log("Found manifest items:", Object.keys(g).length);
          const y = C ? z.dirname(C) + "/" : "", T = (i = a.getElementsByTagName("spine")[0]) == null ? void 0 : i.getElementsByTagName("itemref");
          if (T)
            for (let L = 0; L < T.length; L++) {
              const w = T[L].getAttribute("idref");
              if (w && g[w]) {
                const S = g[w], O = y + S.href;
                f.push({
                  idref: w,
                  id: S.id,
                  href: S.href,
                  mediaType: S.mediaType,
                  fullPath: O
                });
              }
            }
          console.log("Extracted spine items:", f.length), De.handle("get-spine-item-content", async (L, v) => {
            var w;
            try {
              const S = o.getEntries();
              console.log(`EPUB contains ${S.length} files, looking for: ${v}`), console.log(`File basename: ${z.basename(v)}, directory: ${z.dirname(v)}`);
              let O = o.getEntry(v);
              if (!O) {
                if (console.log(`Spine item not found at exact path: ${v}, trying variations...`), v.startsWith("./")) {
                  const R = v.substring(2);
                  O = o.getEntry(R), O && console.log(`Found at normalized path without ./: ${R}`);
                }
                if (!O && !v.startsWith("./")) {
                  const R = "./" + v;
                  O = o.getEntry(R), O && console.log(`Found with added ./: ${R}`);
                }
                if (!O && !v.startsWith("OEBPS/")) {
                  const R = "OEBPS/" + (v.startsWith("./") ? v.substring(2) : v);
                  O = o.getEntry(R), O && console.log(`Found with OEBPS/ prefix: ${R}`);
                }
                if (!O) {
                  const R = z.basename(v);
                  console.log(`Looking for filename: ${R} in any directory`), console.log("All available files in EPUB:"), S.forEach((F) => {
                    F.isDirectory || console.log(`- ${F.entryName}`);
                  });
                  const $ = S.filter((F) => {
                    if (F.isDirectory) return !1;
                    const A = z.basename(F.entryName).toLowerCase(), G = z.dirname(F.entryName).toLowerCase(), re = R.toLowerCase(), Y = z.dirname(v).toLowerCase();
                    if (A === re || F.entryName.toLowerCase().endsWith("/" + re)) return !0;
                    const q = G.split("/"), ie = Y.split("/").some(
                      (Ne) => Ne.length > 0 && q.includes(Ne)
                    ), je = re.replace(/\.(x?html|htm)$/i, ""), Ae = A.replace(/\.(x?html|htm)$/i, "");
                    return !!(je === Ae || ie && A.includes(je));
                  });
                  $.length > 0 ? (O = $[0], console.log(`Found matching file by filename: ${O.entryName}`), console.log(`Match details: requested=${R}, found=${z.basename(O.entryName)}`), console.log(`Full paths: requested=${v}, found=${O.entryName}`), $.length > 1 && (console.log(`Note: Multiple matches found for ${R}:`), $.forEach((F) => console.log(`- ${F.entryName}`)))) : (console.log(`⚠️ No matching files found for ${R} after trying all resolution methods`), console.log("Sample of available files:"), S.slice(0, 10).forEach((F) => {
                    F.isDirectory || console.log(`- ${F.entryName} (${z.basename(F.entryName)})`);
                  }));
                }
              }
              if (O) {
                const R = O.getData().toString("utf8"), $ = O.entryName, F = [], A = R.match(/href=['"]([^'"]*\.css)['"]|@import\s+['"]([^'"]*\.css)['"]/g);
                if (A) {
                  console.log(`Found CSS references in ${$}:`, A);
                  const G = z.dirname($);
                  for (const re of A) {
                    const Y = (w = re.match(/['"]([^'"]*\.css)['"]/)) == null ? void 0 : w[1];
                    if (Y) {
                      let q = null;
                      const at = [
                        z.join(G, Y).replace(/\\/g, "/"),
                        // Relative to HTML file
                        Y,
                        // Direct path as in the HTML
                        Y.startsWith("./") ? Y.substring(2) : Y
                        // Without leading ./
                      ];
                      for (const ie of at)
                        if (q = o.getEntry(ie), q) {
                          console.log(`Found CSS file at: ${ie}`);
                          break;
                        }
                      if (!q) {
                        const ie = z.basename(Y), Ae = o.getEntries().filter(
                          (Ne) => Ne.entryName.endsWith("/" + ie) || Ne.entryName === ie
                        );
                        Ae.length > 0 && (q = Ae[0], console.log(`Found CSS by filename: ${q.entryName}`));
                      }
                      q ? F.push({
                        path: q.entryName,
                        content: q.getData().toString("utf8")
                      }) : console.warn(`Referenced CSS file not found: ${Y}`);
                    }
                  }
                }
                return {
                  success: !0,
                  content: R,
                  path: $,
                  cssFiles: F
                };
              } else
                return console.error(`Spine item file not found: ${v} (tried multiple variations)`), {
                  success: !1,
                  error: `File not found in EPUB: ${v}. The file may be missing, have a different path, or use a different file extension (.html/.xhtml).`,
                  requestedPath: v,
                  availableFiles: S.slice(0, 10).map((R) => R.entryName)
                };
            } catch (S) {
              return console.error(`Error getting spine item content for ${v}:`, S), {
                success: !1,
                error: S instanceof Error ? S.message : String(S)
              };
            }
          });
        } catch (m) {
          console.error("Error parsing OPF XML:", m);
          const a = _.match(/<dc:title[^>]*>(.*?)<\/dc:title>/i), l = _.match(/<dc:creator[^>]*>(.*?)<\/dc:creator>/i), p = _.match(/<dc:language[^>]*>(.*?)<\/dc:language>/i), s = _.match(/<dc:publisher[^>]*>(.*?)<\/dc:publisher>/i);
          E = {
            title: a ? a[1] : "Unknown Title",
            creator: l ? l[1] : "Unknown Author",
            language: p ? p[1] : "Unknown",
            publisher: s ? s[1] : "",
            opfPath: C || "Unknown",
            opfContent: _
          };
        }
      return {
        path: t,
        entries: N,
        containerXml: d,
        metadata: E,
        spine: f,
        toc: D
      };
    } catch (o) {
      throw console.error("Error parsing EPUB:", o), new Error(`Failed to parse EPUB: ${o instanceof Error ? o.message : String(o)}`);
    }
  }), De.handle("api-request", async (e, t, n, r, i = !1) => {
    try {
      return console.log(`API Request: ${n} ${t}`), console.log("Request data:", r), console.log("Binary mode:", i), new Promise((o, u) => {
        const N = rn.request({
          method: n,
          url: t,
          redirect: "follow"
        });
        if (N.setHeader("Content-Type", "application/json"), N.on("response", (d) => {
          if (console.log(`Response status: ${d.statusCode}`), console.log("Response headers:", d.headers), d.statusCode !== 200) {
            u(new Error(`Request failed with status code ${d.statusCode}`));
            return;
          }
          if (i) {
            const E = [];
            d.on("data", (D) => {
              E.push(Buffer.from(D));
            }), d.on("end", () => {
              try {
                const D = Buffer.concat(E);
                console.log(`Received binary data: ${D.length} bytes`), console.log(`Content-Type: ${d.headers["content-type"] || "unknown"}`);
                const C = d.headers["content-type"] || "audio/mpeg";
                o({
                  data: D.toString("base64"),
                  contentType: C
                });
              } catch (D) {
                console.error("Error processing binary response:", D), u(D);
              }
            });
          } else {
            let E = "";
            d.on("data", (D) => {
              E += D.toString();
            }), d.on("end", () => {
              try {
                const D = JSON.parse(E);
                o(D);
              } catch {
                o(E);
              }
            });
          }
        }), N.on("error", (d) => {
          u(d);
        }), r) {
          const d = JSON.stringify(r);
          N.write(d);
        }
        N.end();
      });
    } catch (o) {
      throw console.error("Error making API request:", o), o;
    }
  });
});
export {
  mr as MAIN_DIST,
  en as RENDERER_DIST,
  Ye as VITE_DEV_SERVER_URL
};
