import { InvitationShell } from "../components/invitation-shell";

type HomePageProps = {
  searchParams?: Promise<{
    to?: string;
  }>;
};

export default async function HomePage({
  searchParams,
}: HomePageProps) {

  const params = await searchParams;

  const guestName = decodeURIComponent(
    typeof params?.to === "string"
      ? params.to
      : ""
  );

  return (
    <div className="container-mobile">
      <InvitationShell guestName={guestName} />
    </div>
  );
}