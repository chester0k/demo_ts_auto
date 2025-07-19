function cloneJSON<T>(sample: T): T {
  return JSON.parse(JSON.stringify(sample));
}

export { cloneJSON };
