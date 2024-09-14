import styles from "./styles.module.sass"
import Image from "next/image"
import Link from "next/link"

import Sidebar from "../Sidebar"
import Breadcrumbs from "@/components/Breadcrumbs"

export default function Header({ data, casinos, games, breadcrumbs }: any) {
    const game = data?.fields;
    return (
        <section className={styles.hero}>
            <div className="container">
                <Breadcrumbs data={breadcrumbs} />

                <div className={styles.hero_demo}>
                    <div className={styles.hero_content}>
                        <div className={styles.hero_img}>
                            <Image src={'https:' + game?.img?.fields?.file?.url} alt={game?.title} height={150} width={300} />
                        </div>

                        <div className={styles.hero_header}>
                            <div>
                                <h1 className={styles.hero_title}>{game?.title}</h1>
                            </div>
                            {/* {game?.game_provider && <div>
                                by {game?.game_provider?.game?.attributes?.name}
                            </div>} */}
                        </div>

                        <div className={styles.hero_cta}>
                            <Link href={game?.slug || '/'} className={`btn ${styles.hero_btn}`}>Play For Real</Link>
                            <Link href={game?.url || '/'} className={`btn btn-bd ${styles.hero_btn}`}>Play Demo</Link>
                            <p>Problems with demo? <Link href="/">Click Here</Link></p>
                        </div>

                        {game && <div className={styles.hero_footer}>
                            <span>
                                <b>Min Bet</b>
                                {game.minBet ? game.minBet : 'n/d'}
                            </span>
                            <span>
                                <b>RTP</b>
                                {game.rtp ? game.rtp : 'n/d'}
                            </span>
                            <span>
                                <b>Reels</b>
                                {game.reels ? game.reels : 'n/d'}
                            </span>
                            <span>
                                <b>Paylines</b>
                                {game.paylines ? game.paylines : 'n/d'}
                            </span>
                            <span>
                                <b>Max Win</b>
                                {game.maxWin ? game.maxWin : 'n/d'}
                            </span>
                        </div>}

                    </div>
                    <aside>
                        <Sidebar casinos={casinos} games={games} />
                    </aside>
                </div>

            </div>
        </section >
    )
}