import type { PropsWithChildren } from "react";

export const FeedWrapper = ({ children }: PropsWithChildren) => {
  return <div className="relative top-0 flex-1 pb-10">{children}</div>;
};
