export type Live = {
  song: Song;
};

export interface Song {
  is_playing: number;
  record_mode: number;
  tempo: number | undefined;
}
