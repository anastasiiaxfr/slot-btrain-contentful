import styles from "./styles.module.sass"
import Image from "next/image"
import Link from "next/link"

export default function Card({ data }: any) {
    console.log('data', data)
    return (
        <section className={styles.card}>
            <div className={styles.card_logo}>
                <Link href={data.fields.slug} className={styles.card_img}>
                    <Image src={'https:' + data.fields.logo.fields.file.url} width={400} height={200} alt={data.title} />
                </Link>
                <div className={styles.card_title}>
                    {data.fields.title}
                </div>
            </div>
            <div className={styles.card_description}>
                <small>
                    {data.fields.bonusType.fields.title}
                </small>
                {data.description}
            </div>
            <div className={styles.card_cta}>
                <Link href={data.fields.slug} className={`btn ${styles.card_btn}`} >Claim Bonus</Link>
                <Link href="/" className={`btn btn-text ${styles.card_btn_link}`}>Visit site</Link>
            </div>
        </section>
    )
}