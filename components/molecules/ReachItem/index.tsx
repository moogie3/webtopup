interface ReachItemProps {
    desc1: string
    title: string
}
export default function ReachItem(props: ReachItemProps) {
    const { desc1, title } = props;
    return (
        <div className="me-lg-35">
            <p className="text-4xl text-lg-start text-center color-palette-1 fw-bold m-0">{title}</p>
            <p className="text-lg text-lg-start text-center color-palette-2 m-0">{desc1}</p>
        </div>
    )
}
