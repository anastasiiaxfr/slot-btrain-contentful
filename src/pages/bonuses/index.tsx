import { useState, useEffect } from "react";
import { getBonuses } from '@/pages/_contentful';

import Layout from "@/components/Layout"
import Seo from "@/components/SEO"
import Hero from "@/components/Sections/Hero"
import Card from "@/components/Sections/Bonuses/Card"
import styles from "./styles.module.sass"
import Select from 'react-select'
import { og, seo, hero, filter_by_provider, filter_by_type, order } from "./constants"

import Pagination from "@/components/Pagination";

export async function getStaticProps() {
    try {

        const bonuses = await getBonuses();

        return {
            props: {
                bonuses,
            },
            revalidate: 60 * 1

        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                bonuses: [],
            },
        };
    }
}


const BonusesParentPage = ({ bonuses }: any) => {
    //console.log(bonuses)
    const [searchValue, setSearchValue] = useState("")
    const [pageIndex, setPageIndex] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const pageItems = 3

    const filteredPosts = bonuses.filter((bonus: any) =>
        bonus.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    useEffect(() => {
        setTotalPage(Math.ceil(filteredPosts.length / pageItems));
    }, [filteredPosts]);

    const paginatedPosts = filteredPosts.slice((pageIndex - 1) * pageItems, pageIndex * pageItems);


    return (
        <>
            <Seo
                og={og}
                seo={seo}
            />

            <Layout>
                <Hero data={hero} setSearchValue={setSearchValue} search="Search by bonus name or type" />

                {/* <section className="container">
                    <div className="filters">
                        <div>
                            <span>Type:</span>
                            <Select options={filter_by_type} />
                        </div>
                        <div>
                            <span>FreeSpins:</span>
                            <Select options={filter_by_provider} />

                        </div>

                        <div>
                            <span>Payment Methods:</span>
                            <Select options={filter_by_type} />
                        </div>
                        <div>
                            <span> GEO:</span>
                            <Select options={filter_by_type} />
                        </div>
                        <div>
                            <span>Currencies:</span>
                            <Select options={filter_by_type} />
                        </div>
                    </div>
                </section> */}

                <article className={`container page ${styles.cards_wrap}`}>
                    <div className={styles.cards}>
                        {paginatedPosts.map((i: any, ind: number) => (
                            <Card key={ind} data={i} />
                        ))}
                    </div>

                    {/* PAGINATION */}

                    <Pagination totalPage={totalPage} pageIndex={pageIndex} setPageIndex={setPageIndex} />

                    <section className={styles.cards_content}>
                        <p>
                            Red Ventures (includes “us,” “we,” or “our”) is a portfolio of brands and digital platforms (such as mobile and/or TV applications) that connect people with information to help make some of life’s most important decisions. Some examples of Red Ventures’ brands are Allconnect, Bankrate, CNET, MyMove, Online MBA, and The Points Guy. For the purposes of this Privacy Policy, the websites, apps, and products provided by Red Ventures will be referred to as the “Services.” Certain Red Ventures Services have different privacy policies (such as our Healthline Media Sites and Services in Brazil), you should check each Service for its specific policy before use.
                        </p>
                        <p>
                            This Privacy Policy describes the type of personal information that we may collect for our own purposes; how we use, protect, and share that information; and the choices that you have. By using the Services, you acknowledge the information collection practices and purposes outlined in this Privacy Policy. Any capitalized terms used, but not defined, in this Privacy Policy have the meanings provided in the Terms of Use of the applicable Services.
                        </p>
                        <p>
                            In some circumstances, a Red Ventures company may receive or process Personal Information on behalf of a client. In those situations, the privacy policy of the client will apply.
                        </p>
                    </section>
                </article>
            </Layout>
        </>
    )
}


export default BonusesParentPage
