export const isMobile = screen.orientation.type !== "landscape-primary";

export const dates = [
  "20 septembre",
  "04 octobre",
  "18 octobre",
  "08 novembre",
  "22 novembre",
  "06 décembre",
  "13 décembre",
].map((el, index) => (isMobile ? el : `Dimanche ${el}`));

export const data = {
  k: ["bGliZXJjb3VydC1jcDU=", "SUBtc2hlb2w="],
  z: "YWNjb3VudA==",
  u: "bG9jYWxTdG9yYWdl",
  y: "Z2V0SXRlbQ==",
  w: "c2V0SXRlbQ==",
  a: "YWRtaW4=",
};
