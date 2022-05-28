import React, { useEffect, useState } from "react"
import { GetStaticProps } from "next"
import HeroList from "../components/HeroList/HeroList";
import { LoginModal } from "../components/LoginModal/LoginModal";

import styles from 'index.module.scss';
import { useAppContext } from "../src/context/state";

import prisma from '../lib/prisma';
import { Hero } from "@prisma/client";

interface Props {
  initHeroes: Hero[],
}

const LandingPage: React.FC<Props> = (props) => {
  const [state] = useAppContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [heroes, setHeroes] = useState(props.initHeroes);

  useEffect(() => {
    console.log(state);
    if(state && typeof state.user === "string") {
      setModalOpen(!state.user);
      
      if(state.user){
        fetch("/api/getAllHeroes", {
          method: "post",
          body: JSON.stringify({
            user: state.user
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
