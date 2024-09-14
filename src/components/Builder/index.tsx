import styles from "./styles.module.sass";
import { marked } from "marked";
import Image from "next/image";

const ListItem = ({ item }: any) => {

    return (
        <li>
            {(item.content[0].content[0].value)}
        </li>
    );

};


export default function Builder({ data }: any) {
    // console.log('data', data)
    const content = data.description?.content || data.review?.content;

    return (
        <>
            {content?.map((el: any, ind: number) => {
                {
                    switch (el.nodeType) {
                        case "heading-1":
                            return <h1 key={ind}>{el.content[0].value}</h1>;
                        case "heading-2":
                            return <h2 key={ind}>{el.content[0].value}</h2>;
                        case "heading-3":
                            return <h3 key={ind}>{el.content[0].value}</h3>;
                        case "heading-4":
                            return <h4 key={ind}>{el.content[0].value}</h4>;
                        case "heading-5":
                            return <h5 key={ind}>{el.content[0].value}</h5>;
                        case "heading-6":
                            return <h6 key={ind}>{el.content[0].value}</h6>;

                        case "embedded-asset-block":
                            const imageUrl = 'https:' + el.data.target.fields?.file?.url;
                            return imageUrl ? (
                                <figure>
                                    <Image
                                        key={ind}
                                        src={imageUrl}
                                        alt={el.data.target.fields.title || "Image"}
                                        className={styles.image}
                                        layout="responsive"
                                        width={800}
                                        height={400}
                                    />
                                    {el.data.target.fields.title ? <figcaption className={styles.image_caption}>{el.data.target.fields.title}</figcaption> : null}
                                </figure>
                            ) : null;

                        case "paragraph":
                            return (
                                <>
                                    {
                                        <p
                                            className=""
                                            key={`${ind}`}
                                            dangerouslySetInnerHTML={{
                                                __html: marked(el.content[0].value || ""),
                                            }}
                                        />
                                    }
                                </>
                            );
                        case 'unordered-list':
                            return (
                                <ul key={ind}>
                                    {el.content.map((item: any, index: number) => (
                                        <ListItem key={index} item={item} />
                                    ))}
                                </ul>
                            );
                        case 'ordered-list':
                            return (
                                <ol key={ind}>
                                    {el.content.map((item: any, index: number) => (
                                        <ListItem key={index} item={item} />
                                    ))}
                                </ol>
                            );
                        case "markdown":
                            return (
                                <>
                                    {el.show === false ? null : (
                                        <div
                                            className=""
                                            key={`${el.id}${ind}`}
                                            dangerouslySetInnerHTML={{
                                                __html: marked(el.content || ""),
                                            }}
                                        />
                                    )}
                                </>
                            );
                        case "blockquote":
                            return (
                                <div className={styles.quote} key={`${el.id}${ind}`}>
                                    <div className={styles.quote_title}>{el.content[0].content[0].value}</div>
                                    <blockquote
                                        dangerouslySetInnerHTML={{
                                            __html: marked(el.content[0].content[1].value || ""),
                                        }}
                                    ></blockquote>
                                </div>
                            );
                        case "game-table":
                            return (
                                <div className={styles.table} key={`${el.id}${ind}`}>
                                    <table>
                                        <tr>
                                            <th>Casino Type</th>
                                            <td>{data.casino_type?.data.attributes.name}</td>
                                        </tr>
                                        <tr>
                                            <th>Profit</th>
                                            <td>{data.profit}</td>
                                        </tr>
                                        <tr>
                                            <th>License</th>
                                            <td>{data.licence?.data.attributes.name}</td>
                                        </tr>
                                        <tr>
                                            <th>Providers</th>
                                            <td>
                                                {data.casino_providers?.data?.map((i: any, ind: number) => (
                                                    <span key={ind}>{i.attributes.name}</span>
                                                ))}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Payment Methods</th>
                                            <td>
                                                {data.payment_methods?.data?.map((i: any, ind: number) => (
                                                    <span key={ind}>{i.attributes.name}</span>
                                                ))}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>WithDraw Methods</th>
                                            <td>
                                                {data?.currencies?.data?.map((i: any, ind: number) => (
                                                    <span key="ind">{i.attributes.code}</span>
                                                ))}
                                            </td>
                                        </tr>
                                        {data.languages?.data.length > 0 && (
                                            <tr>
                                                <th>Languages</th>
                                                <td>
                                                    {data.languages.data.map((i: any, ind: number) => (
                                                        <span key={ind}>{i.attributes.name ? i.attributes.name : "n/d"}</span>
                                                    ))}
                                                </td>
                                            </tr>
                                        )}
                                        <tr>
                                            <th>Mobile Apps</th>
                                            <td>
                                                {data.apps?.data.map((i: any, ind: number) => (
                                                    <span key={ind}>{i.attributes.name}</span>
                                                ))}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Accept Players From</th>
                                            <td>
                                                {data.countries?.data.map((i: any, ind: number) => (
                                                    <span key={ind}>{i.attributes.code}</span>
                                                ))}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Number of Games</th>
                                            <td>{el.Number_of_Games}</td>
                                        </tr>
                                        <tr>
                                            <th>Game Types</th>
                                            <td>
                                                {data.game_types?.data.map((i: any, ind: number) => (
                                                    <span key={ind}>{i.attributes.name}</span>
                                                ))}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Year launched</th>
                                            <td>{el.Year_launched}</td>
                                        </tr>
                                        <tr>
                                            <th>Support Email</th>
                                            <td>{el.Support_Email}</td>
                                        </tr>
                                        <tr>
                                            <th>Phone Number</th>
                                            <td>{el.Phone_Number}</td>
                                        </tr>
                                        <tr>
                                            <th>Owner</th>
                                            <td>{el.Owner}</td>
                                        </tr>
                                    </table>
                                </div>
                            );
                        default:
                            break;
                    }
                }
            })}
        </>
    );
}
