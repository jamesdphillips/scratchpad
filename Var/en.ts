import { SetFn, GetFn } from "../core/en";
import { Mapping } from "../Mapping/en";
import { Reversible, tag, unwrap } from "../Reversible/en";

export interface Variable<
  Value,
  Getter extends () => Value = GetFn<Value>,
  Setter extends (_: Value) => void = SetFn<Value>
> {
  get: Getter;
  set: Setter;
}

// const v0: Variable<string> = {
//   get() {
//     return "true";
//   },
//   set(v: string) {
//     console.debug(v);
//   },
// };

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

// const v: HrefableVariable<URLSearchParams> = {} as any;
// const f = v.set[href](new URLSearchParams("?123"));

// const y: HrefableVariable<URLSearchParams>;
// const z = y.set[href];

export function local<T>(impl: T = 0 as any): Variable<T> {
  return {
    get: () => impl,
    set(next: T) {
      impl = next;
    },
  };
}

interface Locationable {
  location: Location;
}
export function location(impl: Locationable = window): Variable<URL> {
  return {
    get() {
      return new URL(impl.location.toString());
    },
    set(url: URL) {
      impl.location.replace(url.toString());
    },
  };
}

// const num: { one: number } = { one: 1 };
// const myVar = extract(num, "one");

export function extract<Obj extends object, Prop extends keyof Obj>(
  obj: Obj,
  prop: Prop
): Variable<Obj[Prop]> {
  return Object.getOwnPropertyDescriptor(obj, prop) as Variable<Obj[Prop]>;
}

export function defineProperty<
  T,
  Target extends object,
  Props extends PropertyKey
>(target: Target, prop: Props, impl: Variable<T>) {
  return Object.defineProperty(target, prop, impl) as Target & Record<Props, T>;
}

// const x = location();
// const y = Object.defineProperty(x, "test", x);
// const z = defineProperty(x, "test", x);

type Proxy<T> = (_: T) => T;

function tap<V>(fn: (_: V) => any) {
  return (v: V) => {
    fn(v);
    return v;
  };
}

/**
 * Hrefable
 *
 * - we need the receiver chain!
 *
 */

/**
 * The translator takes one type and replaces it with another
 *
 * - translator needs to take the bidirectional mapping
 * - we can't lose any properties associated with the input, eg. Hrefable<>
 */

export function logger<T extends Variable<any>>(v: T): T {
  v.get = () => tap((v: T["get"]) => console.log(v))(v.get());
  v.set = (val: T["set"]) => {
    console.log("<logger />", val);
    v.set(val);
  };
  return v;
}

// const a: HrefableVariable<URLSearchParams> = null;
// const b = logger(a);

// function

// function useURLSearchParams(): HrefableVariable<URLSearchParams> {
//   // connect to react-router, et al.
// }

export function transfom<T, M>(
  v: Variable<T>,
  bmap: Reversible<Mapping<T, M>>
): Omit<typeof v, "get" | "set"> & Variable<M> {
  return {
    ...v,
    get: Object.assign({}, v.get, () => bmap(v.get())),
    set: Object.assign({}, v.set, (val) => v.set(unwrap(bmap)(val))),
  };
}


const t0: Mapping<string, number> = (str: string) => parseInt(str, 10);
const t1: Mapping<number, string> = (n: number) => n.toString();
const t2 = tag(t0, t1);
