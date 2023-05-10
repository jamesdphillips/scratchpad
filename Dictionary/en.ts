interface Dictionary<W, T> {
  get(word: W): T
  set(word: W, entry: T): void;

  getAll(word: W): Iterator<W>;
  append(word, entry: T): void;
}
