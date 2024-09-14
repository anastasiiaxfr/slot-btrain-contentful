import { useState, useEffect } from 'react';
import { getBlogs } from '@/pages/_contentful';

import Layout from '@/components/Layout';
import Seo from '@/components/SEO';
import Hero from '@/components/Sections/Hero';
import Card from '@/components/Sections/Blog/Card';
import Breadcrumbs from '@/components/Breadcrumbs';
import Pagination from '@/components/Pagination';

import styles from './styles.module.sass';

import { seo, og, hero } from './constants';

export async function getStaticProps() {
    try {

        const blogs = await getBlogs();

        return {
            props: {
                blogs,
            },
            revalidate: 60 * 1

        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                blogs: [],
            },
        };
    }
}

const BlogParentPage = ({ blogs }: any) => {
    const [searchValue, setSearchValue] = useState('');
    const [pageIndex, setPageIndex] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const pageItems = 7;

    const filteredPosts = blogs.filter((blog: any) =>
        blog.fields.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    useEffect(() => {
        setTotalPage(Math.ceil(filteredPosts.length / pageItems));
    }, [filteredPosts]);

    const paginatedPosts = filteredPosts.slice((pageIndex - 1) * pageItems, pageIndex * pageItems);

    const breadcrumbs = {
        current: {
            title: hero.title,
            slug: '/blog/',
        },
    };

    return (
        <>
            <Seo og={og} seo={seo} />

            <Layout>
                <Hero data={hero} setSearchValue={setSearchValue} search="Search by news title" />

                <article className="container page">
                    <Breadcrumbs data={breadcrumbs} />

                    <section className={styles.blog_section}>
                        <div className={styles.blog_sections_all}>
                            {paginatedPosts.map((blog: any, index: number) => (
                                <Card key={index} data={blog} slug={`blog/${blog.fields.slug}`} />
                            ))}
                        </div>

                        <Pagination
                            totalPage={totalPage}
                            pageIndex={pageIndex}
                            setPageIndex={setPageIndex}
                        />
                    </section>
                </article>
            </Layout>
        </>
    );
};

export default BlogParentPage;
