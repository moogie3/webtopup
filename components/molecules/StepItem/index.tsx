export interface StepItemProps {
    icon: 'step1' | 'step2' | 'step3'
    desc1: string
    desc2: string
    title: string
}
export default function StepItem(props: StepItemProps) {
    const { icon, desc1, desc2, title } = props;
    return (
        <div className="col-lg-4">
            <div className="card feature-card border-0">
                <img src={`/icon/${icon}.svg`} alt='icon step' className="mb-30" width={80} height={80} />
                <p className="fw-semibold text-2xl mb-2 color-palette-1">{title}</p>
                <p className="text-lg color-palette-1 mb-0">{desc1}<br /> {desc2}</p>
            </div>
        </div>
    )
}
