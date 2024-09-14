import { createClient } from "contentful";

import Layout from "@/components/Layout"
import Seo from "@/components/SEO"
import Link from "next/link"
import Builder from "@/components/Builder"

import styles from "./styles.module.sass"

import Sidebar from "@/components/Sections/Sidebar"
import Hero from "./Hero"
import Table from "@/components/Sections/Bonuses/Table"

import IconShowMore from "@/assets/icons/reload.svg"



export default function BonusesSingelPage({ bonus, all_bonuses, all_posts, all_casinos }: any) {
    //console.log(bonus.fields)
    const data = bonus.fields

    const seo = {
        metaTitle: data.title,
        metaDescription: "Slot Brain | Top Bonus",
        metaImg: 'https:' + data.logo.fields.file.url,
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
                title: "Bonuses",
                slug: "/bonuses/"
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
                <section className="">
                    <Hero data={data} breadcrumbs={breadcrumbs} />
                </section>


                <article className="container page">

                    <article className="page-sidebar">
                        <section>
                            {/* {data.logo.fields.file.url ? <div className={styles.bonus_img}>
                                <Image src={'https:' + data.logo.fields.file.url} alt={data.title} height={400} width={800} />
                            </div> : null} */}

                            <Builder data={data} />
                            <Link href="/bonuses" className="btn btn-text">Go Back</Link>
                            <h2>TOP newest bonuses</h2>
                            <div className={styles.bonus_related}>
                                {all_bonuses.slice(0, 3).map((i: any, ind: number) => (
                                    <Table data={i} key={ind} />
                                ))}
                            </div>
                            <center>
                                <Link href="/bonuses" className="btn btn-icon">
                                    <IconShowMore width="16" height="16" />
                                    Show more
                                </Link>
                            </center>

                        </section>
                        <aside>
                            <Sidebar posts={all_posts} casinos={all_casinos} data={data} />
                        </aside>
                    </article>


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
        content_type: 'bonuses'
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
        content_type: 'bonuses',
        'fields.slug': params.slug
    });

    const all_posts = await client.getEntries({
        content_type: 'blog',
    })

    const all_casinos = await client.getEntries({
        content_type: 'casino',
    })

    const all_bonuses = await client.getEntries({
        content_type: 'bonuses',
    })

    return {
        props: {
            bonus: items[0],
            all_posts: all_posts.items,
            all_casinos: all_casinos.items,
            all_bonuses: all_bonuses.items,
        },
        revalidate: 60 * 1
    };
}