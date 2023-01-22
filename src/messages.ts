import Portals, { getInitialContext } from "@ionic/portals";
import {
  IInitialContext,
  IMessage,
  IMessageSubscription,
  IPortalSubscription,
  ISubscribeOptions,
  ISubscriptionCallback,
} from "./types";

export const SendMessage = async (params: IMessage) => {
  const { topic, data } = params;

  return Portals.publish<IMessage>({ topic, data });
};

export const SubscribeToMessage = async (
  options: ISubscribeOptions,
  callback: ISubscriptionCallback
): Promise<IPortalSubscription> => {
  return Portals.subscribe<IMessageSubscription>(options, callback);
};

export const UnsubscribeToMessage = async (
  options: IPortalSubscription
): Promise<void> => {
  return Portals.unsubscribe(options);
};

export const GetInitialContext = <T = unknown>():
  | IInitialContext<T>
  | undefined => {
  return getInitialContext();
};
