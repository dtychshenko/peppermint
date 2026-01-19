export function partition<T>(
  array: Array<T>,
  predicate: (item: T) => boolean,
): [Array<T>, Array<T>] {
  return array.reduce(
    (acc, item) => {
      if (predicate(item)) {
        acc[0].push(item);
      } else {
        acc[1].push(item);
      }
      return acc;
    },
    [[], []] as [Array<T>, Array<T>],
  );
}
