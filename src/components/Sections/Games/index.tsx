import Card from "./Card-default"
import styles from "./styles.module.sass"


export default function Games({ games }: any) {
    return (
        <section className="section">
            <div className="container">
                <h2>Games</h2>
                <p>We have the most free slots on the internet. Play thousands of games for free.</p>

                <div className={styles.cards}>
                    {games.slice(0, 10).map((i: any, ind: number) => (
                        <Card data={i} key={ind} />
                    ))}
                </div>

            </div>
        </section>
    )
}