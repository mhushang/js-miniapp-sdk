import Portals, { SubscriptionCallback } from "@ionic/portals";

type Messages = { topic: "check"; data: "cancel" | "fail" | "success" };

export const publishCheck = () =>
  Portals.publish<Messages>({ topic: "check", data: "success" });

export const subscribeCheck = async (
  topic: string,
  callback: SubscriptionCallback
) => await Portals.subscribe({ topic }, callback);
