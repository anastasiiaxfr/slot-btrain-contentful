import Link from "next/link"
import Image from "next/image"

import StarIcon from "@/assets/icons/star.svg"
import styles from "./styles.module.sass"


export default function Card({ data }: any) {
    console.log(data)
    return (
        <section className={styles.card}>
            <Link className={styles.card_img} href={`bonuses/${data.slug}`}>
                <Image src={'https:' + data.logo.fields.file.url} width={400} height={200} alt={data.title} />
            </Link>
            <div className={styles.card_content}>
                <div className={styles.card_header}>
                    <span className={styles.card_chip}><StarIcon width="22" height="22" />{data.rating.toFixed(2)}</span>
                    <b>{data.title}</b>
                </div>
                <div className={styles.card_main}>
                    <div className={styles.card_title}>
                        {data.bonusType.fields.title}
                    </div>
                    <div className={styles.card_description}>
                        {data.description}
                    </div>
                    <Link href="/">View Bonuse</Link>
                </div>
                <Link className={`btn ${styles.btn}`} href={`bonuses/${data.slug}`} data-text={"Get the Bonuse"}>Get the Bonuse</Link>
                <div className={styles.card_list}>
                    <ul className="list-check">
                        <li>
                            <b>GEO:</b>
                            {data?.countries?.map((i: any, ind: number) => (<span key={ind}>{i.fields.code}</span>))}
                        </li>
                        <li>
                            <b>Currencies: </b>
                            {data?.currencies?.map((i: any, ind: number) => (<span key={ind}>{i.fields.code}</span>))}
                        </li>
                        <li>
                            <b>PM: </b>
                            {data?.paymentMethods?.map((i: any, ind: number) => (<span key={ind}>{i.fields.code}</span>))}
                        </li>
                    </ul>
                </div>
                {data.promocode ? <div className={styles.card_note}>Promo Code: <b>{data.promocode}</b></div> : null}
            </div>
        </section>
    )
}