
import Link from "next/link"
import Image from "next/image"
import ReactStars from 'react-stars'

import styles from "./styles.module.sass"
import bonuses from "./constant"

export default function Bonuses({ bonuses }: any) {



    return (
        <section className="section">
            <div className="container">
                <h2>
                    Bonuses
                </h2>
                <p>
                    The best casino in Slot brain
                </p>

                <div className={styles.cards}>
                    {bonuses.slice(0, 3).map((i: any, ind: number) => (
                        <article className={styles.card} key={ind}>
                            <Link className={styles.card_wrap} href={'/bonuses/' + i.slug}>
                                <Image src={'https:' + i.logo.fields.file.url} alt={i.type} width="150" height="75" />
                            </Link>
                            <div>
                                Bonus type <br /><span>{i.bonusType.fields.title}</span>
                            </div>
                            <div>
                                Rating
                                <div className={styles.card_rating}>
                                    <ReactStars
                                        count={5}
                                        size={24}
                                        value={i.rating}
                                        edit={false}
                                        color2={'#EB8425'} />
                                </div>

                            </div>
                            <div>
                                <big>
                                    {i.description}
                                </big>

                            </div>
                            <div className={styles.card_cta}>
                                <Link className={`btn ${styles.card_btn}`} href={'/bonuses/' + i.slug} data-text={"Get a bonus"}>
                                    Get a bonus
                                </Link>
                                <Link className={styles.card_btn_link} href={'/bonuses/' + i.slug}>
                                    Read Sloto zen
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}
