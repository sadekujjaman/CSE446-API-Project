import axios from "axios";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { WrapperPage } from "../components/page-component/page-wrapper";
import { Team } from "../types/utils";

const TeamInfo = ({ team }: { team: Team | undefined }) => {
  return (
    <>
      <h1>This is TeamInfo</h1>
    </>
  );
};

const TeamProfile = () => {
  const { query } = useRouter();
  const teamId = query.teamId as string;

  const [team, setTeam] = useState<any>();

  const fetchTeam = async () => {
    const response = await axios.get(`/api/teams/${teamId}`);
    console.log(response);

    setTeam(response.data.data);
  };
  useEffect(() => {
    fetchTeam();
  }, []);

  return (
    <>
      {team && <TeamInfo team={team} />}
      <h1>Hello Team {teamId}</h1>
    </>
  );
};

const TeamPage = () => {
  return (
    <>
      <WrapperPage title="Team Profile">{() => <TeamProfile />}</WrapperPage>
    </>
  );
};

export default TeamPage;
