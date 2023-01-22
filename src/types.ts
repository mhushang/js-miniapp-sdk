import { MESSAGE_TOPICS } from "./constants";

export type TTopic = keyof typeof MESSAGE_TOPICS;

export interface ISubscribeOptions {
  topic: Partial<TTopic>;
}

export declare type ISubscriptionCallback<T = unknown> = (result: {
  topic: string;
  data: T;
}) => void;

export interface IMessage {
  topic: Partial<TTopic>;
  data: string;
}

export interface IMessageSubscription {
  options: ISubscribeOptions;
  callback: ISubscriptionCallback;
}

interface IPortalSubscriptionData {
  message: string;
}

export interface IPortalSubscription {
  subscriptionRef: number;
  topic: string;
  data?: IPortalSubscriptionData;
}

export interface IInitialContext<T = unknown> {
  name: string;
  value: T | undefined;
}
