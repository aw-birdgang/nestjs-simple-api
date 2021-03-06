/**
 * 값이 비어 있는지 확인한다.
 * @param obj - 값
 * @returns {boolean} - 값이 비어 있으면 true를 반환하고, 그렇지 않으면 false를 반환한다.
 */
export const isEmpty = (obj: any) => {
  return (
    [Object, Array].includes((obj || {}).constructor) &&
    !Object.entries(obj || {}).length
  );
};
