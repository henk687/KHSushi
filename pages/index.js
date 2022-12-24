import Head from "next/head";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
import Menu from "../components/Menu";
import Services from "../components/Services";
import { client } from "../lib/client";
import css from '../styles/Home.module.css'

export default function Home({sushis}) {
  return (
      <Layout>
        <div className={css.container}>
          <Head>
            <title>KHSushi</title>
            <meta name="description" content="KHSushi voor de lekkerste Sushi" />
            <link rel="icon" href="/Logo.png" />
          </Head>
          {/* body */}
          <main>
            <Hero />  
            <Services /> 
            <Menu sushis={sushis} />
          </main>
        </div>
      </Layout>
  );
}

export const getServerSideProps = async () => {
  const query = '*[_type == "sushi"]';
  const sushis = await client.fetch(query)
  return {
    props: {
      sushis
    }
  }
}

