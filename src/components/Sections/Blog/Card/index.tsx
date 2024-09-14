import Link from "next/link"
import Image from "next/image"

import IconPubDate from "@/assets/icons/calendar.svg"
import IconClock from "@/assets/icons/clock.svg"
import IconEye from "@/assets/icons/eye.svg"

import styles from "./styles.module.sass"

export default function Card({ data, slug }: any) {
    const { img, title, authors, read,
        blogCategory

    } = data.fields
    return (
        <Link className={styles.card} href={`${slug}`}>
            <div className={styles.card_wrap}>
                <Image src={'https:' + img.fields.file.url} alt={data.title} width={400} height={200} />
                {blogCategory?.fields.title ? <div className={styles.card_chip}>{blogCategory?.fields.title}</div> : null}
            </div>
            <div className={styles.card_content}>

                <div className={styles.card_header}>
                    <span>
                        <IconPubDate width="16" height="16" />{new Date(data.sys.createdAt).toLocaleString()}
                    </span>
                    <span>
                        <IconClock width="16" height="16" /> {read ? read + ' min' : '5 min'}
                    </span>
                </div>
                <div className={styles.card_title}>
                    {title}
                </div>


                <div className={styles.card_footer}>
                    <span>
                        <em>by</em>
                        {authors.map((i: any, ind: number) => (
                            i.fields.name
                        ))}
                    </span>
                </div>

            </div>
        </Link>
    )
}