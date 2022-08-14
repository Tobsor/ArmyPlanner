import React, { useEffect, useState } from "react"
import HeroList from "../components/HeroList/HeroList";
import { LoginModal } from "../components/LoginModal/LoginModal";

import { useAppContext } from "../src/context/state";

export interface PlayerHero {
  heroId: number;
  name: string;
  power: number;
  instantiated: boolean;
  heroInstanceId?: number;
  img?: string;
}

const LandingPage: React.FC = () => {
  const [state] = useAppContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [heroes, setHeroes] = useState<PlayerHero[]>();

  const refetch = () => {
    fetch("/api/get-all-heroes", {
      method: "post",
      body: JSON.stringify({
        user: state.user.name
      })
    })
      .then(data => data.json())
      .then((data => setHeroes(data)))
  }

  useEffect(() => {
    if(state) {
      setModalOpen(!state.user.id);
      
      if(state.user){
        refetch();
      }
    }
  }, [state]);

  return (
    <div className="page">
      <LoginModal open={modalOpen} closeHandler={() => setModalOpen(false)} />
      <h3>Available Heroes</h3>
      <main>
        <HeroList heroes={heroes} refetch={refetch} />
      </main>
    </div>
  )
}

export default LandingPage;
