import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";

const LearnPage = () => {
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>My sticky sidebar</StickyWrapper>
      <FeedWrapper>My feed</FeedWrapper>
    </div>
  );
};

export default LearnPage;
