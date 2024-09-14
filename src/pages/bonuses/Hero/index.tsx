import styles from "./styles.module.sass"
import IconStar from "@/assets/icons/star.svg"
import Breadcrumbs from "@/components/Breadcrumbs"

export default function Hero({ data, breadcrumbs }: any) {
    return (
        <div className={styles.bonus}>

            <div className="container">
                <Breadcrumbs data={breadcrumbs} />

                <h1>Bonus</h1>

                <div className={styles.bonus_header}>
                    <span className={styles.bonus_cat}>
                        <IconStar width="18" height="18" /> {data?.rating.toFixed(1)}
                    </span>
                    <span>
                        <b>Type:</b> {data?.bonusType?.fields.title}
                    </span>
                    <span>
                        <b>Promo Code:</b> {data?.promocode}
                    </span>
                    {/* <span>
                        <b>Free Spin:</b> {data?.free_spin.data.attributes.value}
                    </span> */}

                </div>
                <div className={styles.bonus_content}>
                    <div className={styles.bonus_description}>{data?.description}</div>

                    <div className={styles.bonus_info}>
                        <div><b>Currencies:</b> {data?.currencies?.map((i: any, ind: number) => (<span key={ind}>{i.fields.code}</span>))}</div>
                        <div><b>Countries:</b> {data?.countries?.map((i: any, ind: number) => (<span key={ind}>{i.fields.code}</span>))}</div>
                    </div>

                </div>
                <div className={styles.bonus_footer}>
                    {data?.paymentMethods?.map((i: any, ind: number) => (<span key={ind} className={`btn btn-bd ${styles.bonus_btn}`}>{i.fields.code}</span>))}
                </div>

            </div>
        </div>
    )
}