export type Song = {
  previewUrl: string;
  imageUrl: string;
  name: string;
  artist: string;
  color: string;
};

export const songBook: { [s: string]: Song } = {
  electricfeel: {
    name: "Electric Feel",
    artist: "MGMT",
    color: "#4187FF",
    imageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738b32b139981e79f2ebe005eb",
    previewUrl:
      "https://p.scdn.co/mp3-preview/b288d1b3245bfa82243267c77fe152dbd696f3c8?cid=cfe923b2d660439caf2b557b21f31221",
  },

  good4u: {
    name: "good 4 u",
    artist: "Olivia Rodrigo",
    color: "#988AF6",
    imageUrl:
      "https://i.scdn.co/image/ab67616d0000b273a91c10fe9472d9bd89802e5a",
    previewUrl:
      "https://p.scdn.co/mp3-preview/b842388e0a8bb4c8667f77d645b25fdcd50961c1?cid=cfe923b2d660439caf2b557b21f31221",
  },

  humble: {
    name: "HUMBLE.",
    artist: "Kendrick Lamar",
    color: "#AB3D55",
    imageUrl:
      "https://i.scdn.co/image/ab67616d0000b2738b52c6b9bc4e43d873869699",
    previewUrl:
      "https://p.scdn.co/mp3-preview/4e6df1ccb505e0d8a8f79086c321762a2b84bfd8?cid=cfe923b2d660439caf2b557b21f31221",
  },

  lost: {
    name: "Lost",
    artist: "Frank Ocean",
    color: "#F07D25",
    imageUrl:
      "https://i.scdn.co/image/ab67616d0000b2737aede4855f6d0d738012e2e5",
    previewUrl:
      "https://p.scdn.co/mp3-preview/2d314c23e818fcd708b5224bf920520ccf69832c?cid=cfe923b2d660439caf2b557b21f31221",
  },

  northshore: {
    name: "Northshore",
    artist: "Tegan and Sara",
    color: "#C5C5C5",
    imageUrl:
      "https://i.scdn.co/image/ab67616d0000b27322e66fc444d17b2e8ccd20c6",
    previewUrl:
      "https://p.scdn.co/mp3-preview/fe6ca0d8c14ae06201036c6509f637678cbbf834?cid=cfe923b2d660439caf2b557b21f31221",
  },
};
