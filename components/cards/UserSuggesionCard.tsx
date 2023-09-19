"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const UserSuggesionCard = ({ person }: any) => {
  const router = useRouter();
  return (
    <div
      className="flex flex-col pt-6"
      onClick={() => router.push(`/profile/${person.id}`)}
    >
      <div className="flex flex-row text-white gap-6 align-middle">
        <Image
          src={person.image}
          alt="user"
          width={50}
          height={50}
          className="rounded-full bg-cover"
        />
        <div className="flex flex-col gap-1">
          <span className="text-heading4-bold">{person.name}</span>
          <span className="text-subtle-semibold text-gray-600">
            {person.username}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserSuggesionCard;
