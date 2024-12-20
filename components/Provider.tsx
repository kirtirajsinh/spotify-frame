"use client";
import { PropsWithChildren, useEffect } from "react";
import FrameSDK from "@farcaster/frame-sdk";

const Provider = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    const load = async () => {
      FrameSDK.actions.ready();
    };
    load();
  }, []);
  return <>{children}</>;
};

export default Provider;
