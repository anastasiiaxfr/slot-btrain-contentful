import { createClient } from "contentful";

import Layout from "@/components/Layout"
import Seo from "@/components/SEO"

import Builder from "@/components/Builder"
import Sidebar from "@/components/Sections/Sidebar"

import Games from "./Games"
import Hero from "./Hero"
import ArrowIcon from "@/assets/icons/arr-rt.svg"

export default function GamesSinglePage({ game, all_games, all_casinos, all_posts }: any) {
    const data = game;

    const seo = {
        metaTitle: data.fields.title,
        metaDescription: "Slot Brain | Yet another cool game",
        metaImg: 'https:' + data.fields.img.fields.file.url,
        metaURL: data.fields.slug,
    }

    const og = [
        { property: 'og:type', content: 'article' },
        { property: 'og:title', content: seo.metaTitle },
        { property: 'og:description', content: seo.metaDescription },
        {
            property: 'og:site_name',
            content: 'Slot Brain',
        },
        { property: 'og:url', content: seo.metaURL },
        { property: 'og:image', content: seo.metaImg },
        { property: 'og:image:width', content: '600' },
        { property: 'og:image:height', content: '300' },
        { property: 'og:locale', content: 'en' },
        { property: 'og:section', content: 'Blog' },
        { property: 'og:published_time', content: data.publishedAt },
    ]

    const breadcrumbs = {
        current: {
            title: data.fields.title,
            slug: data.fields.slug,
        },
        parent: [
            {
                title: "Games",
                slug: "/games/"
            }
        ]
    }

    return (
        <>
            <Seo
                og={og}
                seo={seo}
            />

            <Layout>
                <Hero casinos={all_casinos} games={all_games} data={data} breadcrumbs={breadcrumbs} />
                <article className="container page page-article">
                    <article className="page-sidebar">
                        <section className="">
                            <Builder data={data.fields} />
                        </section>
                        <aside>
                            <Sidebar posts={all_posts} casinos={all_casinos} data={data} />
                        </aside>
                    </article>
                    <section>
                        <h2 className="section_header">
                            <span>Similar Games You Might Like</span>
                            <ArrowIcon width="24" />
                        </h2>
                        <Games data={all_games} />
                    </section>
                </article>

            </Layout>
        </>
    )
}



const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID || '',
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',

});

export async function getStaticPaths() {
    const res = await client.getEntries({
        content_type: 'games'
    })

    const paths = res.items.map(i => {
        return {
            params: { slug: i.fields.slug }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }: any) {

    const { items } = await client.getEntries({
        content_type: 'games',
        'fields.slug': params.slug
    });

    const all_posts = await client.getEntries({
        content_type: 'blog',
    })

    const all_casinos = await client.getEntries({
        content_type: 'casino',
    })

    const all_games = await client.getEntries({
        content_type: 'games',
    })

    return {
        props: {
            game: items[0],
            all_posts: all_posts.items,
            all_casinos: all_casinos.items,
            all_games: all_games.items,
        },
        revalidate: 60 * 1
    };
}


