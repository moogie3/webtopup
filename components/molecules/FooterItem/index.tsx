import Link from 'next/link';

interface FooterProps {
    href: string
    title: string
    alink: string
}

export default function FooterItem(props: Partial<FooterProps>) {
    const { title, href = "/", alink } = props;

    return (
        <li className="mb-6">
            <Link href={href} legacyBehavior><a href={alink} className="text-lg color-palette-1 text-decoration-none">{title}</a></Link>
        </li>
    )
}
