import { URLSearchParams } from "url";

type Thunk<Value> = () => Value;
type SetFn<Value> = (_: Value) => void;

interface Variable<
  Value,
  Getter extends () => Value = Thunk<Value>,
  Setter extends (_: Value) => void = SetFn<Value>,
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

type Hrefable<Fn extends (...any) => any, Params extends Parameters<Fn> = Parameters<Fn>> = Fn & {
  [href]: (...Params) => URL;
}

interface HrefableVariable<T> extends Variable<T> {
  set: Hrefable<Variable<T>["set"]>;
}

const v: HrefableVariable<URLSearchParams> = {} as any;
const f = v.set[href](new URLSearchParams("?123"));

// const y: HrefableVariable<URLSearchParams>;
// const z = y.set[href];

function toHrefableVariable(sdf: string): HrefableVariable<URLSearchParams> {
  return {};
}

function toVariable(sdf: string): HrefableVariable<URLSearchParams> {
  return {};
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
  return {
    get() {
      return new URL (impl.location.toString());
    },
    set(url: URL) {
      impl.location.replace(url.toString());
    }
  };
}

const num: { one: number } = { one: 1 };
const myVar = extract(num, "one");

export function extract<Obj extends object, Prop extends keyof Obj>(obj: Obj, prop: Prop): Variable<Obj[Prop]> {
  return Object.getOwnPropertyDescriptor(obj, prop) as Variable<Obj[Prop]>;
}

export function defineProperty<T, Target extends object, Props extends PropertyKey, >(target: Target, prop: Props, impl: Variable<T>): Target & { [typeof prop]: T } {
  return Object.defineProperty(target, prop, impl);
}

const x = location();
const y = Object.defineProperty(x, "test", x);
const z = defineProperty(x, "test", x);

type Proxy<T> = (_: T) => T;

export function tag<T extends (...any) => any, Params extends Parameters<T>>(fn: T, impl: (...Params) => URL): Hrefable<T> {
  return {
    ...fn,
    [href]: impl,
  }
}

function tap<V>(fn: (_: V) => any) {
  return (v: V) => {
    fn(v);
    return v;
  }
}

function hrefify<T extends URLSearchParams>(v: Variable<T>, url: Thunk<URL>): HrefableVariable<URLSearchParams> {
  let mirror = new URLSearchParams();

  const setter 
  return {
    get: v.get,
    set: tag(v.set, (val: URLSearchParams) => 
      tap((url: URL) => url.search = val.toString())(url())
    ,
  }
}

/**
 * The translator takes one type and replaces it with another
 * 
 * - translator needs to take the bidirectional mapping
 * - we can't lose any properties associated with the input, eg. Hrefable<>
 */

function logger<T extends Variable<any>>(v: T): T {
  v.get = () => tap((v: T['get']) => console.log(v))(v.get());
  v.set = (val: T['set']) => {
    console.log(val);
    v.set(val);
  }
  return v;
}

const a: HrefableVariable<URLSearchParams>;
const b = logger(a);


function useURLSearchParams(): HrefableVariable<URLSearchParams> {
  // connect to react-router, et al.
}


