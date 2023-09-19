import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import UserSuggesionCard from "../cards/UserSuggesionCard";
import { fetchCommunities } from "@/lib/actions/community.actions";

async function RightSidebar() {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchUsers({
    userId: JSON.stringify(user.id),
    searchString: "",
    pageNumber: 1,
    pageSize: 5,
  });

  const comms = await fetchCommunities({
    searchString: "",
    pageNumber: 1,
    pageSize: 5,
  });


  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">
          Suggested Communities
        </h3>
        <div>
          {comms.communities &&
            comms.communities.length > 0 &&
            comms.communities.map((comm: any) => (
              <UserSuggesionCard
                person={{
                  id: comm.id,
                  name: comm.name,
                  username: comm.username,
                  image: comm.image,
                }}
                key={comm.id}
              />
            ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">Suggested Users</h3>
        <div>
          {result.users &&
            result.users.length > 0 &&
            result.users.map((person: any) => (
              <UserSuggesionCard person={person} key={person.id} />
            ))}
        </div>
      </div>
    </section>
  );
}

export default RightSidebar;
