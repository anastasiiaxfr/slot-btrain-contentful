import qs from 'qs'
import Layout from "@/components/Layout"
import Seo from "@/components/SEO"
import { getFaq } from "@/pages/_contentful"

import ArrIcon from "@/assets/icons/arr-r.svg"
import { Disclosure } from '@headlessui/react'

import styles from "./styles.module.sass"

import Faq from "@/components/Faq"

const seo = {
    metaTitle: 'Lorem Ipsum',
    metaHeading: 'Lorem Ipsum',
    metaDescription:
        'Lorem Ipsum',
    metaImg: `${process.env.NEXT_PUBLIC_URL}/600x300.jpg`,
    metaURL: `${process.env.NEXT_PUBLIC_HOST}/`,
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
    { property: 'og:image', content: `${process.env.NEXT_PUBLIC_URL}/600x300.jpg` },
    { property: 'og:image:width', content: '600' },
    { property: 'og:image:height', content: '300' },
    { property: 'og:locale', content: 'uk' },
    { property: 'og:section', content: 'Blog' },
    { property: 'og:published_time', content: '2020-07-21T08:17:33+01:00' },
]

const FaqParentPage = ({ faq }: any) => {

    const faqs = faq.slice(0, 10).map((item: any) => ({
        "@type": "Question",
        "name": item.term,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": item.def
        }
    }));

    const schema = {
        "@context": "http://schema.org/",
        "@type": "FAQPage",
        "mainEntity": faqs
    }

    return (
        <>
            <Seo
                og={og}
                seo={seo}
            />

            <Layout>
                <article className="container page page-without-breadcrumbs">
                    <h1>Frequently Asked Questions</h1>

                    <dl className={styles.faq}>
                        {faq.map((i: any, ind: number) => (
                            <Faq data={i} key={ind} />
                        ))}
                    </dl>

                </article>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(schema),
                    }}
                ></script>
            </Layout >
        </>
    )
}
export async function getStaticProps() {
    try {

        const faq = await getFaq();

        return {
            props: {

                faq
            },
            revalidate: 60 * 1
        };
    } catch (error) {
        console.error('Error fetching games:', error);
        return {
            props: {

                faq: []
            },
        };
    }
}

export default FaqParentPage
