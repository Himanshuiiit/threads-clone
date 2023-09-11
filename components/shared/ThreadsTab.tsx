import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

const ThreadsTab = async ({ currentUserId, accountId, accountType }: Props) => {
  let result: {
    threads: {
      _id: string;
      parentId: string | null;
      text: string;
      createdAt: string;
      author: {
        name: string;
        id: string;
        image: string;
      };
      children: {
        author: {
          image: string;
        };
      }[];

      community: {
        id: string;
        name: string;
        image: string;
      } | null;
    }[];
    name: string;
    id: string;
    image: string;
  } | null = null;

  if (accountType === "Community")
    result = await fetchCommunityPosts(accountId);
  else result = await fetchUserPosts(currentUserId);
  if (!result) redirect("/");
  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.threads?.map((thread) => (
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={currentUserId}
          parentId={thread.parentId}
          content={thread.text}
          community={thread.community}
          author={
            accountType === "User"
              ? { name: result?.name, id: result?.id, image: result?.image }
              : {
                  name: thread?.author.name,
                  id: thread?.author.id,
                  image: thread?.author.image,
                }
          }
          createdAt={thread?.createdAt}
          comments={thread?.children}
        />
      ))}
    </section>
  );
};

export default ThreadsTab;
