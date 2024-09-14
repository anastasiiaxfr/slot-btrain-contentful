import { createClient } from "contentful";

import Layout from "@/components/Layout"
import Seo from "@/components/SEO"
import Builder from "@/components/Builder"

import Hero from "./Hero"
import Sidebar from "@/components/Sections/Sidebar"

export default function CasinosSinglePage({ casino, all_casinos, all_posts }: any) {
    const data = casino.fields;

    const seo = {
        metaTitle: data.title,
        metaDescription: 'Slot Brain | Top Casino',
        metaImg: 'https:' + data.thumbnail?.fields.file?.url,
        metaURL: data.slug,
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
            title: data.title,
            slug: data.slug,
        },
        parent: [
            {
                title: "Casino",
                slug: "/casinos/"
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
                <Hero data={data} breadcrumbs={breadcrumbs} />
                <article className="container page page-sidebar">

                    <section className="page-article">
                        <Builder data={data} />
                    </section>
                    <aside>
                        <Sidebar posts={all_posts} casinos={all_casinos} data={data} />
                    </aside>
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
        content_type: 'casino'
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
        content_type: 'casino',
        'fields.slug': params.slug
    });

    const all_posts = await client.getEntries({
        content_type: 'blog',
    })

    const all_casinos = await client.getEntries({
        content_type: 'casino',
    })


    return {
        props: {
            casino: items[0],
            all_posts: all_posts.items,
            all_casinos: all_casinos.items,
        },
        revalidate: 1 * 60

    };
}
