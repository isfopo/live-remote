import type { Optional } from "./Utility";

export enum Method {
  /** Used to check client code */
  AUTH = "AUTH",
  /** calls a method on object */
  CALL = "CALL",
  /** request for the value of a given property */
  GET = "GET",
  /** changes value of given property */
  SET = "SET",
  /** creates listener for given property */
  LISTEN = "LISTEN",
  /** removes lister for given property */
  UNLISTEN = "UNLISTEN",
}

export enum Status {
  SUCCESS = 200,
  FAILURE = 400,
}

export interface Message {
  /** action to take */
  method: Method;
  /** location of property or method */
  address: string;
  /** property or method */
  prop: string;
  /** Value of or to set property */
  value: string | number | boolean | Array<string | number | boolean>;
}

export interface IncomingMessage extends Message {
  /** status of request */
  status: Status;
}

export interface OutgoingMessage extends Optional<Message, "value"> {
  /** Overrides typeof for python friendly types */
  type?: "int" | "float" | "string" | "boolean";
}
