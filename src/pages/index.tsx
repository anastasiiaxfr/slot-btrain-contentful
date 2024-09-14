import { useState } from "react"
import { getGames, getCasinos, getBonuses, getBlogs, getFaq } from "./_contentful"
import Layout from "@/components/Layout"

import Hero from "@/components/Sections/Hero/Slider"
import Casino from "@/components/Sections/Casino"
import Bonuses from "@/components/Sections/Bonuses"
import Games from "@/components/Sections/Games"
import Blog from "@/components/Sections/Blog"
import Subscribe from "@/components/Sections/Subscribe"
import Faq from "@/components/Sections/Faq"
import Seo from "@/components/SEO"


const seo = {
  metaTitle: '♠️ SlotBrain ♠️ | by Xforeal',
  metaHeading: 'Createed on Next.js + Contentful CMS',
  metaDescription:
    'Createed on Next.js + Contentful CMS',
  metaImg: `/600x300.jpg`,
  metaURL: `/`,
}

const og = [
  { property: 'og:type', content: 'article' },
  { property: 'og:title', content: '' },
  { property: 'og:description', content: '' },
  {
    property: 'og:site_name',
    content: '',
  },
  { property: 'og:url', content: '' },
  { property: 'og:image', content: `/600x300.jpg` },
  { property: 'og:image:width', content: '600' },
  { property: 'og:image:height', content: '300' },
  { property: 'og:locale', content: 'uk' },
  { property: 'og:section', content: 'Blog' },
  { property: 'og:published_time', content: '2020-07-21T08:17:33+01:00' },
]


export async function getStaticProps() {
  try {
    const games = await getGames();
    const casinos = await getCasinos();
    const bonuses = await getBonuses();
    const blogs = await getBlogs();
    const faq = await getFaq();

    return {
      props: {
        games,
        casinos,
        bonuses,
        blogs,
        faq
      },
      revalidate: 60 * 1
    };
  } catch (error) {
    console.error('Error fetching games:', error);
    return {
      props: {
        games: [],
        casinos: [],
        bonuses: [],
        blogs: [],
        faq: []
      },
    };
  }
}

export default function Home({ games, casinos, bonuses, blogs, faq }: any) {
  const [searchValue, setSearchValue] = useState("")

  return (
    <>
      <Seo
        og={og}
        seo={seo}
      />
      <Layout>
        <article className="">
          <Hero setSearchValue={setSearchValue} search="Search by 1000+ casinos" />
          <Casino searchValue={searchValue} casinos={casinos} />
          <Bonuses bonuses={bonuses} />
          <Games games={games} />
          <Blog blogs={blogs} />
          <Faq faq={faq} />
          <Subscribe />
        </article>
      </Layout>
    </>
  )
}