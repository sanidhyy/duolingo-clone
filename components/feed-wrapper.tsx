import type { PropsWithChildren } from "react";

export const FeedWrapper = ({ children }: PropsWithChildren) => {
  return <div className="flex-1 relative top-0 pb-10">{children}</div>;
};
