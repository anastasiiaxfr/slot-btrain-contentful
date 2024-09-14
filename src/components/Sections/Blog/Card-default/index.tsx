import Link from "next/link"
import Image from "next/image"

import IconPubDate from "@/assets/icons/calendar.svg"
import IconClock from "@/assets/icons/clock.svg"
import IconEye from "@/assets/icons/eye.svg"

import styles from "./styles.module.sass"

export default function Card({ data }: any) {
    const { img, title, slug, legend, read } = data.fields
    return (
        <Link className={styles.card} href={"/blog/" + slug}>
            <div className={styles.card_wrap}>
                <Image src={'https:' + img.fields.file.url} alt={title} width="600" height="300" />
            </div>
            <div className={styles.card_content}>
                <div className={styles.card_title}>
                    {title}
                </div>
                <div className={styles.card_description}>
                    {legend}
                </div>
                <div className={styles.card_info}>
                    <span>
                        <IconPubDate width="16" height="16" />{new Date(data.sys.createdAt).toLocaleString().slice(0, 10)}
                    </span>

                    <div>
                        <span>
                            <IconClock width="16" height="16" /> {read + ' min' || '5 min'}
                        </span>
                        {/* <span>
                            <IconEye width="16" height="16" /> {data.views}
                        </span> */}
                    </div>
                </div>

            </div>
        </Link>
    )
}