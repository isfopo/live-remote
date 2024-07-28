export type Live = {
  song: Song;
};

export type Song = {
  is_playing: number;
  record_mode: number;
  tempo: number | undefined;
};
