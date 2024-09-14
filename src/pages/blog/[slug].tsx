import { createClient } from "contentful";

import Layout from "@/components/Layout"
import Seo from "@/components/SEO"
import Builder from "@/components/Builder"
import Image from "next/image"
import Link from "next/link"

import ClockIcon from "@/assets/icons/clock.svg"
import BackIcon from "@/assets/icons/share.svg"
import ArrowIcon from "@/assets/icons/arr-rt.svg"

import Sidebar from "../../components/Sections/Sidebar"
import Author from "@/components/Authors"
import Posts from "./Posts"

import Breadcrumbs from "@/components/Breadcrumbs"

import styles from "./styles.module.sass"



export default function BlogSinglePage({ current_post, all_posts, all_casinos }: any) {
    console.log(current_post)
    const seo = {
        metaTitle: current_post.fields.title,
        metaDescription: current_post.fields.content?.slice(0, 200) || 'test',
        metaImg: 'https:' + current_post.fields.img?.fields.file.url,
        metaURL: current_post.fields.slug,
    }

    const og = [
        { property: 'og:type', content: 'article' },
        { property: 'og:title', content: seo.metaTitle },
        { property: 'og:description', content: "Slot Brain | Latest News" },
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
        { property: 'og:published_time', content: current_post?.fields?.publishedAt },
    ]

    const breadcrumbs = {
        current: {
            title: current_post.fields.title,
            slug: current_post.fields.slug,
        },
        parent: [
            {
                title: "News",
                slug: "/blog/"
            }
        ]
    }


    return (
        <>
            <Seo og={og} seo={seo} />
            <Layout>
                <article className="container page page-single">
                    <Breadcrumbs data={breadcrumbs} />


                    <div className={styles.post_img}>
                        <Image src={'https:' + current_post.fields.img?.fields.file.url} alt={current_post.fields.title} height={400} width={800} />
                        <div className={styles.post_info}>
                            <div className={styles.post_info_header}>
                                {current_post.fields.blogCategory?.fields.title ? <span className={styles.post_cat}>{current_post.fields.blogCategory?.fields?.title}</span> : null}

                                <span>{new Date(current_post.sys.createdAt).toLocaleString()}</span>
                            </div>
                            <h1 className={styles.post_title}>{current_post.fields.title}</h1>
                            <div className={styles.post_info_footer}>
                                <div>
                                    {current_post.fields?.authors.map((i: any, ind: number) =>
                                        <span key={ind}><em>by</em> {i.fields.name}</span>
                                    )}
                                    <span>
                                        <ClockIcon width="16" height="16" />
                                        {current_post.fields.read ? current_post.fields.read + " min" : '5 min'}
                                    </span>
                                </div>
                                <Link href="/blog">
                                    <BackIcon />
                                </Link>
                            </div>
                        </div>
                    </div>

                    <article className="page-sidebar">
                        <section>
                            <Builder data={current_post.fields} />
                            {current_post.fields.authors[0] ? <Author data={current_post.fields.authors[0]} /> : null}
                        </section>
                        <aside>
                            <Sidebar posts={all_posts} casinos={all_casinos} data={current_post.fields} />
                        </aside>
                    </article>

                    <article>
                        <h2 className="section_header">
                            <span>More Posts</span>
                            <ArrowIcon width="24" />
                        </h2>

                        <Posts data={all_posts} />
                    </article>
                </article>

            </Layout>
        </>
    );
}


const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID || '',
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',

});

export async function getStaticPaths() {
    const res = await client.getEntries({
        content_type: 'blog'
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
        content_type: 'blog',
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
            current_post: items[0],
            all_posts: all_posts.items,
            all_casinos: all_casinos.items,
        },
        revalidate: 60 * 1

    };
}