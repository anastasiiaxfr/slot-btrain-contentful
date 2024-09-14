
import Card from "./Card-default"
import styles from "./styles.module.sass"

export default function Blog({ blogs }: any) {


    return (
        <section className={`section`}>
            <div className="container">
                <h2>Blog</h2>
                <p>
                    The most interesting thing about the Slot brain is here
                </p>

                <div className={styles.cards}>

                    {blogs.slice(0, 3).map((i: any, ind: number) => (
                        <Card key={ind} data={i} />
                    ))}

                </div>
            </div>
        </section>
    )
}
