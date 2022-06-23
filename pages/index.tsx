import React, { useEffect, useState } from "react"
import HeroList from "../components/HeroList/HeroList";
import { LoginModal } from "../components/LoginModal/LoginModal";

import { useAppContext } from "../src/context/state";

import { Hero } from "@prisma/client";

export interface HeroWithAuthor extends Hero {
  author: {
    id: string,
    name: string,
  }
}

interface Props {
  initHeroes: HeroWithAuthor[],
}

const LandingPage: React.FC<Props> = (props) => {
  const { state } = useAppContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [heroes, setHeroes] = useState(props.initHeroes);

  useEffect(() => {
    if(state) {
      setModalOpen(!state.user.id);
      
      if(state.user){
        fetch("/api/get-all-heroes", {
          method: "post",
          body: JSON.stringify({
            user: state.user.name
          })
        })
          .then(data => data.json())
          .then((data => setHeroes(data)))
      }
    }
  }, [state]);

  return (
    <div className="page">
      <LoginModal open={modalOpen} closeHandler={() => setModalOpen(false)} />
      <h3>Available Heroes</h3>
      <main>
        <HeroList heroes={heroes} />
      </main>
    </div>
  )
}

export default LandingPage
