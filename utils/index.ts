export const makeUniqueArray = (array: any, key: string) => {
  let uniqueObjArray = [
    // @ts-ignore
    ...new Map(array.map((item: any) => [item[key], item])).values(),
  ];

  return uniqueObjArray;
};
