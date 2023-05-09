type OmitFirstArg<T> = T extends (arg1: any, ...args: infer R) => infer U
  ? (...args: R) => U
  : never;
type CurryInterface<T> = {
  [P in keyof T]: OmitFirstArg<T[P]>;
};

const curriableProperties = [
  "append",
  "delete",
  "get",
  "getAll",
  "has",
  "set",
] as const;
type URLSearchParamsCurriableProperties = (typeof curriableProperties)[number];
export type URLSearchParam = CurryInterface<
  Pick<URLSearchParams, URLSearchParamsCurriableProperties>
>;

export function toURLSearchParam(
  params: Pick<URLSearchParams, URLSearchParamsCurriableProperties>,
  property: PropertyKey
): URLSearchParam {
  return curry(params, property);
}

export interface URLSearchProperties {
  [_: string]: URLSearchParam;
}

export function toURLSearchProperties(
  search: URLSearchParams
): URLSearchProperties {
  return new Proxy(search as object, {
    get(_, prop) {
      return toURLSearchParam(search, prop);
    },
  }) as URLSearchProperties;
}

function curry<T extends object>(target: T, arg: any): CurryInterface<T> {
  return new Proxy(target, {
    get(target, prop) {
      return target[prop](arg)(arg, ...arguments);
    },
  }) as CurryInterface<T>;
}
