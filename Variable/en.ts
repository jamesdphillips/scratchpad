interface Variable<
  Value,
  Getter extends () => Value = () => Value,
  Setter extends (_: Value) => void = (_: Value) => void,
> {
  get: Getter;
  set: Setter;
}

const v0: Variable<string> = {
  get() {
    return "true";
  },
  set(v: string) {
    console.debug(v);
  },
};

// interface Encoder<L, R> {
//   encode(L): R;
// }

// interface Decoder<L, R> {
//   decode(L): R;
// }

// type Codec<L, R> = Encoder<L, R> & Decoder<L, R>;

// function transform<L, R>(source: L, transformer: Codec<L, R>): R {
//   return transformer.decode(transformer.encode(source));
// }

const reverse = Symbol("reverse");

type Mapper<From, To> = {
  (_: From): To;
};

type BMap<M extends Mapper<From, To>, From, To> = M & {
  [reverse](_: To): From;
};

const href = Symbol("href");

type Hrefable<T extends Function> = T & {
  [href]: T;
}

const v: Variable<URLSearchParams>;

interface HrefableVariable<T> {
  get(): T
  set: Hrefable<(_: T) => void>;
}

// const y: HrefableVariable<URLSearchParams>;
// const z = y.set[href];

function toHrefableVariable(sdf: string): HrefableVariable<URLSearchParams> {
  return {};
}

function toVariable(sdf: string): HrefableVariable<URLSearchParams> {
  return {};
}

export function create<
  Value,
  Getter extends () => Value = () => Value,
  Setter extends (_: Value) => void = (_: Value) => void,
>(get: Getter, set: Setter): Variable<Value, Getter, Setter> {
  return {
    get,
    set,
  };
}

export function local<T>(impl: T = (0 as any)): Variable<T> {
  return {
    get: () => impl,
    set(next: T) {
      impl = next;
    },
  };
}

interface Locationable {
  location: Location
}
export function location(impl: Locationable = window): Variable<URL> {

}

function useURLSearchParams((search: ) => );
